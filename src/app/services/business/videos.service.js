 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('videoService', function(){


        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //

         function getVideoFromChannel(){
            getVideosByNumber();
         }

        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

        var getVideosByNumber = function(){

        };




            return {
                getVideoFromChannel:getVideoFromChannel
            };
        });
}());