/**
 *  Contains an API for managing dialogs in the Storybuilder
 *  @class com.Storybuilder.ViewNS.DialogsModule
 *  @extends com.Storybuilder.ViewNS.AbstractViewModule
 */

var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.DialogsModule = function(modulesRoot, controller){
    
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
    
    var that = this;
    
    /**
     *  Initiates the listeners attached to the dialogs
     *  @function initListeners
     *  @return void
     */
    this.initListeners = function(){
        
        $(DOM.DOCUMENT).on(Action.KEYUP, '#newStoryForm input', function(){
            m_controller.checkForm($(this).closest("form"),this);
        });


                
                
        $(DOM.DOCUMENT.body).delegate("#dialogHeader a", Action.CLICK, function(e) {
            e.preventDefault();
            $("#wrapper").remove();
        });
        $(DOM.DOCUMENT.body).delegate(".submitCell button", Action.CLICK, function(e) {
            $("#wrapper").remove();
        });
            
        $(DOM.DOCUMENT.body).delegate(".helpCell a", Action.MOUSEENTER ,function(e){
            $(this).closest(".helpCell").find(".helpBubble").css("display","block");
        });
        $(DOM.DOCUMENT.body).delegate(".helpCell a",Action.CLICK,function(e){
            e.preventDefault();
        });
                
        $(DOM.DOCUMENT.body).delegate(".helpCell a","mouseleave",function(e){
            $(this).closest(".helpCell").find(".helpBubble").css("display","none");
        });
        
    };
    
    /**
     *  Displays a confirm message to the user. A callback is executed if the user validates the message
     *  @function openConfirm
     *  @param {String} message - the message that is displayed to the user. The HTML String is created by selecting one of the
     *  Dialogs functions generating the message
     *  @param {Function} callback - the function that is executed is the user validates the message 
     *  @return void
     */
    this.openConfirm = function(message, callback){
        m_modulesRoot.menu.closeMenu();
        $(DOM.BODY).append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .attr("id","messageBoxWrapper")
            .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                .attr("id","wrapper_container")
                .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                    .attr("id","dialogHeader")
                    .append($(DOM.DOCUMENT.createElement(DOM.SPAN))
                        .addClass("dialogHeaderText")
                        .html("Storybuilder confirm message")
                    
                        )
                    .append($(DOM.DOCUMENT.createElement('a'))
                        .addClass("floatRight")
                        .addClass("dialogCloser")
                        .attr("href","#")
                        .html("X")
                        .click(function(e){
                            $("#messageBoxWrapper").remove();  
                        })
                    
                        )
                        
                    )
                .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                    .attr("id","dialogContent")
                    .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                        .attr("id","messageContent")
                        .html(message)
                        )   
                    .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                        .attr("id","confirmButtons")
                        .append($(DOM.DOCUMENT.createElement(DOM.BUTTON))
                            .html("Cancel")
                            )
                            
                        .append($(DOM.DOCUMENT.createElement(DOM.BUTTON))
                            .html("OK")
                            .click(callback)
                            )
                        )
                        
                    )
                )
            )
        $("#messageBoxWrapper "+DOM.BUTTON).click(function(e){
            $("#messageBoxWrapper").remove();  
        });
    };
       
    /**
     *  Displays a dialog box to the user. Dialogs wrap dynamically created forms and other tools altering the behaviour of a story
     *  @function openDialog
     *  @param {String} Dialog - the markup that is displayed to the user. The markup is created by selecting one of the
     *  Dialogs functions
     *  @return void
     */        
    this.openDialog = function(Dialog){
        m_modulesRoot.menu.closeMenu();
        $(DOM.DOCUMENT.body).append($(DOM.DOCUMENT.createElement('div'))
            .attr("id","wrapper")
            .append($(DOM.DOCUMENT.createElement('div'))
                .attr("id","wrapper_container")
                .append(Dialog)
                )
            )
    };
    
    /**
     *  Displays an error message near the target area when the user made an input error in a form
     *  @function displayErrorMessage
     *  @param {DOM element} el - the target element
     *  @return void
     */
    this.displayErrorMessage = function(el){
        if($('span[data-for="'+$(el).attr("name")+'"]').hasClass("invisible")){
            $('span[data-for="'+$(el).attr("name")+'"]').removeClass("invisible");
        }
    };
    
    /**
     *  Hides the error message attached to an element
     *  @function hideErrorMessage
     *  @param {DOM element} el - the target element
     *  @return void
     */
    this.hideErrorMessage = function(el){
        if(!$('span[data-for="'+$(el).attr("name")+'"]').hasClass("invisible")){
            $('span[data-for="'+$(el).attr("name")+'"]').addClass("invisible");
        }
        

    };
    
    /**
     *  Enables the submit button of a form
     *  @function enableForm
     *  @param {DOM element} form - the target form
     *  @return void
     */
    this.enableForm = function(form){
        var submit = $(form).find('input[type="submit"]');
        if($(submit).attr("disabled")){
            $(form).find('input[type="submit"]').removeAttr("disabled");
        }
    };
    
    /**
     *  Disables the submit button of a form
     *  @function disableForm
     *  @param {DOM element} form - the target form
     *  @return void
     */
    this.disableForm = function(form){
        var submit = $(form).find('input[type="submit"]');
        if(!$(submit).attr("disabled")){
            $(form).find('input[type="submit"]').attr("disabled","disabled");
        }
    };
    
    /**
     *  Clears all the text input fields of a form
     *  @function clearFields
     *  @param {DOM element} form - the target form
     *  @return void
     */
    this.clearFields = function(form){
        $('#'+$(form).attr("id")+' input[type="text"],#'+$(form).attr("id")+' textarea').val("");
    };
            
}

ViewNS.DialogsModule.prototype = new ViewNS.AbstractViewModule();
ViewNS.DialogsModule.prototype.constructor= ViewNS.DialogsModule;
ViewNS.DialogsModule.prototype.parent = ViewNS.AbstractViewModule.prototype;