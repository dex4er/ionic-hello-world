'use strict';

angular.module('ionicHelloWorldApp')
.controller('GreetingController', function($ionicState, $log, greeting) {
  $log.debug('GreetingController');

  var vm = this;

  vm.greeting = greeting;

  vm.submit = function() {
    $log.debug('GreetingController.submit');
    $ionicState.goForward('home');
  };
});
