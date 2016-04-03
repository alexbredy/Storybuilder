/**
 *  Holds the properties of an Image
 *  @class com.Storybuilder.ModelNS.ImageResource
 *  @extends com.Storybuilder.ModelNS.AbstractResource
 */

var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

ModelNS.ImageResource = function(name, src, size, MIME, callback){
    
    /***************** Retrieve Packages *******************/
    var AbstractResource = ModelNS.AbstractResource;
    /*******************************************************/
    
    
    //name src and size are passed in the parent class
    AbstractResource.apply(this, arguments);
    var that = this;
    var m_image,
    m_width,
    m_height;
    
    m_image = new Image();
    
    /**
     *  Returns the Image object
     *  @function getAudio
     *  @return Image
     */
    this.getImageObject = function(){
        return m_image;
    };
    
    /**
     *  Returns the dimension of the ImageResource
     *  @function getDimension
     *  @return Object Literal
     */
    this.getDimension = function(){
        return {
          width: m_width,
          height: m_height
        };
        
    };
    
    /* This method overrides the AbstractResource getInfo method */
    
    /**
     *  Returns an Object Literal containing the information about an ImageObject. Overrides the parent class method
     *  @function getInfo
     *  @return Object Literal
     */
    this.getInfo = function(){
        return{
            name: that.getName(),
            type: "image",
            size: that.getSize(),
            dimension: {
                x: m_width,
                y: m_height
            }
        }
    }
    
    m_image.onload = function(){
        m_width = m_image.width;
        m_height = m_image.height;
        m_image.name = name;
        callback();
    };
    
    m_image.src = src;
    
    
}

ModelNS.ImageResource.prototype = new ModelNS.AbstractResource();
ModelNS.ImageResource.prototype.constructor= ModelNS.ImageResource;
ModelNS.ImageResource.prototype.parent = ModelNS.AbstractResource.prototype;
