 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('popupService', function($ionicPopup, $timeout){


        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //
        var infoTextPopup,
            hintsPopup;

         function showPopupHints(){
            if(hintsPopup === undefined){
              hintsPopup = $ionicPopup.alert({
                  template: '',
                  title: 'Coins',
                  cssClass:'hints',
                  templateUrl:'app/views/template/hints.html',
                  scope: null,
                  okText:'Close'
              }).then(function(){
                hintsPopup = undefined;
              });
            }

            return hintsPopup;
         }

         function infoText(text){
          if(infoTextPopup !== undefined){
            infoTextPopup.close();
          }
            infoTextPopup = $ionicPopup.show({
                template: '',
                title: text,
                cssClass:'infoText',
                scope: null,
                buttons: []
            });
            $timeout(function() {
               infoTextPopup.close();
               infoTextPopup= undefined;
            }, 2000);
         }
        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                infoText:infoText,
                showPopupHints:showPopupHints
            };
        });
}());