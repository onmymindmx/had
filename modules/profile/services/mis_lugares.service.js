angular.module('profile').factory('MisLugares', ['$http', 'url',
    function($http, url){
        var MisLugares = {
            getLugares: function() {
                // $http returns a promise, which has a then a function which also returns a promise
                var promise = $http.get(url.APIHeroku + '/mis-lugares').then(function(response) {
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            }
        };
        return MisLugares;
    }
]);