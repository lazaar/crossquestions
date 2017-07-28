(function () {
    'use strict';

    angular
        .module('crossQuestions')
        //Controller of the main page
        .controller('MainController', function (routerHelper,starService, dataService, $ionicHistory) {

            var vm = this;
            vm.goBack = function (){
                $ionicHistory.goBack(); 
            };


            function init(){
                vm.goToState = routerHelper.goToState;
                //Init Data
                dataService.getData();
                starService.init();
            }

            init();
        });

})();
