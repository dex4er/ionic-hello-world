'use strict';

/* jshint strict:true, node:true */

var conf = require('../config');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var mkdirp = require('mkdirp');
var runSequence = require('run-sequence');

var fs = require('fs');
var et = require('elementtree');

function getAndroidTargetSdkVersion() {
  var data = fs.readFileSync(__dirname + '/../config.xml').toString();
  var etree = et.parse(data);
  var el = etree.find("./preference[@name='android-targetSdkVersion']");
  return el.get('value');
}

function getAndroidCommand() {
  return process.env.ANDROID_HOME ? process.env.ANDROID_HOME + '/tools/android' : 'android';
}

conf.cordova.platforms.forEach(function(platform) {
  gulp.task('cordova:clean:' + platform, "Clean Cordova project folder for " + platform, function(done) {
    var cordova = require('../platforms/' + platform + '/cordova/lib/build');
    cordova.runClean()
      .then(done);
  });

  gulp.task('cordova:platform:add:' + platform, "Add Cordova platform " + platform, function(done) {
    mkdirp(conf.paths.dest, {}, function() {
      var version = platform === 'android' ? getAndroidTargetSdkVersion() : undefined;
      var android = version ? getAndroidCommand() : undefined;
      gulp.src('')
        .pipe($.shell('cordova platform add ' + platform + ' --save'))
        .pipe($.if(!!version, $.shell(android + ' update project --subprojects --path platforms/android --target android-' + version + ' --library CordovaLib')))
        .on('end', done);
    });
  });

  gulp.task('cordova:platform:update:' + platform, "Update Cordova platform " + platform, function(done) {
    mkdirp(conf.paths.dest, {}, function() {
      var version = platform === 'android' ? getAndroidTargetSdkVersion() : undefined;
      var android = version ? getAndroidCommand() : undefined;
      gulp.src('')
        .pipe($.shell('cordova platform update ' + platform + ' --save'))
        .pipe($.if(!!version, $.shell(android + ' update project --subprojects --path platforms/android --target android-' + version + ' --library CordovaLib')))
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
