angular.module("FootballApp").controller("TeamWiseController", TeamWiseController);

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function TeamWiseController($http, $q){
    var vm = this;
    vm.object = {};
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
            var arrangedData = data2015.concat(data2016).concat(data2017);
            var allCodes = [];
            arrangedData.forEach(function(item){
                allCodes.push(item.team1.code);
            });
            
            vm.teamArray = allCodes.filter(onlyUnique);
            
            vm.teamArray.forEach(function(team){
                var name, code, totalMatches=0, totalLost=0, totalWon=0, totalGoals=0, totalDraw=0;
                arrangedData.forEach(function(item){
                    if(team == item.team1.code){
                        name = item.team1.name;
                        code = item.team1.code;
                        totalMatches++;
                        totalGoals = totalGoals+item.score1;
                        if(item.score1 > item.score2)
                            totalWon++;
                        if(item.score1 < item.score2)
                            totalLost++;
                        if(item.score1 == item.score2)
                            totalDraw++;
                    }
                
                    if(team == item.team2.code){
                        name = item.team2.name;
                        code = item.team2.code;
                        totalMatches++;
                        totalGoals = totalGoals+item.score2;
                        if(item.score2 > item.score1)
                            totalWon++;
                        if(item.score2 < item.score1)
                            totalLost++;
                        if(item.score1 == item.score2)
                            totalDraw++;
                    }
                });
                vm.object[team] = {
                    name: name,
                    code: code,
                    totalMatches: totalMatches,
                    totalLost: totalLost,
                    totalWon: totalWon,
                    totalDraw: totalDraw,
                    totalGoals: totalGoals
                };
            });
    });
}