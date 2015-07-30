'use strict';

angular.module('app').config(function($stateProvider) {

  $stateProvider
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'app/tab/account.html',
          controller: 'AccountController'
        }
      }
    });

});
