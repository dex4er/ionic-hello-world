// Karma configuration

var conf = require('./gulp/conf');

var path = require('path');
var bowerFiles = require('main-bower-files');
var glob = require('glob-array');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // frameworks: ['mocha', 'chai', 'chai-as-promised', 'sinon'],
    frameworks: ['sinon', 'chai-as-promised', 'chai', 'mocha', /*'angular-filesort'*/],


    // list of files / patterns to load in the browser
    files: bowerFiles(path.join('**', '*.js'), {includeDev: true}).concat(
      glob.sync([
        path.join(conf.paths.src, '**', '*.js'),
        '!' + path.join(conf.paths.bower, '**', '*')
      ])
    ),


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,


    // Will sort the narrowest possible subset of your files by selecting only files
    // that reference angular modules and sorting them in-place
    angularFilesort: {
      whitelist: [
        'app/**/*.js'
      ]
    }
  });
};