angular.module('autenticacion').controller('AutenticacionController', ['$scope', '$auth', '$location', 'Autenticacion', 'toaster', '$http', '$routeParams', 'url',
    function($scope, $auth, $location, Autenticacion, toaster, $http, $routeParams, url) {

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
        };

        $scope.isAdmin = function() {
            var token = $auth.getPayload();
            if(token.user.isAdmin === 1) {
                return true;
            } else {
                return false;
            }
        };

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

        $scope.solicitarRestaurarPassword = function() {
            var email = this.email;
            $scope.success = null;
            $scope.error = null;
            $scope.message = null;
            $http.post(url.APIBASE + '/recover-password', {email: email}).
                then(function(response){
                    console.log(response.data);
                    if(response.data.success){
                        $scope.success = response.data.success;
                        $scope.message = response.data.message;
                    } else {
                        $scope.success = response.data.success;
                        $scope.error = response.data.error;

                    }
                }, function(error){
                    $scope.success = error.data.success;
                    $scope.error = error.data.error;
                });
        };

        $scope.getToken = function() {
            var code = $routeParams.code;
            $scope.success_change_password = false;
            $http.post(url.APIBASE + '/recover-password', {code: code}).
                then(function(response){
                    if(response.data.success){
                        $scope.success = response.data.success;
                        $scope.message = response.data.message;
                        $scope.token = response.data.token;
                    } else {
                        $scope.success = response.data.success;
                        $scope.error = response.data.error;
                    }

                }, function(error) {
                    $scope.success = error.data.success;
                    $scope.error = error.data.error;
                });
        };

        $scope.restaurarPassword = function() {
            var token = this.token;
            var password = this.password;
            $scope.changing_password = true;
            $http.post(url.APIBASE + '/change-password', {reset_token: token, password: password}).
                then(function(response){
                    if(response.data.success){
                        $scope.success_change_password = response.data.success;
                        $scope.message_change_password = response.data.message;
                    } else {
                        $scope.success_change_password = response.data.success;
                        $scope.error_change_password = response.data.error;
                    }
                    $scope.changing_password = false;
                }, function(error){
                    $scope.success_change_password = error.data.success;
                    $scope.error_change_password = error.data.error;
                    $scope.changing_password = false;
                });
        };
    }
]);