 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('starService', function(storageHelper, dataModel){

        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //

         function init(){
            var values = storageHelper.getItem('playInfo');
            if(!values){
                values = {};
                values.currentLevel = 1;
                values.currentCw = 1;
                values.numberStars = 0;
                storageHelper.setItem('playInfo', values);
            }
            dataModel.currentLevel = values.currentLevel;
            dataModel.currentCw = values.currentCw;
            dataModel.numberStars = values.numberStars;
         }


        function incrementStars(){
            var playInfo = storageHelper.getItem('playInfo') || {};
            playInfo.numberStars++;
            dataModel.numberStars = playInfo.numberStars;
            storageHelper.setItem('playInfo', playInfo);

            var values = storageHelper.getItem('letters'),
                levelId =dataModel.crosswords.levelId,
                cwId =dataModel.crosswords.id;

            var starsCw = _.get(values, 'level-'+levelId+'.crossword-'+cwId+'.stars',0);  
            _.set(values, 'level-'+levelId+'.crossword-'+cwId+'.stars', ++starsCw);  

            var starsLevel = _.get(values, 'level-'+levelId+'.stars',0);  
            _.set(values, 'level-'+levelId+'.stars', ++starsLevel);

            storageHelper.setItem('letters', values);
         }

        function incrementCurrentCw(){
            var values = storageHelper.getItem('playInfo') || {},
                levelId =dataModel.crosswords.levelId,
                cwId =dataModel.crosswords.id;
            if(values.currentCw - 1 !==  cwId || values.currentLevel - 1 !==  levelId ){
                return;
            }

            if(values.currentCw === dataModel.data[dataModel.crosswords.levelId].crosswords.length){
                values.currentCw = 0;
                values.currentLevel = parseInt(values.currentLevel); 
                values.currentLevel++;
            }
            else{
                values.currentCw = parseInt(values.currentCw); 
                values.currentCw++; 
           }
            dataModel.currentLevel = values.currentLevel;
            dataModel.currentCw = values.currentCw;
            storageHelper.setItem('playInfo', values);
         }


         function correctedQuestion(){
            var alreadyCorrected = _.get(dataModel,'crosswords.corrections.corrections', []).length;
            var allQuestions  = _.get(dataModel,'crosswords.questions', []).length;
            if(alreadyCorrected >= allQuestions-2){
                incrementStars();
                incrementCurrentCw();
            }
         }

         function getStartsByLevels(index){
            var values = storageHelper.getItem('letters');
            return _.get(values, 'level-'+index+'.stars',0);
         }

         function getStartsByCw(level, index){
            var values = storageHelper.getItem('letters');
            return _.get(values, 'level-'+level+'.crossword-'+index+'.stars',0); 
         }
        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                init:init,
                correctedQuestion: correctedQuestion,
                getStartsByLevels:getStartsByLevels,
                getStartsByCw:getStartsByCw
            };
        });
}());