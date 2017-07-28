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
                storageHelper.setItem('playInfo', values);
            }
            dataModel.currentLevel = values.currentLevel;
            dataModel.currentCw = values.currentCw;
         }


        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                init:init
            };
        });
}());