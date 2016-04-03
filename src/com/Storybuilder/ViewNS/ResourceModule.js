/**
 *  Contains an API for managing the resources module in the Storybuilder
 *  @class com.Storybuilder.ViewNS.ResourceModule
 *  @extends com.Storybuilder.ViewNS.AbstractViewModule
 */

var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.ResourceModule = function(modulesRoot, controller){
    
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
    
    //Public Methods
    
    /**
     *  Initiates the listeners attached to the resources container
     *  @function initListeners
     *  @return void
     */
    this.initListeners = function(){
        
        $("img").click(function(e){
            });
            
        $("img").hover(function(e){
            e.preventDefault();
        }, function(e){
            e.preventDefault();
        })
                
        $(".resourceHeader").click(function(e){
            $(this).closest("li").find(".resourceListContainer").slideToggle(300); 
        });
            
        $(DOM.DOCUMENT).on(Action.MOUSEENTER, '.resourceItem img', function(e){
            e.stopPropagation();
            m_controller.processMouseEnterResource(this, e);
        });
            
        $(DOM.DOCUMENT).on(Action.MOUSEMOVE, '.resourceItem img', function(e){
            e.stopPropagation();
            m_controller.processMouseMoveResource(this, e);
        });
            
        $(DOM.DOCUMENT).on(Action.MOUSELEAVE, '.resourceItem img', function(e){
            e.stopPropagation();
            if($("#resourceInfoBox").length > 0){
                $("#resourceInfoBox").remove();
            }
        });
                
                
        //Using event delegation since most of the code is added dynamically
        $(DOM.DOCUMENT).on(Action.DRAGENTER, '.resourceItemWrapper img', function(e){
            m_controller.processDragEnter(this,e);
        });
        $(DOM.DOCUMENT).on(Action.DRAGOVER, '.resourceItemWrapper img', function(e){
            m_controller.processDragOver(this,e);
        });
        $(DOM.DOCUMENT).on(Action.DRAGLEAVE, '.resourceItemWrapper img', function(e){
            m_controller.processDragLeave(this,e);
        });
        $(DOM.DOCUMENT).on(Action.DRAGSTART, '.resourceItemWrapper img', function(e){
            m_controller.processDragStart(this,e);
                    
        });
      
        $(DOM.DOCUMENT).on(Action.DRAGEND, '.resourceItemWrapper img', function(e){
            m_controller.processDragEnd(this,e);
        });
            
            
        that.addStaticListener("#manualBackgrounds.dropArea" ,Action.DROP, function(e){
            m_controller.execute("changeResourceDropType", m_controller.getDropManualBackgrounds());
            m_controller.execute("processDrop", this, e);
        });  
        
        that.addStaticListener("#autoLayers.dropArea" ,Action.DROP, function(e){
            m_controller.execute("changeResourceDropType", m_controller.getDropAutoLayers());
            m_controller.execute("processDrop", this, e);
        }); 
        
        
        that.addStaticListener("#autoAudio.dropArea" ,Action.DROP, function(e){
            m_controller.execute("changeResourceDropType", m_controller.getDropAutoAudio());
            m_controller.execute("processDrop", this, e);
        }); 
        
        that.addStaticListener("#autoVideo.dropArea" ,Action.DROP, function(e){
            m_controller.execute("changeResourceDropType", m_controller.getDropAutoVideo());
            m_controller.execute("processDrop", this, e);
        }); 
        
        that.addStaticListener(".dropArea", Action.DROP, function(e){
            m_controller.execute("processDrop", this, e);
        });
           
                
        $(".dropArea").bind(Action.DRAGOVER, function(e){
            m_controller.cancel(e);
        });
                
        $(".dropArea").bind(Action.DRAGENTER, function(e){
            m_controller.processDragEnter(this,e);
        });
            
        $(".dropArea").bind(Action.DRAGLEAVE, function(e){
            m_controller.processDragLeave(this,e);
        });
                
        $(DOM.DOCUMENT).on(Action.CLICK, '.resourceDeleter a', function(e){
            m_controller.execute("confirmResourceDeletion", this);
        });
            
        $(DOM.DOCUMENT).on(Action.DOUBLECLICK, '.resourceItem img', function(e){
            m_controller.execute("requestPreviewer", this);
        });
        
    };
    
    /**
     *  Adds the new resources thumbnails in the specified resource container
     *  @function addResources
     *  @param {Object Literal} resources - contains URI thumbnails of the newly added resources
     *  @param {String} type - the type of resource (image, audio, video)
     *  @param {String} target - the DOM element that will contain the new thumbnails
     *  @return void
     */
    this.addResources = function(resources, type, target){
        var src;
        for (var item in resources) {
            src = "";
            if(type == "image"){
                src = resources[item];
            } else if(type == "audio"){
                src ="CSS/img/audioThumb.png";
            } else if(type == "video"){
                src ="CSS/img/videoThumb.png";
            }
                
                
            $("#"+target+" "+DOM.UL).append($(DOM.DOCUMENT.createElement(DOM.LI))
                .addClass(ViewClasses.Resources.resourceItem)
                .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                    .addClass(ViewClasses.Resources.resourceItemWrapper)
                    .append($(DOM.DOCUMENT.createElement(DOM.ANCHOR))
                        .append($(DOM.DOCUMENT.createElement(DOM.SPAN))
                            .addClass("floatRight")
                            .addClass("resourceDeleter")
                            .append($(DOM.DOCUMENT.createElement(DOM.ANCHOR))
                                .html("X")
                                )
                            )
                        .append($(DOM.DOCUMENT.createElement(DOM.IMAGE))
                            .addClass(ViewClasses.Resources.resource)
                            .attr("draggable","true")
                            .attr("src",src)
                            .attr("alt",item)
                            .attr("data-name",item)
                            //no need this anymore since we are fetching the object directly from the ResourceManager
                            //.attr("data-src",resources[item])
                            .attr("data-resource",target)
                            .attr("data-type",type)
                            )
                        )
                    )
                );
        }

    };
    
    /**
     *  Updates the position of the resource's tooltip
     *  @function updateResourceInfoBoxPosition
     *  @param {int} x - x offset
     *  @param {int} y - y offset
     *  @return void
     */
    this.updateResourceInfoBoxPosition = function(x,y){
        var offsetX = 10,
        offsetY = -80;
        $("#resourceInfoBox")
        .css({
            left:x+offsetX,
            top:y+offsetY
        })
    };
    
    /**
     *  Updates a resource's thumbnail UI when the user stopped dragging a resource
     *  @function resetDraggableResources
     *  @return void
     */
    this.resetDraggableResources = function(){
        $(".resourceItemWrapper img").each(function(index) {
            if($(this).hasClass("over")){
                $(this).removeClass("over");
            }
        });
    };
    
    /**
     *  Displays a message in the resources area informing the user that resources are being loaded
     *  @function displayResourcesLoadingPanel
     *  @return void
     */
    this.displayResourcesLoadingPanel = function(){
        if($("#resourceLoader").length <= 0){
            $("#leftContainer").prepend($(DOM.DOCUMENT.createElement(DOM.DIV))
                .attr("id","resourceLoader")
                .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                    .attr("id","resourceLoaderContent")
                    .append($(DOM.DOCUMENT.createElement(DOM.SPAN))
                        .html("Loading Resource(s)... ")
                        )
                    .append($(DOM.DOCUMENT.createElement(DOM.SPAN))
                        .html("Please Wait")
                        )
            
                    )
                )
        }
    };
        

    /**
     *  Displays a preview of a resource in a wrapper such as a bigger size of an image, audio and video playback
     *  @function displayPreview
     *  @param {DOM element} resource - the target resource
     *  @param {String} type - the resource's type
     *  @return void
     */    
    this.displayPreview = function(resource, type){
        var src = $(resource).attr("data-src");
        if(type == Parameters.resources.audio){
            var audio = $(DOM.DOCUMENT.createElement(DOM.AUDIO));
            audio.attr(DOM.Attributes.SRC,src);
        } else if(type == Parameters.resources.video){
            var video = $(DOM.DOCUMENT.createElement(DOM.VIDEO));
            video.attr(DOM.Attributes.SRC,src);
        } else if(type == Parameters.resources.image){
            var image = $(DOM.DOCUMENT.createElement(DOM.IMAGE));
            $(image).attr(DOM.Attributes.SRC,src);
        }
    };
    
    /**
     *  Removes a resource thumbnail from the resource area. This method is triggered when a resource is deleted in the model
     *  @function removeResourceFromView
     *  @param {DOM element} el - the target resource thumbnail
     *  @return void
     */
    this.removeResourceFromView = function(el){
        $(el).closest(".resourceItem").remove();
    };
    
    /**
     *  Displays a tooltip of the resource when it is hovered
     *  @function displayResourceInfoBox
     *  @param {Object Literal} info - the information about the resource
     *  @param {int} x - the x position of the cursor
     *  @param {int} y - the y position of the cursor
     *  @return void
     */
    this.displayResourceInfoBox = function(info, x, y){
        var offsetX = 10,
        offsetY = -80;
        $(DOM.BODY).append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .attr("id","resourceInfoBox")
            .css({
                left:x+offsetX, 
                top:y+offsetY
            })
            .append($(DOM.DOCUMENT.createElement(DOM.PARAGRAPH))
                .append("Name: "+info["name"])
                .append($(DOM.DOCUMENT.createElement(DOM.BR)))
                .append("Type: "+info["type"])
                .append($(DOM.DOCUMENT.createElement(DOM.BR)))
                .append("Size: "+parseFloat(info["size"]/1000).toFixed(0)+" kB")
                .append($(DOM.DOCUMENT.createElement(DOM.BR)))
                .append("Double click to preview")
                    
                )
            )    
    };
}

ViewNS.ResourceModule.prototype = new ViewNS.AbstractViewModule();
ViewNS.ResourceModule.prototype.constructor= ViewNS.ResourceModule;
ViewNS.ResourceModule.prototype.parent = ViewNS.AbstractViewModule.prototype;