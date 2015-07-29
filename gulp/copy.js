'use strict';

var conf = require('./conf');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

var paths = {
  src: [
    conf.paths.src + '/**/*',
    conf.paths.tmp +  '/sass/**/*',
    conf.paths.tmp + '/inject/**/*',
    '!' + conf.paths.src + '/**/*.inj.*',
    '!' + conf.paths.src + '/**/*.scss',
    '!' + conf.paths.src + '/**/*.spec.*'
  ],
  dest: conf.paths.dest
};

gulp.task('copy:dev', "Copy dev files into dest folder", function (done) {
  runSequence('sass', 'inject:prod', 'lint', function() {
    gulp.src(paths.src)
      .pipe($.changed(paths.dest))
      .pipe(gulp.dest(paths.dest))
      .on('end', done);
  });
});

gulp.task('copy', ['copy:dev']);
