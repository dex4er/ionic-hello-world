'use strict';

var _ = require('lodash');
var cordovaCli = require('cordova');
var path = require('path');
var spawn = process.platform === 'win32' ? require('win-spawn') : require('child_process').spawn;

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    project: {
      // configurable paths
      app: 'app',
      scripts: 'scripts',
      styles: 'styles',
      images: 'images',
      test: 'test',
      dist: 'www'
    },

    // Environment Variables for Angular App
    // This creates an Angular Module that can be injected via ENV
    // Add any desired constants to the ENV objects below.
    ngconstant: {
      options: {
        space: '  ',
        wrap: '\'use strict\';\n\n {%= __ngModule %}',
        name: 'config',
        dest: '<%= project.app %>/<%= project.scripts %>/configuration.js'
      },
      development: {
        constants: {
          ENV: {
            name: 'development',
            apiEndpoint: 'http://dev.yoursite.com:10000/'
          }
        }
      },
      production: {
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'http://api.yoursite.com/'
          }
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep', 'newer:copy:app']
      },
      html: {
        files: ['<%= project.app %>/**/*.html'],
        tasks: ['ngtemplates:app']
      },
      css: {
        files: ['<%= project.app %>/<%= project.styles %>/*.css'],
        tasks: ['newer:copy:app']
      },
      js: {
        files: ['<%= project.app %>/<%= project.scripts %>/**/*.js'],
        tasks: ['newer:copy:app', 'newer:jshint:all', 'includeSource']
      },
      compass: {
        files: ['<%= project.app %>/<%= project.styles %>/**/*.{scss,sass}'],
        tasks: ['compass:app', 'autoprefixer', 'newer:copy:tmp']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['ngconstant:development', 'newer:copy:app']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: true,
        open: true
      },
      dist: {
        options: {
          port: 8100,
          base: '<%= project.dist %>'
        }
      },
      coverage: {
        options: {
          port: 9002,
          open: true,
          base: ['coverage']
        }
      },
      app: {
        options: {
          port: 8100,
          base: '<%= project.app %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= project.app %>/<%= project.scripts %>/**/*.js',
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.temp',
            '<%= project.dist %>/*',
            '!<%= project.dist %>/.git*'
          ]
        }]
      },
      app: '.temp'
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.temp/<%= project.styles %>/',
          src: '{,*/}*.css',
          dest: '.temp/<%= project.styles %>/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= project.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= project.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= project.app %>/<%= project.styles %>',
        cssDir: '<%= project.app %>/<%= project.styles %>',
        generatedImagesDir: '.temp/<%= project.images %>/generated',
        imagesDir: '<%= project.app %>/<%= project.images %>',
        javascriptsDir: '<%= project.app %>/<%= project.scripts %>',
        fontsDir: '<%= project.app %>/<%= project.styles %>/fonts',
        importPath: '<%= project.app %>/bower_components',
        httpImagesPath: '/<%= project.images %>',
        httpGeneratedImagesPath: '/<%= project.images %>/generated',
        httpFontsPath: '/<%= project.styles %>/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= project.dist %>/<%= project.images %>/generated'
        }
      },
      app: {
        options: {
          debugInfo: true
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= project.app %>/index.html',
      options: {
        dest: '<%= project.dist %>',
        staging: '.temp',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on the useminPrepare configuration
    usemin: {
      html: ['<%= project.dist %>/**/*.html'],
      css: ['<%= project.dist %>/<%= project.styles %>/**/*.css'],
      options: {
        assetsDirs: ['<%= project.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        //root: '<%= project.app %>',
        noRebase: true
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= project.dist %>',
          src: ['*.html', 'templates/**/*.html'],
          dest: '<%= project.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= project.app %>',
          dest: '<%= project.dist %>',
          src: [
            '<%= project.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '*.html',
            'styles/*.css'
          ]
        }, {
          expand: true,
          cwd: '.temp/<%= project.images %>',
          dest: '<%= project.dist %>/<%= project.images %>',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= project.app %>/<%= project.styles %>',
        dest: '.temp/<%= project.styles %>/',
        src: '{,*/}*.css'
      },
      fonts: {
        expand: true,
        cwd: 'app/bower_components/ionic/release/fonts/',
        dest: '<%= project.app %>/fonts/',
        src: '*'
      },
      vendor: {
        expand: true,
        cwd: '<%= project.app %>/vendor',
        dest: '.temp/<%= project.styles %>/',
        src: '{,*/}*.css'
      },
      app: {
        expand: true,
        cwd: '<%= project.app %>',
        dest: '<%= project.dist %>/',
        src: [
          '**/*',
          '!**/*.(scss,sass,css)',
          '!scripts/**/*.html',
        ]
      },
      tmp: {
        expand: true,
        cwd: '.temp',
        dest: '<%= project.dist %>/',
        src: '**/*'
      }
    },

    concurrent: {
      ionic: {
        tasks: [],
        options: {
          logConcurrentOutput: true
        }
      },
      app: [
        'compass:app',
        'ngtemplates:app',
        'copy:styles',
        'copy:vendor',
        'copy:fonts'
      ],
      test: [
        'compass',
        'ngtemplates:app',
        'copy:styles',
        'copy:vendor',
        'copy:fonts'
      ],
      dist: [
        'compass:dist',
        'copy:styles',
        'copy:vendor',
        'copy:fonts'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= project.dist %>/<%= project.styles %>/main.css': [
    //         '.temp/<%= project.styles %>/**/*.css',
    //         '<%= project.app %>/<%= project.styles %>/**/*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= project.dist %>/<%= project.scripts %>/scripts.js': [
    //         '<%= project.dist %>/<%= project.scripts %>/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    // These will override any config options in karma.conf.js if you create it.
    karma: {
      options: {
        configFile: 'karma.conf.js',
        browsers: ['PhantomJS'],
        preprocessors: {
          // Update this if you change the project config path
          '<%= project.app %>/<%= project.scripts %>/**/*.js': ['coverage']
        },
        coverageReporter: {
          reporters: [
            { type: 'html', dir: 'coverage/' },
            { type: 'text-summary' }
          ]
        }
      },
      unit: {
        singleRun: false,
        background: true,
        reporters: ['dots']
      },
      continuous: {
        singleRun: true,
        background: false,
        reporters: ['spec']
      }
    },

    // ngAnnotate tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection.
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.temp/concat/<%= project.scripts %>',
          src: '*.js',
          dest: '.temp/concat/<%= project.scripts %>'
        }]
      }
    },

    // autoinclude
    includeSource: {
      options: {
        basePath: 'app',
        baseUrl: '',
        templates: {
          html: {
            js: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" type="text/css" href="{filePath}" />',
          }
        }
      },
      build: {
        files: {
          '<%= project.app %>/index.html': '<%= project.app %>/index.html'
        }
      }
    },

    ngtemplates: {
      app: {
        cwd: '<%= project.app %>',
        src: 'scripts/**/*.html',
        dest: '<%= project.dist %>/templates/templates.js',
        options: {
          module: 'templates',
          prefix: '',
          standalone: true
        }
      },
      dist: {
        cwd: '<%= project.app %>',
        src: 'scripts/**/*.html',
        dest: '.temp/concat/<%= project.scripts %>/templates.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true, // Only if you don't use comment directives!
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
          module: 'templates',
          prefix: '',
          standalone: true
        }
      }
    },

    'selenium_standalone': {
      e2e: {
        seleniumVersion: '2.46.0',
        seleniumDownloadURL: 'http://selenium-release.storage.googleapis.com',
        drivers: {
          chrome: {
            version: '2.15',
            arch: process.arch,
            baseURL: 'http://chromedriver.storage.googleapis.com'
          },
          phantomjs: {
            version: '2.45',
            arch: process.arch,
            baseURL: 'http://selenium-release.storage.googleapis.com'
          }
        }
      }
    },

  });

  // Register tasks for all Cordova commands
  _.functions(cordovaCli).forEach(function (name) {
    grunt.registerTask(name, function () {
      this.args.unshift(name.replace('cordova:', ''));
      // Handle URL's being split up by Grunt because of `:` characters
      if (_.contains(this.args, 'http') || _.contains(this.args, 'https')) {
        this.args = this.args.slice(0, -2).concat(_.last(this.args, 2).join(':'));
      }
      var done = this.async();
      var exec = process.platform === 'win32' ? 'cordova.cmd' : 'cordova';
      var cmd = path.resolve('./node_modules/cordova/bin', exec);
      var flags = process.argv.splice(3);
      var child = spawn(cmd, this.args.concat(flags));
      child.stdout.on('data', function (data) {
        grunt.log.writeln(data);
      });
      child.stderr.on('data', function (data) {
        grunt.log.error(data);
      });
      child.on('close', function (code) {
        code = code ? false : true;
        done(code);
      });
    });
  });

  // Since Apache Ripple serves assets directly out of their respective platform
  // directories, we watch all registered files and then copy all un-built assets
  // over to <%= project.dist %>/. Last step is running cordova prepare so we can refresh the ripple
  // browser tab to see the changes. Technically ripple runs `cordova prepare` on browser
  // refreshes, but at this time you would need to re-run the emulator to see changes.
  grunt.registerTask('ripple', ['wiredep', 'newer:copy:app', 'ripple-emulator']);
  grunt.registerTask('ripple-emulator', function () {
    grunt.config.set('watch', {
      all: {
        files: _.flatten(_.pluck(grunt.config.get('watch'), 'files')),
        tasks: ['newer:copy:app', 'prepare']
      }
    });

    var cmd = path.resolve('./node_modules/ripple-emulator/bin', 'ripple');
    var child = spawn(cmd, ['emulate']);
    child.stdout.on('data', function (data) {
      grunt.log.writeln(data);
    });
    child.stderr.on('data', function (data) {
      grunt.log.error(data);
    });
    process.on('exit', function (code) {
      child.kill('SIGINT');
      process.exit(code);
    });

    return grunt.task.run(['watch']);
  });

  // Dynamically configure `karma` target of `watch` task so that
  // we don't have to run the karma test server as part of `grunt serve`
  grunt.registerTask('watch:karma', function () {
    var karma = {
      files: ['<%= project.app %>/<%= project.scripts %>/**/*.js', '<%= project.test %>/unit/**/*.js'],
      tasks: ['newer:jshint:test', 'karma:unit:run']
    };
    grunt.config.set('watch', karma);
    return grunt.task.run(['watch']);
  });

  // Wrap ionic-cli commands
  grunt.registerTask('ionic', function() {
    var done = this.async();
    var script = path.resolve('./node_modules/ionic/bin/', 'ionic');
    var flags = process.argv.splice(3);
    var child = spawn(script, this.args.concat(flags), { stdio: 'inherit' });
    child.on('close', function (code) {
      code = code ? false : true;
      done(code);
    });
  });

  grunt.registerTask('concurrent-ionic', function() {
    var done = this.async();
    var script = path.resolve('./node_modules/ionic/bin/', 'ionic');
    var flags = process.argv.splice(3);
    if (this.args[0] === 'serve') {
      flags = flags.concat(['--consolelogs', '--serverlogs']);
    }
    var child = spawn(script, this.args.concat(flags));
    child.stdout.on('data', function (data) {
      grunt.log.write(data);
    });
    child.stderr.on('data', function (data) {
      grunt.log.error(data);
    });
    child.on('close', function (code) {
      code = code ? false : true;
      done(code);
    });
  });

  // Wrap wdio commands
  grunt.registerTask('wdio', function() {
    var done = this.async();
    var script = path.resolve('./node_modules/webdriverio/bin/', 'wdio');
    var flags = process.argv.splice(3);
    var child = spawn(script, this.args.concat(flags), { stdio: 'inherit' });
    child.on('close', function (code) {
      code = code ? false : true;
      done(code);
    });
  });

  grunt.registerTask('e2e', [
    'selenium_standalone:e2e:install',
    'selenium_standalone:e2e:start',
    'wiredep',
    'init',
    'connect:dist',
    'wdio',
    'selenium_standalone:e2e:stop'
  ]);

  grunt.registerTask('unit:single', [
    'wiredep',
    'clean',
    'concurrent:test',
    'autoprefixer',
    'karma:continuous',
  ]);

  grunt.registerTask('unit', [
    'unit:single',
    'karma:unit:start',
    'watch:karma'
  ]);

  grunt.registerTask('serve', function (target) {
    if (target === 'compress') {
      return grunt.task.run(['compress', 'ionic:serve']);
    }

    grunt.config('concurrent.ionic.tasks', ['concurrent-ionic:serve', 'watch']);
    grunt.task.run(['wiredep', 'init', 'concurrent:ionic']);
  });
  grunt.registerTask('emulate', function() {
    grunt.config('concurrent.ionic.tasks', ['concurrent-ionic:emulate:' + this.args.join()]);
    return grunt.task.run(['init', 'concurrent:ionic']);
  });
  grunt.registerTask('run', function() {
    grunt.config('concurrent.ionic.tasks', ['concurrent-ionic:run:' + this.args.join()]);
    return grunt.task.run(['init', 'concurrent:ionic']);
  });
  grunt.registerTask('build', function() {
    return grunt.task.run(['init', 'ionic:build:' + this.args.join()]);
  });
  grunt.registerTask('init', [
    'clean',
    'ngconstant:development',
    'wiredep',
    'includeSource',
    'concurrent:app',
    'autoprefixer',
    'newer:copy:app',
    'newer:copy:tmp'
  ]);

  grunt.registerTask('compress', [
    'clean',
    'ngconstant:production',
    'wiredep',
    'includeSource',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'ngtemplates:dist',
    'cssmin',
    'uglify',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('coverage',
    ['karma:continuous',
    'connect:coverage:keepalive'
  ]);

  grunt.registerTask('default', [
    'wiredep',
    'newer:jshint',
    'karma:continuous',
    'compress'
  ]);
};
