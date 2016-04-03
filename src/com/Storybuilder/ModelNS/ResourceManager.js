/**
 *  The ResourceManager is a multi-purposed class that is used as factory, a facade, and a container of the resources included in a story.
 *  @class com.Storybuilder.ModelNS.ResourceManager
 */

//Factory and interface of the resources
var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

ModelNS.ResourceManager = (function() {
    //private
    var instance;
       
    ResourceManager.prototype = new ModelNS.AbstractSerializable();
    ResourceManager.prototype.constructor = ResourceManager;
    ResourceManager.prototype.parent = ModelNS.AbstractSerializable;
    
    function ResourceManager(){
        
        /***************** Retrieve Packages *******************/
        var ImageResource = ModelNS.ImageResource,
        AudioResource = ModelNS.AudioResource,
        VideoResource = ModelNS.VideoResource,
        Parameters = com.Storybuilder.Application.Parameters,
        MathLib = com.Storybuilder.Utility.MathLib;
        /*******************************************************/
        
        var that = this;
        
        var m_newResources = {},
        m_droppedResourcesLength,
        m_droppedResourcesCounter,
        
        m_manualBackgrounds = [],
        m_autoLayers = [],
        m_autoAudio = [],
        m_autoVideo = [],
        m_autoAnimation = [];
        
        /**
         *  Serializes the ResourceManager into a JSON Object - Overrides the parent function
         *  @function toJSON
         *  @return JSON Object
         */    
        this.toJSON = function(){
            return {
            //return the ResourceManager as an object to be stringified then passed in the localStorage
            };
        };
            
        /**
         *  Deletes a resource based on its name and its resource type (backgrounds, layers, audio, video, ...)
         *  @function deleteResource
         *  @param {String} name - the resource's name
         *  @param {String} resourceClass - the resource's type
         *  @return void
         */      
        this.deleteResource = function(name, resourceClass){
            if(resourceClass == "manualBackgrounds"){
                removeResource(name, m_manualBackgrounds);
            } else if(resourceClass == "autoLayers"){
                removeResource(name, m_autoLayers);
            } else if(resourceClass == "autoAudio"){
                removeResource(name, m_autoAudio);
            } else if(resourceClass == "autoVideo"){
                removeResource(name, m_autoVideo);
            } else if(resourceClass == "autoAnimation"){
                removeResource(name, m_autoAnimation);
            } else{
                //Should never come here
                alert("Critical error occured: This resource type does not exist!");
                return false;
            }
            return false;
        };
        
        /**
         *  Returns a resource based on its name and its resource type (backgrounds, layers, audio, video, ...)
         *  @function getResource
         *  @param {String} name - the resource's name
         *  @param {String} resourceClass - the resource's type
         *  @return void
         */   
        this.getResource = function(name, resourceClass){
            if(resourceClass == Parameters.resources.manualBackgrounds){
                return MathLib.findObjectByMember(name, m_manualBackgrounds, "getName");
            } else if(resourceClass == Parameters.resources.autoLayers){
                return MathLib.findObjectByMember(name, m_autoLayers, "getName");
            } else if(resourceClass == Parameters.resources.autoAudio){
                return MathLib.findObjectByMember(name, m_autoAudio, "getName");
            } else if(resourceClass == Parameters.resources.autoVideo){
                return MathLib.findObjectByMember(name, m_autoVideo, "getName");
            } else if(resourceClass == Parameters.resources.autoAnimation){
                return MathLib.findObjectByMember(name, m_autoAnimation, "getName");
            }
            return false;
        }
        
        /**
         *  Returns a resource's information based on its name and its resource type (backgrounds, layers, audio, video, ...)
         *  @function getResourceInfo
         *  @param {DOM element} el - the target resource element
         *  @return void
         */   
        this.getResourceInfo = function(el){
            var resourceClass = $(el).attr("data-resource"),
            name = $(el).attr("data-name"),
            type = $(el).attr("data-type");
            
            return fetchResourceData(name,resourceClass);
            
        };
        
        /**
         *  Adds resources that were drag and dropped from the desktop to the application
         *  @function addResources
         *  @param {File []} files - the files containing the dropped resources data
         *  @param {String} resourceClass - the resource type container on which the files were dropped (backgrounds, layers, ...)
         *  @param {String} type - the type of resources that were dropped (images, audio, video, ...)
         *  @param {Function} delayCallback - the callback function that is called once all the resources were loaded in the application
         *  @return {Object Literal}
         */ 
        this.addResources = function(files, resourceClass, type, callback, delayCallback){
            m_droppedResourcesCounter = 0;
            m_droppedResourcesLength = files.length;
            //reset new resources value
            m_newResources = {};
            
            for(var i = 0; i<files.length; i++){
                if(files[i].size >= 7000000 && type == Parameters.resources.image){
                    m_droppedResourcesCounter++;
                    alert("The image named "+files[i].name+" is too large (over 7 Mo) and is not accepted in the Storybuilder");
                }else{
                    processFile(files[i], resourceClass, callback, delayCallback);
                }
                
            }
            
        };
        
        /**
         *  Returns the resources that were newly added
         *  @function getNewResources
         *  @return {Object Literal}
         */   
        this.getNewResources = function(){
            return m_newResources;
        };
        
        function removeResource(name, resourceArray){
            var object;
            for(var i = 0; i<resourceArray.length; i++){
                object = resourceArray[i];
                if(object.getName() == name){
                    MathLib.removeElementFromArray(i, resourceArray);
                }
            }
        }
        
        function fetchResourceData(name, resourceClass){
            if(resourceClass == "manualBackgrounds"){
                return getResourceClass(name, m_manualBackgrounds);
            } else if(resourceClass == "autoLayers"){
                return getResourceClass(name, m_autoLayers);
            } else if(resourceClass == "autoAudio"){
                return getResourceClass(name, m_autoAudio);
            } else if(resourceClass == "autoVideo"){
                return getResourceClass(name, m_autoVideo);
            } else if(resourceClass == "autoAnimation"){
                return getResourceClass(name, m_autoAnimation);
            } else{
                //Should never come here
                alert("Critical error occured: This resource type does not exist!");
                return false;
            }
        }
        
        function getResourceClass(name, resourceArray, type){
            var object = MathLib.findObjectByMember(name, resourceArray, "getName");
            if(object != null){
                return object.getInfo();
            }
            return false;
        }
        
        function existingFile(name, type){
            var imageResource,
            i;
            if(type == Parameters.resources.manualBackgrounds){
                if(m_manualBackgrounds.length > 0){
                    for(i = 0; i<m_manualBackgrounds.length; i++){
                        imageResource = m_manualBackgrounds[i];
                        if(name == imageResource.getName()){
                            //It's a duplicate resource (same name so we don't override)
                            return true;
                        }
                    }
                }
                return false;
            } else if(type == Parameters.resources.autoLayers){
                if(m_autoLayers.length > 0){
                    for(i = 0; i<m_autoLayers.length; i++){
                        imageResource = m_autoLayers[i];
                        if(name == imageResource.getName()){
                            //It's a duplicate resource (same name so we don't override)
                            return true;
                        }
                    }
                }
                return false;
            } else if(type == Parameters.resources.autoAudio){
                if(m_autoAudio.length > 0){
                    for(i = 0; i<m_autoAudio.length; i++){
                        imageResource = m_autoAudio[i];
                        if(name == imageResource.getName()){
                            //It's a duplicate resource (same name so we don't override)
                            return true;
                        }
                    }
                }
                return false;
            } else if(type == Parameters.resources.autoVideo){
                if(m_autoVideo.length > 0){
                    for(i = 0; i<m_autoVideo.length; i++){
                        imageResource = m_autoVideo[i];
                        if(name == imageResource.getName()){
                            //It's a duplicate resource (same name so we don't override)
                            return true;
                        }
                    }
                }
                return false;
            } else if(type == Parameters.resources.autoAnimation){
                if(m_autoAnimation.length > 0){
                    for(i = 0; i<m_autoAnimation.length; i++){
                        imageResource = m_autoAnimation[i];
                        if(name == imageResource.getName()){
                            //It's a duplicate resource (same name so we don't override)
                            return true;
                        
                        }
                    }
                }
                return false;
            }
            return false;
        }
        
        
        function processFile(file, type, callback, delayCallback){
            
            var delayCallbackFired = false;
            
            
            function checkAllResourcesAdded(){
                if(m_droppedResourcesCounter == m_droppedResourcesLength){
                    //Fire the callback when all the dropped resources have been parsed
                    callback(m_newResources, type);
                }
            }
        
            function appendDroppedResourcesCounter(){
                m_droppedResourcesCounter++;
                checkAllResourcesAdded();
            }
            
            var name = file.name,
            size = file.size,
            MIMEType = file.type;
            
            if(!existingFile(name, type)){
                if(delayCallbackFired == false){
                    delayCallback();
                    delayCallbackFired = true;
                }
                
                var reader = new FileReader();
                reader.onload = function(e) { 
                    // get file content  
                    var uri = e.target.result; 
                
                    if(type == Parameters.resources.manualBackgrounds){
                        m_manualBackgrounds.push(new ImageResource(name, uri, size, MIMEType, appendDroppedResourcesCounter));
                        m_newResources[name] = uri;
                    } else if(type == Parameters.resources.autoLayers){
                        m_autoLayers.push(new ImageResource(name, uri, size, MIMEType, appendDroppedResourcesCounter));
                        m_newResources[name] = uri;
                    } else if(type == Parameters.resources.autoAudio){
                        m_autoAudio.push(new AudioResource(name, uri, size, MIMEType, appendDroppedResourcesCounter));
                        m_newResources[name] = null;
                    } else if(type == Parameters.resources.autoVideo){
                        m_autoAudio.push(new VideoResource(name, uri, size, MIMEType, appendDroppedResourcesCounter));
                        m_newResources[name] = null;
                    
                    } else if(type == Parameters.resources.autoAnimation){
                    
                }      
                }
                reader.readAsDataURL(file);
            
                
            }else{
                appendDroppedResourcesCounter();
                alert("A file with the name "+name+" was already added in this resource container!");
            }  
            return false;
        }
        
            
    }
    
    var _static = {
       /**
        *  Static - Returns the instance of the ResourceManager
        *  @function getInstance
        *  @return com.Storybuilder.ModelNS.ResourceManager
        */
        getInstance: function(){
            if(instance === undefined){
                instance = new ResourceManager();
            }
            
            return instance;
        }
    };
    
    return _static;
})();