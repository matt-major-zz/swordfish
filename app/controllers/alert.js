define([
    'angular',
    'settings',
    'services/all'
], function(angular, settings) {
    'use strict';

    var module = angular.module('swordfish.controllers');

    module.controller('AlertCtrl', function($scope, ejsResource, notificationService) {

        $scope.init = function() {
            $scope.data = getData($scope.$parent.alert);
        };

        var getData = function($scope) {
            var es = ejsResource(settings.elasticsearchUrl),
                query = $scope.query;

            es.Request()
                .indices(settings.elasticsearchDataIndex)
                .searchType('count')    
                .facet(es.DateHistogramFacet('events').keyField('created_at').interval('1m'))
                .size(0)
                .query(es.QueryStringQuery(query))
                .doSearch(
                    function(result) {
                        var _d = result.facets.events.entries;

                        //Bit of a hack for 0 result queries...
                        if (_d.length > 0) {
                            var last_count = _d[_d.length - 1].count;
                            statusCheck($scope, last_count);
                            $scope.last = last_count;
                        } else {
                            $scope.status = 'ok';
                            $scope.last = 0;
                        }

                        $scope.data = result.facets.events.entries;
                    },
                    function(result) {
                        notificationService.add('Error Executing ElasticSearch Query: ' + result.error);
                        $scope.status = 'critical';
                    }
                );
        };

        var statusCheck = function($scope, last) {
            var _w = $scope.warnTrigger,
                _c = $scope.critTrigger,
                _v = last;

            if(_v < _w) {
                $scope.status = 'ok';
            } else if (_v >= _w && _v < _c) {
                $scope.status = 'warn';
            } else if (_v > _c) {
                $scope.status = 'critical';
            } else {
                $scope.status = 'ok';
            }

            return false;
        };
        
        $scope.init();
    });

});