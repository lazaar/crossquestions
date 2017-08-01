 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('soundService', function(cqConstantes, storageHelper, dataModel){

            var backgroundMusic,
                menuMusic;

        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //
            var getUrl = function(url){
                if(typeof device !== 'undefined' && device.platform === 'Android')
                {
                        url = '/android_asset/www' + url;
                }
                return url;
            };

            function playSound(url){

                if(typeof Media === 'undefined' || !dataModel.isSound){
                    return;
                }
                var result = new Media(getUrl(url));
                result.play();
                return result;
            }

            function playBackgroundMusic(){
                if(typeof Media === 'undefined' || !dataModel.isMusique ){
                    return;
                }
                if(menuMusic){
                    menuMusic.pause();
                    menuMusic = undefined;
                }
                backgroundMusic = new Media(getUrl(cqConstantes.sounds.backgroundMusic), null, null, function(status){
                    if(status === Media.MEDIA_STOPPED) {
                        backgroundMusic.seekTo(0);
                        backgroundMusic.play();
                    }
                });
                backgroundMusic.play();
            }

            function playMenuMusic(){
                if(typeof Media === 'undefined' || !dataModel.isMusique ){
                    return;
                }
                if(backgroundMusic){
                    backgroundMusic.pause();
                    backgroundMusic = undefined;
                }
                menuMusic = new Media(getUrl(cqConstantes.sounds.menuMusic), null, null, function(status){
                    if(status === Media.MEDIA_STOPPED) {
                        menuMusic.seekTo(0);
                        menuMusic.play();
                    }
                });
                menuMusic.play();

            }

            function getMenuMusic(){
                return menuMusic;
            }

            function getBackgroundMusic(){
                return backgroundMusic;
            }

            function toggleSounds(){
                var playInfo = storageHelper.getItem('playInfo') || {};
                playInfo.isSound = !playInfo.isSound;
                dataModel.isSound = playInfo.isSound;
                storageHelper.setItem('playInfo', playInfo);
             }

            function toggleMusic(){
                var playInfo = storageHelper.getItem('playInfo') || {};
                playInfo.isMusique = !playInfo.isMusique;
                dataModel.isMusique = playInfo.isMusique;
                storageHelper.setItem('playInfo', playInfo);
                if(dataModel.isMusique){
                     playMenuMusic();
                }
                else if(menuMusic){
                    menuMusic.pause(); 
                    menuMusic = undefined;
                }
             }

            return {
                playSound:playSound,
                playBackgroundMusic:playBackgroundMusic,
                playMenuMusic:playMenuMusic,
                toggleSounds:toggleSounds,
                toggleMusic:toggleMusic,
                getMenuMusic:getMenuMusic,
                getBackgroundMusic:getBackgroundMusic
            };
        });
}());