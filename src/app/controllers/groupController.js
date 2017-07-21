/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('groupController', GroupControllerFct);


    function GroupControllerFct($stateParams, routerHelper, cqConstantes, cwService , dataService){

        var vm = this;

        vm.goToCrossWords = function(id){
            var cw = _.get(vm.crosswords,id);
            cw.id = id;
            cw.levelId = vm.level;
            cwService.initCrossWords(cw);
            routerHelper.goToState(cqConstantes.states.crossWord,{'cw': id});
        };

        // ############## PRIVATE BUSINESS ############# //
        /**
         * init of the controler
         */
        function init(){
            var level;
            vm.level = parseInt($stateParams.level);
            dataService.getData().then(function(datas){
                level = _.get(datas,vm.level);
                vm.crosswords =level ? level.crosswords : [];
            });
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
