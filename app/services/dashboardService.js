define([
    'angular',
    'jquery',
    'lodash',
    'settings'
], function(angular, $, _, settings) {
    'use strict';

    var module = angular.module('swordfish.services');

    module.service('dashboardService', function($routeParams, $rootScope, $http, notificationService, ejsResource) {

        var es = ejsResource(settings.elasticsearchUrl),
            _dashboard = {
                title: "",
                description: ""
            },
            self = this;

        this.current = _.clone(_dashboard);

        $rootScope.$on('$routeChangeSuccess', function() {
            //Clear existing dashboard...
            self.current = {};
            //Clear notifications...
            notificationService.clear();
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
                $http.get(settings.elasticsearchUrl + '/' + settings.elasticsearchIndex + '/dashboard/' + name)
                    .success(function(data) {
                        self.current = _.clone(data._source);
                    })
                    .error(function(data, status) {
                        if(status === 404) {
                            //If dashboard doesn't exist...
                            notificationService.add('"' + name + '" is not a valid dashboard. Please try again.', 0);
                        } else if (status === 0) {
                            //If ElasticSearch is unreachable...
                            notificationService.add('Unable to connect to ElasticSearch. URL: ' + settings.elasticsearchUrl, 0);
                        } else {
                            //Unknown failure...
                            notificationService.add('Unknown error. Details: ' + data, 0);
                        }
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