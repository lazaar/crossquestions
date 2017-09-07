/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('crossWordController', CrossWordControllerFct);


    function CrossWordControllerFct($stateParams, analyticsService,$ionicHistory,  admobService, popupService, $scope, $timeout, dataModel, soundService, cwService, cqConstantes, routerHelper){

        var vm = this, isInTransition= false;

        $scope.$on( '$ionicView.afterEnter', function( scopes, states ) {
            if(states.fromCache){
                if(vm.stars !== dataModel.crosswords.stars){
                    vm.animateStars = true;
                    admobService.generateBanner();
                   vm.stars = dataModel.crosswords.stars;
                   reload();
                   $timeout(function(){
                    vm.animateStars = false;
                   },300);
                }
            }
        });

        $scope.$on( '$ionicView.beforeEnter', function( scopes, states ) {
            if(states.fromCache){
                vm.hints = dataModel.hints;
            }
        });

        // ############## PRIVATE BUSINESS ############# //
        var goToQuestion = function(i,j,direction){
            if(direction && vm.grid[i][j][direction] !== undefined && !isInTransition){
                isInTransition = true;
                routerHelper.goToState(cqConstantes.states.question,{'i': i,'j': j,'direction': direction});
            }
            _.delay(function(){
                isInTransition= false;
            }, 100);
        };


        var goNext = function(){
            if(vm.next === 2){
                routerHelper.goToState(cqConstantes.states.crossWord,{'cw': parseInt(vm.cw)+1});
            }
            else{
                routerHelper.goToState(cqConstantes.states.group,{'level': parseInt(dataModel.crosswords.levelId )+1});
            }
            _.delay(function(){
                $ionicHistory.removeBackView()
            }, 500);
        };

        var openHints = function(){
            popupService.showPopupHints().then(function(){
                vm.hints = dataModel.hints;
            });
        };

        var reload = function(){
            if(dataModel.currentLevel > dataModel.crosswords.levelId && (parseInt(vm.cw)+1) === _.get(dataModel.data, dataModel.crosswords.levelId).crosswords.length){
                vm.next = 1;
            }
            else if(dataModel.currentLevel > dataModel.crosswords.levelId || (dataModel.currentLevel === dataModel.crosswords.levelId && dataModel.currentCw > vm.cw)){
                vm.next = 2;
            }
            else{
                vm.next = -1;
            }
        };
        /**
         * init of the controler
         */
        function init(){
            analyticsService.setScreenName('CrossWord');
            if(Math.random()<cqConstantes.ads.bannerCrossWords){
                admobService.generateBanner();
            }

            if(Math.random()<cqConstantes.ads.interCrossWords){
                _.delay(function(){
                    admobService.generateInterstitial();
                },2000);
            }

            soundService.playBackgroundMusic();
            vm.goToQuestion = goToQuestion;
            vm.goNext = goNext;
            vm.openHints = openHints;
            vm.cw = $stateParams.cw;
            vm.grid = dataModel.crosswords.grid;
            vm.stars = dataModel.crosswords.stars;
            vm.hints = dataModel.hints;
            reload();


            analyticsService.logEvent('select_content', {'content_type': 'crossword_view', 'item_id': dataModel.crosswords.levelId +'/'+vm.cw});
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
