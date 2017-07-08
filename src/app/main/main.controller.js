(function () {
    'use strict';

    angular
        .module('crossQuestions')
        //Controller of the main page
        .controller('MainController', function (routerHelper) {

            var vm = this;



            function init(){
                vm.goToState = routerHelper.goToState;
            }

            init();
        });

})();
