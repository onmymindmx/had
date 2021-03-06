angular.module('lugar').controller('LugaresController', ['$scope', '$document', '$timeout', '$routeParams', '$location', 'Categorias', 'Subcategorias', 'Lugares', 'toaster', 'googleStyle',
    function($scope, $document, $timeout, $routeParams, $location, Categorias, Subcategorias, Lugares, toaster, googleStyle) {

        $scope.filters = {
            categoria:''
        };
        $scope.goTo = function(seccion){
            var seccionDom = angular.element(document.getElementById(seccion));
            $document.scrollToElement(seccionDom, 30, 1000);
        };

        $scope.categoriaValue = function(value){
            $scope.filters.categoria = value;
            $scope.subcategoria = '';
        };

        function getLocationError(msg) {
            console.log(position);
        }

        $scope.populateCategorias = function(query) {
            Categorias.query(query, function(categorias) {
                $scope.categorias = categorias;
            })
        };

        $scope.populateSubcategorias = function(query) {
            Subcategorias.query(query, function(subcategorias) {
                $scope.subcategorias = subcategorias;
            })
        };

        $scope.createMap = function() {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    if($scope.lugar === undefined){
                        var latitude = position.coords.latitude;
                        var longitude = position.coords.longitude;
                        var mapOptions = {
                                zoom: 16,
                                center: new google.maps.LatLng(latitude, longitude),
                                scrollwheel: false
                            };
                        document.getElementById('coordenadas').value = latitude + "," + longitude;    
                    } else {
                        var coor = $scope.lugar.coordenadas;
                        var coordenadas = coor.split(",");
                        var mapOptions = {
                                zoom: 16,
                                center: new google.maps.LatLng(coordenadas[0], coordenadas[1]),
                                scrollwheel: false
                            };    
                        document.getElementById('coordenadas').value = coor;    
                    }
                    
                    var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
                    map.setOptions({styles: googleStyle.style});
                    var marker = new google.maps.Marker({
                        draggable: true,
                        map: map,
                        position: map.getCenter()
                    });
                    
                    angular.element(document.getElementById('coordenadas')).triggerHandler('input');
                    
                    google.maps.event.addListener(marker, 'dragend', function (event) {
                        var lat = this.getPosition().lat();
                        var lng = this.getPosition().lng();
                        var coordenadas = this.getPosition().lat() + "," + this.getPosition().lng();
                        document.getElementById('coordenadas').value = coordenadas;
                        angular.element(document.getElementById('coordenadas')).triggerHandler('input');
                    });
                }, getLocationError);
            } else {
                error('no soportado');
            }
        };

        $scope.seleccionarCategoria = function(idCategoria){
            var inputCategoria = document.getElementById('categoria');
            inputCategoria.value = idCategoria;
            angular.element(inputCategoria).triggerHandler('input');
            $scope.filters.categoria = idCategoria;

            var inputSubcategoria = document.getElementById('subcategoria');
            inputSubcategoria.value = '';
            angular.element(inputSubcategoria).triggerHandler('input');
        };

        $scope.seleccionarSubcategoria = function(idSubcategoria){
            var inputSubcategoria = document.getElementById('subcategoria');
            inputSubcategoria.value = idSubcategoria;
            angular.element(inputSubcategoria).triggerHandler('input');
        };

        $scope.subcategorias = function() {
            $scope.subcategorias = Subcategorias.query();
        };

        $scope.find = function() {
            $scope.lugares = Lugares.query();
        };

        $scope.findOne = function() {
            Lugares.get({
                lugarId: $routeParams.lugarId
            }).$promise.then(function(response){
                $scope.lugar = response;
                // ponemos el filtro para mostrar la subcategorias
                $scope.filters.categoria = response.categoria.id;
                // Creamos el mapa
                $scope.createMap();
            });
        };

        $scope.create = function() {
            if(this.subcategoria == 0){
                this.subcategoria = null;
            }
            var lugar = new Lugares({
                nombre: this.nombre,
                categoria: this.categoria,
                subcategoria: this.subcategoria,
                direccion: this.direccion,
                coordenadas: this.coordenadas,
                descripcion: this.descripcion,
                telefono: this.telefono || null,
                facebook: this.facebook || null,
                twitter: this.twitter || null,
                instagram: this.instagram || null,
                website: this.website || null
            });

            lugar.$save(function(response) {
                if(response.status == "error"){
                    toaster.pop('error', "Error al crear el lugar");
                } else {
                    $location.path('/');
                    toaster.pop('success', "Lugar agregado con éxito", "¡El lugar se agregó con éxito!");
                }

            }, function(errorResponse) {
                toaster.pop('error', "Error", "Algo salió mal de nuestro lado.");
            });
        };

        $scope.update = function() {
            var lugar = $scope.lugar;
            lugar.categoria = lugar.categoria.id;
            lugar.subcategoria = lugar.subcategoria.id;
            lugar.$update(function(response) {
                if(response.status == "error"){
                    toaster.pop('error', "Error al actualizar el lugar");
                } else {
                    toaster.pop('success', "Lugar actualizado con éxito", "¡El lugar se actualizó con éxito");
                }
                $scope.findOne();

            }, function(errorResponse) {
                toaster.pop('error', "Error", "Algo salió mal de nuestro lado");
            });
        };

        $scope.delete = function() {
            if(lugar) {
                lugar.$remove(function() {
                    for(var i in $scope.lugares) {
                        if($scope.lugares[i] === lugar){
                            $scope.lugares.splice(i, 1)
                        }
                    }
                });
            } else {
                $scope.lugar.$remove(function() {
                    $location.path('dashboard/lugares');
                });
            }
        };
    }
]);