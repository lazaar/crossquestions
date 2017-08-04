 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('admobService', function(){


        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //
        var admobid = {};

         function init(){
            if(typeof device !== 'undefined' && device.platform === 'Android')
            {
                admobid = {
                  banner: 'ca-app-pub-3935970661666157/7182816029',
                  inter: 'ca-app-pub-3935970661666157/3888592368',
                  video: 'ca-app-pub-3935970661666157/6075293075'
                };
            }
            else{
                admobid = {
                  banner: 'ca-app-pub-3935970661666157/5817763461',
                  inter: 'ca-app-pub-3935970661666157/1721594022',
                  video: 'ca-app-pub-3935970661666157/2379590644'
                };
            }

            if(typeof AdMob !== 'undefined'){
              AdMob.prepareInterstitial({
                adId:admobid.inter,
                isTesting: true,
                autoShow:false
              });
            } 
         }

         function generateBanner(){
            if(typeof AdMob !== 'undefined'){
              AdMob.createBanner({
                adId: admobid.banner,
                position: AdMob.AD_POSITION.BOTTOM_CENTER,
                isTesting: true,
                autoShow: true
              });
            } 
         }

         function removeBanner(){
            if(typeof AdMob !== 'undefined'){
              AdMob.removeBanner();
            } 
         }

         function generateInterstitial(){
            if(typeof AdMob !== 'undefined'){
              AdMob.showInterstitial();
              _.delay(function(){
                AdMob.prepareInterstitial({
                  adId:admobid.inter,
                  isTesting: true,
                  autoShow:false
                });
              }, 3000);
            } 
         }

         function generateVideo(){
            if(typeof AdMob !== 'undefined'){
              AdMob.showRewardVideoAd();
            } 
         }

         function prepareVideo(){
          if(typeof AdMob !== 'undefined'){
            AdMob.prepareRewardVideoAd({
              adId:admobid.video,
              isTesting: true,
              autoShow:false
            });
         }
         }

        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                init:init,
                generateBanner:generateBanner,
                removeBanner:removeBanner,
                generateInterstitial:generateInterstitial,
                generateVideo:generateVideo,
                prepareVideo:prepareVideo
            };
        });
}());