 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('hintService', function(dataModel, storageHelper){


        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //

         function saveHint(i, j, letter){
            var values = storageHelper.getItem('hints') || {},
                levelId =dataModel.crosswords.levelId,
                cwId =dataModel.crosswords.id;

            _.set(values, 'level-'+levelId+'.crossword-'+cwId+'.'+i+'-'+j, letter);
            storageHelper.setItem('hints', values);
         }

         function isHint(i, j){
            var values = storageHelper.getItem('hints') || {},
                levelId =dataModel.crosswords.levelId,
                cwId =dataModel.crosswords.id;
            return _.has(values, 'level-'+levelId+'.crossword-'+cwId+'.'+i+'-'+j);
         }

        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                saveHint:saveHint,
                isHint:isHint
            };
        });
}());