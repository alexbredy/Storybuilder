/**
 *  Static -
 *  The Namespace class provides a method that allows replicating packages and building namespaces.
 *  This class was built for code organisation purposes
 *  @class com.Storybuilder.Utility.Namespace
 */

//Setting the namespace's class manually since this is where we store the namespace builder function

//We need to define the path to the utility package since the namespace builder is found in there
//(If we don't do this we should expect a namespace-ception) e.g. the namespace builder built by the namespace builder
var com = com || {
    Storybuilder:{
        Utility:{
            
        }
    }
};

//http://elegantcode.com/2011/01/26/basic-javascript-part-8-namespaces/
com.Storybuilder.Utility.Namespace = function(){
    
    /**
     *  Builds a new namespace or returns it if it already exists
     *  @function getNamespace
     *  @param {string} namespace - the namespace string we want to fetch
     *  @return Object Literal
     */
    function getNamespace(namespace){
        var root = window;
        var currentObject = '';
        var objects = namespace.split(".");
            
        // We build each namespace recursively
        for(var i = 0; i<objects.length; i++){
            currentObject = objects[i];
            root[currentObject] = root[currentObject] || {};
            root = root[currentObject];
        }
        
        return root;
    }
    
    return{
        getNamespace: getNamespace
    };
        
}();
