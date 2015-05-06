angular.module('lugar').factory('Lugares', ['$resource', 'url',
    function($resource, url) {
        return $resource(url.API + '/lugares/:lugarId', {
            lugarId: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);