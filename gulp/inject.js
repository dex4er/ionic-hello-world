'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var bowerFiles = require('main-bower-files');
var extReplace = require('gulp-ext-replace');

gulp.task('inject', 'Inject styles and scripts into HTML', ['sass'], function (done) {
  var paths = {
    css: [
      path.join(conf.paths.src, '**/*.css'),
      path.join(conf.paths.tmp, '**/*.css'),
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

  var dirs = [
    conf.paths.src + '/',
    conf.paths.tmp + '/'
  ];

  gulp.src(paths.html)
    .pipe(inject(gulp.src(paths.css, {read: false}), {ignorePath: dirs, addRootSlash: false}))
    .pipe(inject(gulp.src(paths.js).pipe(angularFilesort()), {ignorePath: dirs, addRootSlash: false}))
    .pipe(inject(gulp.src(bowerFiles({includeDev: true}), {read: false}), {ignorePath: dirs, addRootSlash: false, name: 'bower'}))
    .pipe(extReplace('.html', '.inj.html'))
    .pipe(gulp.dest(conf.paths.tmp))
    .on('end', done);
});
