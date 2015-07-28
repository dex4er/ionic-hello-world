'use strict';

angular.module('app').config(function($stateProvider) {

  $stateProvider
    .state('tab.chats.detail', {
      url: '/:chatId',
      views: {
        'tab-chats@tab': {
          templateUrl: 'components/tab/chats/detail.html',
          controller: 'ChatsDetailController'
        }
      }
    });

});
