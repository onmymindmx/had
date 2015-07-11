angular.module('profile').controller('MisLugaresController', ['$scope','MisLugares',
    function($scope, MisLugares) {
        MisLugares.getLugares().then(function(response){
            $scope.lugares = response;
        });
    }
]);