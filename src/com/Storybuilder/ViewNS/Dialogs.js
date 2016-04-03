/**
 *  Static -
 *  The Dialogs class builds html data of generic markup that will be wrapped around dialog containers
 *  @class com.Storybuilder.ViewNS.Dialogs
 */

var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.Dialogs = function() {
    
    /***************** Emulate Protected Variables *******************/
    var DOM = ViewNS.DOM;
    /*****************************************************************/
    
    /**
     *  Returns the markup for displaying the events UI
     *  @function eventPage
     *  @param {Object Literal} data - additional data for building the markup such as the element targetted by the event
     *  @return String
     */
    function eventPage(data){
        var html = $(DOM.DOCUMENT.createElement(DOM.DIV))
        .attr("id","eventPageDialog")
        .append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .attr("id","dialogHeader")
            .append($(DOM.DOCUMENT.createElement(DOM.SPAN))
                .addClass("dialogHeaderText")
                .html("Events for Page 1 Frame 1")
                )
            .append($(DOM.DOCUMENT.createElement(DOM.ANCHOR))
                .addClass("floatRight")
                .attr("href","#")
                .html("X")
                )
                
            )
        .append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .attr("id","dialogContent")
            )
            
        return html;
    }
    
    /**
     *  Returns the markup for opening an existing story
     *  @function openStory
     *  @return String
     */
    function openStory() {
        var html = $(DOM.DOCUMENT.createElement(DOM.DIV))
        .attr("id","openStoryDialog")
        .append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .attr("id","dialogHeader")
            .append($(DOM.DOCUMENT.createElement(DOM.SPAN))
                .addClass("dialogHeaderText")
                .html("Open a Story")
                    
                )
            .append($(DOM.DOCUMENT.createElement(DOM.ANCHOR))
                .addClass("floatRight")
                .attr("href","#")
                .html("X")
                )
            )
        .append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .attr("id","dialogContent")
            .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                .attr("id", "fileContainer")
                .addClass("dropArea")
                .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                    .attr("id","fileArea")
                    .append($(DOM.DOCUMENT.createElement(DOM.SPAN))
                        .attr("id","openText")
                        .html("Drop save file here<br/> (.sbuilder format)")
                        )
                    )
                )
            );
                    
        return html;
    }
    
    /**
     *  Returns the markup of the form for creating a new story
     *  @function newStory
     *  @return String
     */    
    function newStory (){
        var html = $(DOM.DOCUMENT.createElement('div'))
        .attr("id","newStoryDialog")
        .append($(DOM.DOCUMENT.createElement('div'))
            .attr("id","dialogHeader")
            .append($(DOM.DOCUMENT.createElement('span'))
                .addClass("dialogHeaderText")
                .html("Create a New Story")
                    
                )
            .append($(DOM.DOCUMENT.createElement('a'))
                .addClass("floatRight")
                .addClass("dialogCloser")
                .attr("href","#")
                .html("X")
                    
                )
            )
        .append($(DOM.DOCUMENT.createElement('div'))
            .attr("id","dialogContent")
            .append($(DOM.DOCUMENT.createElement('form'))
                .attr("id","newStoryForm")
                .append($(DOM.DOCUMENT.createElement('table'))
                    .addClass("formTable")
                    .append($(DOM.DOCUMENT.createElement('tbody'))
                        
                        
                        //Series Title - Mandatory
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                .append($(DOM.DOCUMENT.createElement('label'))
                                    .addClass("mandatoryField")
                                    .html("Series Title")
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('input'))
                                    .attr({
                                        "type":"text",
                                        "name":"seriesTitle",
                                        "data-mandatory":"true"
                                    })
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .addClass("helpCell")
                                .append($(DOM.DOCUMENT.createElement('a'))
                                    .attr("href","#")
                                    .addClass("helpButton")
                                    .html("?")
                                    )
                                .append($(DOM.DOCUMENT.createElement('div'))
                                    .addClass("helpBubble")
                                    .append($(DOM.DOCUMENT.createElement('span'))
                                        .addClass("helpBubbleMessage")
                                        .html("Type the title of the Series (ex: Bearlands")
                                        )
                                    )
                                )
                            )
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('span'))
                                    .addClass("errorMessage, invisible")
                                    .html("N/A")
                                    )
                                )
                            )
                            
                        //Episode Title - Mandatory
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                .append($(DOM.DOCUMENT.createElement('label'))
                                    .addClass("mandatoryField")
                                    .html("Episode Title")
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('input'))
                                    .attr({
                                        "type":"text",
                                        "name":"episodeTitle",
                                        "data-mandatory":"true"
                                    })
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .addClass("helpCell")
                                .append($(DOM.DOCUMENT.createElement('a'))
                                    .attr("href","#")
                                    .addClass("helpButton")
                                    .html("?")
                                    )
                                .append($(DOM.DOCUMENT.createElement('div'))
                                    .addClass("helpBubble")
                                    .append($(DOM.DOCUMENT.createElement('span'))
                                        .addClass("helpBubbleMessage")
                                        .html("Example: Cutting Zombies on a road")
                                        )
                                    )
                                )
                            )
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('span'))
                                    .attr("data-for","episodeTitle")
                                    .addClass("errorMessage invisible")
                                    .html("A story must have a title!")
                                    )
                                )
                            )
                                    
                        //Episode ID - Mandatory
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                .append($(DOM.DOCUMENT.createElement('label'))
                                    .addClass("mandatoryField")
                                    .html("Episode ID")
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('input'))
                                    .attr({
                                        "type":"text",
                                        "name":"episodeID",
                                        "data-mandatory":"true",
                                        "data-type":"integer"
                                    })
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .addClass("helpCell")
                                .append($(DOM.DOCUMENT.createElement('a'))
                                    .attr("href","#")
                                    .addClass("helpButton")
                                    .html("?")
                                    )
                                .append($(DOM.DOCUMENT.createElement('div'))
                                    .addClass("helpBubble")
                                    .append($(DOM.DOCUMENT.createElement('span'))
                                        .addClass("helpBubbleMessage")
                                        .html("Type the ID of the episode (number 0+)")
                                        )
                                    )
                                )
                            )
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('span'))
                                    .attr("data-for","episodeID")
                                    .addClass("errorMessage invisible")
                                    .html("The id must be an integer (0,1,2,...)")
                                    )
                                )
                            )
                             
                        //Issue number - Mandatory
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                .append($(DOM.DOCUMENT.createElement('label'))
                                    .addClass("mandatoryField")
                                    .html("Issue number")
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('input'))
                                    .attr({
                                        "type":"text",
                                        "name":"issueNumber",
                                        "data-mandatory":"true",
                                        "data-type":"integer"
                                    })
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .addClass("helpCell")
                                .append($(DOM.DOCUMENT.createElement('a'))
                                    .attr("href","#")
                                    .addClass("helpButton")
                                    .html("?")
                                    )
                                .append($(DOM.DOCUMENT.createElement('div'))
                                    .addClass("helpBubble")
                                    .append($(DOM.DOCUMENT.createElement('span'))
                                        .addClass("helpBubbleMessage")
                                        .html("Type the issue number of this episode (0+)")
                                        )
                                    )
                                )
                            )
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('span'))
                                    .attr("data-for","issueNumber")
                                    .addClass("errorMessage invisible")
                                    .html("The issue number must be an integer (0,1,...)")
                                    )
                                )
                            )
                                    
                        //Episode summary - Optional
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                .append($(DOM.DOCUMENT.createElement('label'))
                                    .html("Episode Summary")
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('textarea'))
                                    .attr({
                                        "name":"episodeSummary"
                                    })
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .addClass("helpCell")
                                .append($(DOM.DOCUMENT.createElement('a'))
                                    .attr("href","#")
                                    .addClass("helpButton")
                                    .html("?")
                                    )
                                .append($(DOM.DOCUMENT.createElement('div'))
                                    .addClass("helpBubble")
                                    .append($(DOM.DOCUMENT.createElement('span'))
                                        .addClass("helpBubbleMessage")
                                        .html("Write a summary for this episode")
                                        )
                                    )
                                )
                            )
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('span'))
                                    .addClass("errorMessage, invisible")
                                    .html("N/A")
                                    )
                                )
                            )
                            
                                    
                        //Publisher
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                .append($(DOM.DOCUMENT.createElement('label'))
                                    .html("Publisher")
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('input'))
                                    .attr({
                                        "type":"text",
                                        "name":"publisher"
                                    })
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .addClass("helpCell")
                                .append($(DOM.DOCUMENT.createElement('a'))
                                    .attr("href","#")
                                    .addClass("helpButton")
                                    .html("?")
                                    )
                                .append($(DOM.DOCUMENT.createElement('div'))
                                    .addClass("helpBubble")
                                    .append($(DOM.DOCUMENT.createElement('span'))
                                        .addClass("helpBubbleMessage")
                                        .html("Type the publisher of this Episode")
                                        )
                                    )
                                )
                            )
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('span'))
                                    .addClass("errorMessage, invisible")
                                    .html("N/A")
                                    )
                                )
                            )
                        //Genres
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                .append($(DOM.DOCUMENT.createElement('label'))
                                    .html("Genres")
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('input'))
                                    .attr({
                                        "type":"text",
                                        "name":"genres"
                                    })
                                    )
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .addClass("helpCell")
                                .append($(DOM.DOCUMENT.createElement('a'))
                                    .attr("href","#")
                                    .addClass("helpButton")
                                    .html("?")
                                    )
                                .append($(DOM.DOCUMENT.createElement('div'))
                                    .addClass("helpBubble")
                                    .append($(DOM.DOCUMENT.createElement('span'))
                                        .addClass("helpBubbleMessage")
                                        .html("Example: Zombies, Undead, Horror, etc.")
                                        )
                                    )
                                )
                            )
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .html("Separate each genre with a comma")
                                .addClass("helpMessage")
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .append($(DOM.DOCUMENT.createElement('span'))
                                    .addClass("errorMessage, invisible")
                                    .html("N/A")
                                    )
                                )
                            )
                        .append($(DOM.DOCUMENT.createElement('tr'))
                            .append($(DOM.DOCUMENT.createElement('th'))
                                )
                            .append($(DOM.DOCUMENT.createElement('td'))
                                .addClass("submitCell")
                                .append($(DOM.DOCUMENT.createElement('button'))
                                    .attr("type","button")
                                    .addClass("floatLeft, cancelDialog")
                                    .html("Cancel")
                                    )
                                .append($(DOM.DOCUMENT.createElement('input'))
                                    .attr({
                                        "type":"submit",
                                        "disabled":"disabled",
                                        "value":"Create Story"
                                    })
                                    .addClass("floatRight")
                                    )
                                )
                            )
                            
                        )
                    )
                        
                )
            );
        return html;
    }
    
    /**
     *  Returns the markup for the confirm dialog when a resource is being deleted
     *  @function confirmResourceDeletion
     *  @param {String} itemName - the name of the resource the user wants to delete
     *  @return String
     */
    function confirmResourceDeletion(itemName){
        return "Are you sure you want to delete " + itemName + " ?"; 
    }
    
    /**
     *  Returns the markup for the confirm dialog when the user is about to create a new story while another story is currently opened 
     *  @function confirmCloseProject
     *  @return String
     */
    function confirmCloseProject(){
        return "The creation of a new project will close the current project";
    }
    
    /**
     *  Returns the markup for the confirm dialog when the user is about to delete a layer
     *  @function confirmLayerDeletion
     *  @return String
     */
    function confirmLayerDeletion(){
        return "Are you sure you want to delete this layer?";
    }
    
    /**
     *  Returns the markup for the confirm dialog when the user is about to delete a frame
     *  @function confirmFrameDeletion
     *  @return String
     */
    function confirmFrameDeletion(){
        return "Are you sure you want to delete this frame?";
    }
    
    /**
     *  Returns the markup for the confirm dialog when the user is about to create a new frame but another frame with the same coordinates
     *  already exists on the same page
     *  @function confirmDuplicateFrame
     *  @return String
     */
    function confirmDuplicateFrame(id){
        return "Frame "+id+" has the same coordinates with your current selection. Do you still want to create a new frame?";
    }
    
    /**
     *  Returns the markup for the confirm dialog when the user drags an audio track in the timeline but another track is already attached to it
     *  @function confirmExistingAudio
     *  @param {String} name - the name of the attached audio track
     *  @return String
     */
    function confirmExistingAudio(name){
        return "An audio track with the name "+name+" is already integrated in the timeline. Do you want to override it with the selected track?";
    }
            
                
        
    return{
        NEWSTORY: newStory,
        OPENSTORY: openStory,
        EVENTPAGE: eventPage,
        CONFIRMRESOURCEDELETION: confirmResourceDeletion,
        CONFIRMLAYERDELETION: confirmLayerDeletion,
        confirmFrameDeletion: confirmFrameDeletion,
        confirmDuplicateFrame: confirmDuplicateFrame,
        confirmExistingAudio: confirmExistingAudio,
        CONFIRMCLOSEPROJECT: confirmCloseProject
    };
      
      
}();