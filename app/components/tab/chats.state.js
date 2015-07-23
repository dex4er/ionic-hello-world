angular.module('app').config(function($stateProvider) {

  $stateProvider
    .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'components/tab/chats.html',
            controller: 'ChatsCtrl'
          }
        }
      });

});
