define([
    'angular',
    'settings',
    'services/all'
], function(angular, settings) {

    'use strict';

    var module = angular.module('swordfish.controllers');

    module.controller('DashboardListCtrl', function($scope, $http, notificationService) {

        var query = "{\"query\" : {\"match_all\" : {}}}";

        $http.post(settings.elasticsearchUrl + '_search', query)
            .success(function(res) {
                $scope.dashboards = res.hits.hits;
            })
            .error(function(res) {
                notificationService.add('Couldn\'t load dashboards list. Is ElasticSearch down? :(', 10000);
            });

    });

});