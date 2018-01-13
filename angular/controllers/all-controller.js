angular.module("FootballApp").controller("AllController", AllController);

function AllController($http, $q){
    var vm = this;
    vm.data2015 = [];
    vm.data2016 = [];
    vm.data2017 = [];

    vm.checkTeams = function(matches, teamSearch, team1Search, team2Search){
        var found = false;
        if(teamSearch != undefined){
            found = true;
        }
        if(team1Search != undefined){
            matches.forEach(function(data){
                var team1 = data.team1.name.toLowerCase();
                if(team1.search(team1Search) != -1){
                    found = true;
                }
            });
        }
        if(team2Search != undefined){
            matches.forEach(function(data){
                var team2 = data.team2.name.toLowerCase();
                if(team2.search(team2Search) != -1){
                    found = true;
                }
            });
        }
        if(found == true)
            return true;
        if(teamSearch == undefined && team1Search == undefined && team2Search == undefined)
            return true;
    }

    vm.eachDateCheck = function(matches, year){
        vm.temp = 0, found = false;
        if(Array.isArray(year)){
            year.forEach(function(yearItem){
                matches.forEach(function(matchItem){
                    if(matchItem.date.slice(0,4) == yearItem)
                        found = true;
                });
            });
            return found;
        }
        else{
            matches.forEach(function(item){
                if(item.date.slice(0,4) == year)
                    vm.temp = 1;
            });
            if(vm.temp == 1)
                return true;
        }
    }
    vm.rowDateCheck= function(date, yearVar){
        if(Array.isArray(yearVar)){
            var found = false;
            yearVar.forEach(function(year){
                if(year == date)
                {
                    found = true;
                }
            });
            return found;
        }
        else{
                if(yearVar == date)
                {
                    return true;
                }
        }
    }

    var promise1 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', cache: 'true'}); 
    var promise2 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', cache: 'true'}); 
    $q.all([promise1, promise2]).then(function(response){         
        vm.totaldata = response[0].data.rounds.concat(response[1].data.rounds);
            vm.totaldata.forEach(function(item){
                var temp = 0;
                item.matches.forEach(function(matchday){
                    if(matchday.date.slice(0,4) == 2015)
                            temp = 1;
                    });
                    if(temp == 1)
                        vm.data2015.push(item);
            });
            vm.totaldata.forEach(function(item){
                var temp = 0;
                item.matches.forEach(function(matchday){
                    if(matchday.date.slice(0,4) == 2016)
                        temp = 1;
                    });
                    if(temp == 1)
                    vm.data2016.push(item);
            });
            vm.totaldata.forEach(function(item){
                var temp = 0;
                item.matches.forEach(function(matchday){
                    if(matchday.date.slice(0,4) == 2017)
                        temp = 1;
                    });
                     if(temp == 1)
                    vm.data2017.push(item);
            });
    });
}