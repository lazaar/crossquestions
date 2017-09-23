(function () {
    'use strict';

    angular
        .module('crossQuestions')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $ionicPlatform, notificationsService, facebookService, admobService, coinsService, $state, routerHelper, cqConstantes, soundService) {

        var initAppRate = function(){
            AppRate.preferences.storeAppURL= {
                ios: cqConstantes.ios,
                android: 'market://details?id='+cqConstantes.android
              
            };
        };

        var toggleSounds=function(){
            var music;
            document.addEventListener('pause', function () {
                if($state.current.name === cqConstantes.states.crossWord || $state.current.name === cqConstantes.states.question){
                    music = soundService.getBackgroundMusic();
                }
                else{
                    music = soundService.getMenuMusic();
                }
                if(music){
                    music.pause();
                }
            }, false);

            document.addEventListener('resume', function () {
                if(music){
                    music.play();
                }
            }, false);
        };

        var initCordovaPlugins = function(){
            if(typeof device !== 'undefined' && device.platform === 'Android')
            {
                StatusBar.hide();
            }
            initAppRate();
            _.delay(function(){
                navigator.splashscreen.hide();
            }, 1000);

            toggleSounds();
            admobService.init();
            facebookService.init();
            notificationsService.init();
            soundService.init();
        };


        $ionicPlatform.ready(function () {

            routerHelper.goToState(cqConstantes.states.home);
            
            coinsService.init();
            if(typeof cordova !== 'undefined'){
                initCordovaPlugins();
            }
        });

        $log.debug('runBlock end');
    }
})();
