 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('shareService', function($log, cqConstantes){


        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //

         function shareApp(){
            var url = 'https://play.google.com/store/apps/details?id='+cqConstantes.android;
            if(typeof device !== 'undefined' && device.platform === 'iOS'){
                 url = 'https://itunes.apple.com/app/id'+cqConstantes.ios;
            }

            var options = {
              message: cqConstantes.popupMessage.shareTitle,
              subject: cqConstantes.popupMessage.shareTitle,
              url: url
            };

            var onSuccess = function(data) {
              $log.debug('Share Finished', data);
            };

            var onError = function(msg) {
              $log.debug('Share Error', msg);
            };

            if(window.plugins){
                window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
            }
         }

         function shareScreen(){
            navigator.screenshot.save(function(error,res){
              if(error){
                $log.debug(error);
              }else{
                $log.debug('ok',res.filePath);
                var imageLink = res.filePath;
                window.plugins.socialsharing.share(null, null,'file://'+imageLink, null);
              }
            },'jpg',70,'tmpScreen');
         }

        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                shareApp:shareApp, 
                shareScreen:shareScreen
            };
        });
}());