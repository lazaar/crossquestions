 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('coinsService', function(storageHelper){


        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //
        var coinsList;

         function init(){
            coinsList = storageHelper.getItem('coinsList');
            if(!coinsList){
              coinsList = {};
              coinsList.rewardVideo = {
                count:0
              };
            }
         }

         function isShowVideo(){
            var result = false;
            if(_.get(coinsList,'rewardVideo.date', '') !== new Date().toDateString()){
              coinsList.rewardVideo.count=0;
              result = true;
            }
            else if(_.get(coinsList,'rewardVideo.count', 4) <= 3){
              result = true;
            }

            return result;
         }

         function showVideo(){
            coinsList.rewardVideo.count++;
            coinsList.rewardVideo.date = new Date().toDateString();
            storageHelper.setItem('coinsList', coinsList);
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