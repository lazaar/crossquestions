/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('hintsController', HintsControllerFct);


    function HintsControllerFct($document, soundService, analyticsService, $log, $scope, facebookService, admobService, coinsService, dataModel, $timeout, starService){
        var vm = this;

        var initRewardVideo = function(){
            var  watchVideo = -1, failedCount = 0;
             vm.videoReady=coinsService.isShowVideo();
             vm.videoNotLoaded=vm.videoReady;
             if(vm.videoReady){
                admobService.prepareVideo();
             }

            $document.off('onAdPresent');
            $document.off('onAdDismiss');
            $document.off('onAdFailLoad');
            $document.off('onAdLoaded');

            $document.on('onAdPresent', function(data) {
              if(data.adType === 'rewardvideo'){
                watchVideo = data.rewardAmount;
                 vm.videoReady = false;
                 $scope.$apply(); 
              }
            });

            $document.on('onAdDismiss', function(data) {
              if(data.adType === 'rewardvideo'){
                soundService.playCurrentMusic();
                if(watchVideo !== -1){
                  coinsService.showVideo();
                    if(coinsService.isShowVideo()){
                        admobService.prepareVideo();
                    }
                  
                   _.delay(function(){
                      addHints(3);
                      analyticsService.logEvent('add_hints', {'event': 'watch_video','sub_event':'done'});
                      watchVideo = -1;
                  },500);
                } 
              }
            });

            document.addEventListener('onAdFailLoad', function(data){
                if(data.adType === 'rewardvideo') {
                    $log.debug('onAdFailLoad', data);
                     vm.videoReady = false;
                     $scope.$apply();
                     if(++failedCount < 5){
                        admobService.prepareVideo();
                     }
                }
            });

            document.addEventListener('onAdLoaded', function(data){
                if(data.adType === 'rewardvideo'){
                  vm.videoReady = true; 
                  vm.videoNotLoaded=false;
                  $scope.$apply(); 
                  failedCount=0;
                } 
            });
        };

        var initFacebookConnextion = function(){
          vm.isConnectedToFacebook = facebookService.isConnectedToFacebook();
          var loginToFacebook = function(){
            admobService.removeBanner();
            analyticsService.logEvent('add_hints', {'event': 'login_facebook','sub_event':'start'});
            facebookService.login(function(){
              analyticsService.logEvent('add_hints', {'event': 'login_facebook','sub_event':'done'});
              addHints(5);
              vm.isConnectedToFacebook = true;
            });
          };
          vm.loginToFacebook = loginToFacebook;

          vm.isShareFacebook = coinsService.isShareFacebook();
          var shareToFacebook = function(){
            admobService.removeBanner();
              analyticsService.logEvent('add_hints', {'event': 'share_facebook','sub_event':'start'});

            if(vm.isConnectedToFacebook){
              facebookService.shareFacebook(function(){
                analyticsService.logEvent('add_hints', {'event': 'share_facebook','sub_event':'done'});
                addHints(5);
                vm.isShareFacebook = false;
              });
            }
            else{
              facebookService.login(function(){
                addHints(5);
                vm.isConnectedToFacebook = true;
                shareToFacebook();
              });
            }
          };
          vm.shareToFacebook = shareToFacebook;


          vm.isInviteFacebook = coinsService.isInviteFacebook();
          var inviteToFacebook = function(){
            admobService.removeBanner();
            if(vm.isConnectedToFacebook){
              analyticsService.logEvent('add_hints', {'event': 'invite_firends','sub_event':'start'});
              facebookService.inviteFriends(function(){
                analyticsService.logEvent('add_hints', {'event': 'invite_firends','sub_event':'done'});
                addHints(5);
                vm.isInviteFacebook = false;
              });
            }
            else{
              facebookService.login(function(){
                addHints(5);
                vm.isConnectedToFacebook = true;
                inviteToFacebook();
              });
            }
          };
          vm.inviteToFacebook = inviteToFacebook;
        
        };

        var addHints = function(value){
            starService.incrementHints(value);
            vm.hints+= value;
            vm.animateHint = 'animatedHint';
            $timeout(function(){
                vm.animateHint = '';
            },300);
        };
        /**
         * init of the controler
         */
        function init(){
            analyticsService.logEvent('add_hints', {'event': 'open_dialogs','sub_event':null});
            initRewardVideo();
            initFacebookConnextion();

            vm.hints = dataModel.hints;
            vm.addHints = addHints;
            vm.showVideo = function(){
              admobService.removeBanner();
              analyticsService.logEvent('add_hints', {'event': 'watch_video','sub_event':'start'});
              soundService.pauseCurrentMusic();
              admobService.generateVideo();
            };
        }
        // ################# INITALIZE ################# //

        init();
    }
})();