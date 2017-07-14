(function () {
    'use strict';

    angular
        .module('crossQuestions')
        //Controller of the main page
        .controller('MainController', function (routerHelper, dataService) {

            var vm = this;



            function init(){
                vm.goToState = routerHelper.goToState;

                //Init Data
                dataService.getData();
            }

            init();
        });

})();
