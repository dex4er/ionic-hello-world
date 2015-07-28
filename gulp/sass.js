'use strict';

var conf = require('./conf');
var error = require('./error');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');

var paths = {
  src: [
    conf.paths.src + '/**/*.scss',
    '!' + conf.paths.bower + '/**/*'
  ],
  dest: conf.paths.tmp + '/sass'
};

gulp.task('sass', 'Build CSS from Sass stylesheets', function() {
  return gulp.src(paths.src)
    .pipe($.sass({
      errLogToConsole: true,
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))
    .pipe(gulp.dest(paths.dest))
    .on('error', error)
    .pipe($.if(browserSync.active, browserSync.reload({ stream: true })));
});

gulp.task('watch:sass', 'Watch for changes in Sass', function() {
  $.watch(paths.src, function() {
    gulp.start('sass');
  });
});
