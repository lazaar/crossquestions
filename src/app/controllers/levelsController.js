/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('levelsController', LevelsControllerFct);


    function LevelsControllerFct(dataService, starService, dataModel){

        var vm = this;

        // ############## PRIVATE BUSINESS ############# //
        var updateData = function(data){
            _.each(data, function(item, index){
                item.stars = starService.getStartsByLevels(index);
            });
            return data;
        };
        /**
         * init of the controler
         */
        function init(){
            vm.currentLevel = dataModel.currentLevel;
            vm.currentCw = dataModel.currentCw;
            vm.numberStars = dataModel.numberStars;
            dataService.getData().then(function(datas){
                vm.levels = updateData(datas);
            });
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
