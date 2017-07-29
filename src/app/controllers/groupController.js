/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('groupController', GroupControllerFct);


    function GroupControllerFct($stateParams, $scope, starService, routerHelper, cqConstantes, cwService , dataModel, dataService, correctionService){

        var vm = this;

        $scope.$on( '$ionicView.beforeEnter', function( scopes, states ) {
            if(states.fromCache){
                reload();
                vm.crosswords = updateData(vm.crosswords);
            }
        });

        vm.goToCrossWords = function(id){
            var cw = _.get(vm.crosswords,id);
            cw.id = id;
            cw.levelId = vm.level;
            cwService.initCrossWords(cw);
            routerHelper.goToState(cqConstantes.states.crossWord,{'cw': id});
        };

        vm.isDisabled = function(index){
            return (vm.level+1) === vm.currentLevel && vm.currentCw - 1 < index;
        };

        // ############## PRIVATE BUSINESS ############# //
        var updateData = function(data){
            _.each(data, function(item, index){
                item.stars = starService.getStartsByCw(vm.level, index);
                item.numberCorrectionByCw = correctionService.getNumberCorrectionByCw(vm.level, index);
            });
            return data;
        };

        function reload(){
            vm.numberStars = dataModel.numberStars;
            vm.currentLevel = dataModel.currentLevel;
            vm.currentCw = dataModel.currentCw;
            console.log(vm);
        }

        /**
         * init of the controler
         */
        function init(){
            var level;
            vm.level = parseInt($stateParams.level);
            reload();
            dataService.getData().then(function(datas){
                level = _.get(datas,vm.level);
                vm.crosswords = updateData(level ? level.crosswords : []);
            });
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
