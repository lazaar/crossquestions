 (function () {
    'use strict';

    /**
     * @module crossQuestions
     *
     * @description Helper pour la persistence des données de l'application
     *
     */
    angular.module('crossQuestions').factory('storageHelper', StorageHelper);

    function StorageHelper($log, cqConstantes) {

        var DEBUG = 'StorageHelper';

        var getName = function(name){
            var nameInCst = _.get(cqConstantes.localStorage, name);
            return nameInCst ? nameInCst : name;
        };
        
        // ############################################# //
        // ############### PUBLIC BUSINESS ############# //
        // ############################################# //
        
        /**
         * Ajout d'un item
         * @param name
         * @param value
         */
        function setItem(name, value) {
            $log.debug(DEBUG, 'Add Item', getName(name), value, JSON.stringify(value));
            localStorage.setItem(getName(name), JSON.stringify(value));
        }

        /**
         * Récupération d'un item par son nom
         * @param name
         */
        function getItem(name) {
            return JSON.parse(localStorage.getItem(getName(name)));
        }

        /**
         * Supprime un item par son nom
         */
        function deleteItem(name) {
            $log.debug(DEBUG, 'Delete Item', name);
            localStorage.removeItem(getName(name));
        }

        // ############################################# //
        // ################### API ##################### //
        // ############################################# //

        return {
            setItem   : setItem,
            getItem   : getItem,
            deleteItem: deleteItem
        };
    }

})();