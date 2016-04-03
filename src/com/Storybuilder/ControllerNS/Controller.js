/**
 *  Singleton - 
 *  The Controller class handles the events that the user triggered in the GUI
 *  @class com.Storybuilder.ControllerNS.Controller
 */

var ControllerNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ControllerNS');

ControllerNS.Controller = (function() {
    
    /***************** Retrieve Packages *******************/
    var DOM = com.Storybuilder.ViewNS.DOM,
    Parameters = com.Storybuilder.Application.Parameters,
    MathLib = com.Storybuilder.Utility.MathLib,
    Rect = com.Storybuilder.Utility.Rect,
    ResourceDropStrategy = ControllerNS.ResourceDropStrategy,
    Tools = com.Storybuilder.ViewNS.Tools,
    Dialogs = com.Storybuilder.ViewNS.Dialogs;
    /*******************************************************/
    
    //private
    var instance;
        
    
    function Controller(view, model){
        
        //private
        
        var m_controllerModules = {};
        
        var m_view = view;
        var m_model = model;
        var that = this,
        
        m_resourceDropType = null,
        
        m_dropManualBackgrounds = new ResourceDropStrategy(function(files){
            if(hasValidMIMEType(files, Parameters.resources.image)){        
                m_model.addDroppedResources(files, Parameters.resources.manualBackgrounds, Parameters.resources.image);
            } 
        }),
        
        m_dropAutoLayers = new ResourceDropStrategy(function(files){
            if(hasValidMIMEType(files, Parameters.resources.image)){
                m_model.addDroppedResources(files, Parameters.resources.autoLayers, Parameters.resources.image);
            } 
        }),
        
        m_dropAutoAudio = new ResourceDropStrategy(function(files){
            if(hasValidMIMEType(files, Parameters.resources.audio)){
                m_model.addDroppedResources(files, Parameters.resources.autoAudio, Parameters.resources.audio);
            } 
        }),
        
        m_dropAutoVideo = new ResourceDropStrategy(function(files){
            if(hasValidMIMEType(files, Parameters.resources.video)){
                m_model.addDroppedResources(files, Parameters.resources.autoVideo, Parameters.resources.video);
            } 
        });
        
       
        
        //Not used in this version but further implementation of command pattern would use this array.
        var m_commands = [];
        
        
            
        //public
        
        //The command pattern is used if we plan to further implement specific features such as undo/redo actions
        // Execute method inspired by http://addyosmani.com/resources/essentialjsdesignpatterns/book/
        
        /**
         *  Method that allows to emulate the Command pattern. The requested method is passed as a string.
         *  Additional parameters can be passed and are reinjected in the requested method.
         *  @function execute
         *  @param {String} command - The method we want to call
         *  @return void
         */
        this.execute = function(command){
            return that[command] && that[command].apply( that, [].slice.call(arguments, 1) );
        };
        
        /**
         *  This method switche the type of resource we dropped. It allows to set the current Strategy for resource
         *  dropping.
         *  @function changeResourceDropType
         *  @param {com.Storybuilder.ViewNS.ResourceDropStrategy} rdStrategy - The method we want to call
         *  @return void
         */
        this.changeResourceDropType = function(rdStrategy){
            m_resourceDropType = rdStrategy;
        };
        
        /**
         *  This method returns the strategy for backgrounds dropping
         *  @function getDropManualBackgrounds
         *  @return com.Storybuilder.ViewNS.ResourceDropStrategy
         */
        this.getDropManualBackgrounds = function(){
            return m_dropManualBackgrounds;
        };
        
        /**
         *  This method returns the strategy for layers dropping
         *  @function getDropAutoLayers
         *  @return com.Storybuilder.ViewNS.ResourceDropStrategy
         */
        this.getDropAutoLayers = function(){
            return m_dropAutoLayers;
        };
        
        /**
         *  This method returns the strategy for audio dropping
         *  @function getDropAutoAudio
         *  @return com.Storybuilder.ViewNS.ResourceDropStrategy
         */
        this.getDropAutoAudio = function(){
            return m_dropAutoAudio;
        };
        
        /**
         *  This method returns the strategy for video dropping
         *  @function getDropAutoVideo
         *  @return com.Storybuilder.ViewNS.ResourceDropStrategy
         */
        this.getDropAutoVideo = function(){
            return m_dropAutoVideo;
        };
        
        
        /**
         *  This method called from the view pushes the frames timers to the model
         *  in order to save them and be ready if the project is exported
         *  @function processFramesResized
         *  @return void
         */
        this.processFramesResized = function(framesData){
            m_model.updateFrames(framesData);
        };
        
        /**
         *  This method called from the view pushes the frames coordinates to the model
         *  in order to save them and be ready if the project is exported
         *  @function saveFrameChanges
         *  @return void
         */
        this.saveFrameChanges = function(xValue, yValue, widthValue, heightValue){
            xValue = parseInt(xValue);
            yValue = parseInt(yValue);
            widthValue = parseInt(widthValue);
            heightValue = parseInt(heightValue);
            m_model.updateFrameCoordinates(xValue, yValue, widthValue, heightValue);
            
        };
        
        /**
         *  Method called from the view when the redline is clicked. Calls the model to handle the operation of the latter evend.
         *  @function processRedlineClick
         *  @return void
         */
        this.processRedLineClick = function(el){
            if(m_model.getAudioTrack()){
                var left = parseInt($(el).css('left')),
                time = parseFloat(Math.round(left/2)/10).toFixed(1);
                m_model.setTrackTime(time);
            }
        };
        
        /**
         *  This method forces the view to update the current time
         *  of the Audio when the audio object in the model is updated. This method does not control anything,
         *  it is there to make the bridge between the model and the view
         *  @function pushAudioUpdate
         *  @return void
         */
        this.pushAudioUpdate = function(currentTime){
            m_view.getTimelineView().updateAudioTime(parseFloat(currentTime).toFixed(1));
        };
        
        /**
         *  Handles behaviour when the Play/Pause button is pressed on the Dynamic Timeline
         *  @function processPlayButtonPressed
         *  @return void
         */
        this.processPlayButtonPressed = function(){
            if(m_model.getAudioTrack()){
                if(m_model.isTrackPlaying()){
                    m_model.pauseTrack();
                } else{
                    m_model.playTrack();
                }
            }
        };
        
        /**
         *  Handles behaviour when the Stop button is pressed on the Dynamic Timeline
         *  @function processStopButtonPressed
         *  @return void
         */
        this.processStopButtonPressed = function(){
            if(m_model.getAudioTrack()){
                m_model.stopTrack();
            }
        };
        
        /**
         *  Handles the behaviour of the toggle mode button when it is pressed and switches the canvas from the Page view to the Frame view and vice versa
         *  @function toggleCanvasMode
         *  @return void
         */
        this.toggleCanvasMode = function(){
            m_view.getCanvasView().emptyCanvas();
            var frameMode = m_model.getCanvas().areLayersAllowed();
            var currentFrame;
            if(frameMode){
                //Being in here means we have at least one frame that exists
                m_model.getCanvas().resetZoom();
                m_model.getCanvas().activatePageMode();
                frameMode = false;
                m_view.getPanelView().cleanupLayers();
                m_view.getPanelView().setupPageUI();
                var manualBackground = m_model.getCurrentPage().getManualBackground();
                if(manualBackground){
                    m_view.getCanvasView().updateManualBackground(manualBackground.getImageObject());
                }
                currentFrame = m_model.getCurrentPage().getCurrentFrame();
                m_view.getCanvasView().updateFrameCanvas(frameMode, currentFrame);
            }else{
                if(m_model.getCurrentPage().getCurrentFrame() != null){
                    m_model.getCanvas().resetZoom();
                    m_view.getPanelView().setupFrameUI();
                    m_view.getPanelView().cleanupLayers();
                    m_model.getCanvas().activateFrameMode(m_model.getCurrentPage().getCurrentFrame());
                    frameMode = true;
                    currentFrame = m_model.getCurrentPage().getCurrentFrame();
                    m_view.getCanvasView().updateFrameCanvas(frameMode, currentFrame);
                }
            }
        };
        
        /**
         *  This method parses the data that is given from the view in order to sanitize it and then send it to the model
         *  @function requestNewFrame
         *  @param {int} xValue - The starting X value of the frame on the canvas
         *  @param {int} yValue - The starting Y value of the frame on the canvas
         *  @param {int} widthValue - The starting Width value of the frame on the canvas
         *  @param {int} heightValue - The starting Height value of the frame on the canvas
         *  @param {float} endTime - Holds the end time of the newly requested frame
         *  @param {int} position - Holds the position of the frame on the Dynamic Timeline bar
         *  @return void
         */
        this.requestNewFrame = function(xValue,yValue,widthValue,heightValue, endTime, position){
            //Can not create a frame if wrong values, checkings are done through parseSelectCoordinates when selecting the area
            xValue = parseInt(xValue);
            yValue = parseInt(yValue);
            widthValue = parseInt(widthValue);
            heightValue = parseInt(heightValue);
            var duplicateID = m_model.getCurrentPage().getDuplicateFrameID(xValue,yValue,widthValue,heightValue);
            if(duplicateID >= 0){
                m_view.getDialogsView().openConfirm(Dialogs.confirmDuplicateFrame(duplicateID), function(){
                    m_model.getCurrentPage().addFrame(new Rect(xValue, yValue, widthValue, heightValue), m_model.getCanvas().getDimension(), endTime, position);
                });
            }else{
                m_model.getCurrentPage().addFrame(new Rect(xValue, yValue, widthValue, heightValue), m_model.getCanvas().getDimension(), endTime, position);
            }
            m_view.getTimelineView().updateTimeSpace(m_model.getPages().length, m_model.getCurrentPage().getNumber(), m_model.getCurrentPage().getFrames().length);
        };
        
        /**
         *  Parses and sanitizes the selection area form the canvas in order to be able to update the model with correct values
         *  @function parseSelectCoordinates
         *  @param {int} xValue - The starting X value of the frame on the canvas
         *  @param {int} yValue - The starting Y value of the frame on the canvas
         *  @param {int} widthValue - The starting Width value of the frame on the canvas
         *  @param {int} heightValue - The starting Height value of the frame on the canvas
         *  @return void
         */
        this.parseSelectCoordinates = function(xValue,yValue,widthValue,heightValue){
            if(!isNaN(parseInt(widthValue)) && !isNaN(parseInt(heightValue)) && !isNaN(parseInt(xValue)) && !isNaN(parseInt(yValue))){
                if(widthValue.indexOf(".") == -1 && heightValue.indexOf(".") == -1 && xValue.indexOf(".") == -1 && yValue.indexOf(".") == -1){
                    if(MathLib.isInRange(widthValue,0,100) && MathLib.isInRange(heightValue,0,100) && MathLib.isInRange(xValue,0,100) && MathLib.isInRange(yValue,0,100)){
                        if(widthValue > 0 && heightValue > 0){
                            var x1 = Math.round(parseInt(xValue)*Parameters.canvasDefaultWidth/100);
                            var y1 = Math.round(parseInt(yValue)*Parameters.canvasDefaultHeight/100);
                            var absoluteWidth = Math.round(parseInt(widthValue)*Parameters.canvasDefaultWidth/100);
                            var absoluteHeight = Math.round(parseInt(heightValue)*Parameters.canvasDefaultHeight/100);
                        
                            var x2 = Math.round(x1+absoluteWidth);
                            var y2 = Math.round(y1+absoluteHeight);

                            m_view.getCanvasView().setSelectArea(x1,y1,x2,y2);
                            if(parseInt(widthValue) != 0 && parseInt(heightValue) != 0){
                                $("#createFrameButton").removeAttr("disabled");
                            } else{
                                $("#createFrameButton").attr("disabled","disabled");
                            }
                        
                        }
                    }else{
                        $("#createFrameButton").attr("disabled","disabled");
                        alert("The value must be an integer between 0 and 100");
                    }
                } else{
                    $("#createFrameButton").attr("disabled","disabled");
                    alert("The value can't be decimal. It must be an integer between 0 and 100");
                }    
            } else{
                $("#createFrameButton").attr("disabled","disabled");
                alert("The value must be an integer between 0 and 100");
            }      
        }
        
        /**
         *  This method notifies the view that the Resources have been loaded
         *  @function notifyResourceLoading
         *  @return void
         */
        this.notifyResourceLoading = function(){
            m_view.getResourcesView().displayResourcesLoadingPanel();
        };
        
        /**
         *  Handles layer deletion by updating both the model and the view
         *  @function processLayerDeletion
         *  @param {DOM Element} target - The target is the UI 'X' button from a Layer on which the user has clicked
         *  @return void
         */
        this.processLayerDeletion = function(target){
            var el = $(target).closest(DOM.LI);
            var id = $(el).attr("data-layer");
        };
        
        /**
         *  Handles frame deletion by updating the model
         *  The view is updated through an Observer from this class passed to the canvas
         *  @function processFrameDeletion
         *  @param {DOM Element} target - The target is the UI 'X' button from a Frame on which the user has clicked
         *  @return void
         */
        this.processFrameDeletion = function(target){
            var el = $(target).closest(DOM.LI);
            var id = parseInt($(el).attr("data-frame"));
            if(id >= 0){
                m_model.getCurrentPage().deleteFrame(id);
            } else{
                alert("Corrupted data! The frame's id value is not a number above 0");
            }
        };
        
        /**
         *  Parses the resource that is requested before fetching it in the model and then push the 
         *  data to the view in order to build the correct previewer (image, audio, video)
         *  @function requestPreviewer
         *  @param {AbstractResource} resource - Resource object
         *  @return void
         */
        this.requestPreviewer = function(resource){
            //Feature not present. Refer to the documentation for more info on this.
            var type = $(resource).attr("data-type");
            if(type == Parameters.resources.image){
                m_view.getResourcesView().displayPreview(resource, type);
            } else if(type == Parameters.resources.audio){
                m_view.getResourcesView().displayPreview(resource, type);
            } else if(type == Parameters.resources.video){
                m_view.getResourcesView().displayPreview(resource, type);
            } else{
                alert('The resource type "'+type+'" is not processed by this application!');
            }
        };
        
        /**
         *  Handles the behaviour when the user clicks on a frame that is located in the draggable panel
         *  @function processFrameClick
         *  @param {DOM Element} el - The element on which the user has clicked
         *  @return void
         */
        this.processFrameClick = function(el){
            
            var id = parseInt($(el).closest("li").attr("data-frame"));
            var currentFrame = m_model.getCurrentPage().getCurrentFrame();
            m_model.getCurrentPage().setCurrentFrame(id);
            m_view.getPanelView().deactivateFrames();
            m_view.getPanelView().activateFrame(id);
            var frameMode = m_model.getCanvas().areLayersAllowed();
            m_view.getCanvasView().updateFrameCanvas(frameMode, m_model.getCurrentPage().getCurrentFrame());
            
        };
        
        /**
         *  Handles the behaviour when the user clicks on a layer that is located in the draggable panel
         *  @function processLayerClick
         *  @param {DOM element} el - The element on which the user has clicked
         *  @return void
         */
        this.processLayerClick = function(el){
            var newLayer = $(el).closest(DOM.LI),
            layerId;
            if(!$(el).hasClass("activeLayer")){
                var currentActiveLayer = $(".activeLayer").closest(DOM.LI);
                $(".activeLayer").removeClass("activeLayer");
                if(currentActiveLayer != undefined){
                    $(currentActiveLayer).find(".activeLayer").removeClass("activeLayer");
                    layerId = parseInt($(currentActiveLayer).attr("data-layer"));
                    m_view.getCanvasView().disableLayer(layerId);
                }
                layerId = parseInt($(newLayer).attr("data-layer"));
                m_model.getCurrentPage().getCurrentFrame().setCurrentLayer(layerId);
                var currentLayer = m_model.getCurrentPage().getCurrentFrame().getCurrentLayer();
                m_view.getCanvasView().activateLayer(currentLayer);
                    
                $(el).addClass("activeLayer");
            }
        };
        
        /**
         *  Builds a JavaScript object literal with the layers id and z-index that is then sent in the model to update the current data
         *  @function updateZIndex
         *  @param {Array[com.Storybuilder.ModeNS.Layers]} layers - Array of layer objects
         *  @return void
         */
        this.updateZIndex = function (layers){
            if(layers != null){
                var id,
                zIndex,
                layerArray = [];
                for(var i = 0; i<layers.length; i++){
                    id = layers[i].getId();
                    zIndex = layers[i].getZIndex();
                    layerArray.push({
                        "id":id, 
                        "zIndex":zIndex
                    });
                }
                m_model.getCurrentPage().getCurrentFrame().updateLayers(layerArray);
            }
            
        };
        
        /**
         *  This method parses the behaviour of the layer and then calls a method to update the specific layer in the view
         *  @function processLayerSort
         *  @param {int} layerID - Layer's ID
         *  @param {int} startPosition - Layer's position on te list before the sorting happened
         *  @param {int} endPosition - Layer's position on te list after the sorting happened
         *  @return void
         */
        this.processLayerSort = function(layerID, startPosition, endPosition){
            
            var difference = endPosition - startPosition,
            action;
            if(difference > 0){
                action = "movedown";
            }else{
                action = "moveup";
            }
            m_view.getCanvasView().updateKineticLayer(layerID, Math.abs(difference), action);

        };
        
        /**
         *  This method parses the behaviour of the layer and then calls a method to update the specific layer in the view
         *  @function confirmResourceDeletion
         *  @param {DOM Element} el - Element representing the 'X' button for deleting a resrouce
         *  @return void
         */
        this.confirmResourceDeletion = function(el){
            var image = $(el).closest(".resourceItem").find(DOM.IMAGE);
            var name = $(image).attr("data-name");
            var type = $(image).attr("data-resource");
            m_view.getDialogsView().openConfirm(Dialogs.CONFIRMRESOURCEDELETION(name), function(e){
                m_model.getResourceManager().deleteResource(name,type);
                m_view.getResourcesView().removeResourceFromView(el);
            });
        };
            
        /**
         *  Parses the zoom type and updates the model
         *  @function processZoom
         *  @param {String} type - The type of the zoom
         *  @return boolean
         */    
        this.processZoom = function(type){
            if(type == "zoomin"){
                m_model.getCanvas().zoomIn();
            } else if(type == "zoomout"){
                m_model.getCanvas().zoomOut();
            } else{
                alert("This zoom type does not exist. The programmer should review the source code.");
                return false;
            }
            m_view.getCanvasView().setCanvasZoom(m_model.getCanvas().getZoomValue(), m_model.getCanvas().getDimension());
            return true;
        };
            
        
        /**
         *  Parses the tool type and updates the model with the currently used tool
         *  @function parseToolAction
         *  @param {String} tool - The tool the user clicked on in the UI
         *  @return void
         */   
        this.parseToolAction = function(tool){
            if(!$(tool).hasClass("activeTool") && !$(tool).hasClass("disabled")){
                var toolName = $(tool).attr("data-tool");
                if(toolName == 'cursor'){
                    m_model.getCanvas().setActiveTool(Tools.CURSOR);
                } else if(toolName == 'select'){
                    m_model.getCanvas().setActiveTool(Tools.SELECT);
                } else if(toolName == 'zoomin'){
                    m_model.getCanvas().setActiveTool(Tools.ZOOMIN);
                } else if(toolName == 'zoomout'){
                    m_model.getCanvas().setActiveTool(Tools.ZOOMOUT);
                } else{
                    alert("this tool doesn't exist in the model (yet!)");
                }
                    
                m_view.getPanelView().updateToolView(toolName);
            }
        };
        
        /**
         *  Parses the elements and handles the behaviour when the dragstart event is fired
         *  @function processDragStart
         *  @param {DOM element} el - The dragged element
         *  @param {event} e - The type of event
         *  @return void
         */  
        this.processDragStart = function(el, e) {
            e.dataTransfer = e.originalEvent.dataTransfer;
            //var imageObj = m_model.getResourceManager().getResource($(el).attr("data-name"),$(el).attr("data-resource")).getImageObject();
            
            //e.dataTransfer.setDragImage(imageObj,0,0);
            e.dataTransfer.setData("name", $(el).attr("data-name"));
            e.dataTransfer.setData("src", $(el).attr("data-src"));
            e.dataTransfer.setData("type", $(el).attr("data-type"));
            e.dataTransfer.setData("resource", $(el).attr("data-resource"));
            el.style.opacity = '0.5';
            e.dataTransfer.effectAllowed = 'move';
        };
            
        /**
         *  Parses the elements and handles the behaviour when the dragover event is fired
         *  @function processDragOver
         *  @param {DOM element} el - The dragged element
         *  @param {event} e - The type of event
         *  @return void
         */      
        this.processDragOver = function(el, e){
            e.dataTransfer = e.originalEvent.dataTransfer;
            if (!e){
                e = window.event;
            }
            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

            return false;
        };
            
        /**
         *  Parses the elements and handles the behaviour when the dragenter event is fired
         *  @function processDragEnter
         *  @param {DOM element} el - The dragged element
         *  @param {event} e - The type of event
         *  @return void
         */      
        this.processDragEnter = function(el, e) {
            if($(el).hasClass("resourceListContainer")){
                $(el).addClass("dragOver");
            }
        }
        
        /**
         *  Parses the elements and handles the behaviour when the dragleave event is fired
         *  @function processDragLeave
         *  @param {DOM element} el - The dragged element
         *  @param {event} e - The type of event
         *  @return void
         */  
        this.processDragLeave = function(el, e) {
            if($(el).hasClass("resourceListContainer")){
                if($(el).hasClass("dragOver")){
                    $(el).removeClass("dragOver");
                }
            }
        }
        
        /**
         *  Parses the elements and handles the behaviour when the drop event is fired
         *  @function processDrop
         *  @param {DOM element} el - The dragged element
         *  @param {event} e - The type of event
         *  @return void
         */  
        this.processDrop = function(el, e) {
            
            e.dataTransfer = e.originalEvent.dataTransfer;
            e.preventDefault();
            if (e.stopPropagation) {
                e.stopPropagation(); // stops the browser from redirecting.
            }
            
            var dataName,
            dataType,
            dataResource,
            resource;
                
            if($(el).hasClass("dropArea")){
                var id = $(el).attr("id");
                if(id === 'canvasDropArea'){
                    dataName = e.dataTransfer.getData("name");
                    dataType = e.dataTransfer.getData("type");
                    dataResource = e.dataTransfer.getData("resource");
                    if(dataType === 'image'){
                        if(dataResource == "manualBackgrounds"){
                            m_model.getCurrentPage().setManualBackground(m_model.getResourceManager().getResource(dataName,dataResource));
                            var pageNumber = m_model.getCurrentPage().getNumber();
                            m_view.getCanvasView().updateManualBackground(m_model.getCurrentPage().getManualBackground().getImageObject(), pageNumber);
                        } else if(dataResource == "autoLayers"){
                            if(m_model.getCanvas().areLayersAllowed()){
                                resource = m_model.getResourceManager().getResource(dataName, dataResource);
                                m_model.getCurrentPage().getCurrentFrame().addLayer(resource);
                                var layers = m_model.getCurrentPage().getCurrentFrame().getLayers();
                                m_view.getCanvasView().addLayer(layers[layers.length-1]);
                            }else{
                                alert("The current story viewer (page view) does not accept layers. You can add layers on frames when switching on the frame view");
                            }
                            
                        }
                    } else{
                        alert("This resource type can not be added in the Canvas!");
                    }
                } else if(id === 'bottom'){
                    dataName = e.dataTransfer.getData("name");
                    dataType = e.dataTransfer.getData("type");
                    dataResource = e.dataTransfer.getData("resource");
                    if(dataType === 'audio'){
                        if(dataResource == "autoAudio"){
                            var audioTrack = m_model.getAudioTrack();
                            var tempAudio = new Audio();
                            resource = m_model.getResourceManager().getResource(dataName,dataResource);
                            if(resource){
                                //if(tempAudio.canPlayType(resource.getMIMEType()) == ''){
                                if(audioTrack == null){
                                    m_model.setAudioTrack(resource);
                                    m_view.getTimelineView().triggerAutoTabClick();
                                    m_view.getTimelineView().updateTrackInfo(resource.getName(), parseFloat(resource.getDuration()).toFixed(1));
                                } else{
                                    m_view.getDialogsView().openConfirm(Dialogs.confirmExistingAudio(m_model.getTrackName()), function(){
                                        m_model.setAudioTrack(resource);
                                        m_view.getTimelineView().triggerAutoTabClick();
                                        m_view.getTimelineView().updateTrackInfo(resource.getName(), parseFloat(resource.getDuration()).toFixed(1));
                                    });
                                }
                            /*} else{
                                    alert("This audio file type is not supported in this browser");
                                }*/
                            } else{
                                alert("Critical error: This resource does not exist!");
                            }
                            
                            
                        }
                    }
                //handle audio and video dropping
                } else{
                    if($(el).hasClass("resourceListContainer")){
                        if($(el).hasClass("dragOver")){
                            $(el).removeClass("dragOver");
                        }
                        if(e.dataTransfer.files.length > 0){
                            var files = e.dataTransfer.files;
                            m_resourceDropType.execute(files);
                        }
                    
                        
                    }
                }
                
            }

            // See the section on the DataTransfer object.

            return false;
        }
        
        /**
         *  Retrieves the data of the resource on which the user hovered on with his mouse, retrieves the resource
         *  from the model and displays the info in the view
         *  @function processMouseEnterResource
         *  @param {DOM element} el - The hovered element
         *  @param {event} e - The type of event
         *  @return void
         */  
        this.processMouseEnterResource = function(el, e){
            if($("#resourceInfoBox").length == 0){
                var resourceInfo = m_model.getResourceManager().getResourceInfo(el);
                var x = e.pageX,
                y = e.pageY;
                m_view.getResourcesView().displayResourceInfoBox(resourceInfo, x, y);
            }
        };
        
        /**
         *  Handles the behaviour of the cursor when it hovers a resource 
         *  @function processMouseMoveResource
         *  @param {DOM element} el - The hovered element
         *  @param {event} e - The type of event
         *  @return void
         */  
        this.processMouseMoveResource = function(el, e){
            if($("#resourceInfoBox").length > 0){
                var x = e.pageX,
                y = e.pageY;
                m_view.getResourcesView().updateResourceInfoBoxPosition(x,y);
            }
        };
       
        /**
         *  Parses the resources type before pushing the resources in the correct UI area
         *  @function pushResourcesToView
         *  @param {com.Storybuilder.ModelNS.AbstractResource []} resources - Resources array
         *  @param {String} target - The type of the resources
         *  @return void
         */ 
        this.pushResourcesToView = function(resources, target){
            if($("#resourceLoader").length > 0){
                $("#resourceLoader").remove();
            }
            var type;
            if(target == Parameters.resources.manualBackgrounds){
                type = "image";
            } else if(target == Parameters.resources.autoLayers){
                type = "image";
            } else if(target == Parameters.resources.autoAudio){
                type = "audio";
            } else if(target == Parameters.resources.autoVideo){
                type = "video";
            } else if(target == Parameters.resources.autoAnimation){
                type = "image";
            }
            m_view.getResourcesView().addResources(resources, type, target);
        }
        
        /**
         *  Checks if a list of files belongs to a category of MIME types
         *  @function hasValidMIMEType
         *  @param {File []} fileList - The list of files
         *  @param {String} fileType - The type of file we want to check
         *  @return boolean
         */ 
        function hasValidMIMEType(fileList, fileType){
            var file;
            for(var i = 0; i <fileList.length; i++){
                file = fileList[i];
                if(fileType == "image"){
                    if(file.type != "image/png" && file.type != "image/jpeg"){
                        alert("The file format "+file.type+" is not accepted by this resource type");
                        return false;
                    }
                } else if(fileType == "audio"){
                    //Removed voluntarily wav format because of too large file size. All the major browsers support either mp3 or ogg.
                    if(file.type != "audio/mp3" &&file.type != "audio/mpeg" && file.type != "video/ogg" && file.type != "audio/ogg" && file.type != "application/ogg"){
                        alert("The file format "+file.type+" is not accepted by this resource type");
                        return false;
                    }
                } else if(fileType == "video"){
                    if(file.type != "video/mp4" && file.type != "video/ogg"){
                        alert("The file format "+file.type+" is not accepted by this resource type");
                        return false;
                    }
                }
            }
            return true;
        }
        
        /**
         *  Handles the dragend event
         *  @function processDragEnd
         *  @param {DOM element} el - The hovered element
         *  @param {event} e - The type of event
         *  @return void
         */ 
        this.processDragEnd = function(el, e) {
            el.style.opacity = '1';
            // this/e.target is the source node.
                
            m_view.getResourcesView().resetDraggableResources();
        }
        
        /**
         *  Generic function to cancel the default behaviour of an event
         *  @function cancel
         *  @param {event} e - The type of event
         *  @return void
         */ 
        this.cancel = function(e) {
            if (!e){
                e = window.event;
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            return false;
        }
            
        //General handlers
        
        /**
         *  Checks if a project is opened
         *  @function projectOpened
         *  @return boolean
         */ 
        this.projectOpened = function(){
            return m_model.isProjectOpened();
        };
        
        /**
         *  Calls the view method set a new size for the canvas
         *  This method is used when toggling from the page mode to the frame mode and vice versa
         *  @function pushCanvasSize
         *  @param {int} w - The new width of the canvas
         *  @param {int} h - The new height of the canvas
         *  @return void
         */ 
        this.pushCanvasSize = function(w,h){
            m_view.getCanvasView().updateStageSize(w,h);
        };
        
        /**
         *  Initiates observers and other starting values that we need for testing purposes
         *  @function init
         *  @return void
         */ 
        this.init = function(){
                
            //following lines for testing purposes
            /*var values = {
                "seriesTitle":"Bearlands",
                "episodeTitle":"Bears and Zombies",
                "episodeID":1,
                "issueNumber":1,
                "episodeSummary":"This is the summary",
                "publisher":"4dio",
                "genres":"Zombies,Bears,Swords"
            };*/
            
            //m_model.buildNewStoryData(values);
            //m_view.initWorkspace();
                
            //Attach observers to the model   
            m_model.getCanvas().addObserver(function(data){
                if(data.canvasWidth != undefined && data.canvasHeight != undefined){
                    that.pushCanvasSize(data.canvasWidth,data.canvasHeight);
                }
            });
            
            
            
                
                
 
        };
            
        
        /**
         *  Parses the menu that was pressed by the user and calls the appropriate set of methods
         *  @function parseMenuAction
         *  @param {int} action - The action code
         *  @return void
         */ 
        this.parseMenuAction = function(action){
            //Could use enum instead of an int
            switch(action){
                case 1:
                    //Create new project
                    m_view.getDialogsView().openDialog(Dialogs.NEWSTORY());
                    m_view.getDialogsView().clearFields($("#newStoryForm"));
                    break;
                case 2:
                    if(m_model.getCanvas().areLayersAllowed()){
                        that.toggleCanvasMode();
                    }
                    m_model.addNewPage();
                    var lastNumber = m_model.getCurrentPage().getNumber();
                    addPageObservers();
                    m_view.getPanelView().emptyThumbnails();
                    m_view.getTimelineView().addPageThumbnail(lastNumber);
                    m_view.getTimelineView().updateTimeSpace(m_model.getPages().length, lastNumber, m_model.getCurrentPage().getFrames().length);
                    m_view.getCanvasView().updatePageCanvas(m_model.getCurrentPage());
                    m_view.getCanvasView().releaseSelection();
                    //Create a new page
                    break;
                case 3:
                    //Open a project
                    m_view.getDialogsView().openDialog(Dialogs.OPENSTORY);
                    break;
                case 4:
                    //Save project
                    break;
                case 5:
                    //Export project
                    var files = m_model.exportProject();
                    m_view.download(files.metaData);
                    m_view.download(files.story);
                    break;
                case 6:
                    //Undo
                    break;
                case 7:
                    //Redo
                    break;
                case 8:
                    //Edit Metadata
                    break;
                case 9:
                    //Help
                    break;
                case 10:
                    //About
                    break;
                default:
                    alert("Error: no such menu");
            }
        };
            
        //Form handlers
        
        /**
         *  Method allowing the application to parse forms that are submitted
         *  @function processForm
         *  @param {DOM element} form - The submitted form
         *  @return void
         */ 
        this.processForm = function(form){
            if(this.checkForm(form)){
                if($(form).attr("id") == "newStoryForm"){
                    m_view.initWorkspace();
                    var values = {};
                    $.each($(form).serializeArray(), function(i, field) {
                        values[field.name] = field.value;
                    });
                    m_model.buildNewStoryData(values);
                    $("#wrapper").remove();
                        
                    //enable menus - edit this array to enable menus
                    var menusEnabled = [2,4,5,8];
                    m_view.getMenuView().enableMenus(menusEnabled);
                    addPageObservers();
                }
                
            }
            
        };
        
        /**
         *  Abstract method checking if an input is valid in a form based on its data-attributes
         *  @function checkForm
         *  @param {DOM element} form - The submitted form
         *  @param {DOM element} el - The input field that was modified
         *  @return boolean
         */ 
        this.checkForm = function(form, el){
            var isValidForm = true;
                
            if(arguments.length == 2){
                //check modified element
                var elValue = $(el).val().trim();
                if(elValue.length > 0){
                    if($(el).attr("data-type")){
                        var dataType = $(el).attr("data-type");
                        if(dataType == "integer"){
                            if(elValue.indexOf(".") == -1){
                                elValue = parseInt(elValue);
                                if(elValue >= 0){
                                    m_view.getDialogsView().hideErrorMessage(el);
                                } else{
                                    m_view.getDialogsView().displayErrorMessage(el);
                                }
                            } else{
                                m_view.getDialogsView().displayErrorMessage(el);
                            }
                        } //else... can add more data-types
                    }
                } else{
                    m_view.getDialogsView().hideErrorMessage(el);
                }
            }
                
            //check form in general
            $.each($(form+'[data-mandatory="true"]'), function(i, field) {
                var value = $(field).val();
                if(value.length > 0){
                    if($(field).attr("data-type")){
                        var dataType = $(el).attr("data-type");
                        if(dataType == "integer"){
                            if(value.indexOf(".") == -1){
                                value = parseInt(value);
                                if(value >= 0){
                                //do nothing
                                } else{
                                    m_view.getDialogsView().disableForm(form);
                                    isValidForm = false;
                                    return;
                                }
                            } else{
                                m_view.getDialogsView().disableForm(form);
                                isValidForm = false;
                                return;
                            }
                        } //else... can add more data-types
                    }
                } else{
                    m_view.getDialogsView().disableForm(form);
                    isValidForm = false;
                    return;
                }
                    
            }); 
            if(isValidForm){
                m_view.getDialogsView().enableForm(form);
            }
            return isValidForm;
                
        };
        
        /**
         *  Handles the behaviour of the application when a page thumbnail is clicked on
         *  @function processManualTimelineClick
         *  @param {DOM element} el - The page thumbnail that was clicked by the user
         *  @return void
         */ 
        this.processManualTimelineClick = function(el){
            var pageID = $(el).attr("data-page");
            pageID = parseInt(pageID);
            if(pageID !== m_model.getCurrentPage().getNumber()){
                if(m_model.getCanvas().areLayersAllowed()){
                    that.toggleCanvasMode();
                }
                m_model.setCurrentPage(pageID);
                m_model.getCurrentPage().setCurrentFrame(null);
                m_view.getCanvasView().releaseSelection();
                m_view.getTimelineView().setCurrentPage(pageID);
                m_view.getTimelineView().updateTimeSpace(m_model.getPages().length, m_model.getCurrentPage().getNumber(), m_model.getCurrentPage().getFrames().length);
                m_view.getCanvasView().updatePageCanvas(m_model.getCurrentPage());
                m_view.getPanelView().emptyThumbnails();
                m_view.getPanelView().loadFrames(m_model.getCurrentPage().getFrames(), m_model.getCurrentPage().getNumber());    
            }
        };
        
        function addPageObservers(){
            m_model.getCurrentPage().addObserver(function(data){
                if(data.frameID != undefined && data.frameRect != undefined && data.frameEnd != undefined && data.framePosition != undefined){
                    var id = data.frameID;
                    m_view.getPanelView().addFrameThumbnail(id, m_model.getCurrentPage().getNumber());
                    m_view.getPanelView().enableActiveFrameButtons();
                    m_view.getPanelView().activateFrame(id);
                    var startTime = data.frameEnd,
                    duration = Parameters.defaultFrameDuration,
                    endTime = startTime + Parameters.defaultFrameDuration,
                    position = data.framePosition;
                    
                    m_view.getTimelineView().addTimelineFrame(id, m_model.getCurrentPage().getNumber(), startTime, duration, endTime, position);
                } 
            });
            m_model.getCurrentPage().addObserver(function(data){
                if(data.currentFrameDeleted != undefined && data.frameID != undefined){
                    if(data.currentFrameDeleted == true){
                        m_view.getPanelView().deactivateFrames();
                        if(m_model.getCanvas().areLayersAllowed()){
                            m_model.getCanvas().activatePageMode();
                            m_view.getCanvasView().updateManualBackground(m_model.getCurrentPage().getManualBackground().getImageObject());
                        //Frame mode
                        //unset selectedframe in view
                        //remove the frame from the ui list
                        //switch canvasmode/size
                        }else{
                            m_view.getCanvasView().releaseSelection();
                            
                        //Page mode
                        //remove the frame from the ui list
                        }
                    } else{
                        
                    }
                    m_view.getPanelView().deleteFrameThumbnail(data.frameID);
                    m_view.getTimelineView().deleteTimelineFrame(data.frameID, m_model.getCurrentPage().getNumber());
                //TODO
                }
            });
        }
            
            

        
    }
    
    //The static part of the singleton classes were inspired from http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript
    var _static = {
        /**
        *  Static - Returns the instance of the Controller
        *  @function getInstance
        *  @return com.Storybuilder.ControllerNS.Controller
        */
        getInstance: function(view, model){
            if(instance === undefined){
                instance = new Controller(view, model);
                    
            }
            return instance;
        }
    };
    
    return _static;
        
})();
