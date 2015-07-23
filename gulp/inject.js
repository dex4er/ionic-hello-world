'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var bowerFiles = require('main-bower-files');
var extReplace = require('gulp-ext-replace');

gulp.task('inject', 'Inject styles and scripts into HTML', function (done) {
  var paths = {
    css: [
      path.join(conf.paths.src, '**', '*.css'),
      path.join(conf.paths.tmp, 'sass', '**', '*.css'),
      '!' + path.join(conf.paths.bower, '**', '*')
    ],
    js: [
      path.join(conf.paths.src, '**', '*.js'),
      '!' + path.join(conf.paths.bower, '**', '*'),
      '!' + path.join('**', '*.spec.js'),
      '!' + path.join('**', '*.mock.js')
    ],
    html: [
      path.join(conf.paths.src, '*.inj.html')
    ],
    dest: path.join(conf.paths.tmp, 'inject')
  };

  var ignorePath = [
    conf.paths.src + '/',
    conf.paths.tmp + '/'
  ];

  gulp.src(paths.html)
    .pipe(inject(gulp.src(paths.css, {read: false}), {ignorePath: ignorePath, addRootSlash: false}))
    .pipe(inject(gulp.src(paths.js).pipe(angularFilesort()), {ignorePath: ignorePath, addRootSlash: false}))
    .pipe(inject(gulp.src(bowerFiles({includeDev: true}), {read: false}), {ignorePath: ignorePath, addRootSlash: false, name: 'bower'}))
    .pipe(extReplace('.html', '.inj.html'))
    .pipe(gulp.dest(paths.dest))
    .on('end', done);
});
