var app = angular.module("FinalApp", ["ngRoute","ngResource"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            controller: "AppController",
            templateUrl: "templates/home.html"
        });
});