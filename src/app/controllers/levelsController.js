/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('levelsController', LevelsControllerFct);


    function LevelsControllerFct(dataService,$scope, starService, dataModel){

        var vm = this;

        $scope.$on( '$ionicView.beforeEnter', function( scopes, states ) {
            if(states.fromCache){
                reload();
                vm.levels = updateData(vm.levels);
            }
        });

        // ############## PRIVATE BUSINESS ############# //
        var updateData = function(data){
            _.each(data, function(item, index){
                item.stars = starService.getStartsByLevels(index);
            });
            return data;
        };

        function reload(){
            vm.currentLevel = dataModel.currentLevel;
            vm.currentCw = dataModel.currentCw;
            vm.numberStars = dataModel.numberStars;
        }
        /**
         * init of the controler
         */
        function init(){
            reload();
            dataService.getData().then(function(datas){
                vm.levels = updateData(datas);
            });
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
