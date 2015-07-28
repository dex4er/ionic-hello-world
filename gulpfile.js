var gulp = require('gulp');
var help = require('gulp-help');
var requireDir = require('require-dir');

help(gulp);

global.isProd = false;

requireDir('./gulp');
