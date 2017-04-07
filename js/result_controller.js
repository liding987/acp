acp.controller('result_controller', ['$rootScope', '$scope', '$http', 'MyService', function($rootScope, $scope, $http, MyService) {

    $scope.selected = [];
    $scope.results  = {};

    $scope.options = {
      //autoSelect: true,
      boundaryLinks: true,
      //largeEditDialog: true,
      //pageSelector: true,
      rowSelection: true
    };

    $scope.query = {
        order: 'created',
        limit: 5,
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

    $scope.delete_result = function() {
        console.log("user: " + MyService.user.user_id);
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
            console.log("No result is selected");
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
                $scope.results = {
                    "count": $scope.data.length,
                    "data": $scope.data
                };
            });
        } else {
            console.log("please login your account");
        }
    }
}]);
