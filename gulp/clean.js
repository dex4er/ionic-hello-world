'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var del = require('del');

gulp.task('clean:tmp', 'Clean temporary folder', function (done) {
  del(conf.paths.tmp, done);
});

gulp.task('clean:dest', 'Clean dest folder', function (done) {
  del(conf.paths.dest, done);
});

gulp.task('clean', ['clean:dest', 'clean:tmp']);