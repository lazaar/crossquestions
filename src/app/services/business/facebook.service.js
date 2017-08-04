 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('facebookService', function(storageHelper, cqConstantes, coinsService){

          var isConnected = false, facebookProfile={};

          var facebookLoginSucess =  function(response){
             if (!response.authResponse){
                  return;
              }
              isConnected = true;
              initFacebookProfile(response.authResponse.accessToken);
          };

          var isLoginFacebook =  function(){
              facebookConnectPlugin.getLoginStatus(function(success){
                  if(success.status === 'connected'){
                      facebookProfile = storageHelper.getItem('facebook');
                      if(!_.result(facebookProfile,'username',undefined)){
                        facebookConnectPlugin.getAccessToken(function(token) {
                          initFacebookProfile(token);
                        }, function() {});
                      }
                      isConnected = true;
                  }
              }, function(){
                facebookProfile = storageHelper.getItem('facebook');
                if(_.result(facebookProfile,'username',undefined)){
                  isConnected = true;
                }
              });
          };

          var initFacebookProfile = function(token){
              facebookConnectPlugin.api('/me?fields=picture,name,first_name&access_token=' + token, null,
                function (profileInfo) {
                  facebookProfile = {
                      authResponse : token,
                      username : _.result(profileInfo,'first_name',''),
                      picture : _.result(profileInfo,'picture.data.url','')
                  };
                  storageHelper.setItem('facebook', facebookProfile);

                }, function () {});
          };

        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //

        function init(){
          isLoginFacebook();
        }

        function isConnectedToFacebook(){
          return isConnected;
        }

        function getFacebookProfile(){
          return facebookProfile;
        }

         function login(success){
            facebookConnectPlugin.login(['public_profile', 'user_friends'], function(data){
              facebookLoginSucess(data);
              success();
            }, function(){});
         }

          function shareFacebook(successCallback){
              facebookConnectPlugin.showDialog(
              {
                method: 'share',
                picture: cqConstantes.shareFacebook.sharePicture,
                hashtag: cqConstantes.shareFacebook.hashTag,
                quote: cqConstantes.shareFacebook.quote,
                href:'https://apps.facebook.com/'+cqConstantes.facebookId+'/?fb_source=feed'
              },function(){
                successCallback();
                coinsService.shareFacebook();
              }, null); 
          } 

          function inviteFriends(successCallback){
              facebookConnectPlugin.showDialog(
              {
                method: 'apprequests',
                message: cqConstantes.shareFacebook.inviteFriend,
              },function(data){
                if(_.get(data,'to',[]).length >= 3){
                  successCallback();
                  coinsService.inviteFacebook();
                }
              }); 
          } 

        // ############################################### //
        // ############### Private BUSINESS ############# //
        // ############################################# //

            return {
                init:init,
                login:login,
                isConnectedToFacebook:isConnectedToFacebook,
                getFacebookProfile:getFacebookProfile,
                shareFacebook:shareFacebook,
                inviteFriends:inviteFriends
            };
        });
}());