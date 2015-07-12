'use strict';

angular.module('ionicState', [])
.factory('$ionicState', function($ionicViewSwitcher, $state) {
  return {
    go: $state.go,
    goForward: function(to, params, options) {
      $ionicViewSwitcher.nextDirection('forward');
      return $state.go(to, params, options);
    },
    goBack: function(to, params, options) {
      $ionicViewSwitcher.nextDirection('back');
      return $state.go(to, params, options);
    }
  };
});
