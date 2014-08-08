define([
    'angular',
    'settings',
    'services/all'
], function(angular, settings) {

    'use strict';

    var module = angular.module('swordfish.controllers');

    module.controller('dashboardList', function($scope, $http, notification) {

        var query = "{\"query\" : {\"match_all\" : {}}}";

        $http.post(settings.elasticsearchUrl + '_search', query)
            .success(function(res) {
                $scope.dashboards = res.hits.hits;
            })
            .error(function(res) {
                notification.add('Couldn\'t load dashboards list. Is ElasticSearch down? :(', 10000);
            });

    });

});