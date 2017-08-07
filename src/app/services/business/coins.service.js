 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('coinsService', function(storageHelper, cqConstantes){


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
            else if(_.get(coinsConfiguration,'rewardVideo.count', 4) < 3){
              result = true;
            }

            return result;
         }

         function showVideo(){
            coinsConfiguration.rewardVideo.count++;
            coinsConfiguration.rewardVideo.date = new Date().toDateString();
            storageHelper.setItem('coinsList', coinsConfiguration);
         }


         function shareFacebook(){
            coinsConfiguration.shareFacebook = new Date().toDateString();
            storageHelper.setItem('coinsList', coinsConfiguration);
         }
         function inviteFacebook(){
            coinsConfiguration.inviteFacebook = new Date().toDateString();
            storageHelper.setItem('coinsList', coinsConfiguration);
         }

         function isShareFacebook(){
            var value = _.get(coinsConfiguration,'shareFacebook', undefined);
            if(!value){
              return true;
            }
            var lastShareDate = moment(new Date(value));
            return new moment().diff(lastShareDate, 'days') > cqConstantes.daysBetweenShareHints;
         }

         function isInviteFacebook(){
            var value = _.get(coinsConfiguration,'inviteFacebook', undefined);
            if(!value){
              return true;
            }
            var lastInviteDate = moment(new Date(value));
            return new moment().diff(lastInviteDate, 'days') > cqConstantes.daysBetweenInviteHints;
         }


        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                init:init,
                isShowVideo:isShowVideo,
                showVideo:showVideo,
                shareFacebook:shareFacebook,
                inviteFacebook:inviteFacebook,
                isShareFacebook:isShareFacebook,
                isInviteFacebook:isInviteFacebook
            };
        });
}());