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
            playInfo:'playInfo'
        },
        popupMessage:{
            newLevelUnlocked:'New Level unlocked',
            newCwUnlocked:'New Cross Word unlocked',
            shareTitle:'The best Cross Word Application'
        },
        sounds:{
            backgroundMusic:'/assets/sounds/game.mp3',
            menuMusic:'/assets/sounds/menu.mp3',
            click:'/assets/sounds/click.wav',
            letterClick:'/assets/sounds/letterClick.mp3',
            correct:'/assets/sounds/correct.wav',
            letterClickOut:'/assets/sounds/letterClickOut.wav',
        }
    });
})();