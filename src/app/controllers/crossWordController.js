/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('crossWordController', CrossWordControllerFct);


    function CrossWordControllerFct($stateParams){

        var vm = this;

        // ############## PRIVATE BUSINESS ############# //
        /**
         * init of the controler
         */
        function init(){
            vm.cw = $stateParams.cw;
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
