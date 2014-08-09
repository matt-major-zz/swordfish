define([
    'angular',
    'lodash'
], function(angular, _) {
    'use strict';

    var module = angular.module('swordfish.services');

    module.service('notificationService', function($timeout) {
        var self = this;

        this.all = [];

        this.add = function(message, timeout) {
            var notification = {message: message || ''};

            self.all.push(notification);

            //If notification has a timeout...
            if(timeout > 0) {
                //Run this function upon the timeout...
                $timeout(function() {
                    //Reset the list of all notifications without this one...
                    self.all = _.without(self.all, notification);
                }, timeout);
            }

            return notification;
        };

        this.clear = function() {
            self.all = [];
        };
    });
});