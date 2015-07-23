'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var bowerFiles = require('main-bower-files');
var ext_replace = require('gulp-ext-replace');

gulp.task('inject', 'Inject styles and scripts into HTML', [], function (done) {
  var paths = {
    css: [
      path.join(conf.paths.src, '**/*.css'),
      '!' + path.join(conf.paths.bower, '**/*')
    ],
    js: [
      path.join(conf.paths.src, '**/*.js'),
      '!' + path.join(conf.paths.bower, '**/*'),
      '!**/*.spec.js',
      '!**/*.mock.js'
    ],
    html: [
      path.join(conf.paths.src, '*.inj.html')
    ]
  };

  gulp.src(paths.html)
    .pipe(inject(gulp.src(paths.css, {read: false}), {relative: true}))
    .pipe(inject(gulp.src(paths.js).pipe(angularFilesort()), {relative: true}))
    .pipe(inject(gulp.src(bowerFiles({includeDev: true}), {read: false}), {relative: true, name: 'bower'}))
    .pipe(ext_replace('.html', '.inj.html'))
    .pipe(gulp.dest(conf.paths.tmp))
    .on('end', done);
});
