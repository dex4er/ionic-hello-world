'use strict';

var conf = require('./conf');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var path = require('path');

var paths = {
  src: [
    path.join(conf.paths.src, '**', '*.scss'),
    '!' + path.join(conf.paths.bower, '**', '*')
  ],
  dest: path.join(conf.paths.tmp, 'sass')
};

gulp.task('sass', 'Build CSS from Sass stylesheets', function() {
  gulp.src(paths.src)
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('watch:sass', 'Watch for changes in Sass', function(done) {
  $.watch(paths.src, $.batch(function(events, done) {
    events
      .on('data', function() {
        gulp.start('sass', done);
      })
      .on('end', done);
  }));
});
