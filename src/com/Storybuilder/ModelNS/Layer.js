/**
 *  The Layer class holds information about a layer such as the position on a frame, the transformations values (opacity, rotation, scaling) and its Z index
 *  @class com.Storybuilder.ModelNS.Layer
 */

var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

ModelNS.Layer = function(imageObject){
    
    /***************** Retrieve Packages *******************/
    var Rect = com.Storybuilder.Utility.Rect,
    Parameters = com.Storybuilder.Application.Parameters,
    MathLib = com.Storybuilder.Utility.MathLib;
    /*******************************************************/
    
    var m_imageObject = imageObject,  
    m_imageSource = imageObject.src,
    m_coordinates = new Rect(0,0,0,0),
    m_opacity = 100,
    m_scaling = 100,
    m_rotation = 0,
    m_name,
    m_originalWidth,
    m_originalHeight,
    m_id,
    //index is set through ID, we don't alter the index directly
    m_zIndex;
    
    /**
     *  Returns the Image object attached to the layer
     *  @function getImageObject
     *  @return Image
     */
    this.getImageObject = function(){
        return m_imageObject;
    };
    
    /**
     *  Sets the image object to the layer
     *  @function setImageObject
     *  @param {Image} imageObj - the image object
     *  @return void
     */
    this.setImageObject = function(imageObj){
        m_imageObject = imageObj;
        m_imageSource = imageObj.src;
        m_name = imageObj.name;
        m_originalWidth = imageObj.width;
        m_originalHeight = imageObj.height;
    };
    
    /**
     *  Sets the image object to the layer
     *  @function getZIndex
     *  @return int
     */
    this.getZIndex = function(){
        return m_zIndex;
    };
    
    /**
     *  Returns the ID of the layer
     *  @function getID
     *  @return int
     */
    this.getID = function(){
        return m_id;
    };
    
    /**
     *  Returns the name of the layer
     *  @function getName
     *  @return String
     */
    this.getName = function(){
        return m_name;
    };
    
    /**
     *  Returns the original width in pixels of the Image object attached to the layer
     *  @function getOriginalWidth
     *  @return int
     */
    this.getOriginalWidth = function(){
        return m_originalWidth;
    };
    
    /**
     *  Returns the original height in pixels of the Image object attached to the layer
     *  @function getOriginalHeight
     *  @return int
     */
    this.getOriginalHeight = function(){
        return m_originalHeight;
    };
    
    /**
     *  Returns the URI of the Image object attached to the layer
     *  @function getImageSource
     *  @return String
     */
    this.getImageSource = function(){
        return m_imageSource;
    };
    
    /**
     *  Returns the coordinates of the layer within the frame
     *  @function getCoordinates
     *  @return com.Storybuilder.Utility.Rect
     */
    this.getCoordinates = function(){
        return m_coordinates;
    };
    
    /**
     *  Returns the opacity value of the layer
     *  @function getOpacity
     *  @return void
     */
    this.getOpacity = function(){
        return m_opacity;
    };
    
    /**
     *  Returns the scaling value of the layer
     *  @function getScaling
     *  @return void
     */
    this.getScaling = function(){
        return m_scaling;
    };
    
    /**
     *  Returns the rotation value of the layer
     *  @function getRotation
     *  @return vpid
     */
    this.getRotation = function(){
        return m_rotation;
    };
    
    /**
     *  Sets a name to the layer
     *  @function setName
     *  @param {String} name - the name of the layer
     *  @return void
     */
    this.setName = function(name){
        m_name = name;
    };
    
    /**
     *  Sets the original width of Image object attached to the layer
     *  @function setName
     *  @param {int} width - the width of the image
     *  @return void
     */
    this.setOriginalWidth = function(width){
        m_originalWidth = width;
    };
    
    /**
     *  Sets the original height of Image object attached to the layer
     *  @function setName
     *  @param {int} height - the height of the image
     *  @return void
     */
    this.setOriginalHeight = function(height){
        m_originalHeight = height;
    };
    
    /**
     *  Sets the opacity of the layer
     *  @function setOpacity
     *  @param {int} opacity - the opacity value
     *  @return void
     */
    this.setOpacity = function(opacity){
        m_opacity = opacity;
    };
    
    /**
     *  Sets the scaling of the layer
     *  @function setScaling
     *  @param {int} scaling - the scaling value
     *  @return void
     */
    this.setScaling = function(scaling){
        m_scaling = scaling;
    };
    
    /**
     *  Sets the rotation of the layer
     *  @function setRotation
     *  @param {int} rotation - the rotation value
     *  @return void
     */
    this.setRotation = function(rotation){
        m_rotation = rotation;
    };
    
    /**
     *  Sets the coordinates of the layer within the frame
     *  @function setCoordinates
     *  @param {com.Storybuilder.Utility.Rect} rect - the Rect object holding the coordinates
     *  @return void
     */
    this.setCoordinates = function(rect){
        m_coordinates = rect;
    };
    
    /**
     *  Sets the ID of the layer
     *  @function setID
     *  @param {int} id - the id value
     *  @return void
     */
    this.setID = function(id){
        m_id = id;
    };
    
    /**
     *  Sets the Z index of the layer
     *  @function setZIndex
     *  @param {int} index - the Z index value
     *  @return void
     */
    this.setZIndex = function(index){
        m_zIndex = index;
    };
}
