angular.module("FootballApp").controller("AllController", AllController);

function AllController($http, $q){
    var vm = this;
    vm.data2015 = [];
    vm.data2016 = [];
    vm.data2017 = [];
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