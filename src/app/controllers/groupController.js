/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('groupController', GroupControllerFct);


    function GroupControllerFct($stateParams, starService, routerHelper, cqConstantes, cwService , dataModel, dataService, correctionService){

        var vm = this;

        vm.goToCrossWords = function(id){
            var cw = _.get(vm.crosswords,id);
            cw.id = id;
            cw.levelId = vm.level;
            cwService.initCrossWords(cw);
            routerHelper.goToState(cqConstantes.states.crossWord,{'cw': id});
        };

        // ############## PRIVATE BUSINESS ############# //
        var updateData = function(data){
            _.each(data, function(item, index){
                item.stars = starService.getStartsByCw(vm.level, index);
                item.numberCorrectionByCw = correctionService.getNumberCorrectionByCw(vm.level, index);
            });
            return data;
        };
        /**
         * init of the controler
         */
        function init(){
            var level;
            vm.level = parseInt($stateParams.level);
            vm.numberStars = dataModel.numberStars;

            vm.currentLevel = dataModel.currentLevel;
            vm.currentCw = dataModel.currentCw;
            dataService.getData().then(function(datas){
                level = _.get(datas,vm.level);
                vm.crosswords = updateData(level ? level.crosswords : []);
            });
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
