var app = angular.module("mainModule", []);

app.controller("filtroController", function ($scope, $http) {
    $scope.posts = [];
    $scope.loading = true;
    $scope.httget = function () {
        $http.get("https://jsonplaceholder.typicode.com/posts")
            .then(function (request) {
                $scope.posts = request.data;
                console.log(request);
                $scope.loading = false;
            }, function (request) {
                console.log(request);
                $scope.loading = false; 
            });
    }
    /*setTimeout(function(){
        $scope.$apply(function(){
            $scope.mi_html.title = "Hoa mundo 2";
            console.log($scope.mi_html.title);
            
        });
    }, 2000);
*/

});