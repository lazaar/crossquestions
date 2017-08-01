(function () {
    'use strict';

    angular
        .module('crossQuestions')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $ionicPlatform, $state, routerHelper, cqConstantes, soundService) {

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
                console.log('pause', music);

            }, false);

            document.addEventListener('resume', function () {
                console.log('resume', music);
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
            }, 800);

            toggleSounds();
        };


        $ionicPlatform.ready(function () {

            routerHelper.goToState(cqConstantes.states.home);
            if(typeof cordova !== 'undefined'){
                initCordovaPlugins();
            }
            
        });

        $log.debug('runBlock end');
    }
})();
