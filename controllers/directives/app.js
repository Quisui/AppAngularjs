var app = angular.module("CustomeDirective", []);

app.directive("myAutocomplete", function () {
    $attrs.$observe("myAutocomplete",
     function link(scope, element,attrs){
        $(element).$autocomplete({
            source: scope[attrs.myAutocomplete],
            select: function(ev, ui){
                ev.preventDefault();    
                if(ui.item){
                    scope.optionSelected(ui.item.value);
                }
            },
            focus: function(ev,ui){
                ev.preventDefault();
                $(this).val(ui.item.label);
            }
        });
        return {
            link: link
        }
    }
 


    );
    

});

app.directive("backImg", function () {
    return function (scope, element, attrs) {
        attrs.$observe('backImg', function (value) {
            element.css({
                'background': "url(" + value + ")",
                'background-size': "cover",
                'background-position': 'center'

            });
        });
        /*
        style="background:url({{repo.owner.avatar_url}}); background-position: center; background-size: cover;"
        */
    }
});

app.controller("AppController", function ($scope, $http) {
    $scope.repos = [];

    $http.get("https://api.github.com/users/codigofacilito/repos")
        .then(function (request) {
            $scope.posts = request.data;
            for (var i = request.lenght - 1; i > 0; i--) {
                var repo = data[i];
                $scope.repos.push(repo.name);
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
