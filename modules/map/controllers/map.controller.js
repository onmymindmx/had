angular.module('map').controller('MapController', ['$scope', '$document', '$timeout', 'Categorias', 'Subcategorias', 'Lugares', 'mapboxService',
    function($scope, $document, $timeout, Categorias, Subcategorias, Lugares, mapboxService) {
        var map;
        $scope.filters = {
            categoria: "",
            subcategoria: ""
        };
        $scope.city = "";

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

        $scope.obtenerLugar = function(idLugar) {
            $scope.lugar = Lugares.get({
                lugarId: idLugar
            });
            var info_place = angular.element(document.getElementById('info-place'));
            $timeout(function(){
                $document.scrollToElement(info_place, 30, 1000);
            }, 200)

        };

        $scope.mapa = function(){
            // Obtenemos las coordendas del usuario
            function geo_success(position) {

                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var geocoder = new google.maps.Geocoder();
                var ciudad;
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            ciudad = results[1].address_components[1].long_name + ", " + results[1].address_components[3].long_name;
                            $scope.$apply(function(){
                                $scope.city = ciudad;
                            });
                        } else {
                            alert("No results found");
                        }
                    } else {
                        alert("Geocoder failed due to: " + status);
                    }
                });

                $scope.$apply(function(){
                    L.mapbox.accessToken = 'pk.eyJ1IjoidG9uY2hteCIsImEiOiJvNGQ3U2lvIn0.kvK_snQK7qqh0QFj4-Dutw';
                    L.mapbox.scrollWheelZoom = false;
                    $scope.lat = position.coords.latitude;
                    $scope.lng = position.coords.longitude;
                    $scope.map_id = "tonchmx.l6c44p92";
                    $scope.zoomMap = "15";
                    $scope.mapReady = true;
                });

                map = mapboxService.getMapInstances()[0];
                map.scrollWheelZoom.disable();
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