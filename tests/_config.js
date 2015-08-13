/**
 * This script configures Mocha, Chai, Sinon, etc.
 * It also exposes everything as globals, to allow tests to run in Node and in browsers.
 *
 * Why not use Browserify instead of globals?
 *  - To make sure OmniPath works properly when Node and CommonJS are not available
 *  - Some of our devDependencies have separate packages packages for Node vs. Browser (e.g. Mocha, Sinon)
 *  - This reduces redundant boilerplate code in the .spec files
 */
(function() {
  'use strict';

  if (typeof(window) === 'object') {
    // Configure Mocha
    mocha.setup('bdd');
    mocha.fullTrace();
    mocha.checkLeaks();
    mocha.globals([]);

    // Expose Browser globals
    window.global = window;
    window.expect = chai.expect;
    window.userAgent = {
      isNode: false,
      isWindows: false,
      isPosix: false,
      isBrowser: true
    };
  }
  else {
    // Expose Node globals
    global.OmniPath = require('../');
    global.expect = require('chai').expect;
    global.sinon = require('sinon');

    global.userAgent = {
      isNode: true,
      isWindows: process.platform.substr(0, 3) === 'win',
      isPosix: process.platform.substr(0, 3) !== 'win',
      isBrowser: false
    }
  }

  // Set global settings for all tests
  beforeEach(function() {
    this.currentTest.timeout(2000);
    this.currentTest.slow(100);
  });

})();
