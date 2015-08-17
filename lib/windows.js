'use strict';

var win32      = require('path').win32 || require('./path').win32,
    OmniPath   = require('./index'),
    util       = require('./util'),
    uncPattern = /^[\\\/]{2}[^\\\/]+([\\\/]+[^\\\/]+)?/;

module.exports = WindowsPath;

function WindowsPath(p, options) {
  this.parse(p, options);
}

util.inherits(WindowsPath, OmniPath);
WindowsPath.sep = win32.sep;
WindowsPath.delimiter = win32.delimiter;

/**
 * Returns the last portion of the path or URL
 *
 * @param   {string} [ext] - The portion of the file extension to leave off
 * @returns {string}
 */
WindowsPath.prototype.basename = function(ext) {
  return win32.basename(this.base, ext);
};

/**
 * Parses the given path as a WINDOWS path, and sets the corresponding properties of this {@link WindowsPath} object.
 *
 * @param   {string|Url|WindowsPath}  p         - The file path or URL to parse
 * @param   {PathOptions}             [options] - Options that determine how paths are parsed
 */
WindowsPath.prototype.parse = function(p, options) {
  p = OmniPath.prototype.parse.apply(this, arguments);
  if (p) {
    var split = util.splitFile(p, options);
    var parsed = win32.parse(split.pathname);

    this.isFS = true;
    this.isWindows = true;
    this.isAbsolute = win32.isAbsolute(split.pathname);
    this.isUnc = uncPattern.test(split.pathname);
    this.sep = win32.sep;
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
