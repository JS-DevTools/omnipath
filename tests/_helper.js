(function() {
  'use strict';

  /**
   * Helper methods for use in tests
   */
  global.helper = {
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
   * Asserts that an {@link OmniPath} object has the same properties and values as the expected object.
   * Also verifies that the object serializes and deserializes properly.
   *
   * @param {OmniPath} omniPath - The {@link OmniPath} object to check
   * @param {object} expected - The expected properties & values
   */
  function equals(omniPath, expected) {
    // Use default values for anything that wasn't specified
    var defaults = {
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

    // Check all property values
    Object.keys(defaults).forEach(function(key) {
      if (expected[key] === undefined) {
        expected[key] = defaults[key];
      }
      var actualValue = omniPath[key];
      var expectedValue = expected[key];
      expect(actualValue).to.deep.equal(expectedValue, '"' + key + '" does not match');
    });

    // Test JSON serialization
    var serialized = JSON.stringify(omniPath);
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
    if (userAgent.isBrowser && !expected) {
      // We're running in a web browser, so we can't test Node's native behavior
      return;
    }

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

})();

