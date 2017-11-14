'use strict';

module.exports = OmniWindows;

var win32 = require('./node/path').win32,
    OmniPath = require('./index'),
    util = require('./util'),
    uncPattern = /^[\\\/]{2}([^\\\/]+)[\\\/]+[^\\\/]+/, // This matches Node 0.12.7
    splitUncPattern = /^\/+([^\/]+)(.*)/;

/**
 * An {@link OmniPath} subclass that always treats paths as Windows paths.
 *
 * @constructor
 */
function OmniWindows (p, options) {
  if (!(this instanceof OmniWindows)) {
    throw new TypeError('Use the "new" keyword when creating an instance of OmniPath.Windows');
  }

  this._path = win32;
  this.parse(p, options);
}

util.inherits(OmniWindows, OmniPath);
OmniWindows.sep = win32.sep;
OmniWindows.delimiter = win32.delimiter;

// Override the basic type checks
OmniWindows.isUrl = function () { return false; };
OmniWindows.isPosix = function () { return false; };
OmniWindows.isWindows = function () { return true; };

/**
 * Parses the given path as a WINDOWS path, and sets the corresponding properties of this {@link OmniWindows} object.
 *
 * @param   {string|Url|OmniWindows}  p         - The file path or URL to parse
 * @param   {PathOptions}             [options] - Options that determine how paths are parsed
 */
OmniWindows.prototype.parse = function (p, options) {
  p = OmniPath.prototype.parse.apply(this, arguments);
  if (typeof (p) === 'string') {
    var split = util.parsePath(p, this._options);
    var parsed = win32.parse(split.pathname);
    var unc = uncPattern.exec(split.pathname);

    this.isFS = true;
    this.isWindows = true;
    this.isAbsolute = win32.isAbsolute(split.pathname);
    this.isUnc = !!unc;
    this.sep = win32.sep;
    this.delimiter = win32.delimiter;
    this.href = p;
    this.path = split.pathname + split.search;
    this.pathname = split.pathname;
    this.root = parsed.root;
    this.dir = parsed.dir;
    this.base = parsed.base;
    this.name = parsed.name;
    this.ext = parsed.ext;
    this.search = split.search;
    this.query = split.query;
    this.hash = split.hash;

    if (this.isUnc) {
      // Set the UNC host
      this.host = this.hostname = unc[1];
    }
  }
  return this;
};

/**
 * Returns the formatted path or URL string.
 *
 * @returns {string}
 */
OmniWindows.prototype.format = function () {
  if (this.isUnc && (this.host || this.hostname) && !this.dir && !this.base) {
    // Special case for UNCs with only a host
    return '\\\\' + (this.hostname || this.host);
  }
  return OmniPath.prototype.format.apply(this, arguments);
};

/**
 * Returns a formatted URL string.
 *
 * @returns {string}
 */
OmniWindows.prototype.toUrlString = function () {
  var clone = this.clone();

  // Convert Windows path separators to forward slashes
  clone.pathname = clone.pathname.replace(util.backslashPattern, '/');

  if (this.isUnc) {
    var split = splitUncPattern.exec(clone.pathname);
    if (split) {
      clone.hostname = split[1];
      clone.pathname = split[2] || '/';
    }
  }

  return OmniPath.prototype.toUrlString.apply(clone, arguments);
};

/**
 * Joins all arguments together, and normalizes the resulting path.
 *
 * @param   {...string|...Url|...OmniPath}  p         - The paths (or segments) to join
 * @param   {PathOptions}                   [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniWindows.join = function (p, options) {
  return OmniPath.prototype.join.apply({ _path: win32, href: '' }, arguments);
};

/**
 * Resolves `to` to an absolute path.
 *
 * @param   {string|Url|OmniPath} from    - The file path or URL to resolve from.
 * @param   {string|Url|OmniPath} to      - The file path or URL to resolve, relative to `from`.
 * @param   {PathOptions}         options - Options that determine how paths are parsed
 * @returns {string}
 */
OmniWindows.resolve = function (from, to, options) {
  return OmniPath.prototype.resolve.apply({ _path: win32, href: '' }, arguments);
};

/**
 * Returns the current working directory, formatted as a Windows path.
 *
 * @returns {string}
 */
OmniWindows.cwd = function () {
  var cwd = OmniPath.cwd();
  return win32.normalize(cwd);
};
