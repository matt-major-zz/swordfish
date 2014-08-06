require.config({
    baseUrl: 'app',
    paths: {
        angular         :   'components/angular/angular',
        angularRoute    :   'components/angular/angular-route',
        jquery          :   'components/jquery-1.11.1',
        lodash          :   'components/lodash/lodash',
        bootstrap       :   'components/bootstrap/bootstrap',
        settings        :   'settings'
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
        }
    }
});