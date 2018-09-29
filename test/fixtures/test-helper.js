(function () {
  'use strict';

  /**
   * Helper methods for use in tests
   */
  host.global.helper = {
    forEachTest: forEachTest,
    invoke: invoke,
    deepEqual: deepEqual,
    equalsNative: equalsNative,
    server: server,
    page: page,
    dirname: dirname,
    basename: basename,
    name: name,
    ext: ext
  };

  /**
   * Runs the given test function for each test object in {@link TestData} or {@link TestData2}.
   *
   * @param {TestData|TestData2} testData - Either {@link TestData} or {@link TestData2}
   * @param {function}            run      - The function to run for each test object in `testData`
   */
  function forEachTest (testData, run) {
    var testSuites = Object.keys(testData);

    testSuites.forEach(function (suite) {
      describe(suite, function () {
        var tests = Object.keys(testData[suite]);

        if (host.env.CI && host.karma && host.browser) {
          // We have too many tests, which causes SauceLabs browser tests to frequently fail.
          // So only run a subset of the tests to reduce the chance of failure.
          tests = tests.filter(function (test, index) {
            if (index % 25 === 0) {
              return test;
            }
          });
        }

        tests.forEach(function (test) {
          function runTest () {
            run(testData[suite][test]);
          }

          if (test === forEachTest._only) {
            it.only(test, runTest);
          }
          else {
            it(test, runTest);
          }
        });
      });
    });

    forEachTest._only = undefined;
  }

  forEachTest.only = function (testName) {
    forEachTest._only = testName;
    return forEachTest;
  };

  /**
   * Invokes the specified method on {@link OmniPath}, {@link OmniPosix}, {@link OmniWindows},
   * and {@link OmniUrl} using the given test data, and returns the results.
   *
   * @param   {string}  method  - The method to call
   * @param   {object}  test    - A test object from {@link TestData} or {@link TestData2}
   * @param   {*[]}     [args]  - Arguments to pass to the invoked method (defaults to test.p and test.options)
   * @returns {object}
   */
  function invoke (method, test, args) {
    if (arguments.length === 2) {
      if (Array.isArray(test.p)) {
        args = test.p.concat(test.options);
      }
      else {
        args = [test.p, test.options];
      }
    }

    // Invoke the static methods
    var s = {
      omni: result(OmniPath, method, args),
      posix: result(OmniPath.posix, method, args),
      win32: result(OmniPath.win32, method, args),
      url: result(OmniPath.url, method, args)
    };

    // Invoke the instance methods (unless we already have an instance)
    if (!(args[0] instanceof OmniPath)) {
      var first = args[0];
      var last = args[args.length - 1];
      var rest = method === 'parse' ? args : args.slice(1, args.length - 1);
      var i = {
        omni: result(new OmniPath(first, last), method, rest),
        posix: result(new OmniPath.Posix(first, last), method, rest),
        win32: result(new OmniPath.Windows(first, last), method, rest),
        url: result(new OmniPath.Url(first, last), method, rest)
      };

      // Compare static results to instance results
      expect(s.omni).to.deep.equal(i.omni, 'static omni !== instance omni');
      expect(s.url).to.deep.equal(i.url, 'static url !== instance url');

      if (method === 'resolve' && test.isUrl) {
        // `resolve` produces different results when a URL string (e.g. "http://server.com)
        // is explicitly parsed as a POSIX/Windows path, versus auto-detecting
      }
      else {
        expect(s.posix).to.deep.equal(i.posix, 'static posix !== instance posix');
        expect(s.win32).to.deep.equal(i.win32, 'static win32 !== instance win32');
      }
    }

    // Compare the OmniPath result to the platform-specific result
    if (test.isUrl) {
      expect(s.omni).to.deep.equal(s.url, 'omni !== url');
    }
    else if (test.p.isPosix || (test.p[0] && test.p[0].isPosix)) {
      expect(s.omni).to.deep.equal(s.posix, 'omni !== posix');
    }
    else if (test.p.isWindows || (test.p[0] && test.p[0].isWindows)) {
      expect(s.omni).to.deep.equal(s.win32, 'omni !== win32');
    }
    else if (host.browser) {
      expect(s.omni).to.deep.equal(s.url, 'omni !== url');
    }
    else if (host.os.windows) {
      expect(s.omni).to.deep.equal(s.win32, 'omni !== win32');
    }
    else if (host.os.mac || host.os.linux) {
      expect(s.omni).to.deep.equal(s.posix, 'omni !== posix');
    }

    return {
      omni: s.omni,
      posix: s.posix,
      win32: s.win32,
      url: s.url
    };
  }

  /**
   * Asserts that an object has the same properties and values as the expected object.
   * Also verifies that the object serializes and deserializes properly.
   *
   * @param {object} actual   - The object to check
   * @param {object} expected - The expected properties & values
   */
  function deepEqual (actual, expected) {
    // Compare the keys
    var actualKeys = Object.keys(actual).filter(function (key) {
      return key[0] !== '_';
    });
    var expectedKeys = Object.keys(expected);
    expect(actualKeys).to.have.same.members(expectedKeys);

    // Compare each property value
    expectedKeys.forEach(function (key) {
      var actualValue = actual[key];
      var expectedValue = expected[key];
      expect(actualValue).to.deep.equal(expectedValue, key + ' does not match');
    });

    // Test JSON serialization
    var serialized = JSON.stringify(actual);
    var deserialized = JSON.parse(serialized);
    expect(deserialized).to.deep.equal(expected);
  }

  /**
   * Asserts that an {@link OmniPath} object has the same properties and values as the given
   * native Node object.
   *
   * @param {OmniPath} omniPath - The {@link OmniPath} object to check
   * @param {object} expected - The expected properties & values
   */
  function equalsNative (omniPath, expected) {
    Object.keys(expected).forEach(function (key) {
      var actualValue = omniPath[key];
      var expectedValue = expected[key];

      if (!actualValue && expectedValue === null) {
        // Node's native url.parse() uses nulls instead of empty strings, and false booleans.
        // So ignore this difference.
        return;
      }

      expect(actualValue).to.deep.equal(expectedValue, '"' + key + '" does not match Node\'s native behavior');
    });
  }

  /**
   * Returns the current server URL (e.g. "http://localhost:1234")
   *
   * @returns {string}
   */
  function server () {
    return location.protocol + '//' + location.host;
  }

  /**
   * Returns the current page URL (e.g. "http://localhost:1234/omnipath/test/index.html")
   *
   * @returns {string}
   */
  function page () {
    return server() + location.pathname;
  }

  /**
   * Returns the current directory path (e.g. "/omnipath/test")
   *
   * @returns {string}
   */
  function dirname () {
    return location.pathname.substr(0, location.pathname.lastIndexOf('/'));
  }

  /**
   * Returns the current page's basename (e.g. "index.html")
   *
   * @returns {string}
   */
  function basename () {
    return location.pathname.substr(location.pathname.lastIndexOf('/') + 1);
  }

  /**
   * Returns the current page's name (e.g. "index")
   *
   * @returns {string}
   */
  function name () {
    var base = basename();
    return base.substr(0, base.lastIndexOf('.'));
  }

  /**
   * Returns the current page's extension (e.g. ".html")
   *
   * @returns {string}
   */
  function ext () {
    var base = basename();
    return base.substr(base.lastIndexOf('.'));
  }

  /**
   * Returns the value of the given property, or its return value if it's a function.
   *
   * @param   {object}  obj   - The object whose property value is returned
   * @param   {string}  prop  - The name of the property to return
   * @param   {*[]}     args  - Arguments to pass if `prop` is a function
   * @returns {*}
   */
  function result (obj, prop, args) {
    if (typeof (obj[prop]) === 'function') {
      return obj[prop].apply(obj, args);
    }
    else {
      return obj[prop];
    }
  }

}());
