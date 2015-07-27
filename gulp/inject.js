'use strict';

var conf = require('./conf');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var _ = require('lodash');

var path = require('path');
var mkdirp = require('mkdirp');
var bowerFiles = require('main-bower-files');

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

gulp.task('inject', 'Inject styles and scripts into HTML', function (done) {
  var ignorePath = [
    conf.paths.src + '/',
    path.join(conf.paths.tmp, 'sass') + '/'
  ];

  gulp.src(paths.html)
    .pipe($.inject(gulp.src(paths.css, {read: false}), {ignorePath: ignorePath, addRootSlash: false}))
    .pipe($.inject(gulp.src(paths.js).pipe($.angularFilesort()), {ignorePath: ignorePath, addRootSlash: false}))
    .pipe($.inject(gulp.src(bowerFiles({includeDev: true}), {read: false}), {ignorePath: ignorePath, addRootSlash: false, name: 'bower'}))
    .pipe($.extReplace('.html', '.inj.html'))
    .pipe(gulp.dest(paths.dest))
    .on('end', function() {
      gulp.start('browser:reload');
      done();
    });
});

gulp.task('watch:inject', 'Watch for changes in injected HTML', function(done) { // jshint ignore:line
  mkdirp(path.join(conf.paths.tmp, 'sass'));
  $.watch(_.flatten([paths.css, paths.html, paths.js]), $.batch(function(events, done) {
    events
      .on('data', function() {
        gulp.start('inject', done);
      })
      .on('end', done);
  }));
});
