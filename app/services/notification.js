define([
    'angular',
    'lodash'
], function(angular, _) {
    'use strict';

    var module = angular.module('swordfish.services');

    module.service('notification', function($timeout) {
        var self = this;

        this.all = [];

        this.add = function(error) {
            var error = {error: error || ''};

            self.all.push(error);

            return error;
        };

        this.remove = function(error) {
            console.log('Removing error: ' + error);
        };

        this.clear = function() {
            self.all = [];
        };
    });
});