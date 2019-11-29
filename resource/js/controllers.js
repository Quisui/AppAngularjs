angular.module("FinalApp")
.controller("MainController", function($scope, $resource){
    //1) configurar la resource
    Post = $resource("https://jsonplaceholder.typicode.com/posts/:id", {id: "@id"});
    $scope.posts = Post.get();
    // query() -> GET/posts -> un arreglo de posts -> isarray() = true
});