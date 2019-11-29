var app = angular.module("MyFirstApp", []);
app.controller("FirstController", function ($scope) {
    $scope.nombre = "Uriel";
}).controller("SecondController", function($scope){
    $scope.apellido = "Quisui";
    $scope.nuevoComentario ={};
    $scope.comentarios = [
        {
            comentario: "Buen tut",
            username: "Quisui"
        },
        {
            comentario: "Mal tut",
            username: "Juti"
        }
    ];
    $scope.agregarComentario = function(){
        $scope.comentarios.push($scope.nuevoComentario);
        $scope.nuevoComentario = {};
        console.log($scope.comentarios);
    };
});
