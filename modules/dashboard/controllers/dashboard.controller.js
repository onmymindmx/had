angular.module('dashboard').controller('DashboardController', ['$scope', 'Dashboard',
    function($scope, Dashboard) {
        var dashboard = Dashboard.info();
        dashboard.success(function(response) {
            $scope.info = response;
        })

    }
])