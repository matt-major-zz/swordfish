define([
    'angular',
    'settings',
    'services/all'
], function(angular, settings) {

    'use strict';

    var module = angular.module('swordfish.controllers');

    module.controller('DashboardListCtrl', function($scope, notificationService, ejsResource) {

        var es = ejsResource(settings.elasticsearchUrl);

        es.Request()
            .indices(settings.elasticsearchIndex)
            .types('dashboard')
            .query(es.QueryStringQuery('*'))
            .doSearch(
                function(result) {
                    $scope.dashboards = result.hits.hits;
                },
                function(result) {
                    notificationService.add('Couldn\'t load dashboards list. Is ElasticSearch down? :(', 10000);
                }
            );

    });

});