'use strict';

var conf = require('./conf');
var error = require('./error');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

var paths = {
  src: [
    conf.paths.src + '/**/*.scss',
    '!' + conf.paths.bower + '/**/*'
  ],
  dest: conf.paths.tmp + '/sass'
};

gulp.task('sass', "Build CSS from Sass stylesheets", function(done) {
  gulp.src(paths.src)
    .pipe($.sass({
      errLogToConsole: true,
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))
    .pipe(gulp.dest(paths.dest))
    .on('error', error)
    .on('end', done)
    .pipe($.if(browserSync.active, browserSync.reload({ stream: true })));
});

gulp.task('watch:sass', "Watch for changes in Sass", function(done) { // jshint ignore:line
  $.watch(paths.src, function() {
    runSequence('sass');
  });
});
