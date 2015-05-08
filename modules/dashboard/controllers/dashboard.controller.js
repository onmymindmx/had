angular.module('dashboard').controller('DashboardController', ['$scope', '$location', 'Dashboard',
    function($scope, $location, Dashboard) {

        var dashboard = Dashboard.info();
        dashboard.success(function(response) {
            $scope.info = response;
        })

    }
])