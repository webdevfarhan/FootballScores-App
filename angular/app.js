angular.module("FootballApp", ['ngRoute', 'angularUtils.directives.dirPagination']).config(config);

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
    });
}
