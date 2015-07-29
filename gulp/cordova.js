'use strict';

var conf = require('./conf');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

['android'].forEach(function(platform) {
  gulp.task('clean:cordova:' + platform, "Clean Cordova project folder for " + platform, function(done) {
    var cordova = require('../platforms/' + platform + '/cordova/lib/build');
    cordova.runClean()
      .then(done);
  });

  gulp.task('cordova:update:' + platform, "Update Cordova platform " + platform, function(done) {
    gulp.src('')
      .pipe($.shell('cordova platform update ' + platform))
      .on('end', done)
  });
});

gulp.task('clean:cordova', "Clean all Cordova project folders", function(done) {
  runSequence(conf.cordova.platforms.map(function(platform) {
    return 'clean:cordova:'+platform;
  }), done);
});

gulp.task('cordova:update', "Update all Cordova platforms", function(done) {
  runSequence(conf.cordova.platforms.map(function(platform) {
    return 'cordova:update:'+platform;
  }), done);
});
