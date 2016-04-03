/**
 *  Singleton -
 *  Holds data of the current state of the HTML5 Canvas element
 *  @class com.Storybuilder.ModelNS.CanvasModel
 */

//Factory and interface of the resources
var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

ModelNS.CanvasModel = (function() {
    //private
    var instance;
       
    CanvasModel.prototype = new ModelNS.AbstractSerializable();
    CanvasModel.prototype.constructor = CanvasModel;
    CanvasModel.prototype.parent = ModelNS.AbstractSerializable;
    
    function CanvasModel(){
        
        /***************** Retrieve Packages *******************/
        Parameters = com.Storybuilder.Application.Parameters,
        Observable = ModelNS.Observable,
        MathLib = com.Storybuilder.Utility.MathLib,
        Tools = com.Storybuilder.ViewNS.Tools;
        /*******************************************************/
        
        var that = this;
        
        Observable.isImplementedBy(this);
        
        var m_width = Parameters.canvasDefaultWidth,
        m_height = Parameters.canvasDefaultHeight,
        
        //value in %
        m_zoom = 100,
        
        m_currentState = Parameters.canvas.pageDisplay,
        
        m_activeTool = Tools.CURSOR;
        
        /**
        *  Switches the canvas mode to active the Page mode. The page mode displays a comic's full page.
        *  @function activePageMode
        *  @return void
        */
        this.activatePageMode = function(){
            m_currentState = Parameters.canvas.pageDisplay;
            setDimension(Parameters.canvasDefaultWidth, Parameters.canvasDefaultHeight);
        };
        
        /**
        *  Switches the canvas mode to active the Frame mode. The Frame mode displays a cropped area of a page representing a selected Frame.
        *  @function activateFrameMode
        *  @return void
        */
        this.activateFrameMode = function(frame){
            m_currentState = Parameters.canvas.frameDisplay;
            setDimension(frame.getAbsoluteWidth(), frame.getAbsoluteHeight());
        };
        
        
        /**
        *  Updates the dimension of the canvas element. Notifies the observers attached to the CanvasModel class in order to
        *  push the new dimension to the view
        *  @function setDimension
        *  @return void
        */
        function setDimension(w,h){
            
            if(m_width == w && m_height == h){
                return;
            } else if(w == Parameters.canvasDefaultWidth && h == Parameters.canvasDefaultHeight){
                m_width = Parameters.canvasDefaultWidth;
                m_height = Parameters.canvasDefaultHeight;
            } else{
                if(MathLib.isInRange(w,1,Parameters.canvasDefaultWidth) && MathLib.isInRange(h,1,Parameters.canvasDefaultHeight)){
                    var newRatio = MathLib.getDimensionRatio(w,h),
                    defaultRatio = MathLib.getDimensionRatio(Parameters.canvasDefaultWidth, Parameters.canvasDefaultHeight);
                    if(w > h){
                        if(defaultRatio > newRatio){
                            m_height = Parameters.canvasDefaultHeight;
                            m_width = Math.round(m_height*newRatio);
                        }else{
                            m_width = Parameters.canvasDefaultWidth;
                            m_height = Math.round(m_width * (1/newRatio));
                        }
                    }else{
                        if((1/defaultRatio) > 1/newRatio){
                            m_width = Parameters.canvasDefaultWidth;
                            m_height = Math.round(m_width*(1/newRatio));
                        }else{
                            m_height = Parameters.canvasDefaultHeight;
                            m_width = Math.round(m_height * newRatio);
                        }
                    }
                }
            }
            
            that.notifyObservers({
                canvasWidth: m_width,
                canvasHeight: m_height
            });
            
        }
        
        /**
        *  Verifies if we are allowed to dropped layers on the canvas. Layers are only allowed in the frame mode of the canvas
        *  @function areaLayersAllowed
        *  @return boolean
        */
        this.areLayersAllowed = function(){
            if(m_currentState == Parameters.canvas.pageDisplay){
                return false;
            }
            return true;
        };
        
        
        /**
        *  Returns the width of the canvas in pixels
        *  @function getWidth
        *  @return int
        */
        this.getWidth = function(){
            return m_width;
        };
        
        /**
        *  Returns the height of the canvas in pixels
        *  @function getHeight
        *  @return int
        */
        this.getHeight = function(){
            return m_height;
        };
        
        
        /**
        *  Returns the width and the height of the canvas in pixels
        *  @function getDimension
        *  @return Object Literal
        */
        this.getDimension = function(){
            return {
                w: m_width,
                h: m_height
            };
        };
        
        /**
        *  Returns the current zoom value of the canvas
        *  @function getZoomValue
        *  @return int
        */
        this.getZoomValue = function(){
            return m_zoom;
        };
          
        /**
        *  Zooms in the canvas by 25% of the base value (100). Incrementation is linear
        *  @function zoomIn
        *  @return int
        */
        this.zoomIn = function(){
            m_zoom += 25;
            sanitizeZoom();
        };
        
        /**
        *  Zooms out the canvas by 25% of the base value (100). Decrementation is linear
        *  @function zoomOut
        *  @return int
        */
        this.zoomOut = function(){
            m_zoom -= 25;
            sanitizeZoom();
        };
        
        /**
        *  Sets a zoom value to the canvas
        *  @function setZoom
        *  @param {int} value - The zoom value
        *  @return void
        */
        this.setZoom = function(value){
            m_zoom = value;
            sanitizeZoom();
        };
        
        /**
        *  Resets the canvas zoom to its base value (100%)
        *  @function resetZoom
        *  @return void
        */
        this.resetZoom = function(){
            m_zoom = 100;
        };
        
        /**
        *  Sets the tool applied to the canvas (cursor, select, zoom, ...)
        *  @function setActiveTool
        *  @param {String} tool - The tool we want to activate on the canvas
        *  @return void
        */
        this.setActiveTool = function(tool){
            m_activeTool = tool;
        };
        
        /**
        *  Returns the current tool applied to the canvas
        *  @function getActiveTool
        *  @return String
        */
        this.getActiveTool = function(){
            return m_activeTool;
        };
        
        /**
        *  Corrects the zoom value if it is set beyond the allowed range
        *  @function sanitizeZoom
        *  @return void
        */
        function sanitizeZoom(){
            if(m_zoom > 100 && m_zoom < 125){
                //We want the zoom to recalibrate to 100 when the zoom values cross the default value frontier
                m_zoom = 100;
            }
            if(m_zoom > 300){
                m_zoom = 300;
            }
            if(m_zoom < 100 && m_zoom > 75){
                m_zoom = 100;
            }
            if(m_zoom < 25){
                m_zoom = 25;
            }
        }
        
            
    }
    
    var _static = {
        
        /**
        *  Static - Returns the instance of the CanvasModel
        *  @function getInstance
        *  @return com.Storybuilder.ModelNS.CanvasModel
        */
        getInstance: function(){
            if(instance === undefined){
                instance = new CanvasModel();
            }
            
            return instance;
        }
    };
    
    return _static;
})();