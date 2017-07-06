/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('homeController', HomeControllerFct);


    function HomeControllerFct(){

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
