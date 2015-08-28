'use strict';

module.exports = OmniWindows;

var win32            = require('./node/path').win32,
    OmniPath         = require('./index'),
    util             = require('./util'),
    uncPattern       = /^[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+/, // This matches Node 0.12.7
    splitUncPattern  = /^\/+([^\/]+)(.*)/;

/**
 * An {@link OmniPath} subclass that always treats paths as Windows paths.
 *
 * @constructor
 */
function OmniWindows(p, options) {
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
OmniWindows.isUrl = function() {return false;};
OmniWindows.isPosix = function() {return false;};
OmniWindows.isWindows = function() {return true;};

/**
 * Parses the given path as a WINDOWS path, and sets the corresponding properties of this {@link OmniWindows} object.
 *
 * @param   {string|Url|OmniWindows}  p         - The file path or URL to parse
 * @param   {PathOptions}             [options] - Options that determine how paths are parsed
 */
OmniWindows.prototype.parse = function(p, options) {
  p = OmniPath.prototype.parse.apply(this, arguments);
  if (typeof(p) === 'string') {
    var split = util.splitFile(p, this._options);
    var parsed = win32.parse(split.pathname);

    this.isFS = true;
    this.isWindows = true;
    this.isAbsolute = win32.isAbsolute(split.pathname);
    this.isUnc = uncPattern.test(split.pathname);
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
  }
};

/**
 * Creates a clone of this {@link OmniWindows} object.
 *
 * @param {PathOptions} [options] - Options that determine how paths are parsed
 * @returns {OmniWindows}
 */
OmniWindows.prototype.clone = function(options) {
  return new OmniWindows(this, options);
};

/**
 * Returns the directory name of the path.
 *
 * @returns {string}
 */
OmniWindows.prototype.dirname = function() {
  return win32.dirname(this.pathname);
};

/**
 * Returns the last portion of the path.
 *
 * @param   {string} [ext] - The portion of the file extension to leave off
 * @returns {string}
 */
OmniWindows.prototype.basename = function(ext) {
  return win32.basename(this.base, ext);
};

/**
 * Returns a formatted URL string.
 *
 * @returns {string}
 */
OmniWindows.prototype.toUrlString = function() {
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
OmniWindows.join = function(p, options) {
  var parsed = util.fastParse(arguments, true, false, true);
  return win32.join.apply(win32, parsed.pathnames);
};

