var app = angular.module("TodoList", ["LocalStorageModule"]);
app.factory("ToDoService", function (localStorageService) {
    var toDoService = {};
    toDoService.key = "angular-todolist";
    if (localStorageService.get(toDoService.key)) {
        toDoService.activities = localStorageService.get(toDoService.key);
    } else {
        toDoService.activities = [];
    }
    toDoService.add = function (newActividad) {
        toDoService.activities.push(newActividad);
        localStorageService.set(toDoService.key, toDoService.activities);
    }
    toDoService.updaLocalStorage = function () {
        localStorageService.set(toDoService.key, toDoService.activities);
    }
    toDoService.clean = function () {
        toDoService.activities = [];
        toDoService.updaLocalStorage();
        return toDoService.getAll();
    }
    toDoService.getAll = function () {
        return toDoService.activities;
    }
    toDoService.removeItem = function (item) {
        toDoService.activities = toDoService.activities.filter(function (activity) {
            return activity !== item;
        });
        toDoService.updaLocalStorage();
        return toDoService.getAll();
    }
    return toDoService;
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