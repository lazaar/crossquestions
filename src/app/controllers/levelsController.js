/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('levelsController', LevelsControllerFct);


    function LevelsControllerFct(dataService){

        var vm = this;

        // ############## PRIVATE BUSINESS ############# //
        /**
         * init of the controler
         */
        function init(){
            dataService.getData().then(function(datas){
                vm.levels = datas;
            });
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
