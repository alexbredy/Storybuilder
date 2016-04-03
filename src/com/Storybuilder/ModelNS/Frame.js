/**
 *  The Frame class holds the data of a frame such as its coordinates on a page, the layers it contains and its timestamp
 *  @class com.Storybuilder.ModelNS.Frame
 */

var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

ModelNS.Frame = function(id, rect, absoluteWidth, absoluteHeight, endTime){
    
    /***************** Retrieve Packages *******************/
    var Rect = com.Storybuilder.Utility.Rect,
    Parameters = com.Storybuilder.Application.Parameters,
    Layer = ModelNS.Layer,
    MathLib = com.Storybuilder.Utility.MathLib;
    /*******************************************************/
    
    
    
    var m_id = id,
    m_click,
    m_zoom = rect,
    m_layers = [],
    m_relativeX = rect.getX(),
    m_relativeY = rect.getY(),
    m_relativeW = rect.getWidth(),
    m_relativeH = rect.getHeight(),
    
    m_absoluteWidth = absoluteWidth,
    m_absoluteHeight = absoluteHeight;
    
    var m_nextLayerID = 1,
    m_currentLayer;
    
    var m_frameDuration = 10.0,
    m_frameStart = endTime,
    m_frameEnd = m_frameStart+m_frameDuration;
    
    this.updateTimestamps = function(start, duration, end){
        m_frameStart = start;
        m_frameEnd = end;
        m_frameDuration = duration;
    };
    
    /**
     *  Returns the starting time of a frame in the timeline in seconds
     *  @function getFrameStart
     *  @return float
     */
    this.getFrameStart = function(){
        return m_frameStart;
    };
    
    /**
     *  Returns the ending time of a frame in the timeline in seconds
     *  @function getFrameEnd
     *  @return float
     */
    this.getFrameEnd = function(){
        return m_frameEnd;
    };
    
    /**
     *  Returns the duration of a frame in the timeline in seconds
     *  @function getFrameStart
     *  @return float
     */
    this.getFrameDuration = function(){
        return m_frameDuration;
    };
    
    /**
     *  Sets the duration of a frame in the timeline in seconds
     *  @function setFrameDuration
     *  @param {float} duration - the duration in seconds
     *  @return void
     */
    this.setFrameDuration = function(duration){
        m_frameDuration = duration;
    };
    
    
    /**
     *  Sets the starting time of a frame in the timeline in seconds
     *  @function setFrameStart
     *  @param {float} start - starting time
     *  @return void
     */
    this.setFrameStart = function(start){
        m_frameStart = start;
    };
    
    /**
     *  Sets the ending time of a frame in the timeline in seconds
     *  @function setFrameEnd
     *  @param {float} end - ending time
     *  @return void
     */
    this.setFrameEnd = function(end){
        m_frameEnd = end;
    };
    
    
    /**
     *  Sets the absolute width of a frame in pixels
     *  @function setAbsoluteWidth
     *  @param {int} width - the pixel width
     *  @return void
     */
    this.setAbsoluteWidth = function(width){
        m_absoluteWidth = width;
    };
    
    /**
     *  Sets the absolute height of a frame in pixels
     *  @function setAbsoluteHeight
     *  @param {int} height - the pixel height
     *  @return void
     */
    this.setAbsoluteHeight = function(height){
        m_absoluteHeight = height;
    };
    
    /**
     *  Sets the absolute dimension of a frame in pixels
     *  @function setAbsoluteDimension
     *  @param {int} w - the pixel width
     *  @param {int} h - the pixel height
     *  @return void
     */
    this.setAbsoluteDimension = function(w, h){
        m_absoluteWidth = w;
        m_absoluteHeight = h;
    };
    
    /**
     *  Returns the ID of a frame
     *  @function getID
     *  @return int
     */
    this.getID = function(){
        return m_id;
    };
    
    /**
     *  Returns the relative x (%) coordinate of a frame
     *  @function getX
     *  @return int
     */
    this.getX = function(){
        return m_relativeX;
    };
    
    /**
     *  Returns the relative y (%) coordinate of a frame
     *  @function getY
     *  @return int
     */
    this.getY = function(){
        return m_relativeY;
    };
    
    /**
     *  Returns the relative width (%) coordinate of a frame
     *  @function getWidth
     *  @return int
     */
    this.getWidth = function(){
        return m_relativeW;
    };
    
    /**
     *  Returns the relative height (%) coordinate of a frame
     *  @function getHeight
     *  @return int
     */
    this.getHeight = function(){
        return m_relativeH;
    };
    
    /**
     *  Returns the layer that is currently being manipulated on a frame
     *  @function getCurrentLayer
     *  @return com.Storybuilder.ModelNS.Layer
     */
    this.getCurrentLayer = function(){
        return m_currentLayer;
    };
    
    /**
     *  Sets the current layer to be manipulated on a frame
     *  @function setCurrentLayer
     *  @param {int} id - The layer id
     *  @return void
     */
    this.setCurrentLayer = function(id){
        var object;
        for(var i = 0; i<m_layers.length; i++){
            object = m_layers[i];
            if(object.getID() == id){
                m_currentLayer = m_layers[i];
            }
        }
    };
    
    /**
     *  Adds a layer in the list of layers. The new layer is placed at the top of the Z index
     *  @function addLayer
     *  @param {com.Storybuilder.ModelNS.ImageResource} resource - The image that is used by the new layer
     *  @return void
     */
    this.addLayer = function(resource){
        var layer = new Layer(resource.getImageObject());
        layer.setName(resource.getName());
        layer.setOriginalWidth(resource.getDimension().width);
        layer.setOriginalHeight(resource.getDimension().height);
        layer.setID(m_nextLayerID);
        m_nextLayerID++;
        layer.setZIndex(m_layers.length);
        m_layers.push(layer);
    };
    
    /**
     *  Deletes a layer by passing its id
     *  @function deleteLayer
     *  @param {int} id - The layer id
     *  @return void
     */
    this.deleteLayer = function(id){
        
    };
        
    /**
     *  Sets the clickable area of a frame
     *  @function setClick
     *  @param {com.Storybuilder.Utility.Rect} click - The clickable area
     *  @return void
     *  @deprecated 1.0 The zoomable area and the clickable area are now merged in the frame's coordinates.
     */    
    this.setClick = function(click){
        m_click = click;
    };
      
    /**
     *  Sets the zoom area of a frame
     *  @function setZoom
     *  @param {com.Storybuilder.Utility.Rect} zoom - The zoomable area
     *  @return void
     *  @deprecated 1.0 The zoomable area and the clickable area are now merged in the frame's coordinates.
     */    
    this.setZoom = function(zoom){
        m_zoom = zoom;
    };
    
    /**
     *  Returns the layers array of the frame
     *  @function getLayers
     *  @return com.Storybuilder.ModelNS.Layer []
     */    
    this.getLayers = function(){
        return m_layers
    };
    
    /**
     *  Returns the clickable area of a frame
     *  @function getClick
     *  @return com.Storybuilder.Utility.Rect
     *  @deprecated 1.0 The zoomable area and the clickable area are now merged in the frame's coordinates.
     */      
    this.getClick = function(){
        return m_click;
    };
    
    /**
     *  Returns the zoomable area of a frame
     *  @function getZoom
     *  @return com.Storybuilder.Utility.Rect
     *  @deprecated 1.0 The zoomable area and the clickable area are now merged in the frame's coordinates.
     */        
    this.getZoom = function(){
        return m_zoom;
    };
    
    /**
     *  Returns the absolute width of the frame in pixels
     *  @function getAbsoluteWidth
     *  @return int
     */   
    this.getAbsoluteWidth = function(){
        return m_absoluteWidth;
    };
    
    /**
     *  Returns the absolute height of the frame in pixels
     *  @function getAbsoluteHeight
     *  @return int
     */   
    this.getAbsoluteHeight = function(){
        return m_absoluteHeight;
    };
    
    /**
     *  Sets the relative dimension (%) of the frame
     *  @function setRelativeDimension
     *  @param {com.Storybuilder.Utility.Rect} rect - The Rect object containing the coordinates
     *  @return void
     */   
    this.setRelativeDimension = function(rect){
        m_relativeX = rect.getX();
        m_relativeY = rect.getY();
        m_relativeW = rect.getWidth();
        m_relativeH = rect.getHeight();
    };
    
    /**
     *  Returns the relative dimension of the frame as a Rect object
     *  @function getRelativeDimension
     *  @return com.Storybuilder.Utility.Rect
     */   
    this.getRelativeDimension = function(){
        return new Rect(m_relativeX, m_relativeY, m_relativeW, m_relativeH);
    };
    
    /**
     *  Returns the absolute dimension of the frame as a Rect object
     *  @function getAbsoluteDimension
     *  @return com.Storybuilder.Utility.Rect
     */   
    this.getAbsoluteDimension = function(){
        return{
            absoluteWidth: m_absoluteWidth,
            absoluteY: m_absoluteHeight
        };
    };
    
    /**
     *  Updates the layer's Z index based on the actions the user triggered in the view
     *  @function updateLayers
     *  @param {Array} layerArray - The Z index value of the layers contained in an array
     *  @return void
     */  
    this.updateLayers = function(layerArray){
        for(var i = 0; i<layerArray.length; i++){
        //finish that
        }
    };  
    
    function setLayerZIndex(layerID, zIndex){
        for(var i = 0; i<m_layers.length; i++){
            if(m_layers[i].getID() == layerID){
                m_layers[i].setZIndex(zIndex);
            }
        }
    }
}
