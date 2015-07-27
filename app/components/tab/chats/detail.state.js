angular.module('app').config(function($stateProvider) {

  $stateProvider
    .state('tab.chats-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'components/tab/chats/detail.html',
          controller: 'ChatsDetailController'
        }
      }
    });

});
