(function () {
    'use strict';

    angular
        .module('crossQuestions')
        .config(config)
        .config(routes);

    /**
     * Configuration of the Hub News Application
     */
    function config($logProvider, configConstantes, $ionicConfigProvider) {

        // Enable/Disable the debug
        $logProvider.debugEnabled(configConstantes.logDebug);

        //Disable the text in the back button
        $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-back');
    }

    /**
     * Routes definition
     * @param $stateProvider
     * @param $urlRouterProvider
     * @param statesConstantes
     */
    function routes($stateProvider, $urlRouterProvider) {

        $stateProvider
            // STATE : app configuration interfaces
            .state('home', {
                url: '/',
                templateUrl: 'app/views/home.html',
                controller: 'homeController as vm'
            });

         $urlRouterProvider.otherwise('/');
    }
})();
