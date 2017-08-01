(function () {
    'use strict';

    angular
        .module('crossQuestions')
        //Controller of the main page
        .controller('MainController', function (routerHelper, cqConstantes, soundService, starService, dataService, $ionicHistory) {

            var vm = this;
            vm.goBack = function (){
                $ionicHistory.goBack(); 
                vm.clickSound();
            };

            vm.clickSound = function(){
                soundService.playSound(cqConstantes.sounds.click);
            };

            vm.goToState = function(to, params, options){
                routerHelper.goToState(to, params, options);
                vm.clickSound();
            };

            function init(){
                
                //Init Data
                dataService.getData();
                starService.init();
            }

            init();
        });

})();
