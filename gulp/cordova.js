'use strict';

/* jshint strict:true, node:true */

var conf = require('../config');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var mkdirp = require('mkdirp');
var runSequence = require('run-sequence');

conf.cordova.platforms.forEach(function(platform) {
  gulp.task('cordova:clean:' + platform, "Clean Cordova project folder for " + platform, function(done) {
    var cordova = require('../platforms/' + platform + '/cordova/lib/build');
    cordova.runClean()
      .then(done);
  });

  gulp.task('cordova:platform:add:' + platform, "Add Cordova platform " + platform, function(done) {
    mkdirp(conf.paths.dest, {}, function() {
      gulp.src('')
        .pipe($.shell('cordova platform add ' + platform + ' --save'))
        .on('end', done);
    });
  });

  gulp.task('cordova:platform:update:' + platform, "Update Cordova platform " + platform, function(done) {
    mkdirp(conf.paths.dest, {}, function() {
      gulp.src('')
        .pipe($.shell('cordova platform update ' + platform + ' --save'))
        .on('end', done);
    });
  });
});

gulp.task('cordova:clean', "Clean all Cordova project folders", function(done) {
  runSequence(conf.cordova.platforms.map(function(platform) {
    return 'cordova:clean:' + platform;
  }), done);
});

gulp.task('cordova:platform:add', "Add all Cordova platforms", function(done) {
  runSequence(conf.cordova.platforms.map(function(platform) {
    return 'cordova:platform:add:'+platform;
  }), done);
});

gulp.task('cordova:platform:update', "Update all Cordova platforms", function(done) {
  runSequence(conf.cordova.platforms.map(function(platform) {
    return 'cordova:platform:update:'+platform;
  }), done);
});
