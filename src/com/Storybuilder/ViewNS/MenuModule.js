/**
 *  Contains an API for managing the menus in the Storybuilder
 *  @class com.Storybuilder.ViewNS.MenuModule
 *  @extends com.Storybuilder.ViewNS.AbstractViewModule
 */

var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.MenuModule = function(modulesRoot, controller){
    
    ViewNS.AbstractViewModule.apply(this, arguments);
    
    /***************** Retrieve Packages *******************/
    /*******************************************************/
    
    /***************** Emulate Protected Variables *******************/
    var Action = this.getAction(),
    DOM = this.getDOM(),
    ViewClasses = this.getViewClasses(),
    Parameters = this.getParameters(),
    m_controller = this.getController(),
    m_modulesRoot = this.getModulesRoot();
    /*****************************************************************/
    
    
    var that = this,
    mb_menuOpened = false,
    m_menus = $(".menu_list_item");

    
    //Public Methods
    
    /**
     *  Checks if a menu is currently opened
     *  @function isMenuOpened
     *  @return boolean
     */
    this.isMenuOpened = function(){
        return mb_menuOpened;
    }
    
    /**
     *  Initiates the listeners attached to the menu
     *  @function initListeners
     *  @return void
     */
    this.initListeners = function(){
        that.addStaticListener(".menu_item_header", Action.CLICK, function(e){
            e.stopPropagation();
            if(mb_menuOpened){
                $(".menu_item_content_activated").removeClass("menu_item_content_activated");
                $(this).css("background-color", "#CCCCCC");
                $(this).css("color", "#000000");
            } else{
                $(this).closest("li").find(".menu_item_content").addClass("menu_item_content_activated");
                $(this).css("background-color", "#000077");
                $(this).css("color", "#FFFFFF");
            }
            mb_menuOpened = !mb_menuOpened;

        });
        
        that.addStaticListener(".menu_item_header", Action.HOVER, function(e){
            if(mb_menuOpened){
                if(!$(this).closest("li").find(".menu_item_content_activated").length){
                    $(".menu_item_content_activated").closest("li").find(".menu_item_header").css("background-color", "transparent");
                    $(".menu_item_content_activated").closest("li").find(".menu_item_header").css("color", "#000000");
                    $(".menu_item_content_activated").removeClass("menu_item_content_activated");
                    $(this).closest("li").find(".menu_item_content").addClass("menu_item_content_activated");
                    $(this).css("background-color", "#000077");
                    $(this).css("color", "#FFFFFF");
                }
            } else{
                if(mb_menuOpened){
            
                }
                $(this).css("background-color", "#CCCCCC");
                $(this).css("color", "#000000");
            }
        }, function(e){
            if(mb_menuOpened){
        
            } else{
                $(this).css("background-color", "transparent");
            }
        });
                
        that.addStaticListener(m_menus, Action.CLICK, function(e){
            e.stopPropagation();
            if(!$(this).hasClass("disabled")){
                //trigger click event - this has to be passed in the controller
                var dataAction = $(this).attr("data-action");
                        
                dataAction = parseInt(dataAction);
                m_controller.execute("parseMenuAction", dataAction);        
            }
            that.closeMenu();
        });
        
        this.enableMenus = function(menus){
            for(var i = 0; i<menus.length; i++){
                if($('.menu_list_item[data-action="'+menus[i]+'"]').hasClass("disabled")){
                    $('.menu_list_item[data-action="'+menus[i]+'"]').removeClass("disabled");
                }
            }
        };
            
        this.disableMenus = function(menus){
            for(var i = 0; i<menus.length; i++){
                if(!$('.menu_list_item[data-action="'+menus[i]+'"]').hasClass("disabled")){
                    $('.menu_list_item[data-action="'+menus[i]+'"]').addClass("disabled");
                }
            }
        };
    };
    
    /**
     *  Closes all opened menus
     *  @function closeMenu
     *  @return void
     */
    this.closeMenu = function(){
        $(".menu_item_content_activated").closest("li").find(".menu_item_header").css("background-color", "transparent");
        $(".menu_item_content_activated").closest("li").find(".menu_item_header").css("color", "#000000");
        $(".menu_item_content_activated").removeClass("menu_item_content_activated");
        mb_menuOpened = !mb_menuOpened;
    }
    
}

ViewNS.MenuModule.prototype = new ViewNS.AbstractViewModule();
ViewNS.MenuModule.prototype.constructor= ViewNS.MenuModule;
ViewNS.MenuModule.prototype.parent = ViewNS.AbstractViewModule.prototype;