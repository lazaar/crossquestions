 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('notificationsService', function($log){


        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //

        function init(){
          if(window.FirebasePlugin){
            window.FirebasePlugin.onTokenRefresh(function(token) {
                // save this server-side and use it to push notifications to this device
                $log.debug('success', token);
            }, function(error) {
                $log.debug('error', error);
            });
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