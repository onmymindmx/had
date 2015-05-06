angular.module('categoria').factory('Categorias', ['$resource', 'url',
    function($resource, url) {
        return $resource(url.API + '/categorias/:categoriaId', {
            categoriaId: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);