/**
 *  Enum -
 *  Defines the parameters and general defines of the application.
 *  @class com.Storybuilder.Application.Parameters
 */

var Application = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.Application');

Application.Parameters =  {
    
    /**
     *  Canvas default width in pixels
     *  @var {int} canvasDefaultWidth  
     */
    canvasDefaultWidth: 640,
    /**
     *  Canvas default Height in pixels
     *  @var {int} canvasDefaultHeight  
     */
    canvasDefaultHeight: 902,

    resources:{
        /**
        *  defines an image
        *  @var {String} image
        */
        image: "image",
        /**
        *  defines audio
        *  @var {String} audio
        */
        audio: "audio",
        /**
        *  defines video
        *  @var {String} video
        */
        video: "video",
        /**
        *  defines the backgrounds resource type
        *  @var {String} manualBackgrounds
        */
        manualBackgrounds: "manualBackgrounds",
        /**
        *  defines the layers resource type
        *  @var {String} autoLayers
        */
        autoLayers: "autoLayers",
        /**
        *  defines the audio resource type
        *  @var {String} autoAudio
        */
        autoAudio: "autoAudio",
        /**
        *  defines the video resource type
        *  @var {String} autoVideo
        */
        autoVideo: "autoVideo",
        /**
        *  defines the animation resource type
        *  @var {String} autoAnimation
        */
        autoAnimation: "autoAnimation"
    },

    canvas:{
        /**
        *  defines the page display
        *  @var {String} pageDisplay
        */
        pageDisplay: "page",
        /**
        *  defines the frame display
        *  @var {String} frameDisplay
        */
        frameDisplay: "frame"
    },
    /**
     *  defines the default frame duration when it is created
     *  @var {String} defaultFrameDuration
     */
    defaultFrameDuration: 10
    
    
};


