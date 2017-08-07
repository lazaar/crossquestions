 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('notificationsService', function($log){


        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //
        var  initIos = function(){
            window.FirebasePlugin.hasPermission(function(data){
                if(!data.isEnabled){
                    window.FirebasePlugin.grantPermission();
                }
            });
        };

        function init(){
          if(window.FirebasePlugin){
            window.FirebasePlugin.onTokenRefresh(function(token) {
                // save this server-side and use it to push notifications to this device
                $log.debug('success', token);
            }, function(error) {
                $log.debug('error', error);
            });
            if(typeof device !== 'undefined' && device.platform === 'iOS'){
                initIos();
            }
          }
        }

        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                init:init
            };
        });
}());