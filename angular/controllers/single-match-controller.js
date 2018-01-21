angular.module("FootballApp").controller("SingleMatchController", SingleMatchController);

function SingleMatchController($http, $q){
    var vm = this;
    var data2015 = [];
    var data2016 = [];
    var data2017 = [];
    var promise1 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', cache: 'true'}); 
    var promise2 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', cache: 'true'}); 
    $q.all([promise1, promise2]).then(function(response){         
        var totaldata = response[0].data.rounds.concat(response[1].data.rounds);
            totaldata.forEach(function(item){
                var temp = 0; 
                item.matches.forEach(function(matchday){
                    if(matchday.date.slice(0,4) == 2015){
                        matchday.matchname = item.name;
                        data2015.push(matchday);
                    }
                });
            });
            totaldata.forEach(function(item){
                var temp = 0;
                item.matches.forEach(function(matchday){
                    if(matchday.date.slice(0,4) == 2016){
                        matchday.matchname = item.name;
                        data2016.push(matchday);
                    }
                });
            });
            totaldata.forEach(function(item){
                var temp = 0;
                item.matches.forEach(function(matchday){
                    if(matchday.date.slice(0,4) == 2017){
                        matchday.matchname = item.name;
                        data2017.push(matchday);
                    }
                });
            });   

        vm.arrangedData = data2015.concat(data2016).concat(data2017);
    });

}