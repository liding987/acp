acp.controller('result_controller', ['$rootScope', '$scope', '$http', 'MyService', '$mdDialog',
                function($rootScope, $scope, $http, MyService, $mdDialog) {

    $scope.selected = [];
    $scope.results  = {};
    $scope.url;
    $scope.options = {
      //autoSelect: true,
      boundaryLinks: true,
      //largeEditDialog: true,
      //pageSelector: true,
      rowSelection: true
    };

    $scope.query = {
        order: 'created',
        limit: 3,
        page: 1
    };

    $rootScope.$on('results-updated', function(event, data) {
        $scope.data = data;
        $scope.reload_results(data);
    });

    $scope.reload_results = function(data) {
        $scope.results = {
            "count": $scope.data.length,
            "data": $scope.data
        };
    };

    $scope.logPagination = function (page, limit) {
        console.log('page: ', page);
        console.log('limit: ', limit);
    }

    $scope.delete_result = function(ev) {
        if ($scope.selected[0] && MyService.user.user_id !== -1) {
            var data = {
                'result_id' : $scope.selected[0].result_id
            }

            $http({
                url: 'php/delete_result.php',
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
                $scope.show_results();
            });
        } else {
            $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Oops!')
                .textContent('No result is selected.')
                .ariaLabel('Alert Dialog')
                .ok('Got it!')
                .targetEvent(ev)
            );
        }
    }

    // $scope.show_results = function() {
    //     $scope.user = MyService.user;
    //     if ($scope.user.user_id) {
    //         var data = {
    //             'user_id' : $scope.user.user_id
    //         }
    //
    //         $http({
    //             url: 'php/show_results.php',
    //             method: "POST",
    //             data: data
    //         })
    //         .success(function(data, status, headers, config) {
    //             console.log(status + ' - ' + data);
    //             $scope.data = data;
    //         })
    //         .error(function(data, status, headers, config) {
    //             console.log('error');
    //         }).then(function(data, status, headers, config) {
    //             $scope.results = {
    //                 "count": $scope.data.length,
    //                 "data": $scope.data
    //             };
    //         });
    //     } else {
    //         console.log("please login your account");
    //     }
    // }

    $scope.results_report = function(ev) {
        if (MyService.user.user_id !== -1) {
            var data = {
                'user_id' : MyService.user.user_id
            }

            console.log(MyService.user.user_id);

            $http({
                url: 'php/results_report.php',
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
                $scope.url = $scope.data;
                window.open($scope.url, '_blank', '');
            });
        } else {
            $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Oops!')
                .textContent('Please login your account.')
                .ariaLabel('Alert Dialog')
                .ok('Got it!')
                .targetEvent(ev)
            );
        }
    }

    $scope.save_result = function(ev) {
        $scope.result = MyService.result;
        $scope.user   = MyService.user;
        if ($scope.result.isSet === true && $scope.user.user_id !== -1) {
            var data = {
                'user_id'         : $scope.user.user_id,
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
                $scope.show_results();
            });
        } else {
            $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Oops!')
                .textContent('Cannot save the result.')
                .ariaLabel('Alert Dialog')
                .ok('Got it!')
                .targetEvent(ev)
            );
        }
    }

    $scope.show_results = function() {
        $scope.user = MyService.user;
        if ($scope.user.user_id) {
            var data = {
                'user_id' : $scope.user.user_id
            }

            $http({
                url: 'php/show_results.php',
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
                console.log($scope.data);
                $rootScope.$broadcast('results-updated', $scope.data);
            });
        } else {
            console.log("please login your account");
        }
    }
}]);
