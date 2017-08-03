/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('hintsController', HintsControllerFct);


    function HintsControllerFct($document, $log, $scope, admobService, coinsService, dataModel, $timeout, starService){
        var vm = this;

        var initRewardVideo = function(){
            var  watchVideo = -1, failedCount = 0;
             vm.videoReady=false;
             if(coinsService.isShowVideo()){
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
              if(data.adType === 'rewardvideo' && watchVideo !== -1){
                coinsService.showVideo();
                if(coinsService.isShowVideo()){
                    admobService.prepareVideo();
                }
                 _.delay(function(){
                    addHints(watchVideo);
                    watchVideo = -1;
                },500);
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
                  $scope.$apply(); 
                  failedCount=0;
                } 
            });
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
           
            initRewardVideo();

            vm.hints = dataModel.hints;
            vm.addHints = addHints;
            vm.showVideo = admobService.generateVideo;
        }
        // ################# INITALIZE ################# //

        init();
    }
})();