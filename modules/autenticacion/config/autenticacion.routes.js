angular.module('autenticacion').config(['$routeProvider', 
    function($routeProvider) {
        $routeProvider
            .when('/signup', {
                templateUrl: './modules/autenticacion/views/signup.view.html'
            })
            .when('/signin', {
                templateUrl: './modules/autenticacion/views/signin.view.html'
            });
    }
]);