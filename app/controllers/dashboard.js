define([
    'angular',
    'services/all'
], function(angular) {
    'use strict';

    var module = angular.module('swordfish.controllers');

    module.controller('DashboardCtrl', function($scope, dashboard, notification) {

        $scope.init = function() {
            //Expose the dashboard from dashboard service...
            $scope.dashboard = dashboard;
            //Expose the notifications service...
            $scope.notifications = notification;
            //Clear down the notifications...
            notification.clear();
        };
        
        $scope.init();
    });

});