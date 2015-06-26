angular.module('profile').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/profile', {
                templateUrl: './modules/profile/views/profile.view.html',
                access: {
                    requiredLogin: true, 
                    userShouldBeAdmin: false
                }
            })
            .when('/mis-lugares', {
                templateUrl: './modules/profile/views/mis-lugares.view.html',
                access: {
                    requiredLogin: true,
                    userShouldBeAdmin: false
                }
            })
            .when('/mi-lugare', {
                templateUrl: './modules/profile/views/mi-lugar.view.html',
                access: {
                    requiredLogin: true,
                    userShouldBeAdmin: false
                }
            });
    }
]);