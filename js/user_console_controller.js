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
        $scope.result = MyService.result;
        if ($scope.result.isSet === true) {
            var data = {
                'address'         : $scope.result.address,
                'city'            : $scope.result.city,
                'county'          : $scope.result.county,
                'state'           : $scope.result.state,
                'postal_code'     : $scope.result.postal_code,
                'radius'          : $scope.result.radius,
                'price'           : $scope.result.price,
                'link'            : $scope.result.link,
                'num_gas'         : $scope.result.num_gas,
                'num_bank'        : $scope.result.num_bank,
                'num_supermarket' : $scope.result.num_supermarket,
                'num_restaurant'  : $scope.result.num_restaurant,
                'rating'          : $scope.result.rating,
                'lat'             : $scope.result.lat,
                'lng'             : $scope.result.lng,
                'place_id'        : $scope.result.place_id
            }

            // console.log(data);
            $http({
                url: 'php/save_result.php',
                method: "POST",
                data: data
            })
            .success(function(data, status, headers, config) {
                console.log(status + ' - ' + data);
                $scope.data = data;
            })
            .error(function(data, status, headers, config) {
                console.log('error');
            }).then(function(data, status, headers, config) {
                console.log("result saved");
            });
        } else {
            console.log("result cannot be empty");
        }
    }

}]);
