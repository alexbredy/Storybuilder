/**
 *  Contains an API for managing the timeline in the Storybuilder
 *  @class com.Storybuilder.ViewNS.TimelineModule
 *  @extends com.Storybuilder.ViewNS.AbstractViewModule
 */

var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.TimelineModule = function(modulesRoot, controller){

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
     *  Adds a frame on the timeline
     *  @function addTimelineFrame
     *  @param {int} id - frame id
     *  @param {int} page - page id
     *  @param {float} start - starting time of the frame
     *  @param {float} duration - duration of the frame
     *  @param {float} end - ending time of the frame
     *  @param {position} position - position of the frame within the other frames
     *  @return void
     */
    this.addTimelineFrame = function(id, page, start, duration, end, position){
        var html = 
        $(DOM.DOCUMENT.createElement(DOM.LI))
        .addClass("frameTimeline") 
        .append($(DOM.DOCUMENT.createElement(DOM.ANCHOR))
            .attr("data-page",page)
            .attr("data-frame",id)
            .attr("data-start",start)
            .attr("data-duration",duration)
            .attr("data-end",end)
            .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                .addClass("frameData")
                .append($(DOM.DOCUMENT.createElement(DOM.PARAGRAPH))
                    .append("Page: ")
                    .append($(DOM.DOCUMENT.createElement(DOM.SPAN))
                        .addClass("frameTimelinePage")
                        .html(page)
                        )
                    .append(" Frame: ")
                    .append($(DOM.DOCUMENT.createElement(DOM.SPAN))
                        .addClass("frameTimelineFrame")
                        .html(id)
                        )
                    .append($(DOM.DOCUMENT.createElement(DOM.BR)))
                    .append("Start: ")
                    .append($(DOM.DOCUMENT.createElement(DOM.SPAN))
                        .addClass("frameTimelineStart")
                        .html(start.toFixed(1))
                        )
                    .append("s")
                    .append(" End: ")
                    .append($(DOM.DOCUMENT.createElement(DOM.SPAN))
                        .addClass("frameTimelineEnd")
                        .html(end.toFixed(1))
                        )
                    .append("s")
                    .append($(DOM.DOCUMENT.createElement(DOM.BR)))
                    .append("Duration: ")
                    .append($(DOM.DOCUMENT.createElement(DOM.SPAN))
                        .addClass("frameTimelineDuration")
                        .html(duration.toFixed(1))
                        )
                    .append("s")
                    )
                .append($(DOM.DOCUMENT.createElement(DOM.BUTTON))
                    .addClass("layerTimelineButton")
                    .html("Layers")
                    )
                )
                
            
            );
                    
        indexFrameInsert(position, html);
        var target = $("#framesTimelineContainer li:nth-child(" + position + ")");
        updateTimelineUI(target);
        resetResizableFrames();
        prepareFrameSaving();
    };
    
    /**
     *  Deletes a frame from the timeline
     *  @function deleteTimelineFrame
     *  @param {int} id - the frame's id
     *  @param {int} page - the number of the page where the frame is located
     *  @return void
     */
    this.deleteTimelineFrame = function(id, number){
        $('.frameTimeline a[data-frame="'+id+'"][data-page="'+number+'"]').closest(DOM.LI).remove();
        updateTimelineUI('.frameTimeline:first');
        prepareFrameSaving();
    };
    
    /**
     *  Updates the width of the audio timeline
     *  @function updateAudioTimeline
     *  @param {float} currentTime - the max audio track duration
     *  @return void
     */
    this.updateAudioTime = function(currentTime){
        $(".yellowLine").remove();
        $(".trackTime").html(currentTime);
        var x = currentTime*20;
        $("#audioTimeline").append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .addClass("yellowLine")
            .css("left",x)
            )
    //update line on the dynamic timeline
    };
    
    /**
     *  Displays information about the track attached to the timeline
     *  @function updateTrackInfo
     *  @param {String} name - the track's name
     *  @param {float} duration - the track's duration
     *  @return void
     */
    this.updateTrackInfo = function(name, duration){
        $(".trackName").html(name);
        $(".trackDuration").html(duration);
        //$("#audioTimeline").width(duration*20);
    };
    
    /**
     *  Programatically clicks the Dynamic tab of the timeline
     *  @function triggerAutoTabClick
     *  @return void
     */
    this.triggerAutoTabClick = function(){
        $("#autoTab.clickableTab a").trigger(Action.CLICK);
    };
    
    /**
     *  Initiates the listeners attached to the timeline
     *  @function initListeners
     *  @return void
     */
    this.initListeners = function(){
        resetResizableFrames();
        buildAudioTimeline();
        
        
        that.addDynamicListener('#autoTimeline div', Action.CLICK, function(e){
            e.stopPropagation();
            m_controller.execute("processRedLineClick", this);
        });
        
        $("#autoTimeline").mousemove(function(e){
            $(".redLine").remove();
            var x = e.pageX - $("#left").width() - $("#timeSpace").width() + $("#autoTimeline").scrollLeft();
        
       
            $("#audioTimeline").append($(DOM.DOCUMENT.createElement(DOM.DIV))
                .addClass("redLine")
                .css("left",x)
                )
            
            var time = parseFloat(Math.round(x/2)/10).toFixed(1);
            $('.timeHover').html(time);
        
        });
        
        that.addStaticListener('#playButton', Action.CLICK, function(e){
            m_controller.execute("processPlayButtonPressed");
        });
        
        that.addStaticListener('#stopButton', Action.CLICK, function(e){
            m_controller.execute("processStopButtonPressed");
        });
        
        $(DOM.DOCUMENT).on(Action.DOUBLECLICK, '.frameTimeline a', function(){
            
            
        
        
        });
            
        $(DOM.DOCUMENT).on(Action.CLICK, '.frameTimeline a', function(){
                
            });
                
                
        $(DOM.DOCUMENT).on(Action.CLICK, '.clickableTab a', function(){
            var dataTimeline = $(this).attr("data-timeline");
            if(dataTimeline == "manual"){
                $("#manualTab").removeClass("clickableTab");
                $("#autoTab").addClass("clickableTab");
                if($("#manualTimeline").hasClass("hidden")){
                    $("#manualTimeline").removeClass("hidden");
                    $("#manualTabContent").removeClass("hidden");
                }
                if(!$("#autoTimeline").hasClass("hidden")){
                    $("#autoTimeline").addClass("hidden");
                    $("#autoTabContent").addClass("hidden");
                }
            } else if(dataTimeline == "auto"){
                $("#autoTab").removeClass("clickableTab");
                $("#manualTab").addClass("clickableTab");
                if($("#autoTimeline").hasClass("hidden")){
                    $("#autoTimeline").removeClass("hidden");
                    $("#autoTabContent").removeClass("hidden");
                }
                if(!$("#manualTimeline").hasClass("hidden")){
                    $("#manualTimeline").addClass("hidden");
                    $("#manualTabContent").addClass("hidden");
                }
            }
        });
                
        $(DOM.DOCUMENT).on(Action.CLICK, ".pageThumbnailContainer a" ,function() {
            m_controller.execute("processManualTimelineClick", this);
        });
        
    };
    
    /**
     *  Updates the thumbnail of the page the user is currently working on
     *  @function setActivePage
     *  @param {int} number - the page's number
     *  @return void
     */
    this.setActivePage = function(number){
        $('.pageThumbnailContainer a').removeClass("activePage");
        $('.pageThumbnailContainer a[data-page="'+number+'"]').addClass("activePage");
    };
    
    /**
     *  Adds a page thumbnail to the static timeline
     *  @function addPageThumbnail
     *  @param {int} number - the page's number
     *  @return void
     */
    this.addPageThumbnail = function(number){
        $(".pageThumbnailContainer a.activePage").removeClass("activePage");
        var newWidth = $("#manualTimelineContent").width()+120;
        $("#manualTimelineContent").width(newWidth);
        $("#manualTimelineContent")
        .append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .addClass("pageThumbnailContainer")
            .append($(DOM.DOCUMENT.createElement(DOM.ANCHOR))
                .attr("data-page",number)
                .addClass("activePage")
                .append($(DOM.DOCUMENT.createElement(DOM.DIV))
                    .addClass("pageThumbnailWrapper")
                    .append($(DOM.DOCUMENT.createElement(DOM.IMAGE))
                        .addClass("pageThumbnail")
                        )
                    )
                )
            )
    };
    
    /**
     *  Deletes the thumbnail of a page in the static timeline
     *  @function deletePageThumbnail
     *  @param {int} number - the number of the page
     *  @return void
     */
    this.deletePageThumbnail = function(number){
        var newWidth = $("#manualTimelineContent").width()-120;
        $('.pageThumbnailContainer a[data-page="'+number+'"]').closest("div").remove();
    };
    
    /**
     *  Highlights the thumbnail of the active page on the static timeline
     *  @function setCurrentPage
     *  @param {int} number - the active page number
     *  @return void
     */
    this.setCurrentPage = function(number){
        $(".pageThumbnailContainer a.activePage").removeClass("activePage");
        $('.pageThumbnailContainer a[data-page="'+number+'"]').addClass("activePage");
    }
            
    /**
     *  Updates the timeline's black information box
     *  @function updateTimeSpace
     *  @param {int} pages - the total number of pages in the story
     *  @param {int} number - the page the user is currently working on
     *  @param {int} frames - number of frames in the current page
     *  @return void
     */        
    this.updateTimeSpace = function(pages, number, frames){
        $(".pageCounter").html(pages);
        $(".currentPage").html(number);
        $("#frameCounter").html(frames);
    };
    
    function indexFrameInsert(index, html) {
        var size = $(".frameTimeline").size();
        if(index == 0) {
            $("#framesTimelineContainer").prepend(html);        
            return;
        } else if(index == size){
            $("#framesTimelineContainer").append(html); 
            return;
        }
        $("#framesTimelineContainer li:nth-child(" + index + ")").after(html);   
    }
    
    function buildAudioTimeline(){
        var time = 600;
        var width = time*20;
        for(var i = 0; i<=width; i+=20){
            if(i%200 == 0){
                printTenSecondsMarker(i);
            } else{
                printSecondsMarker(i);
            }
        }
    }
    
    function printSecondsMarker(x){
        $("#audioTimeline").append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .addClass("secondsTimeBar")
            .css("left",x)
            )
    }
    
    function printTenSecondsMarker(x){
        var stringNumber = (x/20).toFixed(1);
        var correction = 10;
        if(x == 0){
            correction = 0
        }
        $("#audioTimeline").append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .addClass("tenSecondsTimeBar")
            .css("left",x)
            )
        .append($(DOM.DOCUMENT.createElement(DOM.DIV))
            .addClass("numericTimeReference")
        
            .css("left",x-correction)
            .html(stringNumber)
            )
    }
    
    function updateTimelineUI(target){
        var width = parseInt($(target).width()),
        time = parseFloat(width/20),
        start = parseFloat($(target).find(".frameTimelineStart").html()),
        newEnd = parseFloat(start+time);
        $(target).find(".frameTimelineEnd").html(newEnd.toFixed(1)); 
        $(target).find(".frameTimelineDuration").html(time.toFixed(1));
        
        var newStart = newEnd,
        duration,
        tempEnd;
        $(target).nextUntil().each(function(){
            var el = $(this);
            $(el).find(".frameTimelineStart").html(newStart.toFixed(1));
            duration = parseFloat($(el).find(".frameTimelineDuration").html());
            tempEnd = parseFloat(newStart + duration);
            $(el).find(".frameTimelineEnd").html(tempEnd.toFixed(1));
            newStart = tempEnd;
            
        });
    }
    
    function resetResizableFrames(){
        $(".frameTimeline").resizable({
            resize: function(event, ui) {
                $(this).css("height","100%");
                var target = $("li.ui-resizable-resizing");
                updateTimelineUI(target);
            },
            stop: function(event, ui){
                if(ui.originalSize.width != ui.size.width){
                    prepareFrameSaving();
                }
            },
            handles: "e" ,
            grid: 2,
            containment: "#framesTimelineContainer"
        });
    }
    function prepareFrameSaving(){
        var framesData = [];
        $(".frameTimeline").each(function(){
            var target = $(this),
            anchor = $(target).find("a"),
            page = parseInt($(anchor).attr("data-page")),
            frame = parseInt($(anchor).attr("data-frame")),
            start = parseFloat($(anchor).attr("data-start")),
            duration = parseFloat($(anchor).attr("data-duration")),
            end = parseFloat($(anchor).attr("data-end"));
                        
            framesData.push({
                page: page,
                frame: frame,
                start: start,
                duration: duration,
                end: end
            });
        });
        m_controller.execute("processFramesResized", framesData);
    }
    
}

ViewNS.TimelineModule.prototype = new ViewNS.AbstractViewModule();
ViewNS.TimelineModule.prototype.constructor= ViewNS.TimelineModule;
ViewNS.TimelineModule.prototype.parent = ViewNS.AbstractViewModule.prototype;