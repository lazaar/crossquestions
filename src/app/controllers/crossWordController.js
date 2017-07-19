/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('crossWordController', CrossWordControllerFct);


    function CrossWordControllerFct($stateParams, dataModel, cwService, cqConstantes, routerHelper){

        var vm = this, isInTransition= false;

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
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
