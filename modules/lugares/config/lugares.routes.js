angular.module('lugar').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/dashboard/lugares', {
                templateUrl: '/modules/lugares/views/listar-lugares.view.html'
            })
            .when('/dashboard/lugares/nuevo', {
                templateUrl: '/modules/lugares/views/crear-lugar.view.html'
            })
            .when('/dashboard/lugares/:lugarId', {
                templateUrl: '/modules/lugares/views/ver-lugar.view.html'
            })
            .when('/dashboard/lugares/:lugarId/editar', {
                templateUrl: '/modules/lugares/views/editar-lugar.view.html'
            });
    }
]);