/**
 *  Description
 *  @class com.Storybuilder.Utility.Rect
 */

var Utility = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.Utility');

Utility.Rect = function(x, y, w, h){
    var m_x = x,
    m_y = y,
    m_width = w,
    m_height = h;
        
    /**
     *  Description
     *  @function getX
     *  @return int
     */
    this.getX = function(){
        return m_x;
    };
    
    /**
     *  Description
     *  @function getY
     *  @return int
     */    
    this.getY = function(){
        return m_y;
    };
        
    /**
     *  Description
     *  @function getWidth
     *  @return int
     */
    this.getWidth = function(){
        return m_width;
    };
        
    /**
     *  Description
     *  @function Height
     *  @return int
     */
    this.getHeight = function(){
        return m_height;
    };
    
    /**
     *  Description
     *  @function setX
     *  @param {int} value -
     *  @return void
     */    
    this.setX = function(value){
        m_x = value;
    };
     
    /**
     *  Description
     *  @function setY
     *  @param {int} value -
     *  @return void
     */   
    this.setY = function(value){
        m_y = value;
    };
    
    /**
     *  Description
     *  @function setWidth
     *  @param {int} value -
     *  @return void
     */      
    this.setWidth = function(value){
        m_width = value;
    };
        
    /**
     *  Description
     *  @function setHeight
     *  @param {int} value -
     *  @return void
     */  
    this.setHeight = function(value){
        m_height = value;
    };
        
}