'use strict';

angular.module('ionicHelloWorldApp').
filter('default', function() {
  return function(input, defaultValue) {
    if (angular.isUndefined(input) || input === null || input === '') {
      return defaultValue;
    }
    return input;
  };
});
