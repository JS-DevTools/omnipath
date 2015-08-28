'use strict';

module.exports = OmniPosix;

var posix    = require('./node/path').posix,
    OmniPath = require('./index'),
    util     = require('./util');

/**
 * An {@link OmniPath} subclass that always treats paths as POSIX paths.
 *
 * @constructor
 */
function OmniPosix(p, options) {
  if (!(this instanceof OmniPosix)) {
    throw new TypeError('Use the "new" keyword when creating an instance of OmniPath.Posix');
  }

  this._path = posix;
  this.parse(p, options);
}

util.inherits(OmniPosix, OmniPath);
OmniPosix.sep = posix.sep;
OmniPosix.delimiter = posix.delimiter;

// Override the basic type checks
OmniPosix.isUrl = function() {return false;};
OmniPosix.isPosix = function() {return true;};
OmniPosix.isWindows = function() {return false;};

/**
 * Parses the given path as a POSIX path, and sets the corresponding properties of this {@link OmniPosix} object.
 *
 * @param   {string|Url|OmniPosix}  p         - The file path or URL to parse
 * @param   {PathOptions}           [options] - Options that determine how paths are parsed
 */
OmniPosix.prototype.parse = function(p, options) {
  p = OmniPath.prototype.parse.apply(this, arguments);
  if (typeof(p) === 'string') {
    var split = util.splitFile(p, this._options);
    var parsed = posix.parse(split.pathname);

    this.isFS = true;
    this.isPosix = true;
    this.isAbsolute = posix.isAbsolute(split.pathname);
    this.sep = posix.sep;
    this.delimiter = posix.delimiter;
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
 * Creates a clone of this {@link OmniPosix} object.
 *
 * @param {PathOptions} [options] - Options that determine how paths are parsed
 * @returns {OmniPosix}
 */
OmniPosix.prototype.clone = function(options) {
  return new OmniPosix(this, options);
};

/**
 * Returns the directory name of the path.
 *
 * @returns {string}
 */
OmniPosix.prototype.dirname = function() {
  return posix.dirname(this.pathname);
};

/**
 * Returns the last portion of the path.
 *
 * @param   {string} [ext] - The portion of the file extension to leave off
 * @returns {string}
 */
OmniPosix.prototype.basename = function(ext) {
  return posix.basename(this.base, ext);
};

/**
 * Joins all arguments together, and normalizes the resulting path.
 *
 * @param   {...string|...Url|...OmniPath}  p         - The paths (or segments) to join
 * @param   {PathOptions}                   [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPosix.join = function(p, options) {
  var parsed = util.fastParse(arguments, true, false, true);
  return posix.join.apply(posix, parsed.pathnames);
};
