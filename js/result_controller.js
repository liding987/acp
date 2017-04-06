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
}]);
