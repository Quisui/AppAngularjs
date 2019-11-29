var app = angular.module("FinalApp");
app.controller("AppController", function ($scope, $http, $resource) {
    $scope.registros = {};
    $http.get("http://localhost:8085/api/")
        .then(function (request) {
            $scope.registros = request.data;
            console.log(request.data)
        })
        .catch(function (request) {
            console.log(request);
        });
});