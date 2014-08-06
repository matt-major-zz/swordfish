define([
    'angular',
    'angularRoute',
    'lodash',
    'jquery',
    'require',
    'bootstrap'
], function(angular, $, _) {

    'use strict';

    var app = angular.module('swordfish', ['ngRoute']),
        //Dependencies to register upon bootstrapping...
        boot_deps = [],
        //Holder for registering...
        register_fns = {},
        //Dependencies for app bootstrap
        app_deps = ['swordfish'];

    app.config(function($routeProvider, $controllerProvider, $provide) {

        $routeProvider
            .when('/dashboard', {
                templateUrl: 'app/views/dashboard.html'
            })
            .when('/dashboard/:name', {
                templateUrl: 'app/views/dashboard.html'
            })
            .otherwise({
                redirectTo: '/dashboard'
            });

        //As suggested by bit.ly/XswlCC
        app.controller  = $controllerProvider.register;
        app.service     = $provide.service;
    });

    //Add modules for controllers, services etc...
    _.each('controllers,services'.split(','),  function(type) {
       var module_name = 'swordfish.' + type;
        boot_deps.push(angular.module(module_name, []));
        app_deps.push(module_name);
    });

    require([
        'controllers/all'
    ], function() {
        angular.element(document).ready(function() {
            jQuery('html').attr('ng-controller', 'DashboardCtrl');

            angular.bootstrap(document, app_deps).invoke(['$rootScope', function(m) {
                _.each(boot_deps, function(m) {
                    _.extend(m, register_fns);
                });
            }]);
        });
    });

    return app;
});