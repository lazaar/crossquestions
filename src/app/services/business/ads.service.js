 (function(){
    'use strict';
    angular
        .module('crossQuestions')
        .factory('admobService', function(){


        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //
        var admobid = {};

         function init(){
            if(typeof device !== 'undefined' && device.platform === 'Android')
            {
                admobid = {
                  banner: 'ca-app-pub-3935970661666157/7182816029',
                  inter: 'ca-app-pub-3935970661666157/3888592368',
                  video: 'ca-app-pub-3935970661666157/6075293075'
                };
            }
            else{
                admobid = {
                  banner: 'ca-app-pub-3935970661666157/5817763461',
                  inter: 'ca-app-pub-3935970661666157/1721594022',
                  video: 'ca-app-pub-3935970661666157/2379590644'
                };
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