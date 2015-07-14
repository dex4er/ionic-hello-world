'use strict';

angular.module('ionicHelloWorldApp')
.config(function($stateProvider) {
  $stateProvider.state('greeting', {
    url : '/greeting',
    templateUrl : 'scripts/pages/greeting.html',
    cache : false
  });
});
