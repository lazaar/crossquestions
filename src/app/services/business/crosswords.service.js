 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('cwService', function(dataModel, storageHelper, correctionService){



            var grid;
        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //

             function initCrossWords(crossWord){

                var i, answer, isHint = false;
                dataModel.crosswords = crossWord;

                //Init two dimensional Array
                grid = new Array(crossWord.width);
                for(i = 0; i < crossWord.width; i++){
                    grid[i] =  _.fill(Array(crossWord.height), {});
                }

                _.forEach(crossWord.questions, function(question, index) {
                    answer = question.answer.split('');
                    question.isAlreadyCorrected = correctionService.isQuestions(index);
                    if(question.direction === 'h'){
                        for(i = 0; i < answer.length; i++){
                            isHint = correctionService.isHint(question.x, question.y+i);
                            initCase(question.x, question.y+i, question.isAlreadyCorrected || isHint ? answer[i] : '&nbsp;', 'h', index);
                        }
                    }else{
                        for(i = 0; i < answer.length; i++){
                            isHint = correctionService.isHint(question.x + i, question.y);
                            initCase(question.x + i , question.y, question.isAlreadyCorrected || isHint ? answer[i] : '&nbsp;', 'v', index); 
                        }
                    } 

                });
                
                dataModel.crosswords.corrections = correctionService.getCorrection();
                dataModel.crosswords.grid = grid;
             }

             function correctQuestion(index){
                var i;
                var question = _.get(dataModel.crosswords.questions,index);
                question.isAlreadyCorrected = true;
                var answers = question.answer.split('');
                if(question.direction === 'h'){
                    for(i = 0; i < answers.length; i++){
                        grid[question.x][question.y+i].content  = answers[i];
                        grid[question.x][question.y+i].type  = 'corrected';
                    }
                }else{
                    for(i = 0; i < answers.length; i++){
                        grid[question.x + i][question.y].content = answers[i];
                        grid[question.x + i][question.y].type  = 'corrected';
                    }
                }
             }

             function updateCase(i,j,content, type){
                grid[i][j].content = content;
                grid[i][j].type  = type;
             }

        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            var initCase = function(i, j, content, direction, index){
                if(!grid[i][j].content){
                    grid[i][j] = createCase(content,content ==='&nbsp;' ? 'blank' : 'corrected', direction, index);
                }
                else{
                    if(content !== '&nbsp;' && grid[i][j].content === '&nbsp;'){
                        grid[i][j].content  = content;
                        grid[i][j].type  = 'corrected';
                    }
                    grid[i][j][direction] = index ;
                }

            };

            var createCase = function(letter, type, direction, index){
                var result = {
                    content:letter,
                    type:type
                };
                result[direction] = index;
                return result;
            };

            return {
                initCrossWords:initCrossWords,
                correctQuestion:correctQuestion,
                updateCase:updateCase
            };
        });
}());