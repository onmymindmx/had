angular.module('lugar').factory('Lugares', ['$resource', 'url',
    function($resource, url) {
        return $resource(url.APIHeroku + '/lugares/:lugarId', {
            lugarId: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);