'use strict';

module.exports = OmniPath;

var path        = require('./node/path'),
    url         = require('./node/url'),
    util        = require('./util'),
    querystring = require('querystring'),
    parts       = ['protocol', 'slashes', 'hostname', 'port', 'host', 'dir', 'base',
                   'pathname', 'query', 'search', 'path', 'hash'];

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
 * Returns the directory name of the given path or URL. Like Node's {@link path.dirname}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_dirname_p}
 *
 * @returns {string}
 */
OmniPath.prototype.dirname = function() {
  return this._path.dirname(this.pathname);
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
 * Returns the last portion of the given path or URL. Like Node's {@link path.basename}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_basename_p_ext}
 *
 * @param   {string} [ext] - The portion of the file extension to leave off
 * @returns {string}
 */
OmniPath.prototype.basename = function(ext) {
  return this._path.basename(this.base, ext);
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
 * Returns the extension of the given path or URL. Like Node's {@link path.extname}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_extname_p}
 *
 * @returns {string}
 */
OmniPath.prototype.extname = function() {
  return this.ext;
};

/**
 * Joins all arguments together, and normalizes the resulting path. Like Node's {@link path.join}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_join_path1_path2}
 *
 * @param   {...string|...Url|...OmniPath}  p         - The paths (or segments) to join
 * @param   {PathOptions}                   [options] - Options that determine how paths are parsed
 * @returns {string}
 * @abstract
 */
OmniPath.join = function(p, options) {
  var type = util.getType(p);
  if (type.isUrl) {
    return OmniPath.Url.join.apply(OmniPath.Url, arguments);
  }
  else if (type.isWindows) {
    return OmniPath.Windows.join.apply(OmniPath.Windows, arguments);
  }
  else {
    return OmniPath.Posix.join.apply(OmniPath.Posix, arguments);
  }
};

/**
 * Joins all arguments to this path, and normalizes the resulting path. Like Node's {@link path.join}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_join_path1_path2}
 *
 * @param   {...string|...Url|...OmniPath}  p       - The paths (or segments) to join to this path
 * @param   {PathOptions}                   options - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.prototype.join = function(p, options) {
  var args = [this].concat(Array.prototype.slice.call(arguments));
  var parsed = util.fastParse(args, false, true);
  var joined = this._path.join.apply(this._path, parsed.pathnames);

  // If the last segment has a query/hash, then append it
  var lastSearch = parsed.searches[parsed.last];
  var lastHash = parsed.hashes[parsed.last];
  return joined + lastSearch + lastHash;
};

/**
 * Resolves `to` to an absolute path. Like Node's {@link path.resolve} or {@link url.resolve}.
 *
 * path.resolve: {@link https://nodejs.org/api/path.html#path_path_resolve_from_to}
 * url.resolve {@link https://nodejs.org/api/url.html#url_url_resolve_from_to}
 *
 * @param   {string|Url|OmniPath}           from    - The file path or URL to resolve from.
 * @param   {...string|...Url|...OmniPath}  to      - The path(s) to resolve, relative to `from`.
 * @param   {PathOptions}                   options - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.resolve = function(from, to, options) {
  var type = util.getType(from);
  if (type.isUrl) {
    return OmniPath.Url.resolve.apply(OmniPath.Url, arguments);
  }
  else if (type.isWindows) {
    return OmniPath.Windows.resolve.apply(OmniPath.Windows, arguments);
  }
  else {
    return OmniPath.Posix.resolve.apply(OmniPath.Posix, arguments);
  }
};

/**
 * Resolves `to` to an absolute path. Like Node's {@link path.resolve} or {@link url.resolve}.
 *
 * path.resolve:  {@link https://nodejs.org/api/path.html#path_path_resolve_from_to}
 * url.resolve    {@link https://nodejs.org/api/url.html#url_url_resolve_from_to}
 *
 * @param   {...string|...Url|...OmniPath}  to      - The path(s) to resolve, relative to this one.
 * @param   {PathOptions}                   options - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.prototype.resolve = function(to, options) {
  var args = [this].concat(Array.prototype.slice.call(arguments));
  var parsed = util.fastParse(args);
  var pathnames = parsed.pathnames;

  if (parsed.hasUrls) {
    // If any of the paths are URLs, then use URL-resolving logic
    return OmniPath.Url.resolve.apply(OmniPath.Url, parsed.hrefs);
  }

  if (process.browser) {
    // Use OmniPath.cwd() instead of Browserify's process.cwd() (which is always "/")
    pathnames = [OmniPath.cwd()].concat(parsed.pathnames);
  }

  // Resolve the path
  var resolved = this._path.resolve.apply(this._path, pathnames);

  // Resolve the search and hash
  var search = '', hash = '';
  for (var i = 0; i <= parsed.last; i++) {
    if (parsed.searches[i]) {
      search = parsed.searches[i];
      hash = parsed.hashes[i];
    }
    else if (parsed.hashes[i]) {
      hash = parsed.hashes[i];
    }
  }

  return resolved + search + hash;
};

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
  var formatted = this.pathname || this._path.format(this);
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
 * Returns the specified part(s) of the given path or URL as a formatted string.
 *
 * @param   {string|Url|OmniPath}   p
 * - The file path or URL to format
 *
 * @param   {string} part
 * - The name of the rightmost part to include in the returned string.
 * For example, "protocol" will only return the protocol part,
 * whereas "port" will return the protocol, slashes, auth, hostname, and port.
 *
 * @param   {PathOptions} [options]
 * - Options that determine how paths are parsed
 *
 * @returns {string}
 */
OmniPath.formatPart = function(p, part, options) {
  var Class = this;
  return new Class(p, options).formatPart(part);
};

/**
 * Returns the specified part(s) of the path or URL as a formatted string.
 *
 * @param   {string} part
 * - The name of the rightmost part to include in the returned string.
 * For example, "protocol" will only return the protocol part,
 * whereas "port" will return the protocol, slashes, auth, hostname, and port.
 *
 * @returns {string}
 */
OmniPath.prototype.formatPart = function(part) {
  part = parts.indexOf(part);
  var clone = this.clone();
  part < 0 && (clone.protocol = '');
  part < 1 && (clone.slashes = false);
  part < 2 && (clone.hostname = '');
  part < 3 && (clone.port = '');
  part < 4 && (clone.host = '');
  part < 5 && (clone.dir = '');
  part < 6 && (clone.base = '');
  part < 7 && (clone.pathname = '');
  part < 8 && (clone.query = '');
  part < 9 && (clone.search = '');
  part < 10 && (clone.path = '');
  part < 11 && (clone.hash = '');
  return clone.format();
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
  pathname = pathname.replace(util.backslashPattern, '%5C');
  search = search.replace(util.backslashPattern, '%5C');
  hash = hash.replace(util.backslashPattern, '%5C');

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
 * Returns the current working directory. If running in a web browser, then the working directory
 * is based on the current page's URL.
 *
 * The returned path always includes a trailing slash, which ensures that it behaves properly
 * with methods like {@link url.resolve}.
 *
 * @returns {string}
 */
OmniPath.cwd = function() {
  if (process.browser) {
    var page = window.location.pathname;
    var lastSlash = page.lastIndexOf('/');
    return page.substr(0, lastSlash + 1);
  }
  else {
    return process.cwd() + path.sep;
  }
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
  // jscs:disable jsDoc
  return new Class(p, options);
  // jscs:enable jsDoc
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
 * Creates a clone of this {@link OmniPath} object.
 *
 * @param {PathOptions} [options] - Options that determine how paths are parsed
 * @returns {OmniPath}
 */
OmniPath.prototype.clone = function(options) {
  var Class = this.constructor;
  // jscs:disable jsDoc
  return new Class(this, options);
  // jscs:enable jsDoc
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
