/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('levelsController', LevelsControllerFct);


    function LevelsControllerFct($ionicScrollDelegate,analyticsService, cqConstantes, $timeout, $location, admobService, dataService,$scope, starService, dataModel){

        var vm = this;

        $scope.$on( '$ionicView.beforeEnter', function( scopes, states ) {
            if(states.fromCache){
                reload();
                vm.levels = updateData(vm.levels);
            }
        });

        // ############## PRIVATE BUSINESS ############# //
        var updateData = function(data){
            _.each(data, function(item, index){
                item.stars = starService.getStartsByLevels(index);
            });
            return data;
        };

        function reload(){
            vm.currentLevel = dataModel.currentLevel;
            vm.currentCw = dataModel.currentCw;
            vm.numberStars = dataModel.numberStars;
            if(Math.random()<cqConstantes.ads.bannerLevels){
                admobService.generateBanner();
            }
        }
        /**
         * init of the controler
         */
        function init(){
            analyticsService.setScreenName('levels');
            reload();
            dataService.getData().then(function(datas){
                vm.levels = updateData(datas);
                if(vm.currentLevel-2 > 2){
                    $location.hash('level-'+ (vm.currentLevel-2));
                    var delegate = $ionicScrollDelegate.$getByHandle('content');
                    delegate.anchorScroll(true); 
                }
            });

        }
        // ################# INITALIZE ################# //

        init();
    }
})();
