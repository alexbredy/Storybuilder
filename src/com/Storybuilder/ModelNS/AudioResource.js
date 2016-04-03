/**
 *  Holds the properties of an Audio Resource
 *  @class com.Storybuilder.ModelNS.AudioResource
 *  @extends com.Storybuilder.ModelNS.AbstractResource
 */

var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

ModelNS.AudioResource = function(name, src, size){
    
    /***************** Retrieve Packages *******************/
    var AbstractResource = ModelNS.AbstractResource,
    DOM = com.Storybuilder.ViewNS.DOM;
    /*******************************************************/
    
    //name src and size are passed in the parent class
    AbstractResource.apply(this, arguments);
    
    var that = this,
    m_audio = new Audio();
    m_audio.src = src;
    $(m_audio).attr("preload","auto");
    var m_duration;
    
    $(m_audio).bind('loadedmetadata', function(e){
        m_duration = m_audio.duration;
    });
    
    /**
     *  Returns the HTML5 Audio object
     *  @function getAudio
     *  @return Audio
     */
    this.getAudio = function(){
        return m_audio;
    };
    
    /**
     *  Returns the track length in seconds
     *  @function getDuration
     *  @return float
     */
    this.getDuration = function(){
        return m_duration;
    };
    
    //Overrides parent class method
    
    /**
     *  Returns an Object Literal containing the information about an AudioResource. Overrides the parent class method
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

ModelNS.AudioResource.prototype = new ModelNS.AbstractResource();
ModelNS.AudioResource.prototype.constructor= ModelNS.AudioResource;
ModelNS.AudioResource.prototype.parent = ModelNS.AbstractResource.prototype;

