/**!
 * OmniPath v1.0.0-beta.4
 *
 * @link https://github.com/BigstickCarpet/omnipath
 * @license MIT
 */
'use strict';

var path                = require('path'),
    url                 = require('url'),
    querystring         = require('querystring'),
    isWindows           = /^win/.test(process.platform),
    protocolPattern     = /^[a-z0-9.+-]+:/i,
    windowsDrivePattern = /^[a-z]:(\\|\/(?!\/))/i, // This distinguishes between Windows drive letters ("C:\") and single-letter protocols ("X://")
    windowsUncPattern   = /^[\\\/]{2}[^\\\/]+([\\\/]+[^\\\/]+)?/;

module.exports = OmniPath;

/**
 * A parsed URL or file path. This object has the same properties as a parsed URL (via {@link url.parse},
 * plus the properties of a parsed file path (via {@link path.parse}.
 *
 * Parsed URL:  {@link https://nodejs.org/api/url.html#url_url}
 * Parsed Path: {@link https://nodejs.org/api/path.html#path_path_parse_pathstring}
 *
 * @param {string|Url|OmniPath} p
 * - The file path or URL to parse. If the path/url is relative,
 * then it will be resolved relative to {@link OmniPath#cwd}
 *
 * @param {Options} [options]
 * - Options that determine whether "#" and "?" in file paths should be interpreted
 * as hashes and queries, like URLs, or as part of the file path.
 *
 * @constructor
 */
function OmniPath(p, options) {
  this._options = options;

  this.isUrl = false;
  this.isFile = false;
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

  if (typeof(p) === 'string') {
    this.parse(p, options);
  }
  else if (p instanceof url.Url) {
    this.parse(p.format(), options);
  }
  else if (p instanceof OmniPath) {
    copy(p, this);
  }
  else {
    throw new Error('Expected a file path or URL, but got ' + typeof(p) + ' ' + p);
  }
}

/**
 * Returns an POJO (plain old JavaScript object) for serialization as JSON.
 *
 * @returns {object}
 */
OmniPath.prototype.toJSON = function() {
  return {
    isUrl: this.isUrl,
    isFile: this.isFile,
    sep: this.sep,
    href: this.href,
    protocol: this.protocol,
    slashes: this.slashes,
    auth: this.auth,
    host: this.host,
    hostname: this.hostname,
    port: this.port,
    path: this.path,
    pathname: this.pathname,
    root: this.root,
    dir: this.dir,
    base: this.base,
    name: this.name,
    ext: this.ext,
    search: this.search,
    query: this.query,
    hash: this.hash
  };
};

/**
 * Return the directory name of the given path or URL. Similar to Node's {@link path.dirname}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_dirname_p}
 *
 * @param   {string|Url|OmniPath} p         - The file path or URL to parse
 * @param   {Options}             [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.dirname = function(p, options) {
  return new OmniPath(p, options).dirname();
};

/**
 * Return the directory name. This is the same as {@link OmniPath#dir}, but is included here for
 * consistency with Node's {@link path.dirname}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_dirname_p}
 *
 * @returns {string}
 */
OmniPath.prototype.dirname = function() {
  return this.dir;
};

/**
 * Return the last portion of the given path or URL. Similar to Node's {@link path.basename}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_basename_p_ext}
 *
 * @param   {string|Url|OmniPath}  p          - The file path or URL to parse
 * @param   {string}               [ext]      - The portion of the file extension to leave off
 * @param   {Options}              [options]  - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.basename = function(p, ext, options) {
  if (typeof(ext) === 'object') {
    options = ext;
    ext = undefined;
  }
  return new OmniPath(p, options).basename(ext);
};

/**
 * Return the last portion of the path or URL. Similar to Node's {@link path.basename}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_basename_p_ext}
 *
 * @param   {string} [ext] - The portion of the file extension to leave off
 * @returns {string}
 */
OmniPath.prototype.basename = function(ext) {
  if (ext && this.base.substr(-ext.length) === ext) {
    return this.base.substr(0, this.base.length - ext.length);
  }
  else {
    return this.base;
  }
};

/**
 * Return the extension of the given path or URL, from the last "." to the end of the {@link OmniPath#base}.
 * Similar to Node's {@link path.extname}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_extname_p}
 *
 * @param   {string|Url|OmniPath}   p         - The file path or URL to parse
 * @param   {Options}               [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.extname = function(p, options) {
  return new OmniPath(p, options).ext;
};

/**
 * Return the extension, from the last "." to the end of the {@link OmniPath#base}.
 * This is the same as {@link OmniPath#ext}, but is included here for consistency
 * with Node's {@link path.extname}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_extname_p}
 *
 * @returns {string}
 */
OmniPath.prototype.extname = function() {
  return this.ext;
};

/**
 * Joins all arguments together, and normalizes the resulting path.
 *
 * @param   {...string|...Url|...OmniPath}  p         - The paths (or path parts) to join
 * @param   {Options}                       [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.join = function(p, options) {
  var paths = [];
  var result = '';

  // Check if the last parameter is an options object
  options = arguments[arguments.length - 1];
  if (options && typeof(options) === 'object' && !(options instanceof url.Url) && !(options instanceof OmniPath)) {
    // The last parameter is the options object
    paths = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
  }
  else {
    // There is no options argument.
    paths = Array.prototype.slice.call(arguments);
  }

  paths.forEach(function(p) {
    if (typeof(p) === 'string') {
    }
    else if (p instanceof url.Url) {
    }
    else if (p instanceof OmniPath) {
    }
    else {
      throw new Error('Expected a file path or URL, but got ' + typeof(p) + ' ' + p);
    }
  });
};

/**
 * Joins all arguments to this path, and normalizes the resulting path.
 *
 * @param   {...string|...Url|...OmniPath} p - The paths (or path parts) to join to this path
 * @returns {string}
 */
OmniPath.prototype.join = function(p) {
  return OmniPath.join.apply(OmniPath, [this].concat(arguments));
};

/**
 * Resolves `to` to an absolute path. Similar to Node's {@link path.resolve} or {@link url.resolve}.
 *
 * path.resolve: {@link https://nodejs.org/api/path.html#path_path_resolve_from_to}
 * url.resolve {@link https://nodejs.org/api/url.html#url_url_resolve_from_to}
 *
 * @param   {string|Url|OmniPath}  from
 * - The file path or URL to resolve from. If the path/url is relative,
 * then it will be resolved relative to {@link OmniPath#cwd}.
 *
 * @param   {string|Url|OmniPath}  to
 * - The file path or URL to resolve, relative to `from`.
 *
 * @param   {Options} options
 * - Options that determine how paths are parsed
 *
 * @returns {string}
 */
OmniPath.resolve = function(from, to, options) {
  return new OmniPath(from, options).resolve(to, options);
};

/**
 * Resolves the given path or url, relative to this one. Similar to Node's {@link path.resolve}
 * or {@link url.resolve}.
 *
 * path.resolve:  {@link https://nodejs.org/api/path.html#path_path_resolve_from_to}
 * url.resolve    {@link https://nodejs.org/api/url.html#url_url_resolve_from_to}
 *
 * @param   {string|Url|OmniPath}   relative  - The file path or URL to resolve, relative to this one
 * @param   {Options}               options   - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.prototype.resolve = function(relative, options) {
  var resolved;
  options = options || this._options;

  if (relative instanceof OmniPath) {
    // OmniPath objects are always absolute, so just return it as-is
    return relative.format();
  }

  if (relative instanceof url.Url) {
    // Urls can be absolute or relative, so treat it like a string
    relative = relative.format();
  }

  if (this.isUrl || isAbsoluteUrl(relative)) {
    // The result will be a URL if `relative` is any of:
    //  - an absolute url (e.g. "http://www.google.com")
    //  - a relative url  (e.g. "../path/file.html")
    //  - an absolute POSIX path (e.g. "/path/file")
    //  - a relative POSIX path (e.g. "path/file")
    //  - a relative Windows path (e.g. "path\\file.txt")
    //
    // The result will be a file path if `relative` is:
    //  - an absolute Windows path (e.g. "C:\\path\\file.txt")
    resolved = url.resolve(this.format(), relative);
  }
  else {
    // The result will always be a file path
    var parsed = parseRelativeFile({}, this, relative, options);
    resolved = OmniPath.prototype.format.call(parsed);
  }

  return resolved;
};

/**
 * Returns the given path or URL as a formatted string. Similar to Node's {@link path.format} or {@link url.format}.
 *
 * path.format: {@link https://nodejs.org/api/path.html#path_path_format_pathobject}
 * url.format:  {@link https://nodejs.org/api/url.html#url_url_format_urlobj}
 *
 * @param   {string|Url|OmniPath}   p         - The file path or URL to format
 * @param   {Options}               [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.format = function(p, options) {
  return new OmniPath(p, options).format();
};

/**
 * Returns the formatted path or URL string. Similar to Node's {@link path.format} or {@link url.format}.
 *
 * path.format: {@link https://nodejs.org/api/path.html#path_path_format_pathobject}
 * url.format:  {@link https://nodejs.org/api/url.html#url_url_format_urlobj}
 *
 * @returns {string}
 */
OmniPath.prototype.format = function() {
  var clone = copy(this, {});

  // Build the `pathname` property
  if (clone.dir || clone.base || clone.name || clone.ext) {
    clone.base = clone.base || (clone.name + clone.ext) || '';
    if (startsWithSeparator(clone.base)) {
      clone.base = clone.base.substr(1);
    }
    clone.dir = clone.dir || '';
    var trailingSlash = endsWithSeparator(clone.pathname);
    if (endsWithSeparator(clone.dir)) {
      clone.pathname = clone.dir + clone.base;
    }
    else {
      clone.pathname = clone.dir + clone.sep + clone.base;
    }
    if (trailingSlash && !endsWithSeparator(clone.pathname)) {
      clone.pathname += clone.sep;
    }
  }

  if (clone.isUrl) {
    // Format as a URL
    return url.format(clone);
  }

  if (clone.search) {
    if (clone.search[0] !== '?') {
      clone.search = '?' + clone.search;
    }
  }
  else if (clone.query) {
    // Build the `search` property from the `query` property
    clone.search = '?' + querystring.stringify(clone.query);
  }

  // If the file has a hash, then format the `hash` property
  if (clone.hash && clone.hash[0] !== '#') {
    clone.hash = '#' + clone.hash;
  }

  // Format as a file path
  return path.normalize(clone.pathname) + clone.search + clone.hash;
};

OmniPath.normalize = function(p, options) {

};

OmniPath.prototype.normalize = function() {

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
 * Parses the given path or URL, and returns a {@link OmniPath} object. Similar to Node's
 * {@link path.parse} or {@link url.parse}.
 *
 * path.parse: {@link https://nodejs.org/api/path.html#path_path_parse_pathstring}
 * url.parse:  {@link https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost}
 *
 * @param   {string|Url|OmniPath}   p         - The file path or URL to parse
 * @param   {Options}               [options] - Options that determine how paths are parsed
 * @returns {OmniPath}
 */
OmniPath.parse = function(p, options) {
  return new OmniPath(p, options);
};

/**
 * Parses the given path or URL, and sets the corresponding properties of this {@link OmniPath} object.
 * Similar to Node's {@link path.parse} or {@link url.parse}.
 *
 * path.parse: {@link https://nodejs.org/api/path.html#path_path_parse_pathstring}
 * url.parse:  {@link https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost}
 *
 * @param   {string|Url|OmniPath}   p         - The file path or URL to parse
 * @param   {Options}               [options] - Options that determine how paths are parsed
 */
OmniPath.prototype.parse = function(p, options) {
  options = options || this._options;

  if (process.browser) {
    // We're running in a browser, so treat all paths as a URLs
    parseUrl(this, url.parse(url.resolve(window.location.href, p), true));
  }
  else if (getRoot(p)) {
    // It's an absolute file path
    parseFile(this, p, options);
  }
  else if (isWindows && startsWithSeparator(p)) {
    // It's drive-relative Windows path (e.g. "\\dir\\subdir" => "C:\\dir\\subdir")
    parseRelativeFile(this, OmniPath.cwd(), p, options);
  }
  else if (protocolPattern.test(p)) {
    // It's a full URL (e.g. https://host.com)
    parseUrl(this, url.parse(p, true));
  }
  else {
    // It's a relative file path
    parseRelativeFile(this, OmniPath.cwd(), p, options);
  }
};

/**
 * Returns the given path or URL as a {@link Url} object. File paths will be returned as "file://" URLs.
 *
 * @param   {string|Url|OmniPath}   p         - The file path or URL to format
 * @param   {Options}               [options] - Options that determine how paths are parsed
 * @returns {Url}
 */
OmniPath.toUrl = function(p, options) {
  return new OmniPath(p, options).toUrl();
};

/**
 * Returns the path or URL as a {@link Url} object. If {@link OmniPath#isFile} is true,
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
 * @param   {Options}               [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.toUrlString = function(p, options) {
  return new OmniPath(p, options).toUrlString();
};

/**
 * Returns a formatted URL string. If {@link OmniPath#isFile} is true, then the returned value
 * will be a "file://" URL.
 *
 * @returns {string}
 */
OmniPath.prototype.toUrlString = function() {
  if (this.isUrl) {
    return url.format(this);
  }
  else {
    var pathname = this.pathname;

    // Normalize path separators (e.g. Windows backslashes)
    if (this.sep !== '/') {
      pathname = pathname.replace(new RegExp('\\' + this.sep, 'g'), '/');
    }

    return url.format({
      protocol: 'file:',
      slashes: true,
      pathname: pathname,
      search: this.search,
      hash: this.hash
    });
  }
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

  return new OmniPath(cwd);
};

/**
 * Parses the given {@link Url} object, and sets the corresponding properties of the given object.
 *
 * @param   {OmniPath|object}   target  - The object whose properties will be set
 * @param   {Url}               url     - The {@link Url} object to parse
 * @returns {OmniPath|object}
 */
function parseUrl(target, url) {
  target.isUrl = true;
  target.isFile = false;
  target.sep = '/';
  target.href = url.href || '';
  target.protocol = url.protocol || '';
  target.slashes = url.slashes || false;
  target.auth = url.auth || '';
  target.host = url.host || '';
  target.hostname = url.hostname || '';
  target.port = url.port || '';
  target.path = url.path || '';
  target.pathname = url.pathname || '';
  target.search = url.search || '';
  target.query = url.query || {};
  target.hash = url.hash || '';

  parsePathname(target, target.pathname);
  return target;
}

/**
 * Parses the given file path, and sets the corresponding properties of the given object.
 *
 * @param   {OmniPath|object}   target    - The object whose properties will be set
 * @param   {string}            file      - The file path to parse
 * @param   {Options}           [options] - Options that determine how paths are parsed
 * @returns {OmniPath|object}
 */
function parseFile(target, file, options) {
  var hash = '', search = '', query = {};
  options = options || {};

  if (options.allowFileHash) {
    // Separate the hash from the file path
    var hashIndex = file.indexOf('#');
    if (hashIndex >= 0) {
      hash = file.substr(hashIndex);
      file = file.substr(0, hashIndex);
    }
  }

  if (options.allowFileQuery) {
    // Separate the query from the file path
    var queryIndex = file.lastIndexOf('?');
    if (queryIndex >= 0) {
      search = file.substr(queryIndex);
      query = querystring.parse(search.substr(1));
      file = file.substr(0, queryIndex);
    }
  }

  if (isWindows) {
    // Normalize Windows path separators
    file = file.replace(/\//g, '\\');
  }

  target.isUrl = false;
  target.isFile = true;
  target.sep = path.sep;
  target.href = file + search + hash;
  target.protocol = '';
  target.slashes = false;
  target.auth = '';
  target.host = '';
  target.hostname = '';
  target.port = '';
  target.path = file + search;
  target.pathname = file;
  target.search = search;
  target.query = query;
  target.hash = hash;

  parsePathname(target, target.pathname);
  return target;
}

/**
 * Parses the given file path, relative to a base path,
 * and sets the corresponding properties of the given object.
 *
 * @param   {OmniPath|object}  target    - The object whose properties will be set
 * @param   {OmniPath}         base      - The base file path
 * @param   {string}           relative  - The path to resolve from `base`
 * @param   {Options}          [options] - Options that determine how paths are parsed
 * @returns {OmniPath|object}
 */
function parseRelativeFile(target, base, relative, options) {
  relative = parseFile({}, relative, options);

  var absolute;
  if (relative.pathname) {
    absolute = path.resolve(base.pathname, relative.pathname);
    if (endsWithSeparator(relative.pathname) && !endsWithSeparator(absolute)) {
      absolute += relative.sep;
    }
    absolute += relative.search + relative.hash;
  }
  else if (relative.search) {
    absolute = base.pathname + relative.search + relative.hash;
  }
  else {
    absolute = base.pathname + base.search + (relative.hash || base.hash);
  }

  return parseFile(target, absolute, options);
}

/**
 * Parses the given pathname, and sets the corresponding properties of the given object.
 *
 * @param   {OmniPath|object}   target    - The object whose properties will be set
 * @param   {string}            pathname  - The pathname to parse
 * @returns {OmniPath|object}
 */
function parsePathname(target, pathname) {
  target.root = getRoot(pathname);
  if (pathname === target.root) {
    // The pathname is the root
    target.dir = target.root;
    target.base = target.name = target.ext = '';
  }
  else {
    target.dir = path.dirname(pathname);
    target.base = path.basename(pathname);
    target.ext = path.extname(pathname);
    target.name = path.basename(pathname, target.ext);
  }

  return target;
}

/**
 * Copies the properties of one {@link OmniPath} object to another.
 *
 * @param   {OmniPath} src   - The source object, whose properties will be copied
 * @param   {OmniPath} dest  - The destination object, whose properties will be set
 * @returns {OmniPath}
 */
function copy(src, dest) {
  dest.isUrl = src.isUrl;
  dest.isFile = src.isFile;
  dest.sep = src.sep;
  dest.href = src.href;
  dest.protocol = src.protocol;
  dest.slashes = src.slashes;
  dest.auth = src.auth;
  dest.host = src.host;
  dest.hostname = src.hostname;
  dest.port = src.port;
  dest.path = src.path;
  dest.pathname = src.pathname;
  dest.root = src.root;
  dest.dir = src.dir;
  dest.base = src.base;
  dest.name = src.name;
  dest.ext = src.ext;
  dest.search = src.search;
  dest.query = src.query;
  dest.hash = src.hash;
  return dest;
}

/**
 * Determines whether the first character(s) of the given path are its root.
 * If they are, then the root character(s) are returned.
 *
 * @param   {string} p - A path, such as "/foo/bar" or "C:\foo\bar" or "\\server\\dir"
 * @returns {string}
 */
function getRoot(p) {
  if (isWindows) {
    var match = windowsDrivePattern.exec(p);
    if (match) {
      // It's an absolute Windows drive path
      return match[0];
    }

    match = windowsUncPattern.exec(p);
    if (match) {
      // It's a UNC path
      return match[0];
    }
  }
  else if (p[0] === '/') {
    // It's an absolute POSIX path
    return '/';
  }

  return '';
}

/**
 * Determines whether
 */
function isAbsoluteUrl(p) {
  return protocolPattern.test(p) && !windowsDrivePattern.test(p);
}

/**
 * Determines whether the given path (or path part) begins with a separator
 *
 * @param {string} p - A path or path part
 * @returns {boolean}
 */
function startsWithSeparator(p) {
  return isSeparator(p[0]);
}

/**
 * Determines whether the given path (or path part) ends with a separator
 *
 * @param {string} p - A path or path part
 * @returns {boolean}
 */
function endsWithSeparator(p) {
  return isSeparator(p.substr(-1));
}

/**
 * Determines whether the given character is a path separator
 *
 * @param {string} p - A single character
 * @returns {boolean}
 */
function isSeparator(p) {
  return p === '/' || (isWindows && p === '\\');
}
