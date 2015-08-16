'use strict';

var path     = require('path').posix || require('path'),
    url      = require('url'),
    OmniPath = require('./index'),
    util     = require('./util');

module.exports = UrlPath;

function UrlPath(p, options) {
  this.parse(p, options);
}

util.inherits(UrlPath, OmniPath);
UrlPath.sep = '/';

/**
 * Parses the given path as a URL, and sets the corresponding properties of this {@link UrlPath} object.
 *
 * @param   {string|Url|UrlPath}  p         - The file path or URL to parse
 * @param   {PathOptions}         [options] - Options that determine how paths are parsed
 */
UrlPath.prototype.parse = function(p, options) {
  p = OmniPath.prototype.parse.apply(this, arguments);
  if (p) {
    var parsed = url.parse(p, true);
    var split = splitPathname(parsed.pathname);

    this.isUrl = true;
    this.isAbsolute = !!parsed.protocol || !!parsed.host || path.isAbsolute(parsed.pathname);
    this.sep = '/';
    this.href = parsed.href || '';
    this.path = parsed.path || '';
    this.pathname = parsed.pathname || '';
    this.root = split.root;
    this.dir = split.dir;
    this.base = split.base;
    this.name = split.name;
    this.ext = split.ext;
    this.search = parsed.search || '';
    this.query = parsed.query || {};
    this.hash = parsed.hash || '';
  }
};

/**
 * Splits the given pathname into root, dir, base, name, and ext.
 *
 * @param {string} p - The pathname to split
 * @returns {object}
 */
function splitPathname(p) {
  // If the `path.parse()` method exists, then just use it
  if (typeof(path.parse) === 'function') {
    return path.parse(p);
  }

  // `path.parse()` doesn't exist, so we have to do it manually
  var root = '', dir = '', base = '', ext = '', name = '';
  if (p) {
    root = p[0] === '/' ? '/' : '';
    dir = path.dirname(p);
    if (dir === '.') {
      // Difference between `path.dirname()` and `path.parse()`
      dir = '';
    }
    base = path.basename(p);
    ext = path.extname(p);
    name = path.basename(p, ext);
  }

  return {
    root: root,
    dir: dir,
    base: base,
    name: name,
    ext: ext
  };
}
