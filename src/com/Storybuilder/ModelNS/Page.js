/**
 *  The Page class contains all the data for a page of a story. It includes its background image and the list of frames created in it.
 *  @class com.Storybuilder.ModelNS.Page
 */

var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

ModelNS.Page = function(){
    
    /***************** Retrieve Packages *******************/
    var Rect = com.Storybuilder.Utility.Rect,
    Observable = ModelNS.Observable,
    Frame = ModelNS.Frame,
    MathLib = com.Storybuilder.Utility.MathLib;
    /*******************************************************/
    
    var that = this;
    
    Observable.isImplementedBy(this);
    
    var coordinates = {
      
        originX: 0,
        originY: 0,
        maxWidth: 100,
        maxHeight: 100
      
    };
        
    var m_manualBackground, 
    m_src, 
    m_number, 
    m_frames = [],
    m_nextFrameID = 1;
    
    var m_currentFrame = null;
    
    
    //Public Methods
    
    /**
     *  Checks whether a frame with the passed coordinates already exists in the page
     *  @function getDuplicateFrameID
     *  @param {int} x - frame's x
     *  @param {int} y - frame's y
     *  @param {int} w - frame's width
     *  @param {int} h - frame's height
     *  @return boolean
     */ 
    this.getDuplicateFrameID = function(x,y,w,h){
        var terms = [
        x,
        y,
        w,
        h
        ],
        functions = [
        "getX",
        "getY",
        "getWidth",
        "getHeight"
        ];
        var o = MathLib.findObjectByMultiMembers(terms, m_frames, functions);
        if(o == null){
            return -1;
        }
        return o.getID();
    };
    
    /**
     *  Returns the frame the user is currently working on
     *  @function getCurrentFrame
     *  @return com.Storybuilder.ModelNS.Frame
     */ 
    this.getCurrentFrame = function(){
        return m_currentFrame;
    };
    
    /**
     *  Returns the ImageResource attached to the page
     *  @function getManualBackground
     *  @return com.Storybuilder.ModelNS.ImageResources
     */ 
    this.getManualBackground = function(){
        return m_manualBackground;
    };
    
    /**
     *  Returns an array of the frames contained in the page
     *  @function getFrames
     *  @return com.Storybuilder.ModelNS.Frame []
     */ 
    this.getFrames = function(){
        return m_frames;
    };

    /**
     *  Sets the ImageResource for the page
     *  @function setManualBackground
     *  @param {com.Storybuilder.ModelNS.ImageResource} resource - ImageResource reference
     *  @return void
     */ 
    this.setManualBackground = function(resource){
        m_manualBackground = resource;
    };
    
    /**
     *  Adds a frame to the page
     *  @function addFrame
     *  @param {com.Storybuilder.Utility.Rect} rect - Rect class holding the frame's coordinates (relative to the page size)
     *  @param {Object Literal} canvasDim - holds the dimension of the canvas
     *  @param {float} endTime - end time of the frame in the timeline
     *  @param {int} position - The position of the frame in the timeline
     *  @return void
     */ 
    this.addFrame = function(rect, canvasDim, endTime, position){
        var canvasW = canvasDim.w,
        canvasH = canvasDim.h,
        selectW = rect.getWidth(),
        selectH = rect.getHeight();
        
        var absoluteWidth = Math.round((selectW/100)*canvasW),
        absoluteHeight = Math.round((selectH/100)*canvasH);
        
        var id = m_nextFrameID;
        m_nextFrameID++;
        m_frames.push(new Frame(id, new Rect(rect.getX(), rect.getY(), rect.getWidth(), rect.getHeight()), absoluteWidth, absoluteHeight, endTime));
        m_currentFrame = m_frames[m_frames.length-1];
        
        that.notifyObservers({
            frameID: id,
            frameRect: rect,
            frameEnd: endTime,
            framePosition: position
        });
    };
    
    /**
     *  Deletes a frame attached to the page
     *  @function deleteFrame
     *  @param {int} id - the frame's id
     *  @return void
     */ 
    this.deleteFrame = function(id){
        var index = MathLib.findIndexFromMember(id, m_frames, "getID");
        var currentFrameDeleted = false;
        if(m_currentFrame != null){
            if(m_frames[index].getID() == m_currentFrame.getID()){
                m_currentFrame = null;
                currentFrameDeleted = true;
            }
        }
        MathLib.removeElementFromArray(index, m_frames);
        that.notifyObservers({
            currentFrameDeleted: currentFrameDeleted,
            frameID: id
        });
    };
      
    /**
     *  Sets the URI source of the image attached to the page
     *  @function setSrc
     *  @param {String} src - the source of the image
     *  @return void
     */
    this.setSrc = function(src){
        m_src = src;
    };
    
    /**
     *  Sets the page number
     *  @function setNumber
     *  @param {int} number - The number of the page
     *  @return void
     */    
    this.setNumber = function(number){
        m_number = number;
    };
      
    /**
     *  Replaces all the frames attached to a page by a new array of frames
     *  @function setFrames
     *  @param {com.Storybuilder.ModelNS.Frame []} number - The number of the page
     *  @return void
     */      
    this.setFrames = function(frames){
        m_frames = frames;
    };
     
    /**
     *  Returns the URI of the image attached to the page
     *  @function getSrc
     *  @return String
     */ 
    this.getSrc = function(){
        return m_src;
    };
    
    /**
     *  Returns the number of the page
     *  @function getNumber
     *  @return int
     */     
    this.getNumber = function(){
        return m_number;
    };
    
    /**
     *  Sets the frame the user is currently working on
     *  @function setCurrentFrame
     *  @param {int} id - the frame's id
     *  @return void
     */ 
    this.setCurrentFrame = function(id){
        var frame = MathLib.findObjectByMember(id, m_frames, "getID");
        if(frame != null){
            m_currentFrame = frame;
        }
    };
        
}