'use strict';

angular.module('app').config(function($stateProvider) {

  $stateProvider
    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'app/tab/dash.html',
          controller: 'DashController'
        }
      }
    });

});
