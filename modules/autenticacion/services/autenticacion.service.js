angular.module('autenticacion').factory('Autenticacion', function($auth) {
    var auth = {
        isLogged: false,
        email: null,
        check: function() {
            if($auth && $auth.getToken()){
                this.isLogged = true;
                
            } else {
                this.isLogged = false;
            }
        }
    };
    return auth;
})