'use strict';

angular.module('app').run(function($ionicHistory, $ionicPlatform, $state) {
  $ionicPlatform.ready(function() {
    $ionicPlatform.registerBackButtonAction(function(event) {
      console.log($ionicHistory.currentStateName());
      if (($ionicHistory.currentStateName().match(/\./g)||[]).length <= 1) {
        if ($ionicHistory.currentStateName() === 'tab.dash') {
          ionic.Platform.exitApp();
        } else {
          $state.go('tab.dash');
        }
      } else {
        $ionicHistory.goBack();
      }
      event.preventDefault();
      return false;
    }, 101);
  });
});
