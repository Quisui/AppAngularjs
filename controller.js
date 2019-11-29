var app = angular.module("app", []);

app.controller("Ctrl", function ($scope) {
    $scope.Ctrl =  function($scope) {
        $scope.colCount = 3;

        $scope.increment = function(dir) {
          (dir === 'up') ? $scope.colCount++: $scope.colCount--;
        }
        $scope.cols = ['jose'];// array of column names
        $scope.data = ['pepe'];// row data arrays
       
    }
});