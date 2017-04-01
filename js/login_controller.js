angular.module('myApp').controller('login_controller', ['$scope', '$http', function($scope, $http) {

    $scope.username;
    $scope.password;
    $scope.isDisabled = true;

    $scope.login = function() {

        if (typeof $scope.username != "undefined" && typeof $scope.password != "undefined") {
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
                $scope.data = data;
            })
            .error(function(data, status, headers, config) {
                console.log('error');
            }).then(function(data, status, headers, config){
                if ($scope.data != -1) {
                    $scope.showFunctions();
                }
                // console.log("data: " + $scope.data);
            });
        } else {
            console.log("username and password cannot be empty");
        }
    }

    $scope.showFunctions = function() {
        $scope.isDisabled = false;
    }

    $scope.logout = function() {
        $scope.isDisabled = true;
    }

    $scope.register = function() {

        if (typeof $scope.username != "undefined" && typeof $scope.password != "undefined") {
            var data = {
                'username' : $scope.username,
                'password' : $scope.password
            }

            $http({
                url: 'php/register_controller.php',
                method: "POST",
                data: data
            })
            .success(function(data, status, headers, config) {
                console.log(status + ' - ' + data);
                $scope.data = data;
            })
            .error(function(data, status, headers, config) {
                console.log('error');
            }).then(function(data, status, headers, config){
                console.log($scope.data);
            });
        } else {
            console.log("username and password cannot be empty");
        }
    }

}]);
