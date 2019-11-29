var app = angular.module("RepasoApp", ["LocalStorageModule"]);
app.controller("RepasoController", function ($scope, $http, localStorageService) {
    $scope.newPost = {};
    if (localStorageService.get("post")) {
        $scope.todo = localStorageService.get("post");
    } else {
        $scope.todo = [];
    }
    $scope.borrar = function (){
        $scope.todo = [];
        localStorageService.set("post", $scope.todo);
    }
    $scope.httget = function () {
        $http.get("https://jsonplaceholder.typicode.com/posts")
            .then(function (request) {
                $scope.todo = request.data;
                console.log(request);
            }, function (request) {
                console.log(request);
            });
    }
    $scope.httPost = function () {
        $http.post("https://jsonplaceholder.typicode.com/posts", $scope.newPost[{
            title: $scope.newPost.title,
            body: $scope.newPost.body,
            userId: 1
        }])
            .then(function (response) {
                console.log(response);
                $scope.todo.push($scope.newPost)
                $scope.newPost = {};
                console.log($scope.todo);
            }, function (response) {
                console.log(response);
            });

    }
    
    $scope.$watchCollection("posts", function () {
        localStorageService.set("post", $scope.todo);
    });
    $scope.addPost = function () {
        $scope.todo.push($scope.newPost);
        $scope.newPost = {};
        localStorageService.set("post", $scope.todo);
    }



});