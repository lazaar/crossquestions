/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('levelsController', LevelsControllerFct);


    function LevelsControllerFct(dataService, dataModel){

        var vm = this;

        // ############## PRIVATE BUSINESS ############# //
        /**
         * init of the controler
         */
        function init(){
            vm.currentLevel = dataModel.currentLevel;
            vm.currentCw = dataModel.currentCw;
            dataService.getData().then(function(datas){
                vm.levels = datas;
            });
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
