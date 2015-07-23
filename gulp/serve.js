'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir) {
  var server = {
    baseDir: baseDir
  };

  /*
   * You can add a proxy to your backend by uncommenting the line bellow.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', proxyHost: 'jsonplaceholder.typicode.com'});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: conf.browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve:src', 'Run dev app in browser from source folder', ['sass', 'inject'], function () {
  browserSyncInit([conf.paths.tmp, conf.paths.src]);
});

gulp.task('serve:dev', 'Run dev app in browser from dest folder', ['copy'], function () {
  browserSyncInit(conf.paths.dest);
});

gulp.task('serve', 'serve:src');
