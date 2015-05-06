angular.module('subcategoria').config(['$routeProvider', 
    function($routeProvider) {
        $routeProvider
            .when('/dashboard/subcategorias', {
                templateUrl: '/modules/subcategorias/views/listar-subcategorias.view.html'
            })
            .when('/dashboard/subcategorias/nueva', {
                templateUrl: '/modules/subcategorias/views/crear-subcategoria.view.html'
            })
            .when('/dashboard/subcategorias/:subcategoriaId', {
                templateUrl: '/modules/subcategorias/views/ver-subcategoria.view.html'
            })
            .when('/dashboard/subcategorias/:subcategoriaId/editar', {
                templateUrl: '/modules/subcategorias/views/editar-subcategoria.view.html'
            });
    }
]);