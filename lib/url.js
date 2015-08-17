'use strict';

var posix    = require('path').posix || require('./path').posix,
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
    var parsedUrl = url.parse(p, true);
    var parsedPath = posix.parse(parsedUrl.pathname);

    this.isUrl = true;
    this.isAbsolute = !!parsedUrl.protocol || !!parsedUrl.host || posix.isAbsolute(parsedUrl.pathname);
    this.sep = '/';
    this.href = parsedUrl.href || '';
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
