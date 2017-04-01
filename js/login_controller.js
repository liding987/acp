angular.module('myApp').controller('login_controller', ['$scope', '$http', function($scope, $http) {

    $scope.username;
    $scope.password;
    $scope.isDisabled = true;

    $scope.login = function() {
        // $scope.username = "in";
        var data = {
            'username' : $scope.username,
            'password' : $scope.password
        }

        $http({
            url: 'php/login_controller.php',
            method: "POST",
            data: data
        })
        .success(function(data, status, headers, config) {
            console.log(status + ' - ' + data);
        })
        .error(function(data, status, headers, config) {
            console.log('error');
        }).then(function(data, status, headers, config){
            $scope.showFunctions();
        });
    }

    $scope.showFunctions = function() {
        $scope.isDisabled = false;
    }

    $scope.logout = function() {
        $scope.isDisabled = true;
    }

}]);
