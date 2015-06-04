angular.module('autenticacion').controller('AutenticacionController', ['$scope', '$auth', '$location', 'Autenticacion', 'toaster',
    function($scope, $auth, $location, Autenticacion, toaster) {
        
        

        // Función para pasar las varibles de autenticación al navbar y ocultar o mostrar los datos necesarios
        $scope.logged = function() {
            if($auth.getToken()){
                // Para mostrar nuestro nombre de usuario
                var token = $auth.getPayload();
                $scope.token = token.user;

                // Verificamos qué perfil tenemos
                Autenticacion.isAdmin = token.user.isAdmin == 1 ? true : false;
                // Asignamos variables para confirmar que estamos loggeados
                Autenticacion.isLogged = true;
                return true;
            } else {
                false;
            }
        }

        $scope.isAdmin = function() {
            var token = $auth.getPayload();
            if(token.user.isAdmin === 1) {
                return true;
            } else {
                return false;
            }
        }

        $scope.login = function() {
            $scope.error = null;
            $auth.login({
                email: this.email,
                password: this.password
            })
                .then(function() {
                    // Propagamos el acceso
                    $scope.logged();
                    $scope.isAdmin();
                    $location.path('/');
                    toaster.pop('success', "Acceso correcto", "¡Bienvenido de nuevo! Ya te extrañabamos");
                })
                .catch(function(response) {
                    if(response.status == '401'){
                        console.log(response);
                        $scope.error = response.data.error;    
                    }
                    
                });
        };

        $scope.signup = function(){
            $scope.error = null;
            $auth.signup({
                email: this.email,
                password: this.password,
                username: this.username,
                first_name: this.first_name, 
                last_name: this.last_name
            })
                .then(function(){
                    // Propagamos el acceso
                    $scope.logged();
                    $scope.isAdmin();
                    $location.path('/');
                })
                .catch(function(response) {
                    $scope.error = response.data.message;
                });
        };

        $scope.logout = function() {
            $auth.logout()
                .then(function() {
                    Autenticacion.isLogged = false;
                    Autenticacion.isAdmin = false;
                    $location.path('/');
                    toaster.pop('warning', "Sesión cerrada", "Esperamos que regreses pronto");
                });
        };
    }
]);