'use strict';

/* jshint strict:true, node:true */

var _ = require('lodash');

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

var constants = {
  DEFAULT_STATE: 'tab.dash'
};

var config = {

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
  },

  constants: {
    dev: _.defaultsDeep({
      // specific for dev environment
    }, constants),
    prod: _.defaultsDeep({
      // specific for prod environment
    }, constants)
  }

};

try {
    var local = require('./local');
} catch (e) {
    var local = {};
}

var _ = require('lodash');

config = _.defaultsDeep(local, config);

module.exports = config;
