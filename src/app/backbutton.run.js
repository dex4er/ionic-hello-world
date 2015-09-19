'use strict';

angular.module('app').run(function($ionicHistory, $ionicPlatform, $state) {
  $ionicPlatform.ready(function() {
    $ionicPlatform.registerBackButtonAction(function(event) {
      var homeState = 'tab.dash';
      if (($ionicHistory.currentStateName().match(/\./g)||[]).length <= 1) {
        if ($ionicHistory.currentStateName() === homeState) {
          ionic.Platform.exitApp();
        } else {
          $state.go(homeState);
        }
      } else {
        $ionicHistory.goBack();
      }
      event.preventDefault();
      return false;
    }, 101);
  });
});
