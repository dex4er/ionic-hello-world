'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var changed = require('gulp-changed');

gulp.task('copy:dev', 'Copy dev files into dest folder', ['sass', 'inject'], function(done) {
  var paths = [
    path.join(conf.paths.src, '**/*'),
    path.join(conf.paths.tmp, '**/*'),
    '!**/*.inj.html',
    '!**/*.scss'
  ];

  gulp.src(paths)
    .pipe(changed(conf.paths.dest))
    .pipe(gulp.dest(conf.paths.dest))
    .on('end', done);
});

gulp.task('copy', 'copy:dev');
