/**
 *  The ResourceManager 
 *  @class com.Storybuilder.ViewNS.View
 */

var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.View = (function() {
    //private
    var instance;
    
    function View(){
        
        /***************** Retrieve Packages *******************/
        var MenuModule = ViewNS.MenuModule,
        ResourceModule = ViewNS.ResourceModule,
        CanvasModule = ViewNS.CanvasModule,
        TimelineModule = ViewNS.TimelineModule,
        PanelModule = ViewNS.PanelModule,
        DialogsModule = ViewNS.DialogsModule,
        Action = ViewNS.Action,
        DOM = ViewNS.DOM,
        AbstractInteractiveInterface = ViewNS.AbstractInteractiveInterface,
        ViewClasses = ViewNS.ViewClasses;
        /*******************************************************/
        
        //The view components are regrouped in a same namespace so that one module can call the another module's methods
        //The purpose of this sub-namespace is for code organisation and ease of reading.
        
        //private
        var that = this;
        
        AbstractInteractiveInterface.isImplementedBy(this);
        
        var m_controller;
        
        var m_viewModules = {
        //Added dynamically
        };
        
        //Private Methods
            
        
        //Public Methods
        
        
        /**
         *  Sets the reference of the controller to the view, instantiates all the modules with their listeners and resizes the application
         *  to fit the browser window
         *  @function init
         *  @param {com.Storybuilder.ControllerNS.Controller} controller - The application's controller
         *  @return void
         */
        this.init = function(controller){
            m_controller = controller;
                
            m_viewModules.menu = new MenuModule(m_viewModules, m_controller);
            m_viewModules.resources = new ResourceModule(m_viewModules, m_controller);
            m_viewModules.canvas = new CanvasModule(m_viewModules, m_controller);
            m_viewModules.timeline = new TimelineModule(m_viewModules, m_controller);
            m_viewModules.panel = new PanelModule(m_viewModules, m_controller);
            m_viewModules.dialogs = new DialogsModule(m_viewModules, m_controller);
                
            //Initialize Listeners
            initGeneralListeners();
            
            m_viewModules.menu.initListeners();
            m_viewModules.resources.initListeners();
            m_viewModules.canvas.initListeners();
            m_viewModules.timeline.initListeners();
            m_viewModules.panel.initListeners();
            m_viewModules.dialogs.initListeners();
            
            resize();
            m_viewModules.panel.disableLayerTools();
           
        };
        
        /**
         *  Returns the Menu Module of the View
         *  @function getMenuView
         *  @return com.Storybuilder.ViewNS.MenuModule
         */
        this.getMenuView = function(){
            return m_viewModules.menu;
        };
        
        /**
         *  Returns the Resources Module of the View
         *  @function getResourcesView
         *  @return com.Storybuilder.ViewNS.ResourceModule
         */
        this.getResourcesView = function(){
            return m_viewModules.resources;
        };
        
        /**
         *  Returns the Canvas Module of the View
         *  @function getCanvasView
         *  @return com.Storybuilder.ViewNS.CanvasModule
         */
        this.getCanvasView = function(){
            return m_viewModules.canvas;
        };
        
        /**
         *  Returns the Timeline Module of the View
         *  @function getTimelineView
         *  @return com.Storybuilder.ViewNS.TimelineModule
         */
        this.getTimelineView = function(){
            return m_viewModules.timeline;
        };
        
        /**
         *  Returns the Panel Module of the View
         *  @function getPanelView
         *  @return com.Storybuilder.ViewNS.PanelModule
         */
        this.getPanelView = function(){
            return m_viewModules.panel;
        };
        
        /**
         *  Returns the Dialogs Module of the View
         *  @function getDialogsView
         *  @return com.Storybuilder.ViewNS.DialogsModule
         */
        this.getDialogsView = function(){
            return m_viewModules.dialogs;
        };
        
        /**
         *  Initiates the workspace when a new project is created or opened
         *  @function initWorkspace
         *  @return void
         */
        this.initWorkspace = function(data){
                
            if(arguments.length == 1){
            //Project was opened from localStorage we need to rebuild the workspace
            } else{
                $("#left, #bottom, #right, #toolbar").removeClass("hidden");
            //New Project - Setup default Workspace
            }

            m_viewModules.timeline.addPageThumbnail(1);
            m_viewModules.timeline.setActivePage(1);
        };
        
        /**
         *  Pushes a text file download to the user
         *  @function initWorkspace
         *  @param {String} data - The data that we want the user to download
         *  @return void
         */
        this.download = function(data){
            DOM.WINDOW.open( "data:application/octet-stream;charset=utf-8,"+escape(data));
        };
    
    
        function initGeneralListeners(){
            window.onbeforeunload = function (e) {
                //if story is saved (boolean)
                //else just close
                e = e || window.event;
                // For IE and Firefox prior to version 4
                if (e) {
                    e.returnValue = "";
                }

                // For Safari
                return "";
            };

            $(DOM.DOCUMENT).bind(Action.DRAGOVER, function(e){
                m_controller.cancel(e);
            });
            
            $(DOM.DOCUMENT).bind(Action.DROP, function(e){
                m_controller.cancel(e);
            });
                
            $(DOM.BODY).click(function(e){
                //cancel active ui elements
                if(m_viewModules.menu.isMenuOpened()){
                    m_viewModules.menu.closeMenu();
                }
            });
                
            $(DOM.DOCUMENT).on(Action.SUBMIT,"body form", function(e){ 
                e.preventDefault();
                m_controller.processForm(this);
            });
                
            $(DOM.WINDOW).resize((function() {
                var timeout = null;
                return function() {
                    if (timeout) clearTimeout(timeout);
                    timeout = setTimeout(resize, 50);
                };
            })());
        }
        
        function resize() {
            var pixelHeight, percentHeight, pixelWidth, percentWidth;
            var contentHeight = $(DOM.DOCUMENT).height()-$("#top").height();

            pixelHeight = contentHeight;
            percentHeight = (pixelHeight/$(DOM.DOCUMENT).height())*100;

            $("#left").height(pixelHeight);
    
            pixelHeight = contentHeight*0.81;
            percentHeight = (pixelHeight/$(DOM.DOCUMENT).height())*100;

                
    
            pixelHeight = contentHeight*0.19;
            percentHeight = (pixelHeight/$(DOM.DOCUMENT).height())*100;
            $("bottom").height(pixelHeight);
                
            //FIX THIS - not valid anymore
            pixelHeight = contentHeight-$("#bottom").height();
            $("#right").height(pixelHeight);
    
            pixelWidth = $("#bottom").width();
            pixelWidth = pixelWidth-150;
            $("#scrollableTimeline").width(pixelWidth);
            $("#toolbarArea").height(contentHeight);
        }
    }
    var _static = {
        /**
        *  Static - Returns the instance of the View
        *  @function getInstance
        *  @return com.Storybuilder.ViewNS.View
        */
        getInstance: function(){
            if(instance === undefined){
                instance = new View();
            }
            return instance;
        }
    }
    return _static;
})();