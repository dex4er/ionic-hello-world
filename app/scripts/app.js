'use strict';

angular.module('ionicHelloWorldApp', [
  'ionic',
  'ionicState',
  'lodash',
  'templates'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.setPlatformConfig('android', {
    views: {
      transition: 'android'
    },
    navBar: {
      alignTitle: 'center',
      alignButtons: 'left',
      transition: 'android-nav-bar'
    },
    menus: {
      transition: 'android-menu'
    }
  });
})

;
