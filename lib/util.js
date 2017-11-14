'use strict';

var util = module.exports = {
  props: [
    'isUrl', 'isFS', 'isPosix', 'isWindows', 'isUnc', 'isAbsolute', 'sep', 'delimiter',
    'href', 'protocol', 'slashes', 'auth', 'host', 'hostname', 'port', 'path', 'pathname',
    'root', 'dir', 'base', 'name', 'ext', 'search', 'query', 'hash'
  ],
  backslashPattern: /\\/g,
  isString: isString,
  isObject: isObject,
  isNull: isNull,
  isNullOrUndefined: isNullOrUndefined,
  toString: toString,
  inherits: inherits,
  copy: copy,
  getType: getType,
  parsePath: parsePath,
  fastParse: fastParse,
  getArgs: getArgs,
  startsWithAnySeparator: startsWithAnySeparator,
  endsWithAnySeparator: endsWithAnySeparator
};

var OmniPath = require('./omni-path'),
    url = require('./node/url'),
    querystring = require('querystring'),
    protocolPattern = /^[a-z0-9.+-]+:\/\//i;

/**
 * Returns true if the given value is a string.
 *
 * @param {*} arg - The value to check
 * @returns {boolean}
 */
function isString (arg) {
  return typeof (arg) === 'string';
}

/**
 * Returns true if the given value is an object.
 *
 * @param {*} arg - The value to check
 * @returns {boolean}
 */
function isObject (arg) {
  return typeof (arg) === 'object' && arg !== null;
}

/**
 * Returns true if the given value is null.
 *
 * @param {*} arg - The value to check
 * @returns {boolean}
 */
function isNull (arg) {
  return arg === null;
}

/**
 * Returns true if the given value is null or undefined.
 *
 * @param {*} arg - The value to check
 * @returns {boolean}
 */
function isNullOrUndefined (arg) {
  return arg == null;
}

/**
 * Returns the given path a a string
 *
 * @param   {string|Url|OmniPath} p - The file path or URL to format.
 * @returns {string}
 */
function toString (p) {
  if (typeof (p) === 'string') {
    return p;
  }
  else if (p instanceof url.Url) {
    return p.format();
  }
  else if (p instanceof OmniPath) {
    return p.format();
  }
  else if (p && typeof (p.href) === 'string') {
    return p.href;
  }

  throw new Error('Expected a file path or URL, but got ' + typeof (p) + ' ' + p);
}

/**
 * Inherits the static and prototype methods of a superclass on a subclass.
 *
 * @param {Class} Child - The class that inherits from Super
 * @param {Class} Super - The parent class
 */
function inherits (Child, Super) {
  Child.prototype = Object.create(Super.prototype);
  Child.prototype.constructor = Child;

  var staticMembers = Object.keys(Super);
  staticMembers.forEach(function (staticMember) {
    if (typeof (Super[staticMember]) === 'function') {
      Child[staticMember] = function () {
        return Super[staticMember].apply(Child, arguments);
      };
    }
    else {
      Child[staticMember] = Super[staticMember];
    }
  });
}

/**
 * Copies the properties of one {@link OmniPath} object to another.
 *
 * @param   {OmniPath} src   - The source object, whose properties will be copied
 * @param   {OmniPath} dest  - The destination object, whose properties will be set
 * @returns {OmniPath}
 */
function copy (src, dest) {
  // Copy all public properties
  for (var i = 0; i < util.props.length; i++) {
    var prop = util.props[i];
    dest[prop] = src[prop];
  }

  return dest;
}

/**
 * Determines the type of the given path.
 *
 * @param   {*} p - The path to inspect. Will be coerced to a string if necessary.
 * @returns {object}
 */
function getType (p) {
  if (p instanceof OmniPath) {
    return p;
  }
  else if (typeof (p) !== 'string') {
    p = toString(p);
  }

  // If the path starts with a protocol, then treat it as a URL,
  // regardless of the runtime environment, and even if the path
  // could also be a valid filesystem path for the environment.
  if (protocolPattern.test(p)) {
    return { isUrl: true };
  }

  // Parse the path based on the runtime environment
  if (process.browser) {
    return { isUrl: true };
  }
  else if (process.platform === 'win32') {
    return { isWindows: true };
  }
  else {
    return { isPosix: true };
  }
}

/**
 * Parses the given file path into pathname, search, query, and hash, if the options allow it.
 *
 * @param   {string}          p       - The file path to parse
 * @param   {PathOptions}     options - Options that determine whether queries and hashes are allowed
 * @returns {object}
 */
function parsePath (p, options) {
  var hash = '', search = '', query = {};
  options = options || {};

  if (options.allowFileHash) {
    // Separate the hash from the file path
    var hashIndex = p.indexOf('#');
    if (hashIndex >= 0) {
      hash = p.substr(hashIndex);
      p = p.substr(0, hashIndex);
    }
  }

  if (options.allowFileQuery) {
    // Separate the query from the file path
    var queryIndex = p.lastIndexOf('?');
    if (queryIndex >= 0) {
      search = p.substr(queryIndex);
      query = search.substr(1);
      if (options.parseQueryString || options.parseQueryString === undefined) {
        query = querystring.parse(query);
      }
      p = p.substr(0, queryIndex);
    }
  }

  return {
    pathname: p,
    search: search,
    query: query,
    hash: hash
  };
}

/**
 * Performs a fast, minimal parsing of the given path(s).
 *
 * @param   {*[]}     args        - The paths to parse, and possibly a {@link PathOptions} argument
 * @param   {boolean} [isUrl]     - Whether to treat all paths as URLs
 * @param   {boolean} [isFS]      - Whether to treat all paths as filesystem paths
 * @returns {object}
 */
function fastParse (args, isUrl, isFS) {
  args = getArgs(args);
  var paths = args.paths;
  var options = args.options;

  var result = {
    last: paths.length - 1,
    hasUrls: false,
    hrefs: [],
    pathnames: [],
    searches: [],
    hashes: []
  };

  // Parse each path
  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    var href, pathname, search, hash, parsedPath;

    if (path instanceof OmniPath) {
      // Yay! It's already parsed
      if (isUrl || path.isUrl) {
        result.hasUrls = true;
        href = path.href;
        pathname = path.formatPart('pathname');
      }
      else {
        href = pathname = path.pathname;
      }
      search = path.search;
      hash = path.hash;

      if (i === 0 && !options) {
        // If no options are explicitly passed, and the first arg
        // is an OmniPath, then we can use it's options
        options = path._options;
      }
    }
    else {
      href = toString(path);

      if (isUrl || (!isFS && protocolPattern.test(href))) {
        // It's a URL
        result.hasUrls = true;
        parsedPath = parsePath(href, { allowFileQuery: true, allowFileHash: true, parseQueryString: false });
        pathname = parsedPath.pathname;
        search = parsedPath.search;
        hash = parsedPath.hash;
      }
      else {
        // It's a file path
        if (options) {
          // Split the pathname from the search/hash
          parsedPath = parsePath(href,
            { allowFileQuery: options.allowFileQuery, allowFileHash: options.allowFileHash, parseQueryString: false });
          pathname = parsedPath.pathname;
          search = parsedPath.search;
          hash = parsedPath.hash;
        }
        else {
          // File paths with query/hash aren't supported
          pathname = href;
          search = hash = '';
        }
      }
    }

    result.hrefs.push(href);
    result.pathnames.push(pathname);
    result.searches.push(search);
    result.hashes.push(hash);
  }

  return result;
}

/**
 * Splits the given argument list into separate arguments.
 *
 * @param   {Arguments} args - The argument list to be split
 * @returns {{paths: Array, options: ?Options}}
 */
function getArgs (args) {
  var result = {
    paths: [],
    options: null
  };

  if (args && args.length > 0) {
    var lastArg = args[args.length - 1];
    if (typeof (lastArg) === 'string' || lastArg instanceof OmniPath || lastArg instanceof url.Url) {
      // There is no "options" argument.  All arguments are paths.
      result.paths = Array.prototype.slice.call(args);
    }
    else {
      // The last argument is the "options" argument.  All others are paths.
      result.options = lastArg;
      result.paths = Array.prototype.slice.call(args, 0, args.length - 1);
    }
  }

  return result;
}

/**
 * Determines whether the given path (or segment) begins with a separator character.
 *
 * @param {string} p - A path or segment
 * @returns {boolean}
 */
function startsWithAnySeparator (p) {
  var firstChar = p[0];
  return firstChar === '/' || firstChar === '\\';
}

/**
 * Determines whether the given path (or segment) ends with a separator character.
 *
 * @param {string} p - A path or segment
 * @returns {boolean}
 */
function endsWithAnySeparator (p) {
  var lastChar = p.substr(-1);
  return lastChar === '/' || lastChar === '\\';
}
