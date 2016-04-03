/**
 *  Contains an API for managing the draggable panel in the Storybuilder
 *  @class com.Storybuilder.ViewNS.PanelModule
 *  @extends com.Storybuilder.ViewNS.AbstractViewModule
 */

var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.PanelModule = function(modulesRoot, controller){
    
    ViewNS.AbstractViewModule.apply(this, arguments);
    
    /***************** Retrieve Packages *******************/
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
    var m_draggedLayerPosition;
    
    //Public Methods
    
    /**
     *  Loads all the frame thumbnails of a page in the draggable panel
     *  @function loadFrames
     *  @param {com.Storybuilder.ModelNS.Frame []} frames - the frames array
     *  @param {int} page - the page number
     *  @return void
     */
    this.loadFrames = function(frames, page){
        var id;
        for(var i = 0; i < frames.length; i++){
            id = frames[i].getID();
            that.addFrameThumbnail(id, page);
        }
    };
    
    /**
     *  Removes all the thumbnails of frames and layers
     *  @function emptyThumbnails
     *  @return void
     */
    this.emptyThumbnails = function(){
        $("#frameList").html("");
        $("#layerList").html("");
    };
    
    /**
     *  Deactivates the active frames
     *  @function deactivateFrames
     *  @return void
     */
    this.deactivateFrames = function(){
        this.disableActiveFrameButtons();
        $(".activeFrame").removeClass("activeFrame");
    };
    
    /**
     *  Activates a frame
     *  @function activateFrame
     *  @param {int} id - the frame's id
     *  @return void
     */
    this.activateFrame = function(id){
        $('a[href="#frames"]').trigger(Action.CLICK);
        $('.frame[data-frame="'+id+'"] .frameRight a').addClass("activeFrame");
        that.enableActiveFrameButtons();
    };
    
    /**
     *  Updates the contextual UI when the canvas is set on page mode
     *  @function setupPageUI
     *  @return void
     */
    this.setupPageUI = function(){
        $(".canvasMode").html("Page mode");
        $("#right").removeClass("frameMode");
    };
    
    /**
     *  Updates the contextual UI when the canvas is set on frame mode
     *  @function setupFrameUI
     *  @return void
     */
    this.setupFrameUI = function(){
        $(".canvasMode").html("Frame mode");
        $("#right").addClass("frameMode");
    };
    
    /**
     *  Removes all the layer thumbnails
     *  @function cleanupLayers
     *  @return void
     */
    this.cleanupLayers = function(){
        $("#layerList").html();
    };
    
    /**
     *  Deletes a frame thumbnail
     *  @function deleteFrameThumbnail
     *  @return void
     */
    this.deleteFrameThumbnail = function(id){
        $('.frame[data-frame="'+id+'"]').remove();
    };
    
    /**
     *  Initiates the listeners attached to the draggable panel
     *  @function initListeners
     *  @return void
     */
    this.initListeners = function(){
        
        that.addDynamicListener(".frame a", Action.DOUBLECLICK, function(){
        });
        
        
        that.addDynamicListener(".layerLeft input", Action.CLICK, function(){
        });
        
            
            
        $("#toolbar")
        .resizable({
            handles: "e, s, se",
            minHeight: 180,
            minWidth: 220,
            maxHeight: $(DOM.DOCUMENT).height()*0.95,
            resize: function(event, ui) { 
                var totalHeight = $(this).height();
                //In this exceptional case, we use "magic numbers" because fetching the height of an element that is not displayed
                //returns 0 pixels. By building manually the tabs, setting the tab to display: block and visibility: invisible I would be
                //able to get the value but I'm using the jQuery UI plugin in this case which has its own behaviour.
                // 75 : layer tools height
                // 85 : frame tools height
                var toolbarHeaderHeight = $("#toolbarHeader").height();
                
                var tempHeight = totalHeight - toolbarHeaderHeight;
                $("#tabs").height(tempHeight);
                tempHeight -= 35+75;
                $("#layerList").height(tempHeight);
                tempHeight -=5;
                $("#frameList").height(tempHeight);
                    
            }
        })
        .draggable({
            handle: "#toolbarHeader", 
            containment: "#toolbarArea"
        });
        
        $("#left").resizable({
            resize: function(event, ui) {
                var value = $(DOM.DOCUMENT).width() - $("#left").width();
                $(ViewClasses.General.right).css("width", value);
                $(ViewClasses.General.bottom).css("width", value);
            },
            handles: "e" 
        });
                
        $(ViewClasses.Toolbox.tabs).css("display","block");
        $( ViewClasses.Toolbox.tabs ).tabs();
                
        $(DOM.DOCUMENT).on(Action.CLICK,".tool a", function(e){ 
            if(!$(this).hasClass("disabled")){
                m_controller.execute("parseToolAction",this);
            }
        });
            
            
        $("#opacitySlider").slider({
            min: 0,
            max: 100,
            value: 100,
            slide: function( event, ui ) {
                $( "#opacityValue" ).val( ui.value );
                var id = parseInt($(".activeLayer").closest(".layer").attr("data-layer"));
                m_modulesRoot.canvas.setLayerOpacity(id, ui.value);
            }
        });

        $("#scalingSlider").slider({
            min: 1,
            max: 200,
            value: 100,
            slide: function( event, ui ) {
                $( "#scalingValue" ).val( ui.value );
                var id = parseInt($(".activeLayer").closest(".layer").attr("data-layer"));
                m_modulesRoot.canvas.setLayerScaling(id, ui.value);
            }
        });
        $("#rotationSlider").slider({
            min: -180,
            max: 180,
            value: 0,
            slide: function( event, ui ) {
                $( "#rotationValue" ).val( ui.value );
                var id = parseInt($(".activeLayer").closest(".layer").attr("data-layer"));
                m_modulesRoot.canvas.setLayerRotation(id, ui.value);
            }
        });
            
           
    
        $("#selectCoordinates input")
        .focus(function(e){
            $(this).select();
        })
        .change(function(e){
            var widthValue = $('#selectCoordinates input[name="selectWidth"]').val();
            var heightValue = $('#selectCoordinates input[name="selectHeight"]').val();
            var xValue = $('#selectCoordinates input[name="selectX"]').val();
            var yValue = $('#selectCoordinates input[name="selectY"]').val();
            m_controller.execute("parseSelectCoordinates", xValue, yValue, widthValue, heightValue);
        });
            
            
        that.addDynamicListener(".layerRight a", Action.CLICK, function(e){
            m_controller.execute("processLayerClick", this);
        });
        
        that.addDynamicListener(".frameRight a", Action.CLICK, function(e){
            m_controller.execute("processFrameClick", this);
        });
            
            
        $( "#layerList" ).sortable({
            items: "li:not(.notSortable)",
            start: function(event, ui){
                var layerID = $(ui.item).attr("data-layer");
                layerID = parseInt(layerID);
                var startingPosition = 1;
                $('#layerList li').each(function(index) {
                    if(!$(this).hasClass("notSortable")){
                        var currentID = parseInt($(this).attr("data-layer"));
                        if(currentID == layerID){
                            m_draggedLayerPosition = startingPosition;
                            return;
                        } else{
                                
                    }
                            
                    }
                    startingPosition++;
                });
            },
            update: function(event, ui){
                var layerID = $(ui.item).attr("data-layer");
                layerID = parseInt(layerID);
                var finalPosition = 1;
                $('#layerList li').each(function(index) {
                    if(!$(this).hasClass("notSortable")){
                        var currentID = parseInt($(this).attr("data-layer"));
                        if(currentID == layerID){
                            m_controller.execute("processLayerSort", layerID, m_draggedLayerPosition, finalPosition);
                            return;
                        }
                            
                    }
                    finalPosition++;
                });
            }
        });
            
        that.addDynamicListener(".layerLeft a", Action.CLICK, function(e){
            var target = this;
            m_modulesRoot.dialogs.openConfirm(Dialogs.CONFIRMLAYERDELETION, function(){
                m_controller.execute("processLayerDeletion", target);
            });
        });
        
        that.addDynamicListener(".frameLeft a", Action.CLICK, function(e){
            var target = this;
            m_modulesRoot.dialogs.openConfirm(Dialogs.confirmFrameDeletion, function(){
                m_controller.execute("processFrameDeletion",target);
            });
        });
        
        that.addStaticListener("#createFrameButton", Action.CLICK, function(e){
            var widthValue = $('#selectInfo .selectCoordinates input[name="selectWidth"]').val();
            var heightValue = $('#selectInfo .selectCoordinates input[name="selectHeight"]').val();
            var xValue = $('#selectInfo .selectCoordinates input[name="selectX"]').val();
            var yValue = $('#selectInfo .selectCoordinates input[name="selectY"]').val();
            var endTime = 0;
            
            var activePage = parseInt($("a.activePage").attr("data-page")),
            currentFrameEnd = 0,
            position = 0;
            
            $(".frameTimeline").each(function(i){
                
                var target = this,
                anchor = $(target).find("a"),
                pageNumber = parseInt($(anchor).attr("data-page"));
                if(pageNumber == activePage){
                    currentFrameEnd = parseFloat($(anchor).attr("data-end"));
                } else if(pageNumber > activePage){
                    return;
                } else{
                    currentFrameEnd = parseFloat($(anchor).attr("data-end"));
                }
                position = i+1;
                
            });
            endTime = currentFrameEnd;
            m_controller.execute("requestNewFrame", xValue, yValue, widthValue, heightValue, endTime, position);
        });
        
        that.addStaticListener("#toggleModeButton", Action.CLICK, function(e){
            m_controller.execute("toggleCanvasMode");
        });
        
        that.addStaticListener("#saveSelectChangesButton", Action.CLICK, function(e){
            var widthValue = $('#selectInfo .selectCoordinates input[name="selectWidth"]').val();
            var heightValue = $('#selectInfo .selectCoordinates input[name="selectHeight"]').val();
            var xValue = $('#selectInfo .selectCoordinates input[name="selectX"]').val();
            var yValue = $('#selectInfo .selectCoordinates input[name="selectY"]').val();
            m_controller.execute("saveFrameChanges", xValue, yValue, widthValue, heightValue);
        });
        
    };
    
    /**
     *  Updates the toolbar UI when the selected tool is modified
     *  @function updateToolView
     *  @param {String} tool - the selected tool
     *  @return void
     */
    this.updateToolView = function(tool){
        $(".activeTool").removeClass("activeTool");
        $('.tool a[data-tool="'+tool+'"]').addClass("activeTool");
        m_modulesRoot.canvas.setCursor(tool);
        m_modulesRoot.canvas.updateCanvasArea(tool);
                
                
    };
    
    /**
     *  Enables the layer tools which provide a UI for editing the layers such as rotation, scaling and opacity
     *  @function activateLayerTools
     *  @return void
     */
    this.activateLayerTools = function(){
        $("#opacitySlider").slider( "option", "disabled", false );
        $("#scalingSlider").slider( "option", "disabled", false );
        $("#rotationSlider").slider( "option", "disabled", false );
        $('#layerTools input[disabled="disabled"]').removeAttr("disabled");
    };
    
    /**
     *  Disables the use of the layer tools
     *  @function disableLayerTools
     *  @return void
     */     
    this.disableLayerTools = function(){
        $("#opacitySlider").slider( "option", "disabled", true );
        $("#scalingSlider").slider( "option", "disabled", true );
        $("#rotationSlider").slider( "option", "disabled", true );
        $("#layerTools input").attr("disabled","disabled");
    };
    
    
    /**
     *  Adds a frame thumbnail in the frames list
     *  @function addFrameThumbnail
     *  @param {int} id - the frame's id
     *  @param {int} page - the page that contains the frame
     *  @return void
     */
    this.addFrameThumbnail = function(id, pageNumber){
        $(".activeFrame").removeClass("activeFrame");
        
        $("#frameList").prepend(
            $(DOM.DOCUMENT.createElement(DOM.LI))
            .addClass("frame")
            .attr("data-frame",id)
            .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                .addClass("frameContent")
                .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                    .addClass("frameLeft")
                    .append($(DOM.DOCUMENT.createElement(DOM.ANCHOR))
                        .addClass("frameDeleter")
                        .html("X")
                        )
                    )
                .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                    .addClass("frameRight")
                    .append($(DOM.DOCUMENT.createElement(DOM.ANCHOR))
                        .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                            .addClass("frameThumbnailContainer")
                            )
                        .append($(DOM.DOCUMENT.createElement(DOM.PARAGRAPH))
                            .html("Page "+pageNumber+" Frame "+id)
                            )
                        )
                    )
                )
            )
    };
    
    /**
     *  Adds a layer thumbnail in the layers list
     *  @function addLayerThumbnail
     *  @param {com.Storybuilder.ModelNS.Layer} layer - the layer that is added
     *  @return void
     */
    this.addLayerThumbnail = function(layer){
        $("#layerList").prepend(
            $(DOM.DOCUMENT.createElement(DOM.LI))
            .addClass("layer")
            .attr("data-layer",layer.getID())
            .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                .addClass("layerContent")
                .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                    .addClass("layerLeft")
                    .append($(DOM.DOCUMENT.createElement(DOM.INPUT))
                        .attr("type","checkbox")
                        .attr("checked","checked")
                        )
                    .append($(DOM.DOCUMENT.createElement(DOM.ANCHOR))
                        .addClass("layerDeleter")
                        .html("X")
                        )
                    )
                .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                    .addClass("layerRight")
                    .append($(DOM.DOCUMENT.createElement(DOM.ANCHOR))
                        .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                            .addClass("layerThumbnailContainer")
                            .append($(DOM.DOCUMENT.createElement(DOM.IMAGE))
                                .attr("src",layer.getImageSource())
                                )
                            )
                        .append($(DOM.DOCUMENT.createElement(DOM.PARAGRAPH))
                            .html("Layer X")
                            )
                        )
                    )
                )
            )
    }
    
    /**
     *  Enables the buttons for updating a frame's the selection and switching the canvas mode
     *  @function enableActiveFrameButtons
     *  @return void
     */
    this.enableActiveFrameButtons = function(){
        $("#frameToolsButtons button").each(function(){
            var target = $(this);
            $(target).removeAttr("disabled","disabled");
        });
    }
    
    /**
     *  Disables the buttons for updating a frame's the selection and switching the canvas mode
     *  @function disableActiveFrameButtons
     *  @return void
     */
    this.disableActiveFrameButtons = function(){
        $("#frameToolsButtons button").each(function(){
            var target = $(this);
            $(target).attr("disabled","disabled");
        });
    }
}

ViewNS.PanelModule.prototype = new ViewNS.AbstractViewModule();
ViewNS.PanelModule.prototype.constructor= ViewNS.PanelModule;
ViewNS.PanelModule.prototype.parent = ViewNS.AbstractViewModule.prototype;