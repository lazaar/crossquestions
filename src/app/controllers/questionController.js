/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('questionController', QuestionControllerFct);


    function QuestionControllerFct($stateParams, dataModel){

        var vm = this;
        var grid = dataModel.crosswords.grid;
        // ############## PRIVATE BUSINESS ############# //
        var initAnswer = function(){

            var answerLength = vm.question.answer.split('').length;
            var result = [], i;


            if(vm.question.direction === 'h'){
                for(i = 0; i < answerLength; i++){
                    result.push(grid[vm.question.x][vm.question.y+i]);
                }
            }else{
                for(i = 0; i < answerLength; i++){
                    result.push(grid[vm.question.x + i][vm.question.y]);
                }
            }

            return result;
        };

        // ################# INITALIZE ################# //
        /**
         * init of the controler
         */
        function init(){
            var i = parseInt($stateParams.i),
                j = parseInt($stateParams.j),
                direction = $stateParams.direction;

            vm.question = _.get(dataModel.crosswords.questions,grid[i][j][direction] );
            
            if(!vm.question){
                return;
            }

            vm.answer = initAnswer();
            console.log(vm.answer);
        }

        init();
    }
})();
