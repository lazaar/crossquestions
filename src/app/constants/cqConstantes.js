(function () {

    'use strict';
    angular.module('crossQuestions').constant('cqConstantes', {
        ios:'1286430557',
        android:'com.lazcha.crossWords',
        facebookId:'668484603351045',
        facebookUrl:'https://www.facebook.com/lazyGamesApp',
        daysBetweenShareHints:7,
        daysBetweenInviteHints:7,
        states:{        
            home:'home',
            about:'about',
            levels:'levels',
            group:'group',
            crossWord:'crossWord',
            question:'question'
        },
        localStorage:{
            correctedQuestions : 'correctedQuestions',
            letters:'letters',
            facebook:'facebook',
            playInfo:'playInfo',
            coinsList:'coinsList'
        },
        popupMessage:{
            newLevelUnlocked:'New Level unlocked',
            newCwUnlocked:'New Crossword unlocked',
            shareTitle:'Crossboss : The best Crosswords Application',
            giftTitle:'Daily Gift',
            giftContent:'You recieved {coins} Coins',
        },
        sounds:{
            backgroundMusic:'assets/sounds/game.mp3',
            menuMusic:'assets/sounds/menu.mp3',
            click:'assets/sounds/click.mp3',
            letterClick:'assets/sounds/letterClick.mp3',
            correct:'assets/sounds/correct.wav',
            wrong:'assets/sounds/wordMistake.wav',
            unlocked:'assets/sounds/unlocked.mp3',
            letterClickOut:'assets/sounds/letterClickOut.wav',
        },
        ads:{
            bannerCrossWords:0.75,
            bannerLevels:0.70,
            interGroup:0.2,
            interCrossWords:0.1,
            interLose:0.1,
        },
        shareFacebook:{
            sharePicture:'https://img11.hostingpics.net/pics/552678iconcopie.png',
            hashTag:'CrossbossGame',
            inviteFriend:'Come join me in playing this amusing game',
            quote:'Crossboss : The best Crosswords Application'
        }
    });
})();