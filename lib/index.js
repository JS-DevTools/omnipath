/**!
 * OmniPath v1.0.0-beta.4
 *
 * @link https://github.com/BigstickCarpet/omnipath
 * @license MIT
 */
'use strict';

var path            = require('path'),
    util            = require('./util'),
    protocolPattern = /^[a-z0-9.+-]+:\/\//i;

module.exports = OmniPath;

/**
 * A parsed URL or file path. This object has the same properties as a parsed URL (via {@link url.parse},
 * plus the properties of a parsed file path (via {@link posix.parse}.
 *
 * Parsed URL:  {@link https://nodejs.org/api/url.html#url_url}
 * Parsed Path: {@link https://nodejs.org/api/path.html#path_path_parse_pathstring}
 *
 * @param {string|Url|OmniPath} p         - The file path or URL to parse.
 * @param {PathOptions}         [options] - Options that determine how paths are parsed
 * @constructor
 */
function OmniPath(p, options) {
  p = util.toString(p);

  // If the path starts with a protocol, then treat it as a URL,
  // regardless of the runtime environment, and even if the path
  // could also be a valid filesystem path for the environment.
  if (protocolPattern.test(p)) {
    return new OmniPath.Url(p, options);
  }

  // Parse the path based on the runtime environment
  if (process.browser) {
    return new OmniPath.Url(p, options);
  }
  else if (process.platform === 'win32') {
    return new OmniPath.Windows(p, options);
  }
  else {
    return new OmniPath.Posix(p, options);
  }
}

// Create shortcut methods for all OmniPath properties
util.props.forEach(function(prop) {
  if (OmniPath[prop] === undefined) {
    OmniPath[prop] = function(p, options) {
      var Class = this;
      var omniPath = new Class(p, options);
      return omniPath[prop];
    };
  }
});

// Create `dirname()` and `extname()` methods, for consistency with Node's "path" module.
// These methods are just aliases for the `dir()` and `ext()` shortcut methods created above.
OmniPath.dirname = OmniPath.dir;
OmniPath.extname = OmniPath.ext;

/**
 * Returns the last portion of the given path or URL. Similar to Node's {@link posix.basename}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_basename_p_ext}
 *
 * @param   {string|Url|OmniPath}  p          - The file path or URL to parse
 * @param   {string}               [ext]      - The portion of the file extension to leave off
 * @param   {PathOptions}          [options]  - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.basename = function(p, ext, options) {
  if (typeof(ext) === 'object') {
    options = ext;
    ext = undefined;
  }
  var Class = this;
  var omniPath = new Class(p, options);
  return omniPath.basename(ext);
};

///**
// * Joins all arguments together, and normalizes the resulting path.
// *
// * @param   {...string|...Url|...OmniPath}  p         - The paths (or path parts) to join
// * @param   {PathOptions}                   [options] - Options that determine how paths are parsed
// * @returns {string}
// */
//OmniPath.join = function(p, options) {
//  var paths = [];
//  var result = '';
//
//  // Check if the last parameter is an options object
//  options = arguments[arguments.length - 1];
//  if (options && typeof(options) === 'object' && !(options instanceof url.Url) && !(options instanceof OmniPath)) {
//    // The last parameter is the options object
//    paths = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
//  }
//  else {
//    // There is no options argument.
//    paths = Array.prototype.slice.call(arguments);
//  }
//
//  paths.forEach(function(p) {
//    if (typeof(p) === 'string') {
//    }
//    else if (p instanceof url.Url) {
//    }
//    else if (p instanceof OmniPath) {
//    }
//    else {
//      throw new Error('Expected a file path or URL, but got ' + typeof(p) + ' ' + p);
//    }
//  });
//};
//
///**
// * Joins all arguments to this path, and normalizes the resulting path.
// *
// * @param   {...string|...Url|...OmniPath} p - The paths (or path parts) to join to this path
// * @returns {string}
// */
//OmniPath.prototype.join = function(p) {
//  return OmniPath.join.apply(OmniPath, [this].concat(arguments));
//};
//
///**
// * Resolves `to` to an absolute path. Similar to Node's {@link path.resolve} or {@link url.resolve}.
// *
// * path.resolve: {@link https://nodejs.org/api/path.html#path_path_resolve_from_to}
// * url.resolve {@link https://nodejs.org/api/url.html#url_url_resolve_from_to}
// *
// * @param   {string|Url|OmniPath}  from
// * - The file path or URL to resolve from. If the path/url is relative,
// * then it will be resolved relative to {@link OmniPath#cwd}.
// *
// * @param   {string|Url|OmniPath}  to
// * - The file path or URL to resolve, relative to `from`.
// *
// * @param   {PathOptions} options
// * - Options that determine how paths are parsed
// *
// * @returns {string}
// */
//OmniPath.resolve = function(from, to, options) {
//  return new OmniPath(from, options).resolve(to, options);
//};
//
///**
// * Resolves the given path or url, relative to this one. Similar to Node's {@link path.resolve}
// * or {@link url.resolve}.
// *
// * path.resolve:  {@link https://nodejs.org/api/path.html#path_path_resolve_from_to}
// * url.resolve    {@link https://nodejs.org/api/url.html#url_url_resolve_from_to}
// *
// * @param   {string|Url|OmniPath}   relative  - The file path or URL to resolve, relative to this one
// * @param   {PathOptions}           options   - Options that determine how paths are parsed
// * @returns {string}
// */
//OmniPath.prototype.resolve = function(relative, options) {
//  var resolved;
//  options = options || this._options;
//
//  if (relative instanceof OmniPath) {
//    // OmniPath objects are always absolute, so just return it as-is
//    return relative.format();
//  }
//
//  if (relative instanceof url.Url) {
//    // Urls can be absolute or relative, so treat it like a string
//    relative = relative.format();
//  }
//
//  if (this.isUrl || isAbsoluteUrl(relative)) {
//    // The result will be a URL if `relative` is any of:
//    //  - an absolute url (e.g. "http://www.google.com")
//    //  - a relative url  (e.g. "../path/file.html")
//    //  - an absolute POSIX path (e.g. "/path/file")
//    //  - a relative POSIX path (e.g. "path/file")
//    //  - a relative Windows path (e.g. "path\\file.txt")
//    //
//    // The result will be a file path if `relative` is:
//    //  - an absolute Windows path (e.g. "C:\\path\\file.txt")
//    resolved = url.resolve(this.format(), relative);
//  }
//  else {
//    // The result will always be a file path
//    var parsed = parseRelativeFile({}, this, relative, options);
//    resolved = OmniPath.prototype.format.call(parsed);
//  }
//
//  return resolved;
//};
//
///**
// * Returns the given path or URL as a formatted string. Similar to Node's {@link path.format} or {@link url.format}.
// *
// * path.format: {@link https://nodejs.org/api/path.html#path_path_format_pathobject}
// * url.format:  {@link https://nodejs.org/api/url.html#url_url_format_urlobj}
// *
// * @param   {string|Url|OmniPath}   p         - The file path or URL to format
// * @param   {PathOptions}           [options] - Options that determine how paths are parsed
// * @returns {string}
// */
//OmniPath.format = function(p, options) {
//  return new OmniPath(p, options).format();
//};
//
///**
// * Returns the formatted path or URL string. Similar to Node's {@link path.format} or {@link url.format}.
// *
// * path.format: {@link https://nodejs.org/api/path.html#path_path_format_pathobject}
// * url.format:  {@link https://nodejs.org/api/url.html#url_url_format_urlobj}
// *
// * @returns {string}
// */
//OmniPath.prototype.format = function() {
//  var clone = copy(this, {});
//
//  // Build the `pathname` property
//  if (clone.dir || clone.base || clone.name || clone.ext) {
//    clone.base = clone.base || (clone.name + clone.ext) || '';
//    if (startsWithSeparator(clone.base)) {
//      clone.base = clone.base.substr(1);
//    }
//    clone.dir = clone.dir || '';
//    var trailingSlash = endsWithSeparator(clone.pathname);
//    if (endsWithSeparator(clone.dir)) {
//      clone.pathname = clone.dir + clone.base;
//    }
//    else {
//      clone.pathname = clone.dir + clone.sep + clone.base;
//    }
//    if (trailingSlash && !endsWithSeparator(clone.pathname)) {
//      clone.pathname += clone.sep;
//    }
//  }
//
//  if (clone.isUrl) {
//    // Format as a URL
//    return url.format(clone);
//  }
//
//  if (clone.search) {
//    if (clone.search[0] !== '?') {
//      clone.search = '?' + clone.search;
//    }
//  }
//  else if (clone.query) {
//    // Build the `search` property from the `query` property
//    clone.search = '?' + querystring.stringify(clone.query);
//  }
//
//  // If the file has a hash, then format the `hash` property
//  if (clone.hash && clone.hash[0] !== '#') {
//    clone.hash = '#' + clone.hash;
//  }
//
//  // Format as a file path
//  return path.normalize(clone.pathname) + clone.search + clone.hash;
//};
//
//OmniPath.normalize = function(p, options) {
//
//};
//
//OmniPath.prototype.normalize = function() {
//
//};
//
///**
// * Returns the formatted path or URL string, by calling {@link OmniPath#format}.
// *
// * @type {Function}
// */
//OmniPath.prototype.toString = OmniPath.prototype.format;
//
///**
// * Returns the primitive string value, by calling {@link OmniPath#format}.
// *
// * @type {Function}
// */
//OmniPath.prototype.valueOf = OmniPath.prototype.format;
//
///**
// * Returns the given path or URL as a {@link Url} object. File paths will be returned as "file://" URLs.
// *
// * @param   {string|Url|OmniPath}   p         - The file path or URL to format
// * @param   {PathOptions}           [options] - Options that determine how paths are parsed
// * @returns {Url}
// */
//OmniPath.toUrl = function(p, options) {
//  return new OmniPath(p, options).toUrl();
//};
//
///**
// * Returns the path or URL as a {@link Url} object. If {@link OmniPath#isFS} is true,
// * then the returned value will be a "file://" URL.
// *
// * @returns {Url}
// */
//OmniPath.prototype.toUrl = function() {
//  return url.parse(this.toUrlString(), true);
//};
//
///**
// * Returns the given path or URL to a formatted URL string. File paths will be returned as "file://" URLs.
// *
// * @param   {string|Url|OmniPath}   p         - The file path or URL to format
// * @param   {PathOptions}           [options] - Options that determine how paths are parsed
// * @returns {string}
// */
//OmniPath.toUrlString = function(p, options) {
//  return new OmniPath(p, options).toUrlString();
//};
//
///**
// * Returns a formatted URL string. If {@link OmniPath#isFS} is true, then the returned value
// * will be a "file://" URL.
// *
// * @returns {string}
// */
//OmniPath.prototype.toUrlString = function() {
//  if (this.isUrl) {
//    return url.format(this);
//  }
//  else {
//    var pathname = this.pathname;
//
//    // Normalize path separators (e.g. Windows backslashes)
//    if (this.sep !== '/') {
//      pathname = pathname.replace(new RegExp('\\' + this.sep, 'g'), '/');
//    }
//
//    return url.format({
//      protocol: 'file:',
//      slashes: true,
//      pathname: pathname,
//      search: this.search,
//      hash: this.hash
//    });
//  }
//};

/**
 * Returns the current working directory as a {@link OmniPath} object. If running in a web browser,
 * then the working directory is based on the current page's URL.
 *
 * The returned path always includes a trailing slash, which ensures that it behaves properly
 * with methods like {@link url.resolve}.
 *
 * @returns {OmniPath}
 */
OmniPath.cwd = function() {
  var cwd;

  if (process.browser) {
    var page = window.location.pathname;
    var lastSlash = page.lastIndexOf('/');
    cwd = page.substr(0, lastSlash + 1);
  }
  else {
    cwd = process.cwd() + path.sep;
  }

  var Class = this;
  return new Class(cwd);  // jscs:disable jsDoc
};

/**
 * Parses the given path or URL, and returns a {@link OmniPath} object. Similar to Node's
 * {@link posix.parse} and {@link url.parse}.
 *
 * path.parse: {@link https://nodejs.org/api/path.html#path_path_parse_pathstring}
 * url.parse:  {@link https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost}
 *
 * @param   {string|Url|OmniPath}   p         - The file path or URL to parse
 * @param   {PathOptions}           [options] - Options that determine how paths are parsed
 * @returns {OmniPath}
 */
OmniPath.parse = function(p, options) {
  var Class = this;
  return new Class(p, options);
};

/**
 * Parses the given path or URL, and sets the corresponding properties of this {@link OmniPath} object.
 * Similar to Node's {@link posix.parse} and {@link url.parse}.
 *
 * path.parse: {@link https://nodejs.org/api/path.html#path_path_parse_pathstring}
 * url.parse:  {@link https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost}
 *
 * @param   {string|Url|OmniPath}   p         - The file path or URL to parse
 * @param   {PathOptions}           [options] - Options that determine how paths are parsed
 * @abstract
 */
OmniPath.prototype.parse = function(p, options) {
  // If the path is already parsed, then just copy it
  if (p instanceof this.constructor) {
    p.options = options || p._options || this._options;
    util.copy(p, this);
    return;
  }

  // Reset everything
  this.isUrl = false;
  this.isFS = false;
  this.isPosix = false;
  this.isWindows = false;
  this.isUnc = false;
  this.isAbsolute = false;
  this.sep = '';
  this.href = '';
  this.protocol = '';
  this.slashes = false;
  this.auth = '';
  this.host = '';
  this.hostname = '';
  this.port = '';
  this.path = '';
  this.pathname = '';
  this.root = '';
  this.dir = '';
  this.base = '';
  this.name = '';
  this.ext = '';
  this.search = '';
  this.query = {};
  this.hash = '';

  /** @protected */
  this._options = options || this._options;

  // Return the path to be parsed by an OmniPath subclass
  return util.toString(p);
};

/**
 * Returns a POJO (plain old JavaScript object) for serialization as JSON.
 *
 * @returns {object}
 */
OmniPath.prototype.toJSON = function() {
  var json = {};
  for (var i = 0; i < util.props.length; i++) {
    var prop = util.props[i];
    json[prop] = this[prop];
  }
  return json;
};

/**
 * An {@link OmniPath} subclass that always treats paths as POSIX paths.
 *
 * @type {PosixPath}
 */
OmniPath.Posix = OmniPath.posix = require('./posix');

/**
 * An {@link OmniPath} subclass that always treats paths as Windows paths.
 *
 * @type {WindowsPath}
 */
OmniPath.Windows = OmniPath.win32 = require('./windows');

/**
 * An {@link OmniPath} subclass that always treats paths as URLs.
 *
 * @type {UrlPath}
 */
OmniPath.Url = OmniPath.url = require('./url');
