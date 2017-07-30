/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('crossWordController', CrossWordControllerFct);


    function CrossWordControllerFct($stateParams,$scope,$timeout, dataModel, cwService, cqConstantes, routerHelper){

        var vm = this, isInTransition= false;

        $scope.$on( '$ionicView.afterEnter', function( scopes, states ) {
            if(states.fromCache){
                if(vm.stars !== dataModel.crosswords.stars){
                    vm.animateStars = true;
                   vm.stars = dataModel.crosswords.stars;
                   $timeout(function(){
                    vm.animateStars = false;
                   },300);
                }
            }
        });

        // ############## PRIVATE BUSINESS ############# //
        var goToQuestion = function(i,j,direction){
            if(direction && vm.grid[i][j][direction] !== undefined && !isInTransition){
                isInTransition = true;
                routerHelper.goToState(cqConstantes.states.question,{'i': i,'j': j,'direction': direction});
            }
            _.delay(function(){
                isInTransition= false;
            }, 100);
        };

        /**
         * init of the controler
         */
        function init(){
            vm.goToQuestion = goToQuestion;
            vm.cw = $stateParams.cw;
            vm.grid = dataModel.crosswords.grid;
            vm.stars = dataModel.crosswords.stars;
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
