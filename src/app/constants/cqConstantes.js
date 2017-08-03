(function () {

    'use strict';
    angular.module('crossQuestions').constant('cqConstantes', {
        ios:'1084782640',
        android:'com.gamelaz.xflip',
        states:{		
        	home:'home',
        	levels:'levels',
        	group:'group',
        	crossWord:'crossWord',
        	question:'question'
    	},
        localStorage:{
            correctedQuestions : 'correctedQuestions',
            letters:'letters',
            playInfo:'playInfo',
            coinsList:'coinsList'
        },
        popupMessage:{
            newLevelUnlocked:'New Level unlocked',
            newCwUnlocked:'New Cross Word unlocked',
            shareTitle:'The best Cross Word Application',
            giftTitle:'Daily Gift',
            giftContent:'You recieved {coins} Coins',
        },
        sounds:{
            backgroundMusic:'/assets/sounds/game.mp3',
            menuMusic:'/assets/sounds/menu.mp3',
            click:'/assets/sounds/click.wav',
            letterClick:'/assets/sounds/letterClick.mp3',
            correct:'/assets/sounds/correct.wav',
            letterClickOut:'/assets/sounds/letterClickOut.wav',
        },
        ads:{
            bannerCrossWords:0.75,
            bannerLevels:0.70,
            interGroup:0.2,
            interCrossWords:0.1,
            interLose:0.1,
        }
    });
})();