'use strict';

var conf = require('./conf');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var path = require('path');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

// var proxyMiddleware = require('http-proxy-middleware');

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
    browser: conf.browser,
    logConnections: true,
    timestamps: true
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

var paths = {
  src: [
    path.join(conf.paths.tmp, 'inject'),
    path.join(conf.paths.tmp, 'sass'),
    conf.paths.src
  ],
  dev: conf.paths.dest
};

gulp.task('browser:reload', 'Reload browser', function () {
  if (browserSync.instances) {
    browserSync.reload();
  }
});

gulp.task('watch:browser', 'Watch for changes and reload browser', function(done) { // jshint ignore:line
  $.watch(paths.src, $.batch(function(events, done) {
    events
      .on('data', function() {
        gulp.start('browser:reload', done);
      })
      .on('end', done);
  }));
});

gulp.task('serve:src', 'Run dev app in browser from source folder', function () {
  gulp.start('sass', function() {
    gulp.start('inject', function() {
      browserSyncInit(paths.src);
      gulp.start('watch');
    });
  });
});

gulp.task('serve:dev', 'Run dev app in browser from dest folder', ['copy'], function () {
  browserSyncInit(paths.dev);
});

gulp.task('serve', ['serve:src']);
