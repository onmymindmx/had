angular.module('profile').controller('ProfileController', ['$scope', 'Perfil',
    function($scope, Perfil){
        Perfil.getPerfil().then(function(response){
            $scope.perfil = response.user;
        })
    }
]);