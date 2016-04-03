/**
 *  The ResourceDropStrategy class provides a Strategy pattern to the controller when resources are added to an
 *  opened project. The Strategy pattern is replicated by passing a callback function in the object's constructor.
 *  @class com.Storybuilder.ControllerNS.ResourceDropStrategy
 */

var ControllerNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ControllerNS');

ControllerNS.ResourceDropStrategy = function(method){
    
    var that = this;
    
    var m_process = method;
    
    /**
     *  This method executes the strategy contained in the callback method
     *  @function execute
     *  @return void
     */
    this.execute = function(){
        m_process.apply( this, arguments );
    };
    
}
