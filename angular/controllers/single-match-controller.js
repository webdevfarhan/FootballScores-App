angular.module("FootballApp").controller("SingleMatchController", SingleMatchController);

function SingleMatchController($http, $q){
    var vm = this;
    vm.data2015 = [];
    vm.data2016 = [];
    vm.data2017 = [];
    var promise1 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', cache: 'true'}); 
    var promise2 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', cache: 'true'}); 
    $q.all([promise1, promise2]).then(function(response){         
        vm.totaldata = response[0].data.rounds.concat(response[1].data.rounds);
            vm.totaldata.forEach(function(item){
                var temp = 0; 
                item.matches.forEach(function(matchday){
                    if(matchday.date.slice(0,4) == 2015){
                        matchday.matchname = item.name;
                        vm.data2015.push(matchday);
                    }
                });
            });
            vm.totaldata.forEach(function(item){
                var temp = 0;
                item.matches.forEach(function(matchday){
                    if(matchday.date.slice(0,4) == 2016){
                        matchday.matchname = item.name;
                        vm.data2016.push(matchday);
                    }
                });
            });
            vm.totaldata.forEach(function(item){
                var temp = 0;
                item.matches.forEach(function(matchday){
                    if(matchday.date.slice(0,4) == 2017){
                        matchday.matchname = item.name;
                        vm.data2017.push(matchday);
                    }
                });
            });   

        vm.arrangedData = vm.data2015.concat(vm.data2016).concat(vm.data2017);
    });

}