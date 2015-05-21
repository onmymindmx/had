angular.module('map').controller('MapController', ['$scope', 'Categorias', 'Subcategorias', 'Lugares', 
    function($scope, Categorias, Subcategorias, Lugares) {
        $scope.filters = {};

        $scope.populateCategorias = function(query) {
            Categorias.query(query, function(categorias) {
                $scope.categorias = categorias;
            });
        }

        $scope.populateSubcategorias = function(query) {
            Subcategorias.query(query, function(subcategorias) {
                $scope.subcategorias = subcategorias;
            });
        }

        $scope.populateLugares = function(query) {
            Lugares.query(query, function(lugares) {
                $scope.lugares = lugares;
            });
        }
    }
]);