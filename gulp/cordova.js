'use strict';

var conf = require('./conf');

var gulp = require('gulp');

var runSequence = require('run-sequence');

['android'].forEach(function(platform) {
  gulp.task('clean:cordova:' + platform, "Clean Cordova project folder for " + platform, function(done) {
    var cordova = require('../platforms/' + platform + '/cordova/lib/build');
    cordova.runClean()
      .then(done);
  });  
});

gulp.task('clean:cordova', "Clean all Cordova project folders", function(done) {
  runSequence(conf.cordova.platforms.map(function(platform) {
    return 'clean:cordova:'+platform;
  }), done);
});
