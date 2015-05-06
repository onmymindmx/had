var mainApplicationModuleName = 'had';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'autenticacion', 'categoria', 'subcategoria', 'lugar', 'dashboard']);

mainApplicationModule.config(['$locationProvider', 
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

mainApplicationModule.constant('url', {
    API: 'http://api.hoyadonde.omm/v1',
    APIBASE: 'http://api.hoyadonde.omm',
    APIHeroku: 'https://apihoyadonde.herokuapp.com/v1',
    APIHerokuBase: 'https://apihoyadonde.herokuapp.com'
});

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});