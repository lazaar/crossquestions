#!/usr/bin/env node

var convict = require('convict');

// Schema
var conf = convict({
    env        : {
        doc    : 'Environnment de l\'application',
        format : ['prod', 'dev'],
        default: 'dev',
        env    : 'NODE_ENV',
        arg    : 'env'
    },
    logDebug   : {
        doc    : 'Activation du logger en debug',
        default: false,
        env    : 'NODE_LOG_DEBUG'
    },
    server     : {
        doc    : 'Le serveur à pour les appels WS',
        default: 'TO_BE_DEFINED',
        env    : 'NODE_SERVER'
    },
    buildNumber: {
        doc    : 'Numéro de build de la version',
        default: 4,
        arg    : 'buildNumber'
    },
    platforms  : {
        doc    : 'Plateformes séparées par une virgule pour le build. Si aucune n\'est renseignée, toutes les ' +
        'plateformes dans le config.xml sont prises',
        default: '',
        arg    : 'platforms'
    },
    isRelease  : {
        doc    : 'Release Cordova. ',
        default: false,
        arg    : 'isRelease'
    }
});

var env = conf.get('env');
conf.loadFile('build/config/env/' + env + '.json');

// perform validation
conf.validate();

module.exports = conf;