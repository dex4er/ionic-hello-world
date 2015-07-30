'use strict';

describe("ChatsFactory", function() {
  var Chats;

  beforeEach(module('app'));

  beforeEach(inject(function(_Chats_) {
    Chats = _Chats_;    
  }));

  describe(".all", function() {
    it("returns all chats", function() {
      expect(Chats.all()).to.have.length(5);
    });
  });

  describe(".get", function() {
    it("first chat has id 0", function() {
      expect(Chats.get(0)).to.have.property('id', 0);
    });
  });

  describe(".remove", function() {
    it("can remove chat", function() {
      Chats.remove(Chats.get(0));
      expect(Chats.get(0)).to.be.null;
    });
  });

});
