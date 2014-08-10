define([
    'angular',
    'services/all'
], function(angular) {
    'use strict';

    var module = angular.module('swordfish.controllers');

    module.controller('AlertCtrl', function($scope) {

        $scope.init = function() {
            $scope.status = getRandomStatus();
        };

        //Dummy status indication while building...
        var getRandomStatus = function() {
            var i = Math.floor(Math.random() * 3) + 1;
            switch(i) {
                case 1:
                    return "ok";
                case 2:
                    return "warn";
                case 3:
                    return "critical";
                default:
                    return "ok";
            }
        };
        
        $scope.init();
    });

});