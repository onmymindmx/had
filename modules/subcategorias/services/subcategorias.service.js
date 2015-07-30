angular.module('subcategoria').factory('Subcategorias', ['$resource', 'url', 
    function($resource, url) {
        return $resource(url.APIHeroku + '/subcategorias/:subcategoriaId', {
            subcategoriaId: '@id',
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);