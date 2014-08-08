define([
    'angular',
    'lodash'
], function(angular, _) {
    'use strict';

    var module = angular.module('swordfish.services');

    module.service('notification', function($timeout) {
        var self = this;

        this.all = [];

        this.add = function(message) {
            var notification = {message: message || ''};

            self.all.push(notification);

            return notification;
        };

        this.remove = function(message) {
            console.log('Removing error: ' + message);
        };

        this.clear = function() {
            self.all = [];
        };
    });
});