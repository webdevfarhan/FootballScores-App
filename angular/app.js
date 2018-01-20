angular.module("FootballApp", ['ngRoute']).config(config);

function config($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('!');
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
    });
}
