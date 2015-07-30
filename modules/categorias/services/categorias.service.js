angular.module('categoria').factory('Categorias', ['$resource', 'url',
    function($resource, url) {
        return $resource(url.APIHeroku + '/categorias/:categoriaId', {
            categoriaId: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);