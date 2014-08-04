define([
    'angular',
    'jquery',
    'lodash',
    'settings'
], function(angular, $, _, settings) {
    'use strict';

    var module = angular.module('swordfish.services');

    module.service('dashboard', function($routeParams, $rootScope, $http) {

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
            //...rerun our function to get the dashboard.
            dash();
        });

        var dash = function() {
                if($routeParams.name) {
                    self.dashLoad($routeParams.name);
                } else {
                    var d = {title: "Default", description: "Hello, world."};
                    self.current = _.clone(d);
                }
            };

        this.dashLoad = function(name) {
            $http.get('http://localhost:9200/swordfish/dashboard/' + name)
                .then(function(data) {
                    self.current = _.clone(data.data._source);
                });

            return true;
        };

    });

});