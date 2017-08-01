/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('homeController', HomeControllerFct);


    function HomeControllerFct(shareService, $scope, soundService, dataModel){

        var vm = this;


        vm.toggleMusique = function(){
            soundService.toggleMusic();
            vm.isMusique= !vm.isMusique;
        };

        vm.toggleSounds= function(){
            soundService.toggleSounds();
            vm.isSound= !vm.isSound;
        };

        vm.rateApp = function(){
            AppRate.navigateToAppStore();
        };
        // ############## PRIVATE BUSINESS ############# //
        /**
         * init of the controler
         */
        function init(){
            soundService.playMenuMusic();
            vm.share = shareService.shareApp;
            vm.isMusique = dataModel.isMusique;
            vm.isSound = dataModel.isSound;
             _.delay(function(){
                    $scope.$apply(function(){
                        vm.showLogo = true;
                    });
                }, 500);
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
