/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('groupController', GroupControllerFct);


    function GroupControllerFct($stateParams){

        var vm = this;

        // ############## PRIVATE BUSINESS ############# //
        /**
         * init of the controler
         */
        function init(){
            vm.group = $stateParams.group;
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
