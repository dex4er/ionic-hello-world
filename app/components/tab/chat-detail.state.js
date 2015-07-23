angular.module('app').config(function($stateProvider) {

  $stateProvider
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'components/tab/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    });

});
