(function () {

    'use strict';
    angular.module('crossQuestions').constant('cqConstantes', {
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
        }
    });
})();