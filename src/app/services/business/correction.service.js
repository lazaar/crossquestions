 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('correctionService', function(dataModel, storageHelper){

        var values = storageHelper.getItem('letters');
        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //

         function saveHint(i, j, letter){
            if(!values){
                values = storageHelper.getItem('letters') || {};
            }
            var levelId =dataModel.crosswords.levelId,
                cwId =dataModel.crosswords.id;

            _.set(values, 'level-'+levelId+'.crossword-'+cwId+'.hints.'+i+'-'+j, letter);
            storageHelper.setItem('letters', values);
         }

         function isHint(i, j){
            if(!values){
                values = storageHelper.getItem('letters') || {};
            }
            var levelId =dataModel.crosswords.levelId,
                cwId =dataModel.crosswords.id;
            return _.has(values, 'level-'+levelId+'.crossword-'+cwId+'.hints.'+i+'-'+j);
         }

        function saveQuestions(index){
            if(!values){
                values = storageHelper.getItem('letters') || {};
            }
            var levelId =dataModel.crosswords.levelId,
                cwId =dataModel.crosswords.id;

            var correctedQuestions = _.get(values, 'level-'+levelId+'.crossword-'+cwId+'.corrections',[]);
            correctedQuestions.push(index);
            _.set(values, 'level-'+levelId+'.crossword-'+cwId+'.corrections',correctedQuestions);
            storageHelper.setItem('letters', values);
         }

         function isQuestions(index){
            if(!values){
                values = storageHelper.getItem('letters') || {};
            }
            var levelId =dataModel.crosswords.levelId,
                cwId =dataModel.crosswords.id;

            var correctedQuestions = _.get(values, 'level-'+levelId+'.crossword-'+cwId+'.corrections',[]);
            return correctedQuestions.indexOf(index) !== -1;
         }

        function getCorrection(){
            if(!values){
                values = storageHelper.getItem('letters') || {};
            }
            var levelId =dataModel.crosswords.levelId,
                cwId =dataModel.crosswords.id;

            return _.get(values, 'level-'+levelId+'.crossword-'+cwId,{});
         }

        function getNumberCorrectionByCw(levelId, cwId){
            if(!values){
                values = storageHelper.getItem('letters') || {};
            }

            return _.get(values, 'level-'+levelId+'.crossword-'+cwId+'.corrections',[]).length;
         }

        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                saveHint:saveHint,
                isHint:isHint,
                saveQuestions:saveQuestions,
                isQuestions:isQuestions,
                getCorrection:getCorrection,
                getNumberCorrectionByCw:getNumberCorrectionByCw
            };
        });
}());