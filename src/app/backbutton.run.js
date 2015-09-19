'use strict';

angular.module('app').run(function($ionicHistory, $ionicPlatform) {
  $ionicPlatform.registerBackButtonAction(function(event) {
    console.log($ionicHistory.currentStateName());
    if (($ionicHistory.currentStateName().match(/\./g)||[]).length <= 1) {
      ionic.Platform.exitApp();
    } else {
      $ionicHistory.goBack();
    }
    event.preventDefault();
    return false;
  }, 101);
});
