angular.module('subcategoria').controller('SubcategoriasController', ['$scope', '$routeParams', '$location', 'Categorias', 'Subcategorias', 
    function($scope, $routeParams, $location, Categorias, Subcategorias){

        $scope.populateCategorias = function(query) {
            Categorias.query(query, function(categorias) {
                $scope.categorias = categorias;
            })
        }

        $scope.find = function() {
            $scope.subcategorias = Subcategorias.query();
        };

        $scope.findOne = function() {
            $scope.subcategoria = Subcategorias.get({
                subcategoriaId: $routeParams.subcategoriaId
            });
        };

        $scope.create = function() {
            var subcategoria = new Subcategorias({
                nombre: this.nombre,
                categoria: this.categoria.id,
                icono: this.icono,
                descripcion: this.descripcion
            });

            subcategoria.$save(function(response) {
                console.log(response);
            }, function(errorResponse) {
                console.error('Error');
            });
        };

        $scope.update = function() {
            var subcategoria = $scope.subcategoria;
            subcategoria.categoria = subcategoria.categoria.id;
            subcategoria.$update(function(response) {
                console.log(response);
            }, function(errorResponse) {
                console.error('Error');
            });
        };

        $scope.delete = function() {
            if(subcategoria) {
                subcategoria.$remove(function() {
                    for (var i in $scope.subcategorias) {
                        if($scope.subcategoria[i] === subcategoria) {
                            $scope.subcategorias.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.subcategoria.$remove(function() {
                    $location.path('dashboard/subcategorias');
                })
            }
        };

    }
]);