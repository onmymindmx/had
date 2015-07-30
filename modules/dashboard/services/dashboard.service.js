angular.module('dashboard').factory('Dashboard', ['$http', 'url',
    function($http, url) {
        return {
            info: function() {
                var request = $http.get(url.APIHeroku + '/dashboard');
                return request;
            }
        }
    }
]);