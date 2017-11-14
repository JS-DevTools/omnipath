'use strict';

module.exports = OmniUrl;

var posix = require('./node/path').posix,
    url = require('./node/url'),
    OmniPath = require('./omni-path'),
    util = require('./util'),
    slashesPattern = /^\/*/,
    looseProtocolPattern = /^[a-z0-9.+-]+:/i;

/**
 * An {@link OmniPath} subclass that always treats paths as URLs.
 *
 * @constructor
 */
function OmniUrl (p, options) {
  if (!(this instanceof OmniUrl)) {
    throw new TypeError('Use the "new" keyword when creating an instance of OmniPath.Url');
  }

  this._path = posix;
  this.parse(p, options);
}

util.inherits(OmniUrl, OmniPath);
OmniUrl.sep = posix.sep;

// Override the basic type checks
OmniUrl.isUrl = function () { return true; };
OmniUrl.isPosix = function () { return false; };
OmniUrl.isWindows = function () { return false; };

/**
 * Parses the given path as a URL, and sets the corresponding properties of this {@link OmniUrl} object.
 *
 * @param   {string|Url|OmniUrl}  p         - The file path or URL to parse
 * @param   {PathOptions}         [options] - Options that determine how paths are parsed
 */
OmniUrl.prototype.parse = function (p, options) {
  p = OmniPath.prototype.parse.apply(this, arguments);
  if (typeof (p) === 'string') {
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
  return this;
};

/**
 * Normalizes the URL, resolving any "." and ".." segments, eliminating redundant slashes,
 * and standardizing slashes.
 *
 * @returns {string}
 */
OmniUrl.prototype.normalize = function () {
  var formatted = this.pathname || this._getFormattedPathname();
  var normalized = posix.normalize(formatted);

  var pathnameIsBlank = false;
  if (normalized === '.') {
    // Special case for URLs without a pathname
    normalized = '';
    pathnameIsBlank = true;
  }

  var clone = this.clone();
  clone.pathname = normalized;
  formatted = url.format(clone);

  if (formatted === '' && pathnameIsBlank) {
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
OmniUrl.prototype.format = function () {
  var clone = this.clone();
  clone.pathname = this._getFormattedPathname();
  return url.format(clone);
};

/**
 * Returns a formatted URL string.
 *
 * @returns {string}
 */
OmniUrl.prototype.toUrlString = function () {
  return url.format(this);
};

/**
 * Joins all arguments together, and normalizes the resulting path.
 *
 * @param   {...string|...Url|...OmniPath}  p         - The paths (or segments) to join
 * @param   {PathOptions}                   [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniUrl.join = function (p, options) {
  var parsed = util.fastParse(arguments, true);
  var joined = parsed.pathnames[0];

  for (var i = 1; i < parsed.pathnames.length; i++) {
    var segment = parsed.pathnames[i];
    if (segment) {
      // Ignore segments that are blank or separators
      if (segment === posix.sep || segment === '\\') {
        // If the LAST segment is a separator, then it matters
        if (i === parsed.pathnames.length - 1) {
          joined += posix.sep;
        }
      }
      else if (util.endsWithAnySeparator(joined) || util.startsWithAnySeparator(segment)) {
        joined += segment;
      }
      else {
        joined += posix.sep + segment;
      }
    }
  }

  // If the last segment has a query/hash, then append it
  var lastSearch = parsed.searches[parsed.last];
  var lastHash = parsed.hashes[parsed.last];
  joined += lastSearch + lastHash;

  var omniUrl = new OmniUrl(joined);
  return omniUrl.normalize();
};

/**
 * Joins all arguments to this path, and normalizes the resulting path.
 *
 * @param   {...string|...Url|...OmniPath}  p         - The paths (or segments) to join
 * @param   {PathOptions}                   [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniUrl.prototype.join = function (p, options) {
  return OmniUrl.join.apply(OmniUrl, [this].concat(Array.prototype.slice.call(arguments)));
};

/**
 * Resolves `to` to an absolute path.
 *
 * @param   {string|Url|OmniPath} from    - The file path or URL to resolve from.
 * @param   {string|Url|OmniPath} to      - The file path or URL to resolve, relative to `from`.
 * @param   {PathOptions}         options - Options that determine how paths are parsed
 * @returns {string}
 */
OmniUrl.resolve = function (from, to, options) {
  var args = util.getArgs(arguments);
  var paths = args.paths;
  to = util.toString(paths[paths.length - 1]);

  for (var i = paths.length - 2; i >= 0; i--) {
    from = util.toString(paths[i]);
    to = url.resolve(from, to);

    if (looseProtocolPattern.test(to)) {
      // We have an absolute path, so no need to continue processing
      return to;
    }
  }

  return url.resolve(OmniPath.cwd(), to);
};

/**
 * Resolves `to` to an absolute path. Like Node's {@link path.resolve} or {@link url.resolve}.
 *
 * @param   {...string|...Url|...OmniPath}  to      - The path(s) to resolve, relative to this one.
 * @param   {PathOptions}                   options - Options that determine how paths are parsed
 * @returns {string}
 */
OmniUrl.prototype.resolve = function (to, options) {
  return OmniUrl.resolve.apply(OmniUrl, [this].concat(Array.prototype.slice.call(arguments)));
};

/**
 * Returns the current working directory, formatted as a URL.
 *
 * @returns {string}
 */
OmniUrl.cwd = function () {
  var cwd = OmniPath.cwd();
  return OmniUrl.normalize(cwd);
};

/**
 * Returns the formatted pathname by combining {@link OmniUrl#dir} and {@link OmniUrl#base}.
 *
 * @returns {string}
 * @private
 */
OmniUrl.prototype._getFormattedPathname = function () {
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
    if (util.endsWithAnySeparator(oldPathname) && !util.endsWithAnySeparator(pathname)) {
      pathname += posix.sep;
    }
  }

  return pathname;
};
