angular.module('profile').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/mis-lugares', {
                templateUrl: './modules/profile/views/mis-lugares.view.html',
                access: {
                    requiredLogin: true,
                    userShouldBeAdmin: false
                }
            })
            .when('/perfil', {
                templateUrl: './modules/profile/views/perfil.view.html',
                access: {
                    requiredLogin: true,
                    userShouldBeAdmin: false
                }
            })
            .when('/mis-lugares/editar-lugar/:lugarId', {
                templateUrl: '/modules/profile/views/editar-mi-lugar.view.html',
                access: {
                    requiredLogin: true,
                    userShouldBeAdmin: false
                }
            });
    }
]);