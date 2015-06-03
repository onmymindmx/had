var mainApplicationModuleName = 'had';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'satellizer', 'autenticacion', 'map','categoria', 'subcategoria', 'lugar', 'dashboard', 'angular-mapbox', 'duScroll', 'toaster', 'ngAnimate']);

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
    .config(['$httpProvider', 'satellizer.config', 
        function($httpProvider, config) {
            $httpProvider.interceptors.push(['$q', function($q) {
                var tokenName = config.tokenPrefix ? config.tokenPrefix + '_' + config.tokenName : config.tokenName;
                return {
                    request: function(httpConfig) {
                        var token = localStorage.getItem(tokenName);
                        if(token) {
                            httpConfig.headers.Authorization = 'Bearer ' + token;
                        }
                        return httpConfig;
                    },
                    responseError: function(response) {
                        return $q.reject(response);
                    }
                };
            }]);
        }
    ])
    .run( 
         // Funnción para mandar a la página de loggeo si no hay sessión
        function($rootScope, $location, Autenticacion){
            // Si se refresca la página, se checa la autenticación
            Autenticacion.check();

            // Verificamos si puede acceder a la siguiente ruta
            $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
                // Verificamos que este loggeado, si no, lo mandamos a loggearse
                if(nextRoute.access.requiredLogin && !Autenticacion.isLogged) {
                    $location.path('/signin');
                }

                // Verificamos que este en el perfil adecuado para entrar
                if(nextRoute.access.userShouldBeAdmin && !Autenticacion.isAdmin) {
                    $location.path('/');
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