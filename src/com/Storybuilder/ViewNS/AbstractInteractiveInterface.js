/**
 *  Static class emulating an Interface type. Implements methods adding event listeners to the target object
 *  @interface com.Storybuilder.ViewNS.AbstractInteractiveInterface
 */

var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.AbstractInteractiveInterface = function(){
    
    /***************** Retrieve Packages *******************/
    var Action = ViewNS.Action,
    DOM = ViewNS.DOM;
    /*******************************************************/
    
    /**
     *  Implements interaction methods within the object passed as a parameter
     *  @function isImplementedBy
     *  @param {Object} o - The object that will implement the observable's methods
     *  @return void
     */  
    function isImplementedBy(o){
        o.addStaticListener = addStaticListener;
        o.addDynamicListener = addDynamicListener;
    }
    
    /**
     *  Adds an event handler to an already existing DOM element
     *  @function addStaticListener
     *  @param {DOM Element} target - the selector getting an event handler
     *  @param {String} action - the event triggering the behaviour
     *  @param {Function} behaviour - Callback method executed when action is triggered
     *  @param {Function} extraBehaviour - Callback method executed when action is triggered (use only with HOVER event)
     *  @return void
     */  
    function addStaticListener(target, action, behaviour, extraBehaviour){
        if(action == Action.HOVER){
            //$(target).hover()
            if(extraBehaviour != undefined){
                $(target).hover(behaviour,extraBehaviour);
            }else{
                $(target).hover(behaviour);
            }
        }else{
            $(target).bind(action, behaviour);
        }
    }
    
    /**
     *  Adds an event handler to current or dynamically created DOM elements
     *  @function addDynamicListeners
     *  @param {DOM Element} target - the selector getting an event handler
     *  @param {String} action - the event triggering the behaviour
     *  @param {Function} behaviour - Callback method executed when action is triggered
     *  @return void
     */  
    function addDynamicListener(target, action, behaviour){
        $(DOM.DOCUMENT).on(action, target, behaviour);
    }
    
    return{
        isImplementedBy:isImplementedBy
    };
    
}();