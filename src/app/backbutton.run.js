'use strict';

angular.module('app').run(function($ionicHistory, $ionicPlatform, $state, defaultState, IONIC_BACK_PRIORITY) {
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
    }, IONIC_BACK_PRIORITY.view);
  });
});
