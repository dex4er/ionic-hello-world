'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var path = require('path');
var spawn = require('child_process').spawn;

var child;

gulp.task('watch:gulp', 'Watch for changes in gulp scripts', function(done) {
  $.watch(['gulpfile.js', path.join('gulp', '*.js')], function() {
    process.exit();
  });
});

gulp.task('watch', 'Watch for all changes', function(done) {
  $.watch(['gulpfile.js', path.join('gulp', '*.js')], spawnChild);
  spawnChild();

  function spawnChild() {
    if (child) {
      child.kill();
    }
    child = spawn('gulp', ['watch:gulp', 'watch:sass', 'watch:inject'], {stdio: 'inherit'});    
  }
});
