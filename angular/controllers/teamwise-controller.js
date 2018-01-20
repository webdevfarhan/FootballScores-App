angular.module("FootballApp").controller("TeamWiseController", TeamWiseController);

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function TeamWiseController($http, $q){
    var vm = this;
    vm.object = {};
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
            vm.allCodes = [];
            vm.arrangedData.forEach(function(item){
                vm.allCodes.push(item.team1.code);
            });
            
            vm.teamArray = vm.allCodes.filter(onlyUnique);
            
            vm.teamArray.forEach(function(team){
                var name, code, totalMatches=0, totalLost=0, totalWon=0, totalGoals=0;
                vm.arrangedData.forEach(function(item){
                    if(team == item.team1.code){
                        name = item.team1.name;
                        code = item.team1.code;
                        totalMatches++;
                        totalGoals = totalGoals+item.score1;
                        if(item.score1 > item.score2)
                            totalWon++;
                        else
                            totalLost++;
                    }
                });
                vm.arrangedData.forEach(function(item){
                    if(team == item.team2.code){
                        name = item.team2.name;
                        code = item.team2.code;
                        totalMatches++;
                        totalGoals = totalGoals+item.score2;
                        if(item.score2 > item.score1)
                            totalWon++;
                        else
                            totalLost++;
                    }
                });
                vm.object[team] = {
                    name: name,
                    code: code,
                    totalMatches: totalMatches,
                    totalLost: totalLost,
                    totalWon: totalWon,
                    totalGoals: totalGoals
                };
            });
    });
}