 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('soundService', function(cqConstantes, storageHelper, dataModel){

            var backgroundMusic,
                menuMusic,
                currentMusic;

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

            var sounds = new Array(3), index=0;
            function playSound(url){

                if(typeof Media === 'undefined' || !dataModel.isSound){
                    return;
                }
                if(sounds[index]){
                    sounds[index].release();
                }
                sounds[index] = new Media(getUrl(url));
                sounds[index].play();
                index = (index+1) % 3;
            }

            function playBackgroundMusic(){
                if(typeof Media === 'undefined' || !dataModel.isMusique ){
                    return;
                }
                if(menuMusic){
                    menuMusic.pause();
                }
                if(!backgroundMusic){
                    backgroundMusic = new Media(getUrl(cqConstantes.sounds.backgroundMusic), null, null, function(status){
                        if(status === Media.MEDIA_STOPPED) {
                            backgroundMusic.seekTo(0);
                            backgroundMusic.play();
                        }
                    });
                }
                backgroundMusic.play();
                currentMusic = 2;
            }

            function playMenuMusic(){
                if(typeof Media === 'undefined' || !dataModel.isMusique ){
                    return;
                }
                if(backgroundMusic){
                    backgroundMusic.pause();
                }

                if(!menuMusic){
                    menuMusic = new Media(getUrl(cqConstantes.sounds.menuMusic), null, null, function(status){
                        if(status === Media.MEDIA_STOPPED) {
                            menuMusic.seekTo(0);
                            menuMusic.play();
                        }
                    });
                }
                menuMusic.play();
                currentMusic = 1;

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
                    currentMusic = -1;
                }
             }

             function pauseCurrentMusic(){
                if(currentMusic === 1 && menuMusic !== undefined){
                    menuMusic.pause();
                }
                else if(currentMusic === 2 && backgroundMusic !== undefined ){
                    backgroundMusic.pause();
                }
             }

             function playCurrentMusic(){
                if(currentMusic === 1){
                    playMenuMusic();
                }
                else if(currentMusic === 2){
                    playBackgroundMusic();
                }
             }

            return {
                playSound:playSound,
                playBackgroundMusic:playBackgroundMusic,
                playMenuMusic:playMenuMusic,
                toggleSounds:toggleSounds,
                toggleMusic:toggleMusic,
                getMenuMusic:getMenuMusic,
                getBackgroundMusic:getBackgroundMusic,
                pauseCurrentMusic:pauseCurrentMusic,
                playCurrentMusic:playCurrentMusic

            };
        });
}());