angular.module('profile').factory('Perfil', ['$http', 'url',
    function($http, url) {
        var Perfil = {
            getPerfil: function() {
                // $http returns a promise, which has a then a function which also returns a promise
                var promise = $http.get(url.API + '/mi-perfil').then(function(response) {
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            }
        };
        return Perfil;
    }
]);