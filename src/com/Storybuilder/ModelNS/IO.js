/**
 *  Static -
 *  The IO library holds methods to save and load a story based on JSON data
 *  @class com.Storybuilder.ModelNS.IO
 */

var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

ModelNS.IO = {
    
    /**
     *  Loads a story by parsing the JSON String as a JSON Object. The values from the JSON Object are used for updating the model
     *  @function loadStory
     *  @param {String} json - The JSON String
     *  @param {com.Storybuilder.ModelNS.Model} model - The Storybuilder's model
     *  @return void
     */   
    loadStory: function(json, model){
        
    },
    
    /**
     *  Saves a story by serializing the model to a JSON Object. The JSON Object is then stringified before being returned
     *  @function saveStory
     *  @param {com.Storybuilder.ModelNS.Model} model - The Storybuilder's model
     *  @return String
     */   
    saveStory: function(model){
        var JSONString = "";
        return JSONString;
    }
    
};
