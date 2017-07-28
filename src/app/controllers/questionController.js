/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('questionController', QuestionControllerFct);


    function QuestionControllerFct($stateParams, $ionicHistory, correctionService, routerHelper, cqConstantes, storageHelper, dataModel, cwService){

        var vm = this;
        var grid = dataModel.crosswords.grid, numberLetter = 0, questionId;
        // ############## PRIVATE BUSINESS ############# //

        var initAnswer = function(){

            var answerLength = vm.question.answer.split('').length;
            var result = [], i;


            if(vm.question.direction === 'h'){
                for(i = 0; i < answerLength; i++){
                    if(grid[vm.question.x][vm.question.y+i].content !== '&nbsp;'){
                        numberLetter++;
                        //remove Letter from propositions
                        vm.letters[_.indexOf(vm.letters, grid[vm.question.x][vm.question.y+i].content)] = '&nbsp;';
                    }
                    result.push(grid[vm.question.x][vm.question.y+i]);
                }
            }else{
                for(i = 0; i < answerLength; i++){
                    if(grid[vm.question.x+i][vm.question.y].content !== '&nbsp;'){
                        numberLetter++;
                        //remove Letter from propositions
                        vm.letters[_.indexOf(vm.letters, grid[vm.question.x+i][vm.question.y].content)] = '&nbsp;';
                    }
                    result.push(grid[vm.question.x + i][vm.question.y]);
                }
            }

            return JSON.parse(JSON.stringify(result));
        };


        var onLetterClick = function(index){
            if(numberLetter >= vm.answer.length || vm.question.isAlreadyCorrected){
                return;
            }
            for (var i =  0; i < vm.answer.length; i++) {
                if(vm.answer[i].content === '&nbsp;'){
                    vm.answer[i].content = vm.letters[index];
                    vm.answer[i].index = index;
                    break;
                }
            }
            vm.letters[index] = '&nbsp;';
            numberLetter++;

            if(numberLetter === vm.answer.length){
                checkAnswer();  
            }

        };

        var checkAnswer = function(){
            if(_.map(vm.answer, 'content').join('') === vm.question.answer){
                cwService.correctQuestion(questionId);
                correctionService.saveQuestions(questionId);
                $ionicHistory.goBack();
            }
            else{
                console.log('wrong');
            }
        };

        var onAnswerClick = function(index){
            if(vm.question.isAlreadyCorrected){
                return;
            }
            if(vm.answer[index].index !== undefined  && vm.answer[index].index !== -1){
                vm.letters[vm.answer[index].index] = vm.answer[index].content;
                vm.answer[index].content = '&nbsp;';
                vm.answer[index].index = -1;
                numberLetter--;
            }

        };

        var showLetter=function(){
            
            var ramdonIndex = _.random(0, vm.question.answer.length - 1),
                answers = vm.question.answer.split(''), currentIndex;

            for(var i = 0; i < answers.length; i++){
                currentIndex = (i+ramdonIndex) % answers.length;
                if(vm.answer[currentIndex].type === 'blank'){
                    break;
                }
            }

            //update answer
            if(vm.answer[currentIndex].content !== '&nbsp;'){
                vm.letters[vm.answer[currentIndex].index] = vm.answer[currentIndex].content;
                vm.answer[currentIndex].index = -1;
            }
            vm.answer[currentIndex].content = answers[currentIndex];
            vm.answer[currentIndex].type = 'corrected';

            //Update grid
            var igrid, jgrid;
            if(vm.question.direction === 'h'){
                igrid = vm.question.x;
                jgrid = vm.question.y + currentIndex;
            }
            else{
                igrid = vm.question.x + currentIndex;
                jgrid = vm.question.y;
            }
            
            cwService.updateCase(igrid,jgrid,answers[currentIndex], 'corrected');

            //remove from letters
            var indexInLetter =  _.indexOf(vm.letters, answers[currentIndex]);
            if(indexInLetter === -1){
                indexInLetter =  _.indexOf(_.map(vm.answer, 'content'), answers[currentIndex]);
                vm.answer[indexInLetter].content = '&nbsp;';
            }else{
                vm.letters[indexInLetter] = '&nbsp;';
            }

            //Check Answer
           if(++numberLetter === vm.answer.length){
                checkAnswer();  
            }

            //add LocalStorage
            correctionService.saveHint(igrid,jgrid,answers[currentIndex]);
        };
        // ################# INITALIZE ################# //
        /**
         * init of the controler
         */
        function init(){
            var i = parseInt($stateParams.i),
                j = parseInt($stateParams.j),
                direction = $stateParams.direction;

            if(!grid){
                routerHelper.goToState(cqConstantes.states.group,{'level': 0});
                return;
            }
            questionId = grid[i][j][direction] ;

            vm.question = _.get(dataModel.crosswords.questions,questionId);
            
            if(!vm.question){
                return;
            }

            vm.letters = vm.question.letters.split('');
            vm.answer = initAnswer();
            vm.onLetterClick = onLetterClick;
            vm.onAnswerClick = onAnswerClick;
            vm.showLetter = showLetter;
        }

        init();
    }
})();
