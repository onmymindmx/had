angular.module('mapaHAD').config(['$routeProvider',
    function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: '/modules/mapaHAD/views/mapa.view.html',
                access: {
                    requiredLogin: false,
                    userShouldBeAdmin: false
                }
            });
    }
]);