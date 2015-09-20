'use strict';

angular.module('app').run(function($ionicHistory, $ionicPlatform, $state, defaultState) {
  $ionicPlatform.ready(function() {
    $ionicPlatform.registerBackButtonAction(function(event) {
      if (($ionicHistory.currentStateName().match(/\./g)||[]).length <= 1) {
        if ($ionicHistory.currentStateName() === defaultState) {
          ionic.Platform.exitApp();
        } else {
          $state.go(defaultState);
        }
      } else {
        $ionicHistory.goBack();
      }
      event.preventDefault();
      return false;
    }, 101);
  });
});
