'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var changed = require('gulp-changed');

gulp.task('copy', ['sass', 'inject'], function(done){
  gulp.src([path.join(conf.path.src, '**'), '!**/*.src.html', '!**/*.scss'])
    .pipe(changed(conf.path.dest))
    .pipe(gulp.dest(conf.path.dest))
    .on('end', done);
});
