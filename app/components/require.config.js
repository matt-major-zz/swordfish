require.config({
    baseUrl: 'app',
    paths: {
        angular         :   'components/angular/angular',
        angularRoute    :   'components/angular/angular-route',
        jquery          :   'components/jquery-1.11.1',
        lodash          :   'components/lodash/lodash',
        bootstrap       :   'components/bootstrap/bootstrap',
        settings        :   'settings',
        elasticjs       :   'components/elasticjs/elastic-angular-client',
        charts          :   'components/bootstrap/highcharts',
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularRoute: ['angular'],
        jquery: {
            exports: 'jquery'
        },
        bootstrap: {
            deps: ['jquery']
        },
        elasticjs: ['angular', 'components/elasticjs/elastic'],
        charts: ['jquery']
    }
});