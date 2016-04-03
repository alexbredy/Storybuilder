/**
 *  Abstract -
 *  Holds a method serializing a class in a JSON Object
 *  @class {abstract} com.Storybuilder.ModelNS.AbstractSerializable
 *  @see com.Storybuilder.ModelNS.Model
 *  @see com.Storybuilder.ModelNS.ResourceManager
 */

var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

ModelNS.AbstractSerializable = function(){
    
    /**
     *  Serializes a class in a JSON Object. This method is overriden by the child classes
     *  @function getSrc
     *  @return Object Literal
     */
    this.toJSON = function(){
        
    };
}
