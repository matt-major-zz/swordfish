define([
    'angular'
], function(angular) {

    'use strict';

    var module = angular.module('swordfish.controllers');

    module.controller('dashboardList', function($scope, $http) {

        //Dummy data for building...
        var list = [
            {
                "title": "Test 1",
                "id": "1"
            }
        ];

        //TODO Add true list generation...

        $scope.dashList = list;

    });

})