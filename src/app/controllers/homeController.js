/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('homeController', HomeControllerFct);


    function HomeControllerFct(shareService, $scope, cqConstantes, soundService,starService, popupService,  dataModel){

        var vm = this;

        var gift = function(){
            var lastDate = starService.getLastDate(), 
                today = new Date().toDateString();
            if(lastDate !== today){
                starService.incrementHints(5);
                popupService.showPopup(cqConstantes.popupMessage.giftTitle, cqConstantes.popupMessage.giftContent.replace('{coins}',5), 'gift');
                starService.setLastDate(today);
            }  
        };
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
            gift();
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
