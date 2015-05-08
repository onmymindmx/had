angular.module('dashboard').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/dashboard', {
                templateUrl: './modules/dashboard/views/dashboard.view.html',
                access: {
                    requiredLogin: true
                }
            });
    }
]);