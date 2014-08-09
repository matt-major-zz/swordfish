define([
    'angular',
    'services/all'
], function(angular) {
    'use strict';

    var module = angular.module('swordfish.controllers');

    module.controller('DashboardCtrl', function($scope, dashboardService, notificationService) {

        $scope.init = function() {
            //Expose the dashboard from dashboard service...
            $scope.dashboard = dashboardService;
            //Expose the notifications service...
            $scope.notifications = notificationService;
            //Clear down the notifications...
            notificationService.clear();
        };
        
        $scope.init();
    });

});