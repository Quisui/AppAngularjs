var app = angular.module("TodoList", ["LocalStorageModule"]);
app.service("ToDoService", function (localStorageService) {
    this.key = "angular-todolist";
    if (localStorageService.get(this.key)) {
        this.activities = localStorageService.get(this.key);
    } else {
        this.activities = [];
    }
    this.add = function (newActividad) {
        this.activities.push(newActividad);
        this.updaLocalStorage();    
    }
    this.updaLocalStorage = function () {
        localStorageService.set(this.key, this.activities);
    }
    this.clean = function () {
        this.activities = [];
        this.updaLocalStorage();
        return this.getAll();
    }
    this.getAll = function () {
        return this.activities;
    }
    this.removeItem = function (item) {
        this.activities = this.activities.filter(function (activity) {
            return activity !== item;
        });
        this.updaLocalStorage();
        return this.getAll();
    }
    return this;
});

app.controller("listController", function ($scope, ToDoService) {
    /*
        {
            description: 'Una actividad',
            fecha: 'fecha'
        }
    */
    $scope.todo = ToDoService.getAll();
    $scope.newActividad = {};
    $scope.addActividad = function () {
        ToDoService.add($scope.newActividad);
        $scope.newActividad = {};
    }
    $scope.removeActv = function (item) {
        $scope.todo = ToDoService.removeItem(item);
    }
    $scope.clean = function () {
        $scope.todo = ToDoService.clean();
    }

});