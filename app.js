var mainApplicationModuleName = 'had';

var mainApplicationModule = angular.module(mainApplicationModuleName, 
    ['ngResource', 'ngRoute', 'satellizer', 'autenticacion', 'mapaHAD','categoria',
     'subcategoria', 'lugar', 'dashboard', 'profile', 'duScroll',
     'ngAria', 'ngMaterial', 'ngMask',
     'toaster', 'ngAnimate', 'ngMessages', 'angular-loading-bar', 'ngMap']);

var style = [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f3f4f4"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "weight": 0.9
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#83cead"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#2c7fa9"
            }
        ]
    }
];

mainApplicationModule
    .config(['$locationProvider', '$authProvider',
        function($locationProvider, $authProvider) {
            $locationProvider.hashPrefix('!');

            // Parametros de configuración para la autenticacion
            $authProvider.loginUrl = 'https://apihoyadonde.herokuapp.com/login';
            $authProvider.signupUrl = 'https://apihoyadonde.herokuapp.com/signup';
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
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }])
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
    API: 'https://apihoyadonde.herokuapp.com/v1',
    APIBASE: 'https://apihoyadonde.herokuapp.com'
})
    .constant('googleStyle', {
        style: style
    });

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});