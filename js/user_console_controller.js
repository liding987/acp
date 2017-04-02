angular.module('myApp').controller('user_console_controller', ['$scope', '$http', function($scope, $http) {

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
                url: 'php/login.php',
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
                    $scope.enable_button();
                }
                // console.log("data: " + $scope.data);
            });
        } else {
            console.log("username and password cannot be empty");
        }
    }

    $scope.enable_button = function() {
        $scope.isDisabled = false;
        $scope.username = "";
        $scope.password = "";
    }

    $scope.logout = function() {
        $scope.isDisabled = true;
        $scope.username = "";
        $scope.password = "";
    }

    $scope.register = function() {

        if (typeof $scope.username != "undefined" && typeof $scope.password != "undefined") {
            var data = {
                'username' : $scope.username,
                'password' : $scope.password
            }

            $http({
                url: 'php/register.php',
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
