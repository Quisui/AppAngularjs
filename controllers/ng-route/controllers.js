var app = angular.module("CustomeDirective");

app.controller("AppController", function ($scope, $http) {
    $scope.repo = [];

    $http.get("https://api.github.com/users/codigofacilito/repos")
        .then(function (request) {
            $scope.posts = request.data;
            for (var i = request.lenght - 1; i > 0; i--) {
                var repo = data[i];
                $scope.repo.push(repo.name);
            }
            console.log(request.data);
        }).catch(function (request) {
            console.log(request);
        });
    $scope.optionSelected = function (request) {
        $scope.$apply(function () {
            $scope.main_repo = request.data;
        });
    }
});

app.controller("repoController", function ($scope, $http, $routeParams) {
    $scope.repo = {};
    $http.get("https://api.github.com/repos/codigofacilito/" + $routeParams.name)
        .then(function (request) {
            $scope.repo = request.data;
        }).catch(function (request) {
            console.log(request);
        });
});