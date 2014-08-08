define([
    'angular'
], function(angular) {

    'use strict';

    var module = angular.module('swordfish.controllers');

    module.controller('dashboardList', function($scope, $http) {

        var query = "{\"query\" : {\"match_all\" : {}}}";

        $http.post('http://localhost:9200/swordfish/_search', query)
            .success(function(res) {
                $scope.dashboards = res.hits.hits;
            })
            .error(function(res) {
                console.error(res);
            });

    });

});