/**
 *  Contains an API for managing the HTML5 Canvas element in the Storybuilder
 *  @class com.Storybuilder.ViewNS.CanvasModule
 *  @extends com.Storybuilder.ViewNS.AbstractViewModule
 */

var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.CanvasModule = function(modulesRoot, controller){
    
    ViewNS.AbstractViewModule.apply(this, arguments);
    
    /***************** Retrieve Packages *******************/
    var Tools = ViewNS.Tools;
    /*******************************************************/
    
    /***************** Emulate Protected Variables *******************/
    var Action = this.getAction(),
    DOM = this.getDOM(),
    ViewClasses = this.getViewClasses(),
    Parameters = this.getParameters(),
    m_controller = this.getController(),
    m_modulesRoot = this.getModulesRoot();
    /*****************************************************************/
    
    var that = this;
    
    var m_stage,
    m_layer,
    m_canvasLayers = [],
    m_manualBackground;
    
    var m_jcrop;
    
    //Public Methods
    
    //This method is exceptionally included here while using the slider to prevent doing too much processing from going to the controller
    //and back to the view. When the user is done sliding, the controller is notified of the new values
    function getCanvasLayer(id){
        var o;
        for(var i = 0; i<m_canvasLayers.length; i++){
            o = m_canvasLayers[i];
            if(o.getId() == id){
                return o;
            }
        }
        return null;
    }
    
    
    this.setLayerOpacity = function(id, value){
        var layer = getCanvasLayer(id);
        if(layer){
            layer.setOpacity(value/100);
            draw();
        }
    };
    
    this.setLayerScaling = function(id, value){
        var layer = getCanvasLayer(id);
        if(layer){
            layer.setScale(value/100);
            draw();
        }
    };
    
    this.setLayerRotation = function(id, value){
        
    };
    
    
    /**
     *  Updates the canvas by either displaying the frame in the frame view or by showing the frame's select area in the page view
     *  @function updateFrameCanvas
     *  @param {boolean} frameMode - identifies if we are currently in the frame mode
     *  @param {com.Storybuilder.ModelNS.Frame} frame - the frame we want to display
     *  @return void
     */
    this.updateFrameCanvas = function(frameMode, frame){
        if(frameMode){
            $('.tool a[data-tool="cursor"]').trigger(Action.CLICK);
            $('.tool a[data-tool="select"]').addClass("disabled");
        } else{
            var x1 = Math.round((frame.getX()/100)*Parameters.canvasDefaultWidth),
            y1 = Math.round((frame.getY()/100)*Parameters.canvasDefaultHeight),
            x2 = x1+Math.round((frame.getWidth()/100)*Parameters.canvasDefaultWidth),
            y2 = y1+Math.round((frame.getHeight()/100)*Parameters.canvasDefaultHeight);
            $('.tool a[data-tool="select"]').removeClass("disabled");
            $('.tool a[data-tool="select"]').trigger(Action.CLICK);
            m_jcrop.setSelect([x1,y1,x2,y2]);
        }
    };
    
    
    /**
     *  Removes every element on the canvas
     *  @function emptyCanvas
     *  @return void
     */
    this.emptyCanvas = function(){
        m_stage.clear();
        m_layer.remove(m_manualBackground);
        for(var i = 0; i<m_canvasLayers.length; i++){
            m_layer.remove(m_canvasLayers[i]);
        }
        m_manualBackground = null;
        m_canvasLayers = [];
        draw();
        
        
    };
    
    /**
     *  Releases the selection area made on the canvas
     *  @function releaseSelection
     *  @return void
     */
    this.releaseSelection = function(){
        m_jcrop.release();
    };
    
    /**
     *  Initiates the listeners attached to the canvas element
     *  @function initListeners
     *  @return void
     */
    this.initListeners = function(){
        
        m_stage = new Kinetic.Stage({
            container: "canvasArea",
            width: Parameters.canvasDefaultWidth,
            height: Parameters.canvasDefaultHeight
        });   
        m_layer = new Kinetic.Layer();
        m_stage.add(m_layer);
        
        $("#deposit").click(function(e){
            e.stopPropagation();
        });
                
        $("#zoomArea").click(function(e){
            e.stopPropagation();
            var zoomType = $(this).attr("data-zoom");
            m_controller.execute("processZoom", zoomType);
        });
            
            

        $('#selectArea').append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .attr("id","selectAreaDynamic"));

        $('#selectAreaDynamic').Jcrop({
            bgColor: 'black',
            bgOpacity:   .4,
            onSelect: getSelectCoordinates,
            onChange: getSelectCoordinates
        },function(){
            m_jcrop = this;
        });
        
    };
    
    /**
     *  Updates the canvas UI based on the zoom value stored in the model
     *  @function setCanvasZoom
     *  @param {int} zoomValue - the zoom value
     *  @param {Object Literal} canvasDimension - the dimension of the canvas
     *  @return void
     */
    this.setCanvasZoom = function(zoomValue, canvasDimension){
        zoomValue /= 100;
        var newX = Math.round(canvasDimension.w*zoomValue),
        newY = Math.round(canvasDimension.h*zoomValue);
        resetDynamicSelectArea(newX,newY);
        m_stage.setScale(zoomValue, zoomValue);
        m_stage.setSize(newX,newY);
        m_stage.draw();
            
        $("#selectArea").width(newX);
        $("#selectArea").height(newY);
        $("#canvasArea").width(newX);
        $("#canvasArea").height(newY);
        $("#canvasDropArea").width(newX);
        $("#canvasDropArea").height(newY);
        $("#canvasContainer").width(newX);
        $("#canvasContainer").height(newY);
        $("#zoomArea").width(newX);
        $("#zoomArea").height(newY);
        $("#canvasArea").width(newX);
        $("#canvasArea").height(newY);
    };
    
    /**
     *  Programatically sets a select area on the canvas
     *  @function setSelectArea
     *  @param {int} x1 - top left x value
     *  @param {int} y1 - top left y value
     *  @param {int} x2 - bottom right x value
     *  @param {int} y2 - bottom right y value
     *  @return void
     */
    this.setSelectArea = function(x1,y1,x2,y2){
        m_jcrop.setSelect([x1,y1,x2,y2]);
    };
    
    //This method switches z-index of the various panels around the canvas
    //Different events are triggered when the user interacts with the divs
    
    /**
     *  Updates the canvas and its containers based on the tool the user decided to apply
     *  @function updateCanvasArea
     *  @param {String} tool - the selected tool
     *  @return void
     */
    this.updateCanvasArea = function(tool){
        //the selection div has a z-index of 180 points and stays as is
        if(tool == 'cursor'){
            $("canvas").css("z-index","300");
            $("#zoomArea").css("z-index","1");
            m_jcrop.disable();
            m_jcrop.release();
            $("#cursorInfo").css("display","block");
            $("#selectInfo").css("display","none");
            $("#zoomInfo").css("display","none");
        } else if(tool == 'select'){
            $("canvas").css("z-index","200");
            $("#zoomArea").css("z-index","-1");
            m_jcrop.enable();
            m_jcrop.release();                    
            $("#cursorInfo").css("display","none");
            $("#selectInfo").css("display","block");
            $("#zoomInfo").css("display","none");
        }
        else if(tool == 'zoomin'){
            $("#zoomArea").css("z-index","301");
            $("#zoomArea").attr("data-zoom","zoomin");
            m_jcrop.disable();
            m_jcrop.release();
            $("#cursorInfo").css("display","none");
            $("#selectInfo").css("display","none");
            $("#zoomInfo").css("display","block");
        } else if(tool == 'zoomout'){
            $("#zoomArea").css("z-index","301");
            $("#zoomArea").attr("data-zoom","zoomout");
            m_jcrop.disable();
            m_jcrop.release();
            $("#cursorInfo").css("display","none");
            $("#selectInfo").css("display","none");
            $("#zoomInfo").css("display","block");
        } else{
            alert("This cursor does not exist (yet!)")
        }
    };
    
    /**
     *  Sets the cursor type according to the active tool
     *  @function setCursor
     *  @param {String} cursor - the cursor type
     *  @return void
     */
    this.setCursor = function(cursor){
        if(cursor == 'cursor'){
            $("#right").css("cursor","default");
        } else if(cursor == 'select'){
            $("#right").css("cursor","crosshair");
        } else if(cursor == 'zoomin'){
            $("#right").css("cursor","-moz-zoom-in");
            $("#zoomArea").css("cursor","-moz-zoom-in");
        } else if(cursor == 'zoomout'){
            $("#right").css("cursor","-moz-zoom-out");
            $("#zoomArea").css("cursor","-moz-zoom-out");
        } else{
            alert("This cursor does not exist (yet!)")
        }
    };
    
    /**
     *  Sets an image of the full page of a story in the canvas
     *  @function updateManualBackground
     *  @param {Image} imageObj - the target image
     *  @param {int} pageNumber - the page number we want this image to be on
     *  @return void
     */
    this.updateManualBackground = function(imageObj, pageNumber){
        if(imageObj != null){
            if(m_manualBackground == null){
                m_manualBackground = new Kinetic.Image({
                    x: 0,
                    y: 0,
                    image: imageObj,
                    width: m_stage.getWidth(),
                    height: m_stage.getHeight(),
                    draggable: false
                });
                //ALWAYS ADD TO LAYER BEFORE SETTING Z-INDEX
                m_layer.add(m_manualBackground);

            } else{
                m_manualBackground.setImage(imageObj);
            }
            if(pageNumber){
                $('a[data-page="'+pageNumber+'"] .pageThumbnail').attr("src",imageObj.src);
            }
            //$("#manualBackgroundLayer img").attr("src",imageObj.src);
            draw();

        } else{
            if(m_manualBackground != null){
                m_layer.remove(m_manualBackground);
                m_manualBackground = null;
                draw();
            }
        }
            
    };
    
    /**
     *  When in frame mode, this method adds a layer (image) on the canvas at the top of the layer stack (highest Z index)
     *  @function addLayer
     *  @param {com.Storybuilder.ModelNS.Layer} layer - the Layer object we want to add
     *  @return void
     */
    this.addLayer = function(layer){
        var imageObj = new Image();
        imageObj.onload = function(){
            m_canvasLayers.push(new Kinetic.Image({
                id: layer.getID(),
                x: 0,
                y: 0,
                image: imageObj,
                width: layer.getOriginalWidth(),
                height: layer.getOriginalHeight(),
                draggable: false,
                listening: false
            /*dragBounds: {
                        top: 0,
                        left: 0,
                        right: 640,
                        bottom: 0
                    }*/
            }));
            var length = m_canvasLayers.length;
            m_layer.add(m_canvasLayers[length-1]);
            draw();
            m_modulesRoot.panel.addLayerThumbnail(layer);
            prepareLayerUpdate();
                
                
        };
            
        imageObj.src = layer.getImageSource();
    };
    
    /**
     *  Deletes a layer from the canvas
     *  @function deleteLayer
     *  @param {int} id - the id of the layer we want to remove
     *  @return void
     */
    this.deleteLayer = function(id){
            
    };
    
    /**
     *  Sets new values for the dimension of the canvas
     *  @function updateStageSize
     *  @param {int} width - the new stage width
     *  @param {int} height - the new stage height
     *  @return void
     */    
    this.updateStageSize = function(width, height){
        m_stage.setSize(width,height);
        updateStageContainers(width,height);
    };
    
    /**
     *  Prevents a user from dragging a layer on the canvas. This method is called when another layer is being activated. It prevents
     *  events from overlapping and causing incorrect behaviour
     *  @function disableLayer
     *  @param {int} layerID - the id of the layer we want to disable
     *  @return void
     */
    this.disableLayer = function(layerID){
        var object;
        for(var i = 0; i<m_canvasLayers.length; i++){
            object = m_canvasLayers[i];
            if(object.getId() == layerID){
                m_canvasLayers[i].setDraggable(false);
                m_canvasLayers[i].setListening(false);
            }
        }
    };
    
    /**
     *  Enables a user to drag a layer around the canvas
     *  @function activateLayer
     *  @param {com.Storybuilder.ModelNS.Layer} layer - the layer we want to activate
     *  @return void
     */
    this.activateLayer = function(layer){
        var object;
        for(var i = 0; i<m_canvasLayers.length; i++){
            object = m_canvasLayers[i];
            if(object.getId() == layer.getID()){
                m_canvasLayers[i].setDraggable(true);
                m_canvasLayers[i].setListening(true);
                m_modulesRoot.panel.activateLayerTools();
            //Adjust opacity / scaling / rotation
            }
        }
    };
    
    /**
     *  Updates the Z index of a layer by using Kinetic's JS canvas API
     *  @function updateKineticLayer
     *  @param {int} id - the id of the layer we want to update
     *  @param {int} units - the number of Z index units we want to change
     *  @param {String} action - variable setting whether the layer should move up or down in the Z index stack
     *  @return void
     */
    this.updateKineticLayer = function(id, units, action){
        var i,
        j;
        for(i = 0; i<m_canvasLayers.length; i++){
            if(m_canvasLayers[i].getId() == id){
                if(action == "moveup"){
                    for(j = 0; j< units; j++){
                        m_canvasLayers[i].moveUp();
                    }
                } else if(action == "movedown"){
                    for(j = 0; j< units; j++){
                        m_canvasLayers[i].moveDown();
                    }
                }
            }
        }
        draw();
        prepareLayerUpdate();
    };
    
    /**
     *  Updates the canvas when we switch from one page to another
     *  @function updatePageCanvas
     *  @param {int} page - the id of the page we want to display on the canvas
     *  @return void
     */
    this.updatePageCanvas = function(page){
        var manualBackground = page.getManualBackground();  
        var src = null;
        if(manualBackground){
            src = manualBackground.getImageObject();
        }
        that.updateManualBackground(src);
    };
        
        
    //Private Methods
    
    /*DEBUG METHOD*/
    function printZIndex(){
        for(var i = 0; i<m_canvasLayers.length; i++){
        }
    }
    
    function prepareLayerUpdate(){
        var layers = null;
        if(m_canvasLayers != null){
            layers = m_canvasLayers;
        }
        m_controller.updateZIndex(layers);
    }
    
    function getSelectCoordinates(coordinates){
        var absoluteWidth = coordinates.w;
        var absoluteHeight = coordinates.h;
        var absoluteX = coordinates.x;
        var absoluteY = coordinates.y;
        //default (100%) width is 640 , height is 896
        var relativeWidth = Math.round((absoluteWidth/Parameters.canvasDefaultWidth)*100);
        var relativeHeight = Math.round((absoluteHeight/Parameters.canvasDefaultHeight)*100);
        var relativeX = Math.round((absoluteX/Parameters.canvasDefaultWidth)*100);
        var relativeY = Math.round((absoluteY/Parameters.canvasDefaultHeight)*100);
        
        //Correct by the zoom for the default width and height when integrated in the model
        $('.selectCoordinates input[name="selectWidth"]').val(relativeWidth);
        $('.selectCoordinates input[name="selectHeight"]').val(relativeHeight);
        $('.selectCoordinates input[name="selectX"]').val(relativeX);
        $('.selectCoordinates input[name="selectY"]').val(relativeY);
        
        if(relativeWidth != 0 && relativeHeight != 0){
            $("#createFrameButton").removeAttr("disabled");
        } else{
            $("#createFrameButton").attr("disabled","disabled");
        }
    }
    
    function resetDynamicSelectArea(x,y){
        m_jcrop.destroy();
        $('#selectArea').append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .attr("id","selectAreaDynamic"));
            
        $("#selectAreaDynamic").css({
            width: x,
            height: y
        });
        $('#selectAreaDynamic').Jcrop({
            bgColor: 'black',
            bgOpacity:   0.4,
            onSelect: getSelectCoordinates,
            onChange: getSelectCoordinates
        },function(){
            m_jcrop = this;
        });
    }
    
    function draw(){
        m_layer.draw();
    }
    
    function updateStageContainers(width, height){
        resetDynamicSelectArea(width,height);
        $("#selectArea").width(width);
        $("#selectArea").height(height);
        $("#canvasArea").width(width);
        $("#canvasArea").height(height);
        $("#canvasDropArea").width(width);
        $("#canvasDropArea").height(height);
        $("#canvasContainer").width(width);
        $("#canvasContainer").height(height);
        $("#zoomArea").width(width);
        $("#zoomArea").height(height);
        $("#canvasArea").width(width);
        $("#canvasArea").height(height);
    }
    
    function updateLayers(layers){
            
    }
        
    function updateFrames(frames){
            
    }
}

ViewNS.CanvasModule.prototype = new ViewNS.AbstractViewModule();
ViewNS.CanvasModule.prototype.constructor= ViewNS.CanvasModule;
ViewNS.CanvasModule.prototype.parent = ViewNS.AbstractViewModule.prototype;