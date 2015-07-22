angular.module('app').config(function($stateProvider) {

  $stateProvider
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'components/tab/account.html',
        controller: 'AccountCtrl'
      }
    }
  });

});
