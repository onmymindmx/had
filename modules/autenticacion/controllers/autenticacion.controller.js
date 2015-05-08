angular.module('autenticacion').controller('AutenticacionController', ['$scope', '$auth', '$location', 'Autenticacion', 
    function($scope, $auth, $location, Autenticacion) {

        // Función para pasar las varibles de autenticación al navbar y ocultar o mostrar los datos necesarios
        $scope.logged = function() {
            if($auth.getToken()){
                var token = $auth.getPayload();
                $scope.token = token.email;
                return true;
            } else {
                false;
            }
        }
        


        $scope.login = function() {

            $auth.login({
                email: this.email,
                password: this.password
            })
                .then(function() {
                    // Asignamos variables para confirmar que estamos loggeados
                    Autenticacion.isLogged = true;
                    // Corremos la funcion para el navbar
                    $scope.logged();
                    $location.path('/');
                })
                .catch(function(response) {
                    if(response.status == '401'){
                        console.log(response);
                        $scope.error = response.data.error;    
                    }
                    
                });
        };

        $scope.signup = function(){
            $auth.signup({
                email: this.email,
                password: this.password
            })
                .then(function(){
                    var token = $auth.getPayload();
                    $scope.token = token.email;
                    Autenticacion.isLogged = true;
                    $location.path('/');
                })
                .catch(function(response) {
                    console.log('No registrado');
                    console.error(response);
                });
        };

        $scope.logout = function() {
            $auth.logout()
                .then(function() {
                    Autenticacion.isLogged = false;
                    Autenticacion.email = null;
                    $location.path('/');
                });
        };
    }
]);