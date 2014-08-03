define([
    'angular',
    'services/all'
], function(angular) {
    'use strict';

    var module = angular.module('swordfish.controllers');

    module.controller('DashboardCtrl', function($scope, dashboard) {

        $scope.init = function() {
            $scope.dashboard = dashboard;
        }

        $scope.init();
    });

});