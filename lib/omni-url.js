'use strict';

var posix    = require('./node/path').posix,
    url      = require('./node/url'),
    OmniPath = require('./omni-path'),
    util     = require('./util');

module.exports = OmniUrl;

/**
 * An {@link OmniPath} subclass that always treats paths as URLs.
 *
 * @constructor
 */
function OmniUrl(p, options) {
  this.parse(p, options);
}

util.inherits(OmniUrl, OmniPath);
OmniUrl.sep = '/';

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
    this.sep = '/';
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
