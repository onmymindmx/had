angular.module('map').config(['$routeProvider', 
    function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: '/modules/map/views/map.view.html',
                access: {
                    requiredLogin: false,
                    userShoudlBeAdmin: false
                } 
            });
    }
]);