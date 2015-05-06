angular.module('categoria').config(['$routeProvider', 
    function($routeProvider) {
        $routeProvider
            .when('/dashboard/categorias', {
                templateUrl: './modules/categorias/views/listar-categorias.view.html',
            })
            .when('/dashboard/categorias/nueva', {
                templateUrl: './modules/categorias/views/crear-categoria.view.html'
            })
            .when('/dashboard/categorias/:categoriaId', {
                templateUrl: './modules/categorias/views/ver-categoria.view.html'
            })
            .when('/dashboard/categorias/:categoriaId/editar', {
                templateUrl: './modules/categorias/views/editar-categoria.view.html'
            });
    }
]);