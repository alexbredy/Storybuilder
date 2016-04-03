/**
 *  Holds the properties of a Video
 *  @class com.Storybuilder.ModelNS.VideoResource
 *  @extends com.Storybuilder.ModelNS.AbstractResource
 */

var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

ModelNS.VideoResource = function(name, src, size){
    
    /***************** Retrieve Packages *******************/
    var AbstractResource = ModelNS.AbstractResource,
    DOM = com.Storybuilder.ViewNS.DOM;
    /*******************************************************/
    
    //name src and size are passed in the parent class
    AbstractResource.apply(this, arguments);
    
    var that = this;
    var m_length,
    m_name = name,
    m_src = src,
    m_video = $(DOM.DOCUMENT.createElement(DOM.VIDEO));
    
    //Overrides parent class method
    
    /**
     *  Returns an Object Literal containing the information about a VideoResource. Overrides the parent class method
     *  @function getInfo
     *  @return Object Literal
     */
    this.getInfo = function(){
        return{
            name: that.getName(),
            type: "audio",
            size: that.getSize()
        }
    };
}

ModelNS.VideoResource.prototype = new ModelNS.AbstractResource();
ModelNS.VideoResource.prototype.constructor= ModelNS.VideoResource;
ModelNS.VideoResource.prototype.parent = ModelNS.AbstractResource.prototype;