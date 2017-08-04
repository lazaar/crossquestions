(function () {
    'use strict';

    angular
        .module('crossQuestions')
    /**
     * Web Services Helpers
     */

        .factory('WsHelper', function () {

            // ############################################# //
            // ############### PUBLIC BUSINESS ############# //
            // ############################################# //

            /**
             * Is the the device is connected to the internet ?
             * @returns {boolean}
             */
            function isOnline() { 
                /* jshint ignore:start */
                if (angular.isDefined(navigator.connection) && angular.isDefined(navigator.connection.type) && typeof Connection !== 'undefined') {
                    var networkState = navigator.connection.type;
                    var states = {};
                    states[Connection.UNKNOWN] = false;
                    states[Connection.ETHERNET] = true;
                    states[Connection.WIFI] = true;
                    states[Connection.CELL_2G] = true;
                    states[Connection.CELL_3G] = true;
                    states[Connection.CELL_4G] = true;
                    states[Connection.CELL] = true;
                    states[Connection.NONE] = false;
                    return states[networkState];
                }
                else {
                    return navigator.onLine === true;
                }
                /* jshint ignore:end */
            }

            // ############################################# //
            // ############## PRIVATE BUSINESS ############# //
            // ############################################# //

            // ############################################# //
            // ################### API ##################### //
            // ############################################# //

            return {
                isOnline: isOnline
            };
        });

})();
