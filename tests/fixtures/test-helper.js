(function() {
  'use strict';

  /**
   * Helper methods for use in tests
   */
  global.helper = {
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
   * Runs the given test function for each test object in {@link TestPaths} or {@link TestPairs}.
   *
   * @param {TestPaths|TestPairs} testData - Either {@link TestPaths} or {@link TestPairs}
   * @param {function}            run      - The function to run for each test object in `testData`
   */
  function forEachTest(testData, run) {
    // Prettify the `fn.toString()` output in Mocha
    var toString = function() {
      return run.toString();
    };

    Object.keys(testData).forEach(function(suite) {
      describe(suite, function() {
        Object.keys(testData[suite]).forEach(function(test) {
          function runTest() {
            run(testData[suite][test]);
          }
          runTest.toString = toString;
          it(test, runTest);
        });
      });
    });
  }

  /**
   * Invokes the specified method on {@link OmniPath}, {@link OmniPosix}, {@link OmniWindows},
   * and {@link OmniUrl} using the given test data, and returns the results.
   *
   * @param   {string}  method  - The method to call
   * @param   {object}  test    - A test object from {@link TestPaths} or {@link TestPairs}
   * @param   {...*}    [args]  - Arguments to pass to the invoked method (defaults to test.p and test.options)
   * @returns {object}
   */
  function invoke(method, test, args) {
    if (arguments.length === 2) {
      if (Array.isArray(test.p)) {
        args = test.p.concat(test.options);
      }
      else {
        args = [test.p, test.options];
      }
    }
    else {
      args = Array.prototype.slice.call(arguments, 2);
    }

    var omni = result(OmniPath, method, args);
    var posix = result(OmniPath.posix, method, args);
    var win32 = result(OmniPath.win32, method, args);
    var url = result(OmniPath.url, method, args);

    // Compare the OmniPath result to the platform-specific result
    if (test.isUrl) {
      expect(omni).to.deep.equal(url);
    }
    else if (test.p.isPosix) {
      expect(omni).to.deep.equal(posix);
    }
    else if (test.p.isWindows) {
      expect(omni).to.deep.equal(win32);
    }
    else if (userAgent.isPosix) {
      expect(omni).to.deep.equal(posix);
    }
    else if (userAgent.isWindows) {
      expect(omni).to.deep.equal(win32);
    }
    else if (userAgent.isBrowser) {
      expect(omni).to.deep.equal(url);
    }

    return {
      omni: omni,
      posix: posix,
      win32: win32,
      url: url
    };
  }

  /**
   * Asserts that an object has the same properties and values as the expected object.
   * Also verifies that the object serializes and deserializes properly.
   *
   * @param {object} actual   - The object to check
   * @param {object} expected - The expected properties & values
   */
  function deepEqual(actual, expected) {
    // Compare the keys
    var actualKeys = Object.keys(actual).filter(function(key) {
      return key[0] !== '_';
    });
    var expectedKeys = Object.keys(expected);
    expect(actualKeys).to.have.same.members(expectedKeys);

    // Compare each property value
    expectedKeys.forEach(function(key) {
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
  function equalsNative(omniPath, expected) {
    Object.keys(expected).forEach(function(key) {
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
  function server() {
    return location.protocol + '//' + location.host;
  }

  /**
   * Returns the current page URL (e.g. "http://localhost:1234/omnipath/tests/index.html")
   *
   * @returns {string}
   */
  function page() {
    return server() + location.pathname;
  }

  /**
   * Returns the current directory path (e.g. "/omnipath/tests")
   *
   * @returns {string}
   */
  function dirname() {
    return location.pathname.substr(0, location.pathname.lastIndexOf('/'));
  }

  /**
   * Returns the current page's basename (e.g. "index.html")
   *
   * @returns {string}
   */
  function basename() {
    return location.pathname.substr(location.pathname.lastIndexOf('/') + 1);
  }

  /**
   * Returns the current page's name (e.g. "index")
   *
   * @returns {string}
   */
  function name() {
    var base = basename();
    return base.substr(0, base.lastIndexOf('.'));
  }

  /**
   * Returns the current page's extension (e.g. ".html")
   *
   * @returns {string}
   */
  function ext() {
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
  function result(obj, prop, args) {
    if (typeof(obj[prop]) === 'function') {
      return obj[prop].apply(obj, args);
    }
    else {
      return obj[prop];
    }
  }

})();

