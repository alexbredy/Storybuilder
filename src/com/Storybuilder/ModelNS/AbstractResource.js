/**
 *  Abstract -
 *  Holds the common attributes of a Resource
 *  @class {abstract} com.Storybuilder.ModelNS.AbstractResource
 *  @see com.Storybuilder.ModelNS.AudioResource
 *  @see com.Storybuilder.ModelNS.ImageResource
 *  @see com.Storybuilder.ModelNS.VideoResource
 */


var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

ModelNS.AbstractResource = function(name, src, size, mime){
    var m_name = name,
    m_src = src,
    m_size = size,
    m_MIMEType;
    
    
    /**
     *  Returns the MIME type of a resource
     *  @function getMIMEType
     *  @return String
     */
    this.getMIMEType = function(){
        return m_MIMEType;
    };
    
    /**
     *  Returns the name of a resource
     *  @function getName
     *  @return String
     */
    this.getName = function(){
        return m_name;
    };
    
    /**
     *  Returns the URI of a resource
     *  @function getSrc
     *  @return String
     */
    this.getSrc = function(){
        return m_src;
    };
    
    /**
     *  Returns the file size of a resource
     *  @function getSrc
     *  @return int
     */
    this.getSize = function(){
        return m_size;
    };
    
    /**
     *  Returns an Object Literal with the resource's info. This method is overriden in the child classes
     *  @function getSrc
     *  @return Object Literal
     */
    this.getInfo = function(){
        return{
            name: m_name,
            src: m_src,
            size: m_size
        }
    }
    
}
