define([
    'angular',
    'settings',
    'services/all',
    'jquery',
    'charts'
], function(angular, settings, $) {
    'use strict';

    var module = angular.module('swordfish.controllers');

    module.controller('AlertCtrl', function($rootScope, $scope, ejsResource, notificationService) {

        $scope.init = function() {
            $scope.getData($scope.$parent.alert);
        };

        $scope.getData = function($scope) {
            var es = ejsResource(settings.elasticsearchUrl),
                query = $scope.query;

            es.Request()
                .indices(settings.elasticsearchDataIndex)
                .searchType('count')    
                .facet(
                    es
                        .DateHistogramFacet('events')
                        .keyField('created_at')
                        .interval('1m')
                        .order('time')
                )
                .size(0)
                .query(es.QueryStringQuery(query))
                .doSearch(
                    function(result) {
                        var _d = result.facets.events.entries;
                        //Bit of a hack for 0 result queries...
                        if (_d.length > 0) {
                            var last_count = _d[_d.length - 1].count;
                            
                            if(last_count < $scope.warnTrigger) {
                                $scope.status = 'ok';
                            } else if (last_count >= $scope.warnTrigger && last_count < $scope.critTrigger) {
                                $scope.status = 'warn';
                            } else if (last_count > $scope.critTrigger) {
                                $scope.status = 'critical';
                            } else {
                                $scope.status = 'ok';
                            }

                            $scope.last = last_count;
                        } else {
                            $scope.status = 'ok';
                            $scope.last = 0;
                        }

                        $rootScope.$broadcast('render', _d);
                    },
                    function(result) {
                        notificationService.add('Error Executing ElasticSearch Query: ' + result.error);
                        $scope.status = 'critical';
                    }
                );
        };
        
        $scope.init();
    });

    module.directive('alertGraph', function() {
        return {
            restrict: 'A',
            template: '<div></div>',
            link: function(scope, elem) {
                //When we get a "render" event, do some stuff!
                scope.$on('render', function(event, data) {
                   render(data); 
                });

                function timeConvert(time) {
                    var converted,
                        _t = new Date(time),
                        _h = _t.getHours(),
                        _m = _t.getMinutes();

                    converted = _h + ':' + _m;

                    return converted;
                }

                function render(data) {
                    
                    var labels = [],
                        values = [];

                    for (var i = 0; i < data.length; i++) {
                        labels.push(timeConvert(data[i].time));
                        values.push(data[i].count);
                    }

                    var config = {
                        chart: {
                            backgroundColor: null,
                            borderColor: null
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: '',
                            margin: 0
                        },
                        xAxis: {
                            categories: labels,
                            lineWidth: null,
                            minorGridLineWidth: null,
                            lineColor: null,
                            minorTickLength: 0,
                            tickColor: null,
                            gridLineColor: null
                        },
                        yAxis: {
                            title: {
                                enabled: false
                            },
                            tickColor: null,
                            gridLineColor: null,
                            minorGridLineWidth: null
                        },
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                            enabled: false,
                        },
                        series: [{name: 'Count', data: values, color: scope.alert.color}]
                    };

                    jQuery(elem).highcharts(config);
                }
            }
        };
    });

});