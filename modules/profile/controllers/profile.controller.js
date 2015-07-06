angular.module('profile').controller('ProfileController', ['$scope', '$auth', 'Lugares', 'Autenticacion', 
    function($scope, $auth, Lugares, Autenticacion){

        $scope.obtenerLugares = function(){
            var token = $auth.getPayload();
            var lugares = token.user.places;
            $scope.lugares = lugares
        };

    }
]);