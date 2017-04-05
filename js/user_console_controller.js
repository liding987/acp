// var acp = angular.module('acp');
acp.controller('user_console_controller', ['$scope', '$http', 'MyService', function($scope, $http, MyService) {
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

    $scope.save_result = function() {

        // if result === null { warning } else { save }
        $scope.result = MyService.result;
        console.log($scope.result);
        // console.log($scope.result.address);
        // console.log($scope.result.city);
        // console.log($scope.result.state);
        //
        // $scope.result.postal_code;
        // $scope.result.radius;
        // $scope.result.price       = $scope.price;
        // $scope.result.link        = $scope.link;
        // $scope.result.num_gas     = $scope.num_gas;
        // $scope.result.num_bank    = $scope.num_bank;
        // $scope.result.num_supermarket = $scope.num_supermarket;
        // $scope.result.num_restaurant  = $scope.num_restaurant;
        // MyService.result.rating      = $scope.rating;
        // MyService.result.lat         = $scope.lat;
        // MyService.result.lng         = $scope.lng;
        // MyService.result.place_id    = $scope.place_id;


    }

}]);
