/**
 *  Enum -
 *  Defines the CSS classes and IDs that are used by the application when running.
 *  This class was built to prevent the developer going through the whole CSS file searching for the selector he needs
 *  @class com.Storybuilder.ViewNS.ViewClases
 */

var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.ViewClasses = {
    
    /**
     *  Object literal holding defines for general selectors
     *  @var {Object Literal} General
     */
    General:{
        
        mainContainer: "#main_container",
        
        bottom: "#bottom",
        left: "#left",
        right: "#right",
        top: "#top",
        
        disabled: ".disabled"
    },
    
    /**
     *  Object literal holding defines for the menu module
     *  @var {Object Literal} Menu
     */
    Menu: {
        menu: "#menu",
        menuItem: ".menuItem",
        menuItemHeader: ".menuItemHeader",
        menuItemContent: ".menuItemContent",
        menuListItem: ".menuListItem",
        menuListSeparator: ".menuListSeparator"
    },
    
    /**
     *  Object literal holding defines for the resources module
     *  @var {Object Literal} Resource
     */
    Resources: {
        resourcesContainer: "#resourcesContainer",
        resourceBlock: ".resourceBlock",
        resourceHeader: ".resourceHeader",
        resourceListContainer: ".resourceListContainer",
        resourceList: ".resourceList",
        
        resourceItem: "resourceItem",
        resourceItemWrapper: "resourceItemWrapper",
        resource: "resource",
        
        manualResources: "manualBackgrounds",
        autoBackgrounds: "autoBackgrounds",
        autoLayers: "autoLayers",
        autoAudio: "autoAudio",
        autoVideo: "autoVideo",
        autoAnimation: "autoAnimation"
    },
    
    /**
     *  Object literal holding defines for the canvas module
     *  @var {Object Literal} Canvas
     */
    Canvas:{
        canvasDropArea: "#canvasDropArea",
        canvasContainer: "#canvasContainer",
        canvasArea: "#canvasArea",
        zoomArea: "#zoomArea"
    },
    
    /**
     *  Object literal holding defines for the timeline module
     *  @var {Object Literal} Timeline
     */
    Timeline:{
        timeSpace: "#timeSpace",
        scrollableTimeline: "#scrollableTimeline",
        manualTimeline: "#manualTimeline",
        autoTimeline: "#autoTimeline"
    },
    
    /**
     *  Object literal holding defines for the panel module
     *  @var {Object Literal} Toolbox
     */
    Toolbox:{
        tabs: "#tabs"
    },
    
    /**
     *  Object literal holding defines for drag and drop selectors
     *  @var {Object Literal} DND
     */
    DND:{
        dropArea: ".dropArea"
    }
    
};


