'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var sass = require('gulp-sass');

gulp.task('sass', 'Build CSS from Sass stylesheets', function(done) {
  var paths = {
    scss: [
      path.join(conf.paths.src, '**', '*.scss'),
      '!' + path.join(conf.paths.bower, '**', '*')
    ],
    dest: path.join(conf.paths.tmp, 'sass')
  };

  gulp.src(paths.scss)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest(paths.dest))
    .on('end', done);
});
