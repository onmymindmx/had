var mainApplicationModuleName = 'had';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'satellizer', 'autenticacion', 'categoria', 'subcategoria', 'lugar', 'dashboard']);

mainApplicationModule
    .config(['$locationProvider', '$authProvider',
        function($locationProvider, $authProvider) {
            $locationProvider.hashPrefix('!');

            // Parametros de configuración para la autenticacion
            $authProvider.loginUrl = 'http://api.hoyadonde.omm/login';
            $authProvider.signupUrl = 'http://api.hoyadonde.omm/signup';
            $authProvider.tokenName = "token";
            $authProvider.tokenPrefix = "had";
        }
    ])
    .run( 
         // Funnción para mandar a la página de loggeo si no hay sessión
        function($rootScope, $location, Autenticacion){
            // Si se refresca la página, se checa la autenticación
            Autenticacion.check();
            $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
                if((nextRoute.access && nextRoute.access.requiredLogin) && !Autenticacion.isLogged) {
                    $location.path('/signin');
                }
            });
        }
    );

mainApplicationModule.constant('url', {
    API: 'http://api.hoyadonde.omm/v1',
    APIBASE: 'http://api.hoyadonde.omm',
    APIHeroku: 'https://apihoyadonde.herokuapp.com/v1',
    APIHerokuBase: 'https://apihoyadonde.herokuapp.com'
});

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});