'use strict';

var posix    = require('./node/path').posix,
    OmniPath = require('./index'),
    util     = require('./util');

module.exports = OmniPosix;

/**
 * An {@link OmniPath} subclass that always treats paths as POSIX paths.
 *
 * @constructor
 */
function OmniPosix(p, options) {
  this.parse(p, options);
}

util.inherits(OmniPosix, OmniPath);
OmniPosix.sep = posix.sep;
OmniPosix.delimiter = posix.delimiter;

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
 * Returns the last portion of the path or URL
 *
 * @param   {string} [ext] - The portion of the file extension to leave off
 * @returns {string}
 */
OmniPosix.prototype.basename = function(ext) {
  return posix.basename(this.base, ext);
};

/**
 * Parses the given path as a POSIX path, and sets the corresponding properties of this {@link OmniPosix} object.
 *
 * @param   {string|Url|OmniPosix}  p         - The file path or URL to parse
 * @param   {PathOptions}           [options] - Options that determine how paths are parsed
 */
OmniPosix.prototype.parse = function(p, options) {
  p = OmniPath.prototype.parse.apply(this, arguments);
  if (typeof(p) === 'string') {
    var split = util.splitFile(p, options);
    var parsed = posix.parse(split.pathname);

    this.isFS = true;
    this.isPosix = true;
    this.isAbsolute = posix.isAbsolute(split.pathname);
    this.sep = posix.sep;
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
