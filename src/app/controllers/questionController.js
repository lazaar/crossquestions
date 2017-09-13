/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('questionController', QuestionControllerFct);


    function QuestionControllerFct($stateParams, analyticsService, shareService, popupService, admobService, soundService, $timeout, $ionicHistory, starService, correctionService, routerHelper, cqConstantes, storageHelper, dataModel, cwService){

        var vm = this;
        var grid = dataModel.crosswords.grid, numberLetter = 0, questionId, wrongCount = 0;
        // ############## PRIVATE BUSINESS ############# //

        var initAnswer = function(){

            var answerLength = vm.question.answer.split('').length;
            var result = [], i;


            if(vm.question.direction === 'h'){
                for(i = 0; i < answerLength; i++){
                    if(grid[vm.question.x][vm.question.y+i].content !== '&nbsp;'){
                        grid[vm.question.x][vm.question.y+i].content = grid[vm.question.x][vm.question.y+i].content.toLowerCase();
                        numberLetter++;
                        //remove Letter from propositions
                        vm.letters[_.indexOf(vm.letters, grid[vm.question.x][vm.question.y+i].content)] = '&nbsp;';
                    }
                    result.push(grid[vm.question.x][vm.question.y+i]);
                }
            }else{
                for(i = 0; i < answerLength; i++){
                    if(grid[vm.question.x+i][vm.question.y].content !== '&nbsp;'){
                        grid[vm.question.x+i][vm.question.y].content=grid[vm.question.x+i][vm.question.y].content.toLowerCase();
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
            if(numberLetter >= vm.answer.length || vm.question.isAlreadyCorrected || vm.letters[index] === '&nbsp;'){
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
            soundService.playSound(cqConstantes.sounds.letterClick);

            if(numberLetter === vm.answer.length){
                checkAnswer();  
            }

        };

        var checkAnswer = function(){
            if(_.map(vm.answer, 'content').join('').toLowerCase() === vm.question.answer.toLowerCase()){
                correctionService.saveQuestions(questionId);
                cwService.correctQuestion(questionId);

                starService.correctedQuestion();
                vm.state = 'correct';
                analyticsService.logEvent('corrected', {'item_id': dataModel.crosswords.levelId +'/'+dataModel.crosswords.id+'/'+questionId});

                
                soundService.playSound(cqConstantes.sounds.correct);

                _.delay(function(){
                    $ionicHistory.goBack();
                }, 450);
            }
            else{
                vm.state = 'wrong';
                if(++wrongCount === 4){
                    vm.animateHint = vm.animateHint === 0 ? 2 : (3 - vm.animateHint);
                    wrongCount = 0;
                }
                if(Math.random()<cqConstantes.ads.interLose){
                    _.delay(function(){
                        admobService.generateInterstitial();
                    },100);
                }
                $timeout(function(){
                    vm.state = '';
                }, 200);
                soundService.playSound(cqConstantes.sounds.wrong);
            }
        };

        var onAnswerClick = function(index){
            if(vm.question.isAlreadyCorrected || vm.answer[index].index === undefined || vm.answer[index].index === -1){
                return;
            }
            vm.letters[vm.answer[index].index] = vm.answer[index].content;
            vm.answer[index].content = '&nbsp;';
            vm.answer[index].index = -1;
            numberLetter--;
            soundService.playSound(cqConstantes.sounds.letterClickOut);
        };

        var showLetter=function(){
            analyticsService.logEvent('use_hint', {'content_type': 'show_letter', 'is_done':vm.hints >= 5 });
            if(vm.hints < 5){
                openHints();
                return;
            }
            
            var ramdonIndex = _.random(0, vm.question.answer.length - 1),
                answers = vm.question.answer.toLowerCase().split(''), currentIndex;

            for(var i = 0; i < answers.length; i++){
                currentIndex = (i+ramdonIndex) % answers.length;
                if(vm.answer[currentIndex].type === 'blank'){
                    break;
                }
            }
            var content = answers[currentIndex];

            //update answer
            if(vm.answer[currentIndex].content !== '&nbsp;'){
                vm.letters[vm.answer[currentIndex].index] = vm.answer[currentIndex].content;
                vm.answer[currentIndex].index = -1;
                numberLetter--;
            }

            //remove from letters
            var indexInLetter =  _.indexOf(vm.letters, content);
            if(indexInLetter === -1){
                indexInLetter =  _.indexOf(_.map(vm.answer, 'content'), content);
                vm.answer[indexInLetter].content = '&nbsp;';
            }else{
                vm.letters[indexInLetter] = '&nbsp;';
                numberLetter++;
            }

            vm.answer[currentIndex].content = content;
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
            
            cwService.updateCase(igrid,jgrid,content, 'corrected');

            starService.incrementHints(-5);
            vm.hints -= 5;

            //add LocalStorage
            correctionService.saveHint(igrid,jgrid,content);

            //Check Answer
           if(numberLetter === vm.answer.length){
                checkAnswer();  
            }
        };

        var openHints = function(){
            popupService.showPopupHints().then(function(){
                vm.hints = dataModel.hints;
            });
        };
        // ################# INITALIZE ################# //
        /**
         * init of the controler
         */
        function init(){
            vm.animateHint=0;
            analyticsService.setScreenName('Question');
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

            vm.letters = vm.question.letters.toLowerCase().split('');
            vm.answer = initAnswer();
            vm.openHints = openHints;
            vm.shareScreen = shareService.shareScreen;
            vm.onLetterClick = onLetterClick;
            vm.onAnswerClick = onAnswerClick;
            vm.showLetter = showLetter;
            vm.stars = dataModel.crosswords.stars;
            vm.hints = dataModel.hints;
            analyticsService.logEvent('select_content', {'content_type': 'crossword_view', 'item_id': dataModel.crosswords.levelId +'/'+dataModel.crosswords.id+'/'+questionId});

        }

        init();
    }
})();
