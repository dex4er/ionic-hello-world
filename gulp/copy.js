'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var changed = require('gulp-changed');

gulp.task('copy:dev', 'Copy dev files into dest folder', ['sass', 'inject'], function (done) {
  var paths = {
    src: [
      path.join(conf.paths.src, '**', '*'),
      path.join(conf.paths.tmp, 'sass', '**', '*'),
      path.join(conf.paths.tmp, 'inject', '**', '*'),
      '!' + path.join('**', '*.inj.html'),
      '!' + path.join('**', '*.scss')
    ],
    dest: conf.paths.dest
  };

  gulp.src(paths.src)
    .pipe(changed(paths.dest))
    .pipe(gulp.dest(paths.dest))
    .on('end', done);
});

gulp.task('copy', ['copy:dev']);
