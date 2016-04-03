/**
 *  Enum -
 *  Defines a list of all the DOM elements used in the application. This class was created to dress up a list 
 *  of useful DOM elements and prevents the developer from misspelling the elements's name by not passing it as a String
 *  @class com.Storybuilder.ViewNS.Action
 */

var ViewNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ViewNS');

ViewNS.DOM =  {
    
    /**
     *  document
     *  @var {DOM element} DOCUMENT  
     */
    DOCUMENT: document, //global variable, not in a string
    
    /**
     *  head
     *  @var {DOM element} HEAD  
     */
    HEAD: document.head,
    
    /**
     *  body
     *  @var {DOM element} BODY  
     */
    BODY: document.body,
    
    /**
     *  window
     *  @var {DOM element} WINDOW  
     */
    WINDOW: window,
    
    /**
     *  a
     *  @var {String} ANCHOR  
     */
    ANCHOR: "a",
    
    /**
     *  article
     *  @var {String} ARTICLE  
     */
    ARTICLE: "article",
    
    /**
     *  br
     *  @var {String} BR  
     */
    BR: "br",
    
    /**
     *  button
     *  @var {String} BUTTON  
     */
    BUTTON: "button",
    
    /**
     *  div
     *  @var {String} DIV  
     */
    DIV: "div",
    
    /**
     *  form
     *  @var {String} FORM  
     */
    FORM: "form",
    
    /**
     *  h1
     *  @var {String} H1  
     */
    H1: "h1",
    
    /**
     *  h2
     *  @var {String} H2  
     */
    H2: "h2",
    
    /**
     *  h3
     *  @var {String} H3s  
     */
    H3: "h3",
    
    /**
     *  h4
     *  @var {String} H4  
     */
    H4: "h4",
    
    /**
     *  h5
     *  @var {String} H%  
     */
    H5: "h5",
    
    /**
     *  h6
     *  @var {String} H6  
     */
    H6: "h6",
    
    /**
     *  input
     *  @var {String} INPUT  
     */
    INPUT: "input",
    
    /**
     *  img
     *  @var {String} IMAGE  
     */
    IMAGE: "img",
    
    /**
     *  li
     *  @var {String} LI  
     */
    LI: "li",
    
    /**
     *  nav
     *  @var {String} NAV  
     */
    NAV: "nav",
    
    /**
     *  p
     *  @var {String} PARAGRAPH  
     */
    PARAGRAPH: "p",
    
    /**
     *  section
     *  @var {String} SECTION  
     */
    SECTION: "section",
    
    /**
     *  span
     *  @var {String} SPAN  
     */
    SPAN: "span",
    
    /**
     *  ul
     *  @var {String} UL  
     */
    UL: "ul",
    
    /**
     *  audio
     *  @var {String} AUDIO  
     */
    AUDIO: "audio",
    
    /**
     *  canvas
     *  @var {String} CANVAS  
     */
    CANVAS: "canvas",
    
    /**
     *  progress
     *  @var {String} PROGRESS  
     */
    PROGRESS: "progress",
    
    /**
     *  video
     *  @var {String} VIDEO  
     */
    VIDEO: "video",
    
    
    /**
     *  Object literal holding defines for the attributes of a DOM element
     *  @var {Object Literal} Attributes
     */
    Attributes:{
        
        /**
         *  src
         *  @var {String} SRC  
         */
        SRC: "src",
        
        /**
         *  data-layer
         *  @var {String} DATALAYER  
         */
        DATALAYER: "data-layer",
        
        /**
         *  data-page
         *  @var {String} DATAPAGE  
         */
        DATAPAGE: "data-page"
    }
    
    
    
    
}