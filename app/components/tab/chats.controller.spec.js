'use strict';

describe('ChatsController', function() {
  var $scope;
  var vm;

  beforeEach(module('app'));

  beforeEach(inject(function($controller, $rootScope) {
    $scope = $rootScope.$new();
    vm = $controller('ChatsController', {$scope: $scope});
  }));

  describe('$scope.chats', function() {
    it('returns all chats', function() {
      expect($scope.chats).to.have.length(5);
    });

    it('first chat has id 0', function() {
      expect($scope.chats[0]).to.have.property('id', 0);
    });
  });

  describe('$scope.remove', function() {
    it('can remove chat', function() {
      $scope.remove($scope.chats[0]);
      expect($scope.chats).to.have.length.below(5);
    });
  });

});
