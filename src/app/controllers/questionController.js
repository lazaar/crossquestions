/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('questionController', QuestionControllerFct);


    function QuestionControllerFct($stateParams){

        var vm = this;

        // ############## PRIVATE BUSINESS ############# //
        /**
         * init of the controler
         */
        function init(){
            vm.question = $stateParams.question;
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
