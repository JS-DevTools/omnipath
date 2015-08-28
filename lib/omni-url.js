'use strict';

module.exports = OmniUrl;

var posix                = require('./node/path').posix,
    url                  = require('./node/url'),
    OmniPath             = require('./omni-path'),
    util                 = require('./util'),
    slashesPattern       = /^\/*/,
    looseProtocolPattern = /^[^:]+:\/?\/?/;

/**
 * An {@link OmniPath} subclass that always treats paths as URLs.
 *
 * @constructor
 */
function OmniUrl(p, options) {
  if (!(this instanceof OmniUrl)) {
    throw new TypeError('Use the "new" keyword when creating an instance of OmniPath.Url');
  }

  this._path = posix;
  this.parse(p, options);
}

util.inherits(OmniUrl, OmniPath);
OmniUrl.sep = posix.sep;

// Override the basic type checks
OmniUrl.isUrl = function() {return true;};
OmniUrl.isPosix = function() {return false;};
OmniUrl.isWindows = function() {return false;};

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
    this.sep = posix.sep;
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
 * Normalizes the URL, resolving any "." and ".." segments, eliminating redundant slashes,
 * and standardizing slashes.
 *
 * @returns {string}
 */
OmniUrl.prototype.normalize = function() {
  var formatted = this.pathname || this._getFormattedPathname();
  var normalized = posix.normalize(formatted);

  var pathnameIsBlank = false;
  if (normalized === '.') {
    // Special case for URLs without a pathname
    normalized = posix.sep;
    pathnameIsBlank = true;
  }

  var clone = this.clone();
  clone.pathname = normalized;
  formatted = url.format(clone);

  if (formatted === posix.sep && pathnameIsBlank) {
    // Special case for URLs that resolve to cwd ("", ".", "././.", etc.)
    return '.';
  }
  else {
    return formatted;
  }
};

/**
 * Returns the formatted path or URL string.
 *
 * @returns {string}
 */
OmniUrl.prototype.format = function() {
  var clone = this.clone();
  clone.pathname = this._getFormattedPathname();
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

/**
 * Joins all arguments together, and normalizes the resulting path.
 *
 * @param   {...string|...Url|...OmniPath}  p         - The paths (or segments) to join
 * @param   {PathOptions}                   [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniUrl.join = function(p, options) {
  var parsed = util.fastParse(arguments, true, true);
  var pathnames = parsed.pathnames;

  // Replace backslashes with forward slashes (normalization)
  for (var i = 0; i < pathnames.length; i++) {
    pathnames[i] = pathnames[i].replace(util.backslashPattern, posix.sep);
  }

  // Extract and lowercase the protocol (normalization)
  var protocol = looseProtocolPattern.exec(pathnames[0]) || '';
  if (protocol) {
    protocol = protocol[0].toLowerCase();
    pathnames[0] = pathnames[0].substr(protocol.length);
    if (protocol.indexOf(posix.sep) === -1) {
      protocol += posix.sep;
    }
  }

  var joined = posix.join.apply(posix, parsed.pathnames);
  if (joined === '.' && protocol) {
    // Special case for URLs with only a protocol
    return protocol;
  }
  else if (joined.indexOf(posix.sep) === -1 && protocol.indexOf('//') !== -1) {
    // Special case for URLs with only a host
    return protocol + joined + posix.sep;
  }
  else {
    return protocol + joined;
  }
};

/**
 * Returns the formatted pathname by combining {@link OmniUrl#dir} and {@link OmniUrl#base}.
 *
 * @returns {string}
 * @private
 */
OmniUrl.prototype._getFormattedPathname = function() {
  var pathname = this.pathname;

  if (this.dir || this.base) {
    var oldPathname = pathname;

    if (this.dir === this.sep) {
      // Special case for root paths, to match `url.format()` behavior
      var slashes = slashesPattern.exec(this.pathname) || [''];
      pathname = slashes[0] + this.base;
    }
    else {
      pathname = posix.format(this);
    }

    // Maintain any trailing slash on the pathname, for consistency with Node's "url" module
    if (this._endsWithSeparator(oldPathname) && !this._endsWithSeparator(pathname)) {
      pathname += posix.sep;
    }
  }

  return pathname;
};
