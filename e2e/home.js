'no strict';

describe('/', function() {
  it('should load main page', function() {
    return browser
      .url('/')
      .pause(2000)
      .getText('ion-view[nav-view="active"] h1.title')
        .should.eventually.equal('Hello');
  });
});
