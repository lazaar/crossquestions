 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('cwService', function(dataModel){



            var grid;
        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //

             function initCrossWords(crossWord){

                var i, answer;

                //Init two dimensional Array
                grid = new Array(crossWord.width);
                for(i = 0; i < crossWord.width; i++){
                    grid[i] =  _.fill(Array(crossWord.height), {});
                }

                _.forEach(crossWord.questions, function(question, index) {
                    answer = question.answer.split('');
                    if(question.direction === 'h'){
                        for(i = 0; i < answer.length; i++){
                            initCase(question.x, question.y+i, 'h', index);
                        }
                    }else{
                        for(i = 0; i < answer.length; i++){
                            initCase(question.x + i , question.y,'v', index); 
                        }
                    } 

                });
                
                crossWord.grid = grid;
                dataModel.crosswords = crossWord;
             }

        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            var initCase = function(i, j, direction, index){
                if(!grid[i][j].content){
                    grid[i][j] = createCase(' ','blank', direction, index);
                }
                else{
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
                initCrossWords:initCrossWords
            };
        });
}());