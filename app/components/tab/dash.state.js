angular.module('app').config(function($stateProvider) {

  $stateProvider
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'components/tab/dash.html',
        controller: 'DashCtrl'
      }
    }
  });

});
