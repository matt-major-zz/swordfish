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
            },
            {
                "title": "Test 2",
                "id": "2"
            },
            {
                "title": "Test 3",
                "id": "3"
            },
            {
                "title": "Test 4",
                "id": "4"
            }
        ];

        //TODO Add true list generation...

        $scope.dashList = list;

    });

})