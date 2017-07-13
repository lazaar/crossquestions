/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('homeController', HomeControllerFct);


    function HomeControllerFct($scope){

        var vm = this;

        // ############## PRIVATE BUSINESS ############# //
        /**
         * init of the controler
         */
        function init(){
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
