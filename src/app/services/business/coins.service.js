 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('coinsService', function(storageHelper){


        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //
        var coinsConfiguration;

         function init(){
            coinsConfiguration = storageHelper.getItem('coinsList');
            if(!coinsConfiguration){
              coinsConfiguration = {};
              coinsConfiguration.rewardVideo = {
                count:0
              };
            }
         }

         function isShowVideo(){
            var result = false;
            if(typeof AdMob === 'undefined'){
              return false;
            }
            if(_.get(coinsConfiguration,'rewardVideo.date', '') !== new Date().toDateString()){
              coinsConfiguration.rewardVideo.count=0;
              result = true;
            }
            else if(_.get(coinsConfiguration,'rewardVideo.count', 4) <= 3){
              result = true;
            }

            return result;
         }

         function showVideo(){
            coinsConfiguration.rewardVideo.count++;
            coinsConfiguration.rewardVideo.date = new Date().toDateString();
            storageHelper.setItem('coinsList', coinsConfiguration);
         }


        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                init:init,
                isShowVideo:isShowVideo,
                showVideo:showVideo
            };
        });
}());