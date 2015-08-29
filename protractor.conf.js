// An example configuration file.
exports.config = {

  // browserName: 'phantomjs',
  //
  // /*
  //  * Can be used to specify the phantomjs binary path.
  //  * This can generally be ommitted if you installed phantomjs globally.
  //  */
  // 'phantomjs.binary.path': require('phantomjs').path,
  //
  // /*
  //  * Command line args to pass to ghostdriver, phantomjs's browser driver.
  //  * See https://github.com/detro/ghostdriver#faq
  //  */
  // 'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG'],
  chromeDriver: require('chromedriver').path,
  
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',

  seleniumAddress: 'http://0.0.0.0:4444/wd/hub',

  baseUrl: 'http://localhost:4000/cobertura-do-ato-16-de-agosto/',

  // Capabilities to be passed to the webdriver instance.
  multiCapabilities: [
    {
      browserName: 'chrome',
      specs: [
        'test/e2e/desktop/**/*Spec.js'
      ]
    },
    // mobile
    {
      browserName: 'chrome',
      chromeOptions: {
        // set the userAgent to be iPhone
        args: ['--user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53"']
      },
      specs: [
        'test/e2e/mobile/**/*Spec.js'
      ]
    }
  ],

  maxSessions: 1,

  onPrepare: function() {

      global.dv = browser.driver;
      global.protractor = protractor;
      global.browser = browser;
      global.$ = browser.$;
      global.$$ = browser.$$;
      global.element = browser.element;

      browser.ignoreSynchronization = true;
  },

  allScriptsTimeout: 11000,

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};

if (process.env.SNAP_CI) {
  exports.config.chromeDriver = '/usr/local/bin/chromedriver';
}
