'use strict';

angular.module('ionicHelloWorldApp')
.controller('GreetingCtrl', function($ionicState, $log, greeting) {
  $log.debug('GreetingCtrl');

  var ctrl = this;

  ctrl.greeting = greeting;

  ctrl.submit = function() {
    $log.debug('GreetingCtrl.submit');
    $ionicState.goForward('home');
  };
})
.config(function($stateProvider) {
  $stateProvider
  .state('greeting', {
    url: '/greeting',
    templateUrl: 'scripts/states/greeting.html',
    controller: 'GreetingCtrl as ctrl',
    cache: false
  });
});
