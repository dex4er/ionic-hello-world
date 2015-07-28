'use strict';

var conf = require('./conf');
var error = require('./error');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var _ = require('lodash');

var bowerFiles = require('main-bower-files');
var browserSync = require('browser-sync');
var mkdirp = require('mkdirp');

var paths = {
  src: {
    css: [
      conf.paths.src + '/**/*.css',
      conf.paths.tmp + '/sass/**/*.css',
      '!' + conf.paths.bower + '/**/*'
    ],
    js: [
      conf.paths.src + '/**/*.js',
      '!' + conf.paths.bower + '/**/*',
      '!' + conf.paths.src + '/**/*.spec.js',
      '!' + conf.paths.src + '/**/*.mock.js'
    ],
    html: [
      conf.paths.src + '/*.inj.html'
    ],
  },
  dirs: [
    conf.paths.src + '/',
    conf.paths.tmp + '/sass/'
  ],
  dest: conf.paths.tmp + '/inject'
};

gulp.task('inject', 'Inject styles and scripts into HTML', function() {
  return gulp.src(paths.src.html)
    .pipe($.inject(gulp.src(paths.src.css, {read: false}), {ignorePath: paths.dirs, addRootSlash: !global.isProd}))
    .pipe($.inject(gulp.src(paths.src.js).pipe($.angularFilesort()), {ignorePath: paths.dirs, addRootSlash: !global.isProd}))
    .pipe($.inject(gulp.src(bowerFiles({includeDev: true}), {read: false}), {ignorePath: paths.dirs, addRootSlash: !global.isProd, name: 'bower'}))
    .pipe($.extReplace('.html', '.inj.html'))
    .on('error', error)
    .pipe(gulp.dest(paths.dest))
    .pipe($.if(browserSync.active, browserSync.reload({ stream: true })));
});

gulp.task('watch:inject', 'Watch for changes in injected HTML', function(done) { // jshint ignore:line
  mkdirp(conf.paths.tmp + '/sass/', {}, function() {
    $.watch(_(paths.src).values().flatten().value(), function() {
      gulp.start('inject');
    });
  });
});
