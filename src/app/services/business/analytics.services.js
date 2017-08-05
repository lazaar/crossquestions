 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('analyticsService', function(){


        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //

         function setScreenName(screenName){
          if(window.FirebasePlugin){
            window.FirebasePlugin.setScreenName(screenName);
          }
         }

        function logEvent(name, params){
          if(window.FirebasePlugin){
            window.FirebasePlugin.logEvent(name, params);
          }
         }


        function setUserProperty(name, value){
          if(window.FirebasePlugin){
            window.FirebasePlugin.setUserProperty(name, value);
          }
         }

        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
              setScreenName:setScreenName,
              setUserProperty:setUserProperty,
              logEvent:logEvent
            };
        });
}());