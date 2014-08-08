define([
    'angular',
    'jquery',
    'lodash',
    'settings'
], function(angular, $, _, settings) {
    'use strict';

    var module = angular.module('swordfish.services');

    module.service('dashboard', function($routeParams, $rootScope, $http, notification) {

        //An empty dashboard...
        var _dashboard = {
            title: "",
            description: ""
        };

        //Store this...
        var self = this;

        this.current = _.clone(_dashboard);

        $rootScope.$on('$routeChangeSuccess', function() {
            //Clear existing dashboard...
            self.current = {};
            //Clear notifications...
            notification.clear();
            //...then rerun our function to get the dashboard.
            dash();
        });

        var dash = function() {
                if($routeParams.name) {
                    self.dashLoad($routeParams.name, 'es');
                } else {
                    self.dashLoad('default', 'default');
                }
            };

        this.dashLoad = function(name, type) {
            if(type === 'es') {
                $http.get('http://localhost:9200/swordfish/dashboard/' + name)
                    .success(function(data) {
                        self.current = _.clone(data._source);
                    })
                    .error(function(data) {
                        //If we can't load up the dashboard, we need to trigger a notification.
                        notification.add('Unable to load "' + name + '". Does it exist? Is ElasticSearch down?');
                        return false;
                    });
            } else {
                $http.get(settings.default_dash)
                    .then(function(data) {
                        self.current = _.clone(data.data);
                    });
            }
        };

    });

});