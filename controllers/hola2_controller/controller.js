var app = angular.module('MySecondApp', []);

app.controller("controladorTexto", ["$scope",function (m) {
    m.nuevoGrados = {};
    m.grados = [
        {
            Grado: "Tercero Basico",
            Seccion: "A"
        },
        {
            Grado: "Segundo primaria",
            Seccion: "B"
        }];
        m.agregarGrados = function(){
        m.grados.push(m.nuevoGrados);
        m.nuevoGrados = {};
        console.log(m.grados);
    };
}]);