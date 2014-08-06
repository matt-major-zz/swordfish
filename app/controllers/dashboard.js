define([
    'angular',
    'services/all'
], function(angular) {
    'use strict';

    var module = angular.module('swordfish.controllers');

    module.controller('DashboardCtrl', function($scope, dashboard, notification) {

        $scope.init = function() {
            $scope.dashboard = dashboard;
            $scope.notifications = notification;

            //When loading, ensure we don't carry over alerts.
            notification.clear();
            //notification.add('A Test Error', 5000);
        };

        $scope.init();
    });

});