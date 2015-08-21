// Karma config
// https://karma-runner.github.io/0.12/config/configuration-file.html
'use strict';

var baseConfig = {
  frameworks: ['mocha'],
  reporters: ['mocha'],
  files: [
    // Third-Party Libraries
    'www/bower_components/chai/chai.js',
    'www/bower_components/sinon-js/sinon.js',

    // OmniPath
    'dist/omnipath.test.js',

    // Unit Tests
    'tests/**/_*.js',
    'tests/**/*.spec.js'
  ]
};

module.exports = function(config) {
  // Honor the KARMA environment variable, if it exists
  if (process.env.KARMA && process.env.KARMA !== 'true') {
    process.exit();
    return;
  }

  configureCodeCoverage(baseConfig);
  configureBrowsers(baseConfig);
  configureSauceLabs(baseConfig);
  config.set(baseConfig);
};

/**
 * Configures the code-coverage reporter
 */
function configureCodeCoverage(config) {
  config.reporters.push('coverage');
  config.coverageReporter = {
    reporters: [
      {type: 'text-summary'},
      {type: 'lcov'}
    ]
  };
}

/**
 * Configures the browsers for the current platform
 */
function configureBrowsers(config) {
  var isMac     = /^darwin/.test(process.platform),
      isWindows = /^win/.test(process.platform),
      isLinux   = !(isMac || isWindows);

  if (isMac) {
    config.browsers = ['PhantomJS', 'Firefox', 'Chrome', 'Safari'];
  }
  else if (isLinux) {
    config.browsers = ['PhantomJS', 'Firefox'];
  }
  else if (isWindows) {
    config.browsers = ['PhantomJS', 'Firefox', 'Chrome', 'Safari', 'IE9', 'IE10', 'IE'];
    config.customLaunchers = {
      // NOTE: IE 6, 7, 8 are not supported by Chai
      IE9: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE9'
      },
      IE10: {
        base: 'IE',
        'x-ua-compatible': 'IE=EmulateIE10'
      }
    };
  }
}

/**
 * Configures Sauce Labs emulated browsers/devices.
 * https://github.com/karma-runner/karma-sauce-launcher
 */
function configureSauceLabs(config) {
  var username = process.env.SAUCE_USERNAME;
  var accessKey = process.env.SAUCE_ACCESS_KEY;

  // Only run Sauce Labs if we have the username & access key.
  if (username && accessKey) {
    var project = require('./package.json');
    var testName = project.name + ' v' + project.version;
    var build = testName + ' Build #' + process.env.TRAVIS_JOB_NUMBER + ' @ ' + new Date();

    config.sauceLabs = {
      build: build,
      testName: testName,
      tags: [project.name],
      recordVideo: true,
      recordScreenshots: true
    };

    config.customLaunchers = {
      'IE-9': {
        base: 'SauceLabs',
        platform: 'Windows 7',
        browserName: 'internet explorer',
        version: '9'
      },
      'IE-10': {
        base: 'SauceLabs',
        platform: 'Windows 7',
        browserName: 'internet explorer',
        version: '10'
      },
      'IE-11': {
        base: 'SauceLabs',
        platform: 'Windows 7',
        browserName: 'internet explorer',
        version: '11'
      },
      'Chrome-Latest': {
        base: 'SauceLabs',
        platform: 'Windows 7',
        browserName: 'chrome'
      },
      'Firefox-Latest': {
        base: 'SauceLabs',
        platform: 'Windows 7',
        browserName: 'firefox'
      },
      'Opera-Latest': {
        base: 'SauceLabs',
        platform: 'Windows 7',
        browserName: 'opera'
      },
      'Safari-Latest': {
        base: 'SauceLabs',
        platform: 'OS X 10.10',
        browserName: 'safari'
      },
      'iOS-6': {
        base: 'SauceLabs',
        platform: 'OS X 10.10',
        browserName: 'iphone',
        version: '6'
      },
      'iOS-8': {
        base: 'SauceLabs',
        platform: 'OS X 10.10',
        browserName: 'iphone',
        version: '8'
      },
      'Android-4-4': {
        base: 'SauceLabs',
        platform: 'Linux',
        browserName: 'android',
        version: '4.4'
      },
      'Android-5': {
        base: 'SauceLabs',
        platform: 'Linux',
        browserName: 'android',
        version: '5'
      }
    };

    config.reporters.push('saucelabs');
    config.browsers = config.browsers.concat(Object.keys(config.customLaunchers));

    //// Sauce Connect sometimes hangs (https://github.com/karma-runner/karma-sauce-launcher/issues/14)
    //// So terminate the process after a few minutes
    //setTimeout(function() {
    //  console.warn('\nWARNING: Sauce Connect appears to have hung. Forcefully terminating.\n');
    //  process.exit();
    //}, 1000 * 60 * 8); // 8 minutes
  }
}
