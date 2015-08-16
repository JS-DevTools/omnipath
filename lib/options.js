'use strict';

/**
 * Options that determine how paths and URLs are parsed.
 *
 * @type {{allowFileQuery: boolean, allowFileHash: boolean}}
 * @name PathOptions
 */
module.exports = {
  /**
   * Determines whether a question mark ("?") in a file path should be interpreted
   * as the start of a query string, like URLs, or as part of the file path.
   * By default, it is treated as part of the file path.
   *
   * @type {boolean}
   */
  allowFileQuery: false,

  /**
   * Determines whether a hash ("#") in a file path should be interpreted
   * as the start of a hash, like URLs, or as part of the file path.
   * By default, it is treated as part of the file path.
   *
   * @type {boolean}
   */
  allowFileHash: false
};
