angular.module('mapaHAD').controller('MapaHADController', ['$scope', '$auth', 'Lugares', 'Categorias', 'Subcategorias', 'googleStyle',
    function($scope, $auth, Lugares, Categorias, Subcategorias, googleStyle){

        $scope.filters = {
            categoria: "",
            subcategoria: ""
        };

        $scope.latlng = '';

        $scope.populateCategorias = function(query) {
            Categorias.query(query, function(categorias) {
                $scope.categorias = categorias
            })
        };

        $scope.populateSubcategorias = function(query) {
            Subcategorias.query(query, function(subcategorias) {
                $scope.subcategorias = subcategorias;
            });
        };

        $scope.populateLugares = function(query) {
            Lugares.query(query, function(lugares) {
                $scope.lugares = lugares;
            })
        };

        $scope.map = function() {
            $scope.city = "";

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

                var latlngS = position.coords.latitude.toString() + ',' + position.coords.longitude.toString();
                $scope.$apply(function() {
                    $scope.latlng = latlngS;
                    $scope.zoomMap = "15";
                    $scope.style = googleStyle.style;
                    $scope.mapReady = true;
                    Lugares.query({coords: latlngS}, function(lugares){
                        $scope.lugares = lugares;
                    });
                    $scope.errorLocation = false;
                })
            }

            function geo_error() {
                $scope.errorLocationMsg = "No pudimos encontrar tu ubicación";
                $scope.mapReady = false;
                $scope.errorLocation = true;
            }

            var geo_options = {
                enableHighAccuracy: true,
                maximumAge: 10000,
                timeout: 27000
            };

            navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
        };

        var map;
        $scope.btn_getInfoPlace = null;
        $scope.infoMap = null;
        $scope.actualZoom = 0;
        $scope.$on('mapInitialized', function(evt, evtMap) {
            map = evtMap;
            $scope.infoWindow = new google.maps.InfoWindow();
            $scope.infoWindow.setContent(
                '<button id="btn_getInfoPlace" class="btn btn-default btn-xs">Más información</button>'
            );

            $scope.centerMapAndGetInfo = function(event, p){
                map.panTo(event.latLng);
                $scope.actualZoom = map.zoom;
                $scope.getShortInfo(event, p);
                $scope.btn_getInfoPlace = $("#btn_getInfoPlace");

            };
        });

        $scope.getShortInfo = function(event, p) {
            var lat = null;
            // Colocamos el zoom correcto
            switch ($scope.actualZoom){
                case 4:
                    lat = p.latLng.lat + 3.2768000;
                    break;

                case 5:
                    lat = p.latLng.lat + 1.6384000;
                    break;

                case 6:
                    lat = p.latLng.lat + 0.8192000;
                    break;

                case 7:
                    lat = p.latLng.lat + 0.4096000;
                    break;

                case 8:
                    lat = p.latLng.lat + 0.2048000;
                    break;

                case 9:
                    lat = p.latLng.lat + 0.1024000;
                    break;

                case 10:
                    lat = p.latLng.lat + 0.0512000;
                    break;

                case 11:
                    lat = p.latLng.lat + 0.0256000;
                    break;

                case 12:
                    lat = p.latLng.lat + 0.0128000;
                    break;

                case 13:
                    lat = p.latLng.lat + 0.0064000;
                    break;

                case 14:
                    lat = p.latLng.lat + 0.0036000;
                    break;

                case 15:
                    lat = p.latLng.lat + 0.0018000;
                    break;

                case 16:
                    lat = p.latLng.lat + 0.0009000;
                    break;

                case 17:
                    lat = p.latLng.lat + 0.0004500;
                    break;

                case 18:
                    lat = p.latLng.lat + 0.0002200;
                    break;

                case 19:
                    lat = p.latLng.lat + 0.0001100;
                    break;

                case 20:
                    lat = p.latLng.lat + 0.0000550;
                    break;

                case 21:
                    lat = p.latLng.lat + 0.0000275;
                    break;

            }
            var center = new google.maps.LatLng(lat, p.latLng.lng);
            if (p.distancia >= 1000){
                p.distancia = p.distancia/1000;
                p.distancia = p.distancia.toFixed(2);
                p.distancia = p.distancia + 'km';
            } else {
                p.distancia = parseInt(p.distancia) + 'm';
            }
            $scope.infoWindow.setContent(
                '<h3>' + p.nombre + '</h3>' +
                '<h5>' + p.categoria.nombre + ' <small>' + p.subcategoria.nombre + '</small></h5>' +
                '<p>' + p.direccion + '</p>' +
                '<p> a ' + p.distancia + ' de tí </p>' +
                '<button id="btn_getInfoPlace" data-id_place="' + p.id + '" class="btn btn-default btn-xs" data-toggle="offcanvas" data-target=".navmenu" data-canvas="body">Más información</button>'
            );

            $scope.infoWindow.setPosition(center);
            $scope.infoWindow.open(map);
            $scope.infoLugar = null;

            var getInfoLugar = Lugares.get({lugarId: p.id}, function(){
                $scope.infoLugar = getInfoLugar;
            });
        };

        $scope.irA = function(destino, parametro){
            switch (destino){
                case 'direccion':
                    window.open('https://www.google.com.mx/maps/dir/'+ $scope.latlng +'/' + parametro.toString(), '_blank');
                    break;

                case 'facebook':
                    window.open('https://wwww.facebook.com' + parametro, '_blank');
                    break;

                case 'twitter':
                    if(parametro.substring(0,1) == '@') {
                        window.open('https://www.twitter.com/' + parametro, '_blank');
                    } else {
                        window.open('https://www.twitter.com' + parametro, '_blank');
                    }
                    break;

                case 'instagram':
                    if(parametro.substring(0,1) == '@'){
                        window.open('https://www.instagram.com/' + parametro.substring(1), '_blank');
                    } else {
                        window.open('https://www.instagram.com' + parametro, '_blank');
                    }
                    break;

                case 'website':
                    window.open('http://' + parametro, '_blank');
                    break;
            }
        }


    }
]);