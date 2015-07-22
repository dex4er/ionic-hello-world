'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var bowerFiles = require('main-bower-files');
var ext_replace = require('gulp-ext-replace');

gulp.task('inject', 'Inject styles and scripts into html', [], function () {
  var injectStyles = gulp.src([
    path.join(conf.path.src, 'components/**/*.css'),
    path.join(conf.path.src, 'styles/*.css'),
  ], { read: false });

  var injectScripts = gulp.src([
    path.join(conf.path.src, 'components/**/*.js'),
    path.join('!' + conf.path.src, '**/*.spec.js'),
    path.join('!' + conf.path.src, '**/*.mock.js')
  ]).pipe(angularFilesort());

  return gulp.src(path.join(conf.path.src, '*.src.html'))
    .pipe(inject(injectStyles, {relative: true}))
    .pipe(inject(injectScripts, {relative: true}))
    .pipe(inject(gulp.src(bowerFiles({includeDev:true}), {read: false}), {relative: true, name: 'bower'}))
    .pipe(ext_replace('.html', '.src.html'))
    .pipe(gulp.dest(conf.path.src));
});
