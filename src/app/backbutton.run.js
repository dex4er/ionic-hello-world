'use strict';

angular.module('app').run(function($ionicHistory, $ionicPlatform, $state, DEFAULT_STATE, IONIC_BACK_PRIORITY) {
  $ionicPlatform.ready(function() {
    $ionicPlatform.registerBackButtonAction(function(event) {
      if (($ionicHistory.currentStateName().match(/\./g)||[]).length <= 1) {
        if ($ionicHistory.currentStateName() === DEFAULT_STATE) {
          ionic.Platform.exitApp();
        } else {
          $state.go(DEFAULT_STATE);
        }
      } else {
        $ionicHistory.goBack();
      }
      event.preventDefault();
      return false;
    }, IONIC_BACK_PRIORITY.view);
  });
});
