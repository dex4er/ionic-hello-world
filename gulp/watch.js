'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var path = require('path');
var spawn = require('child_process').spawn;

var child;

var paths = [
  'gulpfile.js',
  path.join('gulp', '*.js')
];

gulp.task('watch:gulp', 'Watch for changes in gulp scripts', function(done) { // jshint ignore:line
  $.watch(paths, function() {
    process.exit();
  });
});

function spawnChild() {
  if (child) {
    child.kill();
  }
  child = spawn('gulp', ['watch:gulp', 'watch:sass', 'watch:inject'], {stdio: 'inherit'});
}

gulp.task('watch', 'Watch for all changes', function(done) { // jshint ignore:line
  $.watch(paths, spawnChild);
  spawnChild();
});
