'use strict';

angular.module('app').controller('ChatsDetailController', function(
    $scope,
    $stateParams,
    Chats
) {
  $scope.chat = Chats.get($stateParams.chatId);
});
