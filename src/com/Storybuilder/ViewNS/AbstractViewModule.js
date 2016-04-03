/**
 *  Abstract -
 *  Holds the common attributes of a view module such as a reference to the controller and the modules root
 *  @class {abstract} com.Storybuilder.ViewNS.AbstractViewModule
 *  @see com.Storybuilder.ViewNS.CanvasModule
 *  @see com.Storybuilder.ViewNS.DialogsModule
 *  @see com.Storybuilder.ViewNS.MenuModule
 *  @see com.Storybuilder.ViewNS.PanelModule
 *  @see com.Storybuilder.ViewNS.ResourceModule
 *  @see com.Storybuilder.ViewNS.TimelineModule
 */

var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.AbstractViewModule = function(modulesRoot, controller){
    
    /***************** Retrieve Packages *******************/
    var Action = ViewNS.Action,
    DOM = ViewNS.DOM,
    ViewClasses = ViewNS.ViewClasses,
    AbstractInteractiveInterface = ViewNS.AbstractInteractiveInterface,
    Parameters = com.Storybuilder.Application.Parameters;
    /*******************************************************/
    
    
    AbstractInteractiveInterface.isImplementedBy(this);
    
    var m_modulesRoot = modulesRoot,
    m_controller = controller;
    
    /**
     *  Returns the modules root. Allows to connect with other modules
     *  @function getModulesRoot
     *  @return Object Literal
     */
    this.getModulesRoot = function(){
        return m_modulesRoot;
    };
    
    /**
     *  Returns the Parameters object of the application
     *  @function getParameters
     *  @return com.Storybuilder.Application.Parameters
     */
    this.getParameters = function(){
        return Parameters;
    };
    
    /**
     *  Returns the Controller class reference
     *  @function getController
     *  @return com.Storybuilder.ControllerNS.Controller
     */
    this.getController = function(){
        return m_controller;
    };
    
    //Method to be overriden in sub-classes
    //Prevents from having an error when the view calls this method and the sub-class hasn't implemented the listeners yet
    
    /**
     *  Initiates the listeners. This method is overriden by each child class
     *  @function initListeners
     *  @return void
     */
    this.initListeners = function(){
    };
    
    /**
     *  Returns the Action class
     *  @function getAction
     *  @return com.Storybuilder.ViewNS.Action
     */
    this.getAction = function(){
        return Action;
    };
    
    /**
     *  Returns the DOM class
     *  @function getDOM
     *  @return com.Storybuilder.ViewNS.DOM
     */
    this.getDOM = function(){
        return DOM;
    };
    
    /**
     *  Returns the ViewClasses class
     *  @function getViewClasses
     *  @return com.Storybuilder.ViewNS.ViewClasses
     */
    this.getViewClasses = function(){
        return ViewClasses;
    };
}