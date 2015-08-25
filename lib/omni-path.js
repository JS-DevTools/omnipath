'use strict';

module.exports = OmniPath;

var path             = require('./node/path'),
    url              = require('./node/url'),
    util             = require('./util'),
    querystring      = require('querystring'),
    backslashPattern = /\\/g;

/**
 * A parsed URL or file path. This object has the same properties as a parsed URL (via {@link url.parse},
 * plus the properties of a parsed file path (via {@link path.parse}.
 *
 * Parsed URL:  {@link https://nodejs.org/api/url.html#url_url}
 * Parsed Path: {@link https://nodejs.org/api/path.html#path_path_parse_pathstring}
 *
 * @param {string|Url|OmniPath} p         - The file path or URL to parse.
 * @param {PathOptions}         [options] - Options that determine how paths are parsed
 * @constructor
 */
function OmniPath(p, options) {
  // If it's already an OmniPath, then just clone it as-is
  if (p instanceof OmniPath) {
    return p.clone(options);
  }

  p = util.toString(p);
  var type = util.getType(p);

  if (type.isUrl) {
    return new OmniPath.Url(p, options);
  }
  else if (type.isWindows) {
    return new OmniPath.Windows(p, options);
  }
  else {
    return new OmniPath.Posix(p, options);
  }
}

// Create fast shortcut methods for the basic type checks
['isUrl', 'isPosix', 'isWindows'].forEach(function(prop) {
  OmniPath[prop] = function(p) {
    if (p instanceof OmniPath) {
      return p[prop];
    }
    p = util.toString(p);
    return !!util.getType(p)[prop];
  };
});

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

/**
 * Returns the directory name of the given path or URL. Like Node's {@link path.dirname}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_dirname_p}
 *
 * @param   {string|Url|OmniPath}  p          - The file path or URL to parse
 * @param   {PathOptions}          [options]  - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.dirname = function(p, options) {
  var Class = this;
  var omniPath = new Class(p, options);
  return omniPath.dirname();
};

/**
 * Returns the last portion of the given path or URL. Like Node's {@link path.basename}.
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

/**
 * Returns the extension of the given path or URL. Like Node's {@link path.extname}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_extname_p}
 *
 * @param   {string|Url|OmniPath}  p          - The file path or URL to parse
 * @param   {PathOptions}          [options]  - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.extname = OmniPath.ext;

/**
 * Joins all arguments together, and normalizes the resulting path. Like Node's {@link path.join}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_join_path1_path2}
 *
 * @param   {...string|...Url|...OmniPath}  p         - The paths (or segments) to join
 * @param   {PathOptions}                   [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.join = function(p, options) {
  var args = util.getArgs(arguments);
  p = args.paths[0] || '';

  var Class = this;
  var omniPath = new Class(p, args.options);
  return omniPath.join.apply(omniPath, args.paths.slice(1));
};

/**
 * Joins all arguments to this path, and normalizes the resulting path. Like Node's {@link path.join}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_join_path1_path2}
 *
 * @param   {...string|...Url|...OmniPath} p - The paths (or segments) to join to this path
 * @returns {string}
 */
OmniPath.prototype.join = function(p) {
  // Parse each path
  var pathnames = [this._path.format(this)];
  for (var i = 0; i < arguments.length; i++) {
    pathnames[i] = this.constructor.pathname(arguments[i], this._options);
  }

  // Join the pathnames
  var joined = this._path.join.apply(this._path, pathnames);

  // Normalize the result
  var clone = this.clone();
  clone.pathname = joined;
  return clone.normalize();
};

///**
// * Resolves `to` to an absolute path. Like Node's {@link path.resolve} or {@link url.resolve}.
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
//  var Class = this;
//  return new Class(from, options).resolve(to, options);
//};
//
///**
// * Resolves the given path or url, relative to this one. Like Node's {@link path.resolve}
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

/**
 * Normalizes a path, resolving any "." and ".." segments, eliminating redundant slashes,
 * and standardizing slashes. Like Node's {@link path.normalize}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_normalize_p}
 *
 * @param   {string|Url|OmniPath}   p         - The file path or URL to format
 * @param   {PathOptions}           [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.normalize = function(p, options) {
  var Class = this;
  return new Class(p, options).normalize();
};

/**
 * Normalizes the path, resolving any "." and ".." segments, eliminating redundant slashes,
 * and standardizing slashes. Like Node's {@link path.normalize}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_normalize_p}
 *
 * @returns {string}
 */
OmniPath.prototype.normalize = function() {
  var formatted = this._path.format(this);
  var normalized = this._path.normalize(formatted);
  var searchAndHash = this._getFormattedSearchAndHash();
  return normalized + searchAndHash;
};

/**
 * Returns the given path or URL as a formatted string. Like Node's {@link path.format} or {@link url.format}.
 *
 * path.format: {@link https://nodejs.org/api/path.html#path_path_format_pathobject}
 * url.format:  {@link https://nodejs.org/api/url.html#url_url_format_urlobj}
 *
 * @param   {string|Url|OmniPath}   p         - The file path or URL to format
 * @param   {PathOptions}           [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.format = function(p, options) {
  var Class = this;
  return new Class(p, options).format();
};

/**
 * Returns the formatted path or URL string. Like Node's {@link path.format} or {@link url.format}.
 *
 * path.format: {@link https://nodejs.org/api/path.html#path_path_format_pathobject}
 * url.format:  {@link https://nodejs.org/api/url.html#url_url_format_urlobj}
 *
 * @returns {string}
 */
OmniPath.prototype.format = function() {
  var pathname = this._path.format(this);
  var searchAndHash = this._getFormattedSearchAndHash();
  return pathname + searchAndHash;
};

/**
 * Returns the formatted path or URL string, by calling {@link OmniPath#format}.
 *
 * @type {Function}
 */
OmniPath.prototype.toString = OmniPath.prototype.format;

/**
 * Returns the primitive string value, by calling {@link OmniPath#format}.
 *
 * @type {Function}
 */
OmniPath.prototype.valueOf = OmniPath.prototype.format;

/**
 * Returns the given path or URL as a {@link Url} object. File paths will be returned as "file://" URLs.
 *
 * @param   {string|Url|OmniPath}   p         - The file path or URL to format
 * @param   {PathOptions}           [options] - Options that determine how paths are parsed
 * @returns {Url}
 */
OmniPath.toUrl = function(p, options) {
  var Class = this;
  return new Class(p, options).toUrl();
};

/**
 * Returns the path or URL as a {@link Url} object. If {@link OmniPath#isFS} is true,
 * then the returned value will be a "file://" URL.
 *
 * @returns {Url}
 */
OmniPath.prototype.toUrl = function() {
  return url.parse(this.toUrlString(), true);
};

/**
 * Returns the given path or URL to a formatted URL string. File paths will be returned as "file://" URLs.
 *
 * @param   {string|Url|OmniPath}   p         - The file path or URL to format
 * @param   {PathOptions}           [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.toUrlString = function(p, options) {
  var Class = this;
  return new Class(p, options).toUrlString();
};

/**
 * Returns a formatted URL string. If {@link OmniPath#isFS} is true, then the returned value
 * will be a "file://" URL.
 *
 * @returns {string}
 */
OmniPath.prototype.toUrlString = function() {
  var hostname = this.hostname;
  var pathname = this.pathname;
  var search = this.search;
  var hash = this.hash;

  // Encode backslash characters
  pathname = pathname.replace(backslashPattern, '%5C');
  search = search.replace(backslashPattern, '%5C');
  hash = hash.replace(backslashPattern, '%5C');

  // Format the file path as a URL
  var formatted = url.format({
    protocol: 'file:',
    slashes: true,
    hostname: hostname,
    pathname: pathname,
    search: search,
    hash: hash
  });

  // Parse the formatted URL, to encode any special characters
  var parsed = url.parse(formatted);

  // Re-format the URL, this time with encoding
  //noinspection UnnecessaryLocalVariableJS
  var encoded = parsed.format();
  return encoded;
};

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
 * Parses the given path or URL, and returns a {@link OmniPath} object. Like Node's
 * {@link path.parse} and {@link url.parse}.
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
 * Like Node's {@link path.parse} and {@link url.parse}.
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
    util.copy(p, this);
    this._options = options || p._options || this._options;
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
  this.delimiter = '';
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
  this._options = options || this._options || (p && p._options);

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
 * Returns the formatted {@link OmniPath#search} and {@link OmniPath#hash}.
 * If {@link OmniPath#search} is empty, then {@link OmniPath#query} is used instead.
 *
 * @returns {string}
 * @private
 */
OmniPath.prototype._getFormattedSearchAndHash = function() {
  var search = this.search || '';
  var hash = this.hash || '';

  if (search) {
    if (search[0] !== '?') {
      search = '?' + search;
    }
  }
  else if (this.query) {
    // Build the `search` property from the `query` property
    var query = querystring.stringify(this.query);
    if (query) {
      search = '?' + query;
    }
  }

  // If the file has a hash, then format the `hash` property
  if (hash && hash[0] !== '#') {
    hash = '#' + hash;
  }

  return search + hash;
};

/**
 * Determines whether the given path (or path part) begins with a separator character.
 *
 * @param {string} p - A path, or path part
 * @returns {boolean}
 * @protected
 */
OmniPath.prototype._startsWithSeparator = function(p) {
  return p[0] === this.sep;
};

/**
 * Determines whether the given path (or path part) ends with a separator character.
 *
 * @param {string} p - A path, or path part
 * @returns {boolean}
 * @protected
 */
OmniPath.prototype._endsWithSeparator = function(p) {
  return p.substr(-1) === this.sep;
};
