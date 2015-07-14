'use strict';

angular.module('ionicHelloWorldApp')
.controller('HomeController', function($ionicState, $log, $stateParams, greeting) {
  var vm = this;

  $log.debug('HomeController');

  vm.greeting = greeting;

  if (!$stateParams.back) {
    greeting.name = null;
  }

  vm.submit = function() {
    $log.debug('HomeController.submit');

    if (vm.form.$valid) {
      $ionicState.goForward('greeting');
    }
  };
});
