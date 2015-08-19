(function() {
  'use strict';

  /**
   * Helper methods for use in tests
   */
  global.helper = {
    invoke: invoke,
    equals: equals,
    equalsNative: equalsNative,
    server: server,
    page: page,
    dirname: dirname,
    basename: basename,
    name: name,
    ext: ext
  };

  /**
   * Invokes the specified method with the given arguments
   * on {@link OmniPath}, {@link OmniPosix}, {@link OmniWindows}, and {@link OmniUrl},
   * and returns their results.
   *
   * @param   {string}  method  - The method to call
   * @param   {...*}    args    - The arguments to pass to the method
   * @result  {object}
   */
  function invoke(method, args) {
    args = Array.prototype.slice.call(arguments, 1);
    var omni = OmniPath[method].apply(OmniPath, args);
    var posix = OmniPath.posix[method].apply(OmniPath, args);
    var win32 = OmniPath.win32[method].apply(OmniPath, args);
    var url = OmniPath.url[method].apply(OmniPath, args);

    // Compare the OmniPath result to the platform-specific result
    if (omni.isUrl) {
      expect(omni).to.deep.equal(url);
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
  function equals(actual, expected) {
    expected = defaults(expected);

    ['posix', 'win32', 'url'].forEach(function(platform) {
      var actualObj = actual[platform];
      var expectedObj = expected[platform];

      Object.keys(expectedObj).forEach(function(key) {
        var actualValue = actualObj[key];
        var expectedValue = expectedObj[key];
        expect(actualValue).to.deep.equal(expectedValue,
          platform + '.' + key + ' does not match');
      });
    });

    // Test JSON serialization
    expected.omni = actual.omni.toJSON();
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
   * Sets any undefined properties of the given object to their default values.
   *
   * @param   {object} obj - The object to be populated
   * @returns {object}
   */
  function defaults(obj) {
    if (obj.omni) {
      obj.omni = defaults(obj.omni);
    }
    if (obj.posix) {
      obj.posix = defaults(obj.posix);
    }
    if (obj.win32) {
      obj.win32 = defaults(obj.win32);
    }
    if (obj.url) {
      obj.url = defaults(obj.url);
    }
    if (!(obj.omni || obj.posix || obj.win32 || obj.url)) {
      var values = {
        isUrl: false,
        isFS: false,
        isPosix: false,
        isWindows: false,
        isUnc: false,
        isAbsolute: false,
        sep: '',
        href: '',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '',
        pathname: '',
        root: '',
        dir: '',
        base: '',
        name: '',
        ext: '',
        search: '',
        query: {},
        hash: ''
      };

      Object.keys(values).forEach(function(key) {
        if (obj[key] === undefined) {
          obj[key] = values[key];
        }
      });
    }

    return obj;
  }

})();

