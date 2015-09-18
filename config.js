'use strict';

var proxy = {
    mock: {
      target: 'http://localhost:8000/',
      hostRewrite: 'localhost:8000',
      changeOrigin: true
    },
    dev: {
      target: 'http://192.168.1.2/',
      hostRewrite: '192.168.1.2',
      changeOrigin: true
    }
};

module.exports = {

  paths: {
    src: 'src',
    dest: 'www',
    tmp: 'tmp',
    e2e: 'e2e',
    bower: 'src/vendor',
    scripts: 'src/app',
    styles: 'src/styles',
    po: 'po',
    gulp: 'gulp'
  },

  browser: 'default',

  server: {
    log: false,
    prefix: '/',
    proxy: {
      // '/api': proxy.mock,
    }
  },

  cordova: {
    platforms: ['android']
  },

  angular: {
    module: 'app',
    templates: [
      'src/*/**/*.html',
      '!src/vendor/**/*'
    ]
  },

  assets: [
    'src/**/*.ico',
  ],

  fixture: function(done) {
    // something to do after build
  }

};
