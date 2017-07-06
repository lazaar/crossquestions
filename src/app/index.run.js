(function () {
    'use strict';

    angular
        .module('crossQuestions')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $ionicPlatform) {



        $ionicPlatform.ready(function () {

            if(typeof cordova !== 'undefined'){
                var so = window.cordova.plugins.screenorientation;
                so.setOrientation(so.Orientations[0]);
            }
            
        });

        $log.debug('runBlock end');
    }
})();
