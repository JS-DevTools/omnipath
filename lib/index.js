/**!
 * OmniPath v1.0.0-beta.0
 *
 * @link https://github.com/BigstickCarpet/omnipath
 * @license MIT
 */
'use strict';

var path            = require('path'),
    url             = require('url'),
    isWindows       = /^win/.test(process.platform),
    protocolPattern = /^[a-z0-9.+-]{2,}:/i;

module.exports = OmniPath;

/**
 * A parsed URL or file path. This object has the same properties as a parsed URL (via {@link url.parse},
 * plus the properties of a parsed file path (via {@link path.parse}.
 *
 * Parsed URL:  {@link https://nodejs.org/api/url.html#url_url}
 * Parsed Path: {@link https://nodejs.org/api/path.html#path_path_parse_pathstring}
 *
 * @param {string|Url|OmniPath} href
 * - The file path or URL to parse. If the path/url is relative,
 * then it will be resolved relative to {@link OmniPath#cwd}
 *
 * @param {Options} [options]
 * - Options that determine whether "#" and "?" in file paths should be interpreted
 * as hashes and queries, like URLs, or as part of the file path.
 *
 * @constructor
 */
function OmniPath(href, options) {
  //this.isDirectory = false;
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

  if (typeof(href) === 'string') {
    this.parse(href, options);
  }
  else if (href instanceof url.Url) {
    this.parse(href.format(), options);
  }
  else if (href instanceof OmniPath) {
    copy(href, this);
  }
  else {
    throw new Error('Expected a file path or URL, but got ' + typeof(href) + ' ' + href);
  }
}

/**
 * Return the directory name of the given path or URL. Similar to Node's {@link path.dirname}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_dirname_p}
 *
 * @param   {string|Url|OmniPath}  href      - The file path or URL to parse
 * @param   {Options}               [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.dirname = function(href, options) {
  return new OmniPath(href, options).dirname();
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
 * @param   {string|Url|OmniPath}  href      - The file path or URL to parse
 * @param   {string}                [ext]     - The portion of the file extension to leave off
 * @param   {Options}               [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.basename = function(href, ext, options) {
  if (typeof(ext) === 'object') {
    options = ext;
    ext = undefined;
  }
  return new OmniPath(href, options).basename(ext);
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
  if (ext && this.ext === ext) {
    return this.name;
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
 * @param   {string|Url|OmniPath}  href      - The file path or URL to parse
 * @param   {Options}               [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.extname = function(href, options) {
  return new OmniPath(href, options).ext;
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

OmniPath.join = function(href1, href2, options) {

};

OmniPath.prototype.join = function(href2) {

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
 * @param   {string|Url|OmniPath}  relative  - The file path or URL to resolve, relative to this one
 * @param   {Options}               options   - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.prototype.resolve = function(relative, options) {
  var resolved;

  if (relative instanceof OmniPath) {
    // OmniPath objects are always absolute, so just return it as-is
    return relative.format();
  }

  if (relative instanceof url.Url) {
    // Urls can be absolute or relative, so treat it like a string
    relative = relative.format();
  }

  if (this.isUrl || protocolPattern.test(relative)) {
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
 * @param   {string|Url|OmniPath}  href      - The file path or URL to format
 * @param   {Options}               [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.format = function(href, options) {
  return new OmniPath(href, options).format();
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
    if (clone.base[0] === clone.sep) {
      clone.base = clone.base.substr(1);
    }
    clone.dir = clone.dir || '';
    if (clone.dir.substr(-1) === clone.sep) {
      clone.pathname = clone.dir + clone.base;
    }
    else {
      clone.pathname = clone.dir + clone.sep + clone.base;
    }
    if (clone.isDirectory && clone.pathname.substr(-1) !== clone.sep) {
      clone.pathname += clone.sep;
    }
  }

  if (clone.isUrl) {
    // Format as a URL
    return url.format(clone);
  }

  // If the file has a query, then build the `search` property
  if (clone.query) {
    clone.search = '?' + clone.query;
  }
  else if (clone.search && clone.search[0] !== '?') {
    clone.search = '?' + clone.search;
  }

  // If the file has a hash, then format the `hash` property
  if (clone.hash && clone.hash[0] !== '#') {
    clone.hash = '#' + clone.hash;
  }

  // Format as a file path
  return path.normalize(clone.pathname) + clone.search + clone.hash;
};

OmniPath.normalize = function(href, options) {

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
 * @param   {string|Url|OmniPath}  href      - The file path or URL to parse
 * @param   {Options}               [options] - Options that determine how paths are parsed
 * @returns {OmniPath}
 */
OmniPath.parse = function(href, options) {
  return new OmniPath(href, options);
};

/**
 * Parses the given path or URL, and sets the corresponding properties of this {@link OmniPath} object.
 * Similar to Node's {@link path.parse} or {@link url.parse}.
 *
 * path.parse: {@link https://nodejs.org/api/path.html#path_path_parse_pathstring}
 * url.parse:  {@link https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost}
 *
 * @param   {string|Url|OmniPath}  href      - The file path or URL to parse
 * @param   {Options}               [options] - Options that determine how paths are parsed
 */
OmniPath.prototype.parse = function(href, options) {
  if (process.browser) {
    // We're running in a browser, so treat all paths as a URLs
    parseUrl(this, url.parse(url.resolve(window.location.href, href)));
  }
  else if (getRoot(href)) {
    // It's an absolute file path
    parseFile(this, href, options);
  }
  else if (protocolPattern.test(href)) {
    // It's a full URL (e.g. https://host.com)
    parseUrl(this, url.parse(href));
  }
  else {
    // It's a relative file path
    parseRelativeFile(this, OmniPath.cwd(), href, options);
  }
};

/**
 * Returns the given path or URL as a {@link Url} object. File paths will be returned as "file://" URLs.
 *
 * @param   {string|Url|OmniPath}  href      - The file path or URL to format
 * @param   {Options}               [options] - Options that determine how paths are parsed
 * @returns {Url}
 */
OmniPath.toUrl = function(href, options) {
  return new OmniPath(href, options).toUrl();
};

/**
 * Returns the path or URL as a {@link Url} object. If {@link OmniPath#isFile} is true,
 * then the returned value will be a "file://" URL.
 *
 * @returns {Url}
 */
OmniPath.prototype.toUrl = function() {
  return url.parse(this.toUrlString());
};

/**
 * Returns the given path or URL to a formatted URL string. File paths will be returned as "file://" URLs.
 *
 * @param   {string|Url|OmniPath}  href      - The file path or URL to format
 * @param   {Options}               [options] - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.toUrlString = function(href, options) {
  return new OmniPath(href, options).toUrlString();
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
 * @param   {OmniPath|object}  target  - The object whose properties will be set
 * @param   {Url}               url     - The {@link Url} object to parse
 * @returns {OmniPath|object}
 */
function parseUrl(target, url) {
  var file = {};
  if (url.pathname) {
    parseFile(file, url.pathname);
  }

  target.isUrl = true;
  target.isFile = false;
  target.isDirectory = file.isDirectory;
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
  target.root = file.root || '';
  target.dir = file.dir || '';
  target.base = file.base || '';
  target.name = file.name || '';
  target.ext = file.ext || '';
  target.search = url.search || '';
  target.query = url.query || '';
  target.hash = url.hash || '';
  return target;
}

/**
 * Parses the given file path, and sets the corresponding properties of the given object.
 *
 * @param   {OmniPath|object}  target    - The object whose properties will be set
 * @param   {string}            file      - The file path to parse
 * @param   {Options}           [options] - Options that determine how paths are parsed
 * @returns {OmniPath|object}
 */
function parseFile(target, file, options) {
  var hash = '', query = '', href = file;
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
      query = file.substr(queryIndex + 1);
      file = file.substr(0, queryIndex);
    }
  }

  // Parse the file path
  var isDirectory, root, dir, base, name, ext;
  root = getRoot(file);
  if (file === root) {
    // It's the root directory
    isDirectory = true;
    dir = root;
    base = name = ext = '';
  }
  else {
    var lastChar = file.substr(-1);
    isDirectory = (lastChar === '/' || lastChar === path.sep); // must check for BOTH separators, since Windows allows both
    dir = path.dirname(file);
    base = path.basename(file);
    ext = path.extname(file);
    name = path.basename(file, ext);
  }

  target.isUrl = false;
  target.isFile = true;
  target.isDirectory = isDirectory;
  target.sep = path.sep;
  target.href = href || '';
  target.protocol = '';
  target.slashes = false;
  target.auth = '';
  target.host = '';
  target.hostname = '';
  target.port = '';
  target.path = file + (query ? '?' + query : '');
  target.pathname = file;
  target.root = root;
  target.dir = dir;
  target.base = base;
  target.name = name;
  target.ext = ext;
  target.search = query ? '?' + query : '';
  target.query = query;
  target.hash = hash;
  return target;
}

/**
 * Parses the given file path, relative to a base path,
 * and sets the corresponding properties of the given object.
 *
 * @param   {OmniPath|object}  target    - The object whose properties will be set
 * @param   {OmniPath}         base      - The base file path
 * @param   {string}            relative  - The path to resolve from `base`
 * @param   {Options}           [options] - Options that determine how paths are parsed
 * @returns {OmniPath|object}
 */
function parseRelativeFile(target, base, relative, options) {
  relative = parseFile({}, relative, options);

  var absolute;
  if (relative.pathname) {
    absolute = path.resolve(base.pathname, relative.pathname);
    if (relative.isDirectory) {
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
 * Copies the properties of one {@link OmniPath} object to another.
 *
 * @param   {OmniPath} src   - The source object, whose properties will be copied
 * @param   {OmniPath} dest  - The destination object, whose properties will be set
 * @returns {OmniPath}
 */
function copy(src, dest) {
  dest.isUrl = src.isUrl;
  dest.isFile = src.isFile;
  dest.isDirectory = src.isDirectory;
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
 * Returns the {@link OmniPath#root} of the given pathname, based on the current environment
 *
 * @param   {string} pathname - A pathname, such as "/foo/bar" or "C:\foo\bar"
 * @returns {string}
 */
function getRoot(pathname) {
  // Check for an absolute URL or POSIX path
  if (pathname[0] === '/') {
    return '/';
  }

  // Check for an absolute Windows path
  var delimiter = pathname.substr(1, 2);
  if (isWindows && (delimiter === ':\\' || delimiter === ':/')) {
    return pathname.substr(0, 3);
  }

  return '';
}
