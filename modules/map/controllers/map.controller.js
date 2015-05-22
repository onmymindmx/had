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

        /*$scope.populateLugares = function(query) {
            Lugares.query(query, function(lugares) {
                $scope.lugares = lugares;
            });
        }*/

        $scope.mapa = function(){
            // Obtenemos las coordendas del usuario
            function geo_success(position) {
                $scope.$apply(function(){
                    L.mapbox.accessToken = 'pk.eyJ1IjoidG9uY2hteCIsImEiOiJvNGQ3U2lvIn0.kvK_snQK7qqh0QFj4-Dutw';
                    L.mapbox.scrollWheelZoom = false;
                    $scope.lat = position.coords.latitude;
                    $scope.lng = position.coords.longitude;
                    $scope.map_id = "tonchmx.l6c44p92";
                    $scope.zoomMap = "7";
                    $scope.mapReady = true;
                });

            }

            function geo_error(){
                $scope.$apply(function(){
                    $scope.errorLocation = true;
                    $scope.errorLocationMsg = "No pudimos encontrar tu ubicación. Asegurate de darnos el permiso de buscar tu ubicación.";
                })
            }

            var geo_options = {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 27000
            };

            // Obtenemos los places
            $scope.lugares = Lugares.query();

            navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
        };
    }
]);