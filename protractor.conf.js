var USER_AGENT = {
  DESKTOP: 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  MOBILE: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53'
};

// An example configuration file.
exports.config = {

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
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  }
};

if (process.env.SNAP_CI) {

  exports.config['phantomjs.binary.path'] = require('phantomjs').path;

  exports.config.multiCapabilities = [
    // desktop
    {
      'browserName': 'phantomjs',
      'phantomjs.binary.path': require('phantomjs').path,
      'phantomjs.page.settings.userAgent': USER_AGENT.DESKTOP,
      specs: [
        'test/e2e/desktop/**/*Spec.js'
      ]
    },
    // mobile
    {
      'browserName': 'phantomjs',
      'phantomjs.binary.path': require('phantomjs').path,
      'phantomjs.page.settings.userAgent': USER_AGENT.MOBILE,
      specs: [
        'test/e2e/mobile/**/*Spec.js'
      ]
    }
  ];
}
