angular.module('categoria').controller('CategoriasController', ['$scope', '$routeParams', '$location', 'Categorias', 
    function($scope, $routeParams, $location, Categorias) {
        
        $scope.find = function() {
            $scope.categorias = Categorias.query();
        };

        $scope.findOne = function() {
            $scope.categoria = Categorias.get({
                categoriaId: $routeParams.categoriaId
            });
        };

        $scope.create = function() {
            var categoria = new Categorias({
                nombre: this.nombre,
                icono: this.icono,
                descripcion: this.descripcion
            });

            categoria.$save(function(response){
                console.log(response);
            }, function(errorResponse) {
                console.error('Error');
            });
        };

        $scope.update = function() {
            $scope.categoria.$update(function(response) {
                console.log(response);
            }, function(errorResponse) {
                console.error('Error');
            });
        };

        $scope.delete = function() {
            if (categoria) {
                categoria.$remove(function() {
                    for (var i in $scope.categorias) {
                        if ($scope.categorias[i] === categoria) {
                            $scope.categorias.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.categoria.$remove(function() {
                    $location.path('dashboard/categorias');
                })
            }
        };
    }
]);