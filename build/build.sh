#!/bin/sh

# ======================================================================================
# Script de build de l'application
# Author : Nicolas Hodicq (nhodicq@sqli.com)
# ======================================================================================

# Valeur par defaut
ENV=dev
BUILD_NUMBER=1

# Affiche l'aide
function print_usage {
    echo "$1 [-e] [-h]"
	echo "	-e                : Environnment (dev, prod) dev est l'environnement par défaut"
    echo "  -n                : Build Number pour passer la version du build dans le config.xml"
	echo "	-h                : Cette aide"
	echo ""
}

# options
while getopts ":e:n:h" opt ; do
    case $opt in
        e ) ENV=$OPTARG;;
        n ) BUILD_NUMBER=$OPTARG;;
        h ) print_usage $0
            exit 0 ;;
        * ) echo "Mauvais parametre -$opt"
			print_usage $0
			exit 1 ;;
	esac
done

# fonction pour check le code de retour d'une commande
check_error () {

   # Check que l'on a bien 2 arguments
   if [ "$#" -ne 2 ]
   then
      echo "==============================================================================="
      echo "= Deux arguments doivent être définis (code de retour et le message d'erreur) ="
      echo "==============================================================================="
      exit 1
   fi

   # Check le code de retour
   if [ $1 != "0" ]; then
       echo "==============================================================================="
       echo "= $2 ="
       echo "==============================================================================="
       exit 1
   fi
}

# 1- Dépendance npm
npm install
NPM_RESULT=$?
check_error $NPM_RESULT "NPM Install KO"

# 1- Dépendance bower
bower install
BOWER_RESULT=$?
check_error $BOWER_RESULT "Bower Install KO"

# 3- Ajout de la configuration par environnement
echo "Environnement : $ENV / Build Number : $BUILD_NUMBER"
gulp config --env=$ENV --buildNumber=$BUILD_NUMBER
GULP_CONFIG=$?
check_error $GULP_CONFIG "Gulp config KO"

# 4- TUA
gulp test
GULP_TEST=$?
check_error $GULP_TEST "Gulp test KO"

# 5- Build de l'application web
gulp build
GULP_BUILD=$?
check_error $GULP_BUILD "Gulp jshint KO"


# 6- build de l'application cordova

rm -Rf platforms
rm -Rf plugins

# 6.1- Cordova prepare
cordova prepare
CORDOVA_PREPARE=$?
check_error $CORDOVA_PREPARE "Cordova prepare KO"

# 6.2- Cordova pré requie
cordova requirements ios android
CORDOVA_REQUIREMENTS=$?
check_error $CORDOVA_REQUIREMENTS "Les prérequis pour cordova ne sont pas installés"

# 6.3- Cordova build
cordova build ios android
CORDOVA_BUILD=$?
check_error $CORDOVA_BUILD "Cordova build KO"
