define([], function() {

    /*
     *  Use this file to define the settings for Swordfish.
     *  To require these in a module, simply include the following module:
     *    ['settings']
     */

    var settings = {
        /*  elasticsearchUrl
         *  The URL at which your ElasticSearch instance is running.
         *  For example: http://localhost:9200/
         */
        elasticsearchUrl: 'http://localhost:9200',
        /*  elasticsearchIndex
         *  The name of the index in your ElasticSearch instance where your data can be found.
         */
        elasticsearchIndex: 'swordfish',
        elasticsearchDataIndex: 'my_twitter_river',
        /*  default_dash
         *  The path to the dashboard that should be used when none is provided in the URL.
         */
        default_dash: 'app/dashboards/default.json'
    };

    //Expose the settings...
    return settings;
});