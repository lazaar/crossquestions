/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('levelsController', LevelsControllerFct);


    function LevelsControllerFct(){

        var vm = this;

        // ############## PRIVATE BUSINESS ############# //
        /**
         * init of the controler
         */
        function init(){
            console.log(vm);
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
