angular.module('subcategoria').factory('Subcategorias', ['$resource', 'url', 
    function($resource, url) {
        return $resource(url.API + '/subcategorias/:subcategoriaId', {
            subcategoriaId: '@id',
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);