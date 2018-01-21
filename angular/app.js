angular.module("FootballApp", ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider.when("/", {
        controller: 'AllController',
        controllerAs: 'vm',
        templateUrl: 'angular/templates/all.html'
    }).when("/index.html", {
        controller: 'AllController',
        controllerAs: 'vm',
        templateUrl: 'angular/templates/all.html'
    }).when("/SingleMatch", {
        controller: 'SingleMatchController',
        controllerAs: 'vm',
        templateUrl: 'angular/templates/SingleMatch.html'
    }).when("/TeamWise", {
        controller: 'TeamWiseController',
        controllerAs: 'vm',
        templateUrl: 'angular/templates/TeamWise.html'
    }).when("/404", {
        templateUrl: "angular/templates/404.html"
    }).otherwise({
        redirectTo: "/404"
    });
}
