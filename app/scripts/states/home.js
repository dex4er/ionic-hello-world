'use strict';

angular.module('ionicHelloWorldApp')
.controller('HomeCtrl', function($ionicState, $log, $stateParams, greeting) {
  var ctrl = this;

  $log.debug('HomeCtrl');

  ctrl.greeting = greeting;

  if (! $stateParams.back) {
    greeting.name = null;
  }

  ctrl.submit = function() {
    $log.debug('HomeCtrl.submit');

    if (ctrl.form.$valid) {
      $ionicState.goForward('greeting');
    }
  };
})
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('home', {
    url: '/home?back',
    templateUrl: 'scripts/states/home.html',
    controller: 'HomeCtrl as ctrl',
    cache: false
  });
});
