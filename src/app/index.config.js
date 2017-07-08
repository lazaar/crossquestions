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
    function routes($stateProvider, $urlRouterProvider, cqConstantes) {

        $stateProvider
            // STATE : app configuration interfaces
            .state(cqConstantes.states.home, {
                url: '/',
                templateUrl: 'app/views/home.html',
                controller: 'homeController as vm'
            })
            .state(cqConstantes.states.levels, {
                url: '/'+cqConstantes.states.levels,
                templateUrl: 'app/views/levels.html',
                controller: 'levelsController as vm'
            })
            .state(cqConstantes.states.group, {
                url: '/'+cqConstantes.states.group+'/:group',
                templateUrl: 'app/views/group.html',
                controller: 'groupController as vm'
            })
            .state(cqConstantes.states.crossWord, {
                url: '/'+cqConstantes.states.crossWord+'/:cw',
                templateUrl: 'app/views/crossWord.html',
                controller: 'crossWordController as vm'
            })
            .state(cqConstantes.states.question, {
                url: '/'+cqConstantes.states.question+'/:question',
                templateUrl: 'app/views/question.html',
                controller: 'questionController as vm'
            });

         $urlRouterProvider.otherwise('/');
    }
})();
