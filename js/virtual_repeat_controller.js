angular.module('myApp').controller('virtual_repeat_controller', ['$scope', '$http', function($scope, $http) {
    $scope.items = [];
    for (var i = 0; i < 10; i++) {
      $scope.items.push(i);
      console.log(i);
    }
}]);
