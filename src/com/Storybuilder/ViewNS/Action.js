/**
 *  Enum -
 *  Defines a list of all the events used in the application. This class was created to dress up a list 
 *  of useful events and prevents the developer from misspelling the event's name by not passing it as a String
 *  @class com.Storybuilder.ViewNS.Action
 */

//We get the namespace
var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.Action = {

    /**
     *  Mousedown
     *  @var {String} MOUSEDOWN  
     */
    MOUSEDOWN: "mousedown",
    
    /**
     *  Click
     *  @var {String} CLICK  
     */
    CLICK: "click",
    
    /**
     *  Hover
     *  @var {String} HOVER  
     */
    HOVER: "hover",
    
    /**
     *  Submit
     *  @var {String} SUBMIT  
     */
    SUBMIT: "submit",
    
    /**
     *  Dragenter
     *  @var {String} DRAGENTER  
     */
    DRAGENTER: "dragenter",
    
    /**
     *  Dragover
     *  @var {String} DRAGOVER  
     */
    DRAGOVER: "dragover",
    
    /**
     *  Dragleave
     *  @var {String} DRAGLEAVE  
     */
    DRAGLEAVE: "dragleave",
    
    /**
     *  Dragstart
     *  @var {String} DRAGSTART  
     */
    DRAGSTART: "dragstart",
    
    /**
     *  Dragend
     *  @var {String} DRAGEND  
     */
    DRAGEND: "dragend",
    
    /**
     *  Drop
     *  @var {String} DROP  
     */
    DROP: "drop",
    
    /**
     *  Doubleclick
     *  @var {String} DOUBLECLICK  
     */
    DOUBLECLICK: "dblclick",
    
    /**
     *  Keyup
     *  @var {String} KEYUP  
     */
    KEYUP: "keyup",
    
    /**
     *  Mouseenter
     *  @var {String} MOUSEENTER  
     */
    MOUSEENTER: "mouseenter",
    
    /**
     *  Mouseleave
     *  @var {String} MOUSELEAVE  
     */
    MOUSELEAVE: "mouseleave",
    
    /**
     *  Mousemove
     *  @var {String} MOUSEMOVE  
     */
    MOUSEMOVE: "mousemove"
        
        
        
    //extensible for the future (to bind with new event listeners)
      
};