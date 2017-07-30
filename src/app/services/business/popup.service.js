 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('popupService', function($ionicPopup, $timeout){


        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //

         function confirm(title){

         }

         function infoText(text){
            var myPopup = $ionicPopup.show({
                template: '',
                title: text,
                cssClass:'infoText',
                scope: null,
                buttons: []
            });
              $timeout(function() {
                 myPopup.close();
              }, 2000);
         }
        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                infoText:infoText
            };
        });
}());