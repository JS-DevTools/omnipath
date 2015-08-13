(function() {
  'use strict';

  /**
   * Helper methods for use in tests
   */
  global.helper = {
    server: server,
    page: page,
    dirname: dirname,
    basename: basename,
    name: name,
    ext: ext,
    inspect: inspect
  };

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
   * Inspects the given {@link OmniPath} object, to ensure that it matches the the expected object,
   * as well as Node's native behaviors.  Also verifies that the object serializes and deserializes
   * properly.
   *
   * @param {OmniPath} omniPath - The {@link OmniPath} object to check
   * @param {object} expected - The expected properties & values
   */
  function inspect(omniPath, expected) {
    expect(omniPath).to.be.an.instanceOf(OmniPath);

    // Test each expected property
    equals(omniPath, expected);

    // Test JSON serialization
    var serialized = JSON.stringify(omniPath);
    var deserialized = JSON.parse(serialized);
    expect(deserialized).to.deep.equal(expected);

    // Make sure OmniPath matches the behavior of Node's native "path" and "url" modules
    if (userAgent.isNode) {
      if (omniPath.isFile && (omniPath.query || omniPath.hash)) {
        // Skip this check, since Node doesn't support file paths with queries or hashes
        return;
      }
      var href = omniPath.format();
      var parsed = omniPath.isFile ? require('path').parse(href) : require('url').parse(href, true);
      equals(omniPath, parsed, true);
    }
  }

  /**
   * Asserts that a {@link OmniPath} object has the same values as the expected object.
   *
   * @param {OmniPath} omniPath - The {@link OmniPath} object to check
   * @param {object} expected - The expected properties & values
   * @param {boolean} [isNative] - Whether the expected object is Node's native behavior
   */
  function equals(omniPath, expected, isNative) {
    Object.keys(expected).forEach(function(key) {
      var actualValue = omniPath[key];
      var expectedValue = expected[key];

      if (isNative && actualValue === '' && expectedValue === null) {
        // OmniPath uses empty strings instead of nulls,
        // so ignore this difference
        return;
      }

      expect(actualValue).to.deep.equal(expectedValue,
        '"' + key + '" does not match' +
        (isNative ? ' Node\'s native behavior' : '')
      );
    });
  }

})();

