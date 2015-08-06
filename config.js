'use strict';

module.exports = {

  paths: {
    src: 'src',
    dest: 'www',
    tmp: 'tmp',
    e2e: 'e2e',
    bower: 'src/vendor',
    scripts: 'src/app',
    styles: 'src/styles',
    gulp: 'gulp'
  },

  browser: 'default',

  server: {
    log: false,
  },

  cordova: {
    platforms: ['android']
  }

};
