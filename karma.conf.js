module.exports = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/cdn-libs/jquery.min.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'test/cdn-libs/jquery.magnific-popup.min.js',
      'test/cdn-libs/galleria.min.js',
      'src/js/packages/*.js',
      'src/js/components/**/*.js',
      'src/js/app.js',
      'test/spec/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/js/components/**/*.js': ['coverage']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress',  'coverage'],


    //  coverage reporter configuration
    coverageReporter: {
      type:'html',
      dir:'coverage'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
};
