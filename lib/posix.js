'use strict';

var path     = require('path'),
    url      = require('url'),
    OmniPath = require('./index'),
    util     = require('./util');

module.exports = PosixPath;

function PosixPath(p, options) {
  this.parse(p, options);
}

util.inherits(PosixPath, OmniPath);
PosixPath.sep = path.sep;
PosixPath.delimiter = path.delimiter;

/**
 * Returns the last portion of the path or URL
 *
 * @param   {string} [ext] - The portion of the file extension to leave off
 * @returns {string}
 */
PosixPath.prototype.basename = function(ext) {
  return path.basename(this.base, ext);
};

/**
 * Parses the given path as a POSIX path, and sets the corresponding properties of this {@link PosixPath} object.
 *
 * @param   {string|Url|PosixPath}  p         - The file path or URL to parse
 * @param   {PathOptions}           [options] - Options that determine how paths are parsed
 */
PosixPath.prototype.parse = function(p, options) {
  p = OmniPath.prototype.parse.apply(this, arguments);
  if (p) {
    var split = util.splitFile(p, options);
    var parsed = path.parse(split.pathname);

    this.isFS = true;
    this.isPosix = true;
    this.isAbsolute = path.isAbsolute(p);
    this.sep = path.sep;
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
