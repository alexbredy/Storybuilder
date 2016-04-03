/**
 *  @project HTML5 Storybuilder
 *  @version 1.0
 *  @author Alexander Bredy
 *  @description The Storybuilder is a local web application built in HTML5. It allows a user to build Comic Books for a tablet device.
 *  @timestamp
 */


String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g,"");
}

/*
 *  List of design patterns used: MVC, singleton, strategy, factory, command, observer, facade, module /revealing module, constructor/prototype pattern for classes + prototype for inheritance
 */
    

/**
 *  Singleton -
 *  This is the main class that runs the Application. The Main method is called automatically when this class is loaded.
 *  @class com.Storybuilder.Application.Bootstrap
 */


var Application = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.Application');

//Self-executing class when the application is booted

Application.Bootstrap = (function () {
    
    //private
    var instance;
    
    
    function Application(){
        
        /***************** Retrieve Packages *******************/
        var Model = com.Storybuilder.ModelNS.Model;
        var View = com.Storybuilder.ViewNS.View;
        var Controller = com.Storybuilder.ControllerNS.Controller;
        /*******************************************************/
        
        //private
        var m_name = "Storybuilder";
        var m_author = "Alexander Bredy";
        
        var m_view = View.getInstance();
        var m_model = Model.getInstance();
        var m_controller = Controller.getInstance(m_view, m_model);
        
        //public
        this.getView = function(){
            return m_view;
        };
        
        this.getModel = function(){
            return m_model;
        };
       
        this.getController = function(){
            return m_controller;
        };
        
        this.getAppName = function(){
            return m_name;  
        };
        
        this.getAuthor = function(){
            return m_author;
        };
            
        
    }
    
    /**
     *  This method instantiates the MVC classes that run the Application
     *  @function Main
     *  @return void
     */
    function Main(){
        instance = new Application();
        instance.getView().init(instance.getController());
        instance.getModel().init(instance.getController());
        instance.getController().init();
    }
    
    //The static part of the singleton classes were inspired from http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript
    var _static = {
        /**
         *  Returns the instance of the Application
         *  @function getInstance
         *  @return Application
         *  @deprecated 1.0 The application now launches itself in the Bootstrap class and should not return the instance of the whole Application.
         *  The method is here if it is needed in the future.
         */
        getInstance: function(){
            if(instance === undefined){
                instance = new Storybuilder();
            }
          
            return instance;
        }
      
    };
    
    //We do not return anything. This class is self-contained and the application starts automatically when this file loads.
    //return _static;
    
    Main();
    
})();
    
   