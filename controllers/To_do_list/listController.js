var app = angular.module("TodoList", ["LocalStorageModule"]);
app.controller("listController", function ($scope, localStorageService, $http) {
    if (localStorageService.get("angular-todolist")) {
        $scope.todo = localStorageService.get("angular-todolist");
        $http.get("https://jsonplaceholder.typicode.com/posts")
            .then(function (datos) {
                $scope.todo = datos.data;
                console.log(datos);
            },
                function (error) { });
    } else {
        $scope.todo = [];
    }
    $scope.newActividad = {};
    /*
        {
            description: 'Una actividad',
            fecha: 'fecha'
        }
    */
    $scope.$watchCollection('todo', function (newValue, oldValue) {
        localStorageService.set("angular-todolist", $scope.todo);

    });
    $scope.addActividad = function () {
        $scope.todo.push($scope.newActividad);
        $scope.newActividad = {};
        $scope.addPost = function () {
            $http.post("https://jsonplaceholder.typicode.com/posts", $scope.newPost[{
                title: $scope.newPost.title,
                body: $scope.newPost.body,
                userId: 1
            }])
                .then(function (response) {
                    console.log(response);
                    $scope.posts.push($scope.newPost)
                    $scope.newPost = {};
                    console.log($scope.posts);
                }, function (response) {
                    console.log(response);
                })
        }
    }
    

});