'use strict';

angular.module('app').config(function($stateProvider) {

  $stateProvider
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: '/app/tab/chats.html',
          controller: 'ChatsController'
        }
      }
    });

});
