/**
 *  The Story class holds all the metadata of an opened story
 *  @class com.Storybuilder.ModelNS.Story
 */

var ModelNS = com.Storybuilder.Utility.Namespace.getNamespace('com.Storybuilder.ModelNS');

ModelNS.Story = function(){
    var that = this;
    
    var m_projectID;
        
    var m_episodeTitle, 
    m_episodeID, 
    m_issueNumber, 
    m_date, 
    m_credits = [], 
    m_seriesTitle, 
    m_publisher, 
    m_genres = [], 
    m_episodeSummary;
    
    var m_storyJSON = {};
    m_storyJSON = {
        "episode":{
            "id":null,
            "page":[
            {
                "src":null,
                "number":null,
                "pinchzoom":false,
                "tapzoom":false,
                "frames":0
            }
            ]
        }
    };
    var m_metadataJSON = {};
    m_metadataJSON = {
        "series":{
            "title":null,
            "publisher":null,
            "genres":{
                "genre":[
                null
                ]
            },
            "episode":{
                "id":null,
                "date":"00/00/00",
                "issue":null,
                "title":null,
                "rating":null,
                "credits":{
                    "credit":[
                    {
                        "name":null,
                        "role":null
                    }
                                    
                    ]
                },
                "summary":null
            }
        }
    };
    
    /**
     *  Sets the episode title of the story
     *  @function setEpisodeTitle
     *  @param {String} title - the episode's title
     *  @return void
     */
    this.setEpisodeTitle = function(title){
        m_episodeTitle = title;
    };
    
    /**
     *  Sets the episode title of the story
     *  @function setEpisodeTitle
     *  @param {String} title - the episode's title
     *  @return void
     */
    this.setEpisodeID = function(id){
        m_episodeID = id;
    };
    
    /**
     *  Sets the issue number of the story
     *  @function setIssueNumber
     *  @param {int} number - the story's issue number
     *  @return void
     */    
    this.setIssueNumber = function(number){
        m_issueNumber = number;
    };
    
    /**
     *  Sets the date of creation of the story
     *  @function setDate
     *  @param {Date} date - creation's date
     *  @return void
     */    
    this.setDate = function(date){
        m_date = date;
    };
    
    /**
     *  Sets the credits of the story
     *  @function setCredits
     *  @param {String []} credits - credits array
     *  @return void
     */    
    this.setCredits = function(credits){
        m_credits = credits;
    };
    
    /**
     *  Sets the series title of the story
     *  @function setSeriesTitle
     *  @param {String} title - the serie's title
     *  @return void
     */    
    this.setSeriesTitle = function(title){
        m_seriesTitle = title;  
    };
    
    /**
     *  Sets the publisher of the story
     *  @function setPublisher
     *  @param {String} publisher - the story's publisher
     *  @return void
     */    
    this.setPublisher = function(publisher){
        m_publisher = publisher;
    };
     
    /**
     *  Sets the genres of the story
     *  @function setgenres
     *  @param {String []} genres - the story's genres
     *  @return void
     */     
    this.setGenres = function(genres){
        m_genres = genres;
    };
     
    /**
     *  Sets the summary of the story
     *  @function setEpisodeSummary
     *  @param {String} summary - the story's summary
     *  @return void
     */     
    this.setEpisodeSummary = function(summary){
        m_episodeSummary = summary;
    };
               
    /**
     *  Returns the story's title
     *  @function getEpisodeTitle
     *  @return String
     */        
    this.getEpisodeTitle = function(){
        return m_episodeTitle;
    };
     
    /**
     *  Returns the story's id
     *  @function getEpisodeID
     *  @return int
     */    
    this.getEpisodeID = function(){
        return m_episodeID;
    };
    
    /**
     *  Returns the story's issue number
     *  @function getIssueNumber
     *  @return int
     */   
    this.getIssueNumber = function(){
        return m_issueNumber;
    };
    
    /**
     *  Returns the story's date of creation
     *  @function getDate
     *  @return Date
     */       
    this.getDate = function(){
        return m_date;
    };
    
    /**
     *  Returns the story's credits
     *  @function getCredits
     *  @return String []
     */   
    this.getCredits = function(){
        return m_credits;
    };
    
    /**
     *  Returns the story's series title
     *  @function getSeriesTitle
     *  @return String
     */   
    this.getSeriesTitle = function(){
        return m_seriesTitle;
    };
    
    /**
     *  Returns the story's publisher
     *  @function getPublisher
     *  @return String
     */   
    this.getPublisher = function(){
        return m_publisher;
    };
     
    /**
     *  Returns the story's genres
     *  @function getGenres
     *  @return String []
     */   
    this.getGenres = function(){
        return m_genres;
    };
    
    /**
     *  Returns the story's episode summary
     *  @function getEpisodeSummary
     *  @return String
     */   
    this.getEpisodeSummary = function(){
        return m_episodeSummary;
    };
}