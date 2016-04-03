/**
 *  Static class built to emulate an Interface type. The contained method extends the class who will
 *  "implement" it in order to add Obsrevable methods and an array which will contain the observers (an observer being a callback function).
 *  @interface com.Storybuilder.ModelNS.Observable
 */

var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

//Emulation of interface by using the revealing module pattern

ModelNS.Observable = function() {
    
    /**
     *  Implements the Observable's methods and the observers arrays within the object passed in the parameters.
     *  @function isImplementedBy
     *  @param {Object} o - The object that will implement the observable's methods
     *  @return void
     */ 
    function isImplementedBy(o){
        o.observers = [];
        
        /**
         *  Adds an observer to the list of observers
         *  @function addObserver
         *  @param {Function} callback - the callback method representing the observer
         *  @return void
         */ 
        o.addObserver = function(callback){
            o.observers.push(callback);
        };
        
        /**
         *  Removes an observer to the list of observers
         *  @function removeObserver
         *  @param {Function} callback - the callback method representing the observer
         *  @return void
         */ 
        o.removeObserver = function(callback){
            for(var i = 0; i<o.observers.length; i++){
                if(o.observers[i] == callback){
                    MathLib.removeElementFromArray(i, o.observers);
                }
            }
        }
        
        /**
         *  Notifies all the observers by executing the callbacks contained in the observers array
         *  @function notifyObservers
         *  @param {Object Literal} data - the data we want to pass to the observers
         *  @return void
         */ 
        o.notifyObservers = function(data){
            for(var i = 0; i<o.observers.length; i++){
                o.observers[i](data);
            }
        };
    }
    
    return{
        isImplementedBy:isImplementedBy
    };
      
      
}();