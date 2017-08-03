/**
 * CONTROLLER : page videos
 */
(function () {
    'use strict';
    angular
        .module('crossQuestions')
        .controller('groupController', GroupControllerFct);


    function GroupControllerFct($stateParams,popupService,admobService,  $timeout, $scope, soundService, starService, routerHelper, cqConstantes, cwService , dataModel, dataService, correctionService){

        var vm = this;

        $scope.$on( '$ionicView.beforeEnter', function( scopes, states ) {
            if(states.fromCache){
                reload(true);
                vm.crosswords = updateData(vm.crosswords);
            }
        });

        vm.goToCrossWords = function(id){
            var cw = _.get(vm.crosswords,id);
            cw.id = id;
            cw.levelId = vm.level;
            cwService.initCrossWords(cw);
            routerHelper.goToState(cqConstantes.states.crossWord,{'cw': id});
            soundService.playSound(cqConstantes.sounds.click);
        };

        vm.showPopupHints = function(){
            popupService.showPopupHints();
        };

        vm.isDisabled = function(index){
            return (vm.level+1) === vm.currentLevel && vm.currentCw - 1 < index;
        };

        // ############## PRIVATE BUSINESS ############# //
        var updateData = function(data){
            _.each(data, function(item, index){
                item.stars = starService.getStartsByCw(vm.level, index);
                item.numberCorrectionByCw = correctionService.getNumberCorrectionByCw(vm.level, index);
            });
            return data;
        };

        function reload(fromCache){
            admobService.removeBanner();
            if(Math.random()<cqConstantes.ads.interGroup){
                _.delay(function(){
                    admobService.generateInterstitial();
                },1000);
            }
            vm.numberStars = dataModel.numberStars;
            vm.currentLevel = dataModel.currentLevel;
            vm.currentCw = dataModel.currentCw;
            if(fromCache){
                soundService.playMenuMusic();
            }
        }

        /**
         * init of the controler
         */
        function init(){
            var level;
            vm.level = parseInt($stateParams.level);
            reload(false);
            vm.activeSlide = (vm.level+1) === vm.currentLevel ? (vm.currentCw - 1) : 0;
            dataService.getData().then(function(datas){
                level = _.get(datas,vm.level);
                vm.crosswords = updateData(level ? level.crosswords : []);
                $timeout(function() {
                     vm.left = 100*(vm.level+1 === vm.currentLevel ? (vm.currentCw - 1): vm.crosswords.length)/vm.crosswords.length;
                     vm.left = vm.left === 0 ? 100 : vm.left;
                }, 200);


            });
        }
        // ################# INITALIZE ################# //

        init();
    }
})();
