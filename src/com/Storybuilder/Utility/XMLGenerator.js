/**
 *  Static -
 *  The XMLGenerator class provides methods to build the appropriate XML files when exporting a story
 *  @class com.Storybuilder.Utility.XMLGenerator
 */

var Utility = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.Utility');

Utility.XMLGenerator = function(){
    
    var version = 1.0;
    
    /**
     *  Builds the metadata XML String of a story
     *  @function buildMetaData
     *  @param {Model} model -
     *  @return string
     */  
    function buildMetaData(model){
        var genres = model.getStory().getGenres(),
        i;
        var firstPage = model.getPages()[0].getManualBackground();
        var srcFirst = "";
        var resourceData = [];
        if(firstPage){
            srcFirst = firstPage.getName();
            resourceData = srcFirst.split('.');
        } else{
            resourceData.push("");
            resourceData.push("");
        }
        
        var credits = model.getStory().getCredits();
        var xml = "";
        xml += printXMLHeader();
        xml += '<series uid="1" title="'+model.getStory().getSeriesTitle()+'" publisher="'+model.getStory().getPublisher()+'">\n';
        xml += '\t<artwork src="art" type="png"/>\n';
        xml += '\t<genres>\n';
        for(i = 0; i<genres.length; i++){
            xml += '\t\t<genre>'+genres[i]+'</genre>\n';
        }
        xml += '\t</genres>\n';
        xml += '\t<episode uid="'+model.getStory().getEpisodeID()+'" issue="'+model.getStory().getIssueNumber()+'" title="'+model.getStory().getEpisodeTitle()+'" pages="'+model.getPages().length+'">\n';
        xml += '\t\t<date format="ISO8601">';
        xml += '2012-09';
        xml += '</date>\n'
        xml += '\t\t<rating country="uk">';
        xml += '18+';
        xml += '</rating>\n';
        xml += '\t\t<cover src="'+resourceData[0]+'" type="'+resourceData[1]+'" />\n';
        xml += '\t\t<summary>\n';
        xml += model.getStory().getEpisodeSummary();
        xml += '\t\t</summary>\n';
        xml += '\t\t<credits>\n';
        for(i = 0; i<credits.length; i++){
            xml += '\t\t\t<credit name="'+credits[i]+'">\n';
            xml += '\t\t\t\t<role></role>\n';
            xml += '\t\t\t</credit>\n';
        }
        xml += '\t\t</credits>\n';
        xml += '\t</episode>\n';
        xml += '</series>\n';
        
        return xml;
    }
    
    /**
     *  Builds an XML String of a story's attributes and behaviour
     *  @function buildStory
     *  @param {Model} model -
     *  @return string
     */  
    function buildStory(model){
        var pages = model.getPages(),
        i, j;
        
        var xml = "";
        xml += printXMLHeader();
        xml += '<episode uid="'+model.getStory().getEpisodeID()+'">';
        for(i = 0; i<pages.length; i++){
            var page = pages[i],
            manualBackground = page.getManualBackground();
            var resourceData = [],
            srcFirst;
            if(manualBackground){
                srcFirst = manualBackground.getName();
                resourceData = srcFirst.split('.');
            } else{
                resourceData.push("");
                resourceData.push("");
            }
            
            xml += '<page src="'+resourceData[0]+'" type="'+resourceData[1]+'" number="'+page.getNumber()+'" frames="'+page.getFrames().length+'">';
                var length = page.getFrames().length;
                for(j = 0; j<page.getFrames().length; j++){
                    var frame = page.getFrames()[j];
                    xml += '<frame number="'+j+'">';
                    xml += '<rect x="'+frame.getX()+'" y="'+frame.getY()+'" w="'+frame.getWidth()+'" h="'+frame.getHeight()+'"/>';
                    if(j == 0){
                        xml += '<event>';
                        xml += '<start time = "0" format="seconds" />';
                        xml += '<command type="playAudio">';
                        xml += '<audio src="bearlands_000_128_stereo" type="mp3"/>';
                        xml += '</command>';
                        xml += '</event>';
                    }
                    xml += '<event>';
                    xml += '<start time="'+frame.getFrameStart()+'" format="seconds" />';
                    if(j == (length-1)){
                        xml += '<command type="nextPage">';
                    } else{
                        xml += '<command type="nextFrame">';
                    }
                    xml += '</command>';
                    xml += '</event>';
                    xml += '</frame>';
                }
            xml += '</page>';
        }
        xml += '</episode>';
        
        return xml;
    }
    
    /**
     *  Builds an XML String of the resources used in a story
     *  @function buildResources
     *  @param {com.Storybuilder.ModelNS.ResourceManager} resourceManager -
     *  @return string
     */  
    function buildResources(resourceManager){
        var xml;
        xml += printXMLHeader();
        return xml;
    }
    
    return{
        buildMetaData: buildMetaData,
        buildStory: buildStory,
        buildResources: buildResources
    };
    
    function printXMLHeader(){
        return '<?xml version="1.0" encoding="UTF-8" ?>\n';
    }
    
    //Add further generic XML builder private functions
    
}();