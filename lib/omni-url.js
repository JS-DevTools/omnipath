'use strict';

var posix          = require('./node/path').posix,
    url            = require('./node/url'),
    OmniPath       = require('./omni-path'),
    util           = require('./util'),
    slashesPattern = /^\/*/;

module.exports = OmniUrl;

/**
 * An {@link OmniPath} subclass that always treats paths as URLs.
 *
 * @constructor
 */
function OmniUrl(p, options) {
  this._path = posix;
  this.parse(p, options);
}

util.inherits(OmniUrl, OmniPath);
OmniUrl.sep = '/';

/**
 * Parses the given path as a URL, and sets the corresponding properties of this {@link OmniUrl} object.
 *
 * @param   {string|Url|OmniUrl}  p         - The file path or URL to parse
 * @param   {PathOptions}         [options] - Options that determine how paths are parsed
 */
OmniUrl.prototype.parse = function(p, options) {
  p = OmniPath.prototype.parse.apply(this, arguments);
  if (typeof(p) === 'string') {
    var parsedUrl = url.parse(p, true);
    var parsedPath = posix.parse(parsedUrl.pathname || '');

    this.isUrl = true;
    this.isAbsolute = !!parsedUrl.protocol || !!parsedUrl.host || posix.isAbsolute(parsedUrl.pathname || '');
    this.sep = '/';
    this.href = parsedUrl.href || '';
    this.protocol = parsedUrl.protocol || '';
    this.slashes = parsedUrl.slashes || false;
    this.auth = parsedUrl.auth || '';
    this.host = parsedUrl.host || '';
    this.hostname = parsedUrl.hostname || '';
    this.port = parsedUrl.port || '';
    this.path = parsedUrl.path || '';
    this.pathname = parsedUrl.pathname || '';
    this.root = parsedPath.root;
    this.dir = parsedPath.dir;
    this.base = parsedPath.base;
    this.name = parsedPath.name;
    this.ext = parsedPath.ext;
    this.search = parsedUrl.search || '';
    this.query = parsedUrl.query || {};
    this.hash = parsedUrl.hash || '';
  }
};

/**
 * Creates a clone of this {@link OmniUrl} object.
 *
 * @param {PathOptions} [options] - Options that determine how paths are parsed
 * @returns {OmniUrl}
 */
OmniUrl.prototype.clone = function(options) {
  return new OmniUrl(this, options);
};

/**
 * Returns the directory name of the path.
 *
 * @returns {string}
 */
OmniUrl.prototype.dirname = function() {
  return posix.dirname(this.pathname);
};

/**
 * Returns the last portion of the path.
 *
 * @param   {string} [ext] - The portion of the file extension to leave off
 * @returns {string}
 */
OmniUrl.prototype.basename = function(ext) {
  return posix.basename(this.base, ext);
};

/**
 * Returns the formatted path or URL string.
 *
 * @returns {string}
 */
OmniUrl.prototype.format = function() {
  var clone = this;

  if (this.dir || this.base) {
    // Build the "pathname" from the "dir" and "base",
    // for consistency with OmniPath.Windows and OmniPath.Posix.
    clone = this.clone();
    if (clone.dir === clone.sep) {
      // Special case for root paths, to match `url.format()` behavior
      var slashes = slashesPattern.exec(clone.pathname) || [''];
      clone.pathname = slashes[0] + clone.base;
    }
    else {
      clone.pathname = posix.format(clone);
    }

    // Maintain any trailing slash on the pathname, for consistency with Node's "url" module
    if (this._endsWithSeparator(this.pathname) && !clone._endsWithSeparator(clone.pathname)) {
      clone.pathname += posix.sep;
    }
  }

  return url.format(clone);
};

/**
 * Returns a formatted URL string.
 *
 * @returns {string}
 */
OmniUrl.prototype.toUrlString = function() {
  return url.format(this);
};
