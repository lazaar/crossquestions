 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('starService', function(storageHelper,soundService, dataModel, popupService, cqConstantes){

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
                values.hints = 25;
                values.isSound = 1;
                values.isMusique = 1;
                storageHelper.setItem('playInfo', values);
            }
            dataModel.currentLevel = values.currentLevel;
            dataModel.currentCw = values.currentCw;
            dataModel.numberStars = values.numberStars;
            dataModel.hints = values.hints;
            dataModel.isSound = values.isSound;
            dataModel.isMusique = values.isMusique;
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

            dataModel.crosswords.stars++;

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
                values.currentCw = 1;
                values.currentLevel = parseInt(values.currentLevel); 
                values.currentLevel++;
                popupService.infoText(cqConstantes.popupMessage.newLevelUnlocked);
            }
            else{
                values.currentCw = parseInt(values.currentCw); 
                values.currentCw++;
                popupService.infoText(cqConstantes.popupMessage.newCwUnlocked);
           }
            soundService.playSound(cqConstantes.sounds.unlocked);

            dataModel.currentLevel = values.currentLevel;
            dataModel.currentCw = values.currentCw;
            values.hints += 5;
            dataModel.hints += 5;
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

        function incrementHints(value){
            var playInfo = storageHelper.getItem('playInfo') || {};
            playInfo.hints += value;
            dataModel.hints = playInfo.hints;
            storageHelper.setItem('playInfo', playInfo);
         }

        function getLastDate(){
            var values = storageHelper.getItem('playInfo');
            return _.get(values, 'lastDate'); 
         }

        function setLastDate(value){
            var playInfo = storageHelper.getItem('playInfo');
             _.set(playInfo, 'lastDate', value); 
             storageHelper.setItem('playInfo', playInfo);
         }

        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                init:init,
                correctedQuestion: correctedQuestion,
                getStartsByLevels:getStartsByLevels,
                getStartsByCw:getStartsByCw,
                incrementHints:incrementHints,
                getLastDate:getLastDate,
                setLastDate:setLastDate
            };
        });
}());