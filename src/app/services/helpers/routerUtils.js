(function () {
    'use strict';

    angular.module('crossQuestions').factory('routerHelper', function ($log, $rootScope, $state, $ionicHistory) {

        // ################################### //
        // ######## PUBLIC BUSINESS ########## //
        // ################################### //

        /**
         * Is current state ?
         * @param name
         * @returns {boolean}
         */
        function isState(name) {
            var result = false;
            if (angular.isDefined(name)) {
                result = $state.is(name);
            }
            return result;
        }


        /**
         * go to the state
         * @param to
         * @param params
         * @param options
         */
        function goToState(to, params, options) {
            $state.go(to, params, options);
            var state = $state.get(to),
                disableAnimateEnter = !!state.disableAnimateEnter,
                historyRoot = !!state.historyRoot;

            $ionicHistory.nextViewOptions({
                disableAnimate: disableAnimateEnter,
                disableBack: false,
                historyRoot: historyRoot
            });
        }

        // ################################### //
        // ############### API ############### //
        // ################################### //

        return {
            isState: isState,
            goToState: goToState
        };
    });

})();