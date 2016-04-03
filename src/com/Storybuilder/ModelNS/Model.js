/**
 *  Singleton - Holds the entire model of the Storybuilder. Wraps all the model classes and provides an interface
 *  to manage them.
 *  @class com.Storybuilder.ModelNS.Model
 */

var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');


ModelNS.Model = (function() {
    //private
    var instance;
    
    Model.prototype = new ModelNS.AbstractSerializable();
    Model.prototype.constructor = Model;
    Model.prototype.parent = ModelNS.AbstractSerializable;
    
    function Model(){
        
        /***************** Retrieve Packages *******************/
        var ResourceManager = ModelNS.ResourceManager,
        CanvasModel = ModelNS.CanvasModel;
        Story = ModelNS.Story,
        Page = ModelNS.Page,
        Rect = com.Storybuilder.Utility.Rect,
        XMLGenerator = com.Storybuilder.Utility.XMLGenerator,
        Remote = com.Storybuilder.Utility.Remote;
        /*******************************************************/
        
        
        //private
        
        var m_controller;
        var that = this;
            
        var m_resourceManager;
            
        //Value in %
        var m_canvas;
            
            
        var m_story;
        var m_currentPage;
        var m_pages;
        var m_audio,
        m_trackName,
        m_trackDuration,
        mb_trackPlaying;
            
            
        var mb_projectOpened;
        
        //Methods
        
        /**
         *  Serializes the model into a JSON Object - Overrides the parent function
         *  @function toJSON
         *  @return JSON Object
         */
        this.toJSON = function(){
            return {
                "story":{
                    
                }
            };
        };
        
        /**
         *  Returns the Story object of the model
         *  @function getStory
         *  @return com.Storybuilder.ModelNS.Story
         */
        this.getStory = function(){
            return m_story;
        };
        
        /**
         *  Initializes the model variables
         *  @function init
         *  @param {com.Storybuilder.ControllerNS.Controller} controller - the controller reference
         *  @return void
         */
        this.init = function(controller){
            that = this;
            m_controller = controller;
                
            m_resourceManager = ResourceManager.getInstance();
            m_canvas = CanvasModel.getInstance();
                
            m_story = new Story();
            m_pages = [];
            m_audio = null;
            mb_trackPlaying = false;
                
            mb_projectOpened = false;
        };
        
        /**
         *  Updates the coorinates of the frame the user is currently working on
         *  @function updateFrameCoordinates
         *  @param {int} x - x value
         *  @param {int} y - y valie
         *  @param {int} width - width value
         *  @param {int} height - height value
         *  @return void
         */
        this.updateFrameCoordinates = function(x, y, width, height){
            if(m_currentPage.getCurrentFrame() == null){
                var absoluteWidth = Math.round((width/100)*m_canvas.getWidth()),
                absoluteHeight = Math.round((height/100)*m_canvas.getHeight());
                m_currentPage.getCurrentFrame().setRelativeDimension(new Rect(x, y, width, height));
                m_currentPage.getCurrentFrame().setAbsoluteDimension(absoluteWidth, absoluteHeight);
            }
        };
        
        /**
         *  Updates all the frames timestamps from the page the user is currently working on
         *  @function updateFrames
         *  @param {Array} framesData - the array of frames timestamps
         *  @return void
         */
        this.updateFrames = function(framesData){
            
            var currentFrame,
            page,
            frame,
            start,
            duration,
            end;
            
            var pageObj,
            frameObj;
            
            for(var i = 0; i<framesData.length; i++){
                currentFrame = framesData[i];
                page = currentFrame.page;
                frame = currentFrame.frame;
                start = currentFrame.start;
                duration = currentFrame.duration;
                end = currentFrame.end;
                pageObj = MathLib.findObjectByMember(page, m_pages, "getNumber");
                frameObj = MathLib.findObjectByMember(frame, pageObj.getFrames(), "getID");
                
                frameObj.setFrameStart(start);
                frameObj.setFrameDuration(duration);
                frameObj.setFrameEnd(end);
                
            }
        };
        
        /**
         *  Checks whether a trick is being played or not
         *  @function isTrackPlaying
         *  @return boolean
         */
        this.isTrackPlaying = function(){
            return mb_trackPlaying;
        };
        
        /**
         *  Sets a track time to the audio attached to the timeline
         *  @function setTracktime
         *  @return void
         */
        this.setTrackTime = function(time){
            m_audio.currentTime = time;
        };
        
        /**
         *  Returns the Audio object attached to the timeline
         *  @function getAudioTrack
         *  @return Audio
         */
        this.getAudioTrack = function(){
            return m_audio;
        };
        
        /**
         *  Sets an audio track to the timeline by passing as a parameter an  AudioResource object
         *  @function setAudioTrack
         *  @param {com.Storybuilder.ModelNS.AudioResource} resource - the AudioResource object
         *  @return void
         */
        this.setAudioTrack = function(resource){
            if(resource){
                m_audio = resource.getAudio();
                m_audio.currentTime = 0;
                m_trackName = resource.getName();
                m_trackDuration = m_audio.duration;
                
                $(m_audio).bind('timeupdate', function(){
                    m_controller.pushAudioUpdate(m_audio.currentTime);
                });
                
            }
        };
        
        /**
         *  Returns the name of the track attached to the timeline
         *  @function getTrackName
         *  @return String
         */
        this.getTrackName = function(){
            return m_trackName;
        };
        
        /**
         *  Returns the duration of the track attached to the timeline
         *  @function getTrackDuration
         *  @return float
         */
        this.getTrackDuration = function(){
            return m_trackDuration;
        };
        
        /**
         *  Plays the audio track attached to the timeline and sets the trackPlaying boolean to true
         *  @function playTrack
         *  @return void
         */
        this.playTrack = function(){
            m_audio.play();
            mb_trackPlaying = true;
        };
        
        /**
         *  Pauses the audio track attached to the timeline
         *  @function pauseTrack
         *  @return void
         */
        this.pauseTrack = function(){
            m_audio.pause();
            mb_trackPlaying = false;
        }
        
        /**
         *  Plays the audio track attached to the timeline, sets the current time of the track to 0 and the trackPlaying boolean to false
         *  @function stopTrack
         *  @return void
         */
        this.stopTrack = function(){
            m_audio.pause();
            m_audio.currentTime = 0;
            mb_trackPlaying = false;
        };
        
        /**
         *  Removes the attached audio track from the timeline
         *  @function removeTrack
         *  @return void
         */
        this.removeTrack = function(){
            m_audio = null;
        };
            
        /**
         *  Adds the resources that were drag and dropped from the desktop to the Storybuilder in the ResourceManager
         *  @function addDroppedResources
         *  @return void
         */    
        this.addDroppedResources = function(files, resourceClass, type){
            m_resourceManager.addResources(files, resourceClass, type, function(resources, type){
                m_controller.pushResourcesToView(resources, resourceClass);
            }, function(){
                m_controller.notifyResourceLoading(resourceClass);
            });  
        };
        
        /**
         *  Returns the CanvasModel object
         *  @function getCanvas
         *  @return com.Storybuilder.ModelNS.CanvasModel
         */
        this.getCanvas = function(){
            return m_canvas;
        };  
        
        /**
         *  Returns the ResourceManager object
         *  @function getResourceManager
         *  @return com.Storybuilder.ModelNS.ResourceManager
         */
        this.getResourceManager = function(){
            return m_resourceManager;
        };
          
        /**
         *  Checks if a project is opened
         *  @function isProjectOpened
         *  @return boolean
         */  
        this.isProjectOpened = function(){
            return mb_projectOpened;
        };
          
        /**
         *  Builds a new story metadata based on the values passed in the story creation form
         *  @function buildNewStoryData
         *  @param {Object Literal} values - the metadata values
         *  @return void
         */    
        this.buildNewStoryData = function(values){
            var date = new Date();
            var stringDate;
            var day = date.getDate();
            var month = date.getMonth()+1;
            var year = date.getFullYear();
            if(day < 10){
                day = '0'+day;
            }
            if(month < 10){
                month = '0'+month;
            }
            stringDate = day+"/"+month+"/"+year;
                
                
            m_story.setSeriesTitle(values["seriesTitle"]);
            m_story.setEpisodeTitle(values["episodeTitle"]);
            m_story.setEpisodeID(values["episodeID"]);
            m_story.setIssueNumber(values["issueNumber"]);
            m_story.setDate(stringDate);
            m_story.setEpisodeSummary(values["episodeSummary"]);
            m_story.setPublisher(values["publisher"]);
                
            var genres = values["genres"].split(",");
            m_story.setGenres(genres);
                
            m_pages.push(new Page());
            m_currentPage = m_pages[0];
            m_currentPage.setNumber(1);
                
            mb_projectOpened = true;
        };
        
        /**
         *  Returns the page the user is currently working on
         *  @function getCurrentPage
         *  @return com.Storybuilder.ModelNS.Page
         */    
        this.getCurrentPage = function(){
            return m_currentPage;
        };
        
        /**
         *  Sets the page the user wants to work on
         *  @function setCurrentPage
         *  @param {int} number - the page number we want to work on
         *  @return void
         */ 
        this.setCurrentPage = function(number){
            for(var i = 0; i<m_pages.length; i++){
                if(m_pages[i].getNumber() == number){
                    m_currentPage = m_pages[i];
                    return true;
                }
            }
            return false;
        };
        
        /**
         *  Returns all the pages of a story in an array
         *  @function getPages
         *  @return com.Storybuilder.ModelNS.Page []
         */ 
        this.getPages = function(){
            return m_pages;
        };
        
        /**
         *  Adds a new page to a story
         *  @function addNewPage
         *  @return void
         */ 
        this.addNewPage = function(){
            m_pages.push(new Page());
            m_pages[m_pages.length - 1].setNumber(m_pages.length);
            m_currentPage = m_pages[m_pages.length-1];
                
        };
        
        /**
         *  Builds the XML files to be exported for the target device
         *  @function exportProject
         *  @return Object Literal
         */ 
        this.exportProject = function(){
            var files = {
                metaData: XMLGenerator.buildMetaData(that),
                story: XMLGenerator.buildStory(that)
            //resources: XMLGenerator.buildResources(m_resourceManager)
            };
            
            return files;
        };  
        
    }
    
    var _static = {
        /**
         *  Static - Returns the instance of the Model
         *  @function getInstance
         *  @return com.Storybuilder.ModelNS.Model
         */
        getInstance: function(){
            if(instance === undefined){
                instance = new Model();
            }
            
            return instance;
        }
    };
    
    return _static;
})();


