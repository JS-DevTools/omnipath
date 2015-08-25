'use strict';

var props = [
  'isUrl', 'isFS', 'isPosix', 'isWindows', 'isUnc', 'isAbsolute', 'sep', 'delimiter',
  'href', 'protocol', 'slashes', 'auth', 'host', 'hostname', 'port', 'path', 'pathname',
  'root', 'dir', 'base', 'name', 'ext', 'search', 'query', 'hash'
];

module.exports = {
  props: props,
  isString: isString,
  isObject: isObject,
  isNull: isNull,
  isNullOrUndefined: isNullOrUndefined,
  toString: toString,
  inherits: inherits,
  copy: copy,
  fastParse: fastParse,
  getType: getType,
  splitFile: splitFile,
  getArgs: getArgs
};

var OmniPath        = require('./omni-path'),
    url             = require('./node/url'),
    querystring     = require('querystring'),
    protocolPattern = /^[a-z0-9.+-]+:\/\//i;

/**
 * Returns true if the given value is a string.
 *
 * @param {*} arg - The value to check
 * @returns {boolean}
 */
function isString(arg) {
  return typeof(arg) === 'string';
}

/**
 * Returns true if the given value is an object.
 *
 * @param {*} arg - The value to check
 * @returns {boolean}
 */
function isObject(arg) {
  return typeof(arg) === 'object' && arg !== null;
}

/**
 * Returns true if the given value is null.
 *
 * @param {*} arg - The value to check
 * @returns {boolean}
 */
function isNull(arg) {
  return arg === null;
}

/**
 * Returns true if the given value is null or undefined.
 *
 * @param {*} arg - The value to check
 * @returns {boolean}
 */
function isNullOrUndefined(arg) {
  return arg == null; // jshint ignore:line
}

/**
 * Returns the given path a a string
 *
 * @param   {string|Url|OmniPath} p - The file path or URL to format.
 * @returns {string}
 */
function toString(p) {
  if (typeof(p) === 'string') {
    return p;
  }
  else if (p instanceof url.Url) {
    return p.format();
  }
  else if (p instanceof OmniPath) {
    return p.format();
  }

  throw new Error('Expected a file path or URL, but got ' + typeof(p) + ' ' + p);
}

/**
 * Inherits the static and prototype methods of a superclass on a subclass.
 *
 * @param {Class} Child - The class that inherits from Super
 * @param {Class} Super - The parent class
 */
function inherits(Child, Super) {
  Child.prototype = Object.create(Super.prototype);
  Child.prototype.constructor = Child;

  var staticMembers = Object.keys(Super);
  staticMembers.forEach(function(staticMember) {
    if (typeof(Super[staticMember]) === 'function') {
      Child[staticMember] = function() {
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
function copy(src, dest) {
  // Copy all public properties
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    dest[prop] = src[prop];
  }

  return dest;
}

/**
 * Performs a fast, minimal parsing of the given path(s).
 *
 * @param   {...string|...Url|...OmniPath} p - The results to parse
 * @returns {{isUrl: boolean, isWindows: boolean, isPosix: boolean, href: string}[]}
 */
function fastParse(p) {
  var first = null;
  var results = [];
  results.hasUrls = false;

  for (var i = 0; i < arguments.length; i++) {
    var path = arguments[i];
    var parsed = {href: util.toString(path)};
    if (path instanceof OmniPath) {
      parsed.isUrl = path.isUrl;
      parsed.isPosix = path.isPosix;
      parsed.isWindows = path.isWindows;
    }
    else if (protocolPattern.test(parsed.href)) {
      parsed.isUrl = true;
    }
    else if (first) {
      parsed.isUrl = first.isUrl;
      parsed.isPosix = first.isPosix;
      parsed.isWindows = first.isWindows;
    }
    else {
      var type = getType(path.href);
      parsed.isUrl = type.isUrl;
      parsed.isPosix = type.isPosix;
      parsed.isWindows = type.isWindows;
    }

    results.push(parsed);
    results.hasUrls = results.hasUrls || parsed.isUrl;
    if (!first) {
      first = parsed;
    }
  }

  return results;
}

/**
 * Determines the type of the given path.
 *
 * @param   {string} p - The path to inspect. MUST BE A STRING
 * @returns {object}
 */
function getType(p) {
  // If the path starts with a protocol, then treat it as a URL,
  // regardless of the runtime environment, and even if the path
  // could also be a valid filesystem path for the environment.
  if (protocolPattern.test(p)) {
    return {isUrl: true};
  }

  // Parse the path based on the runtime environment
  if (process.browser) {
    return {isUrl: true};
  }
  else if (process.platform === 'win32') {
    return {isWindows: true};
  }
  else {
    return {isPosix: true};
  }
}

/**
 * Splits the query and hash from the given file path, if the options allow it.
 *
 * @param   {string}          file    - The file path to split
 * @param   {PathOptions}     options - Options that determine whether queries and hashes are allowed
 * @returns {object}
 */
function splitFile(file, options) {
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

  return {
    pathname: file,
    search: search,
    query: query,
    hash: hash
  };
}

/**
 * Splits the given argument list into separate arguments.
 *
 * @param   {Arguments} args - The argument list to be split
 * @returns {{paths: Array, options: ?Options}}
 */
function getArgs(args) {
  var result = {
    paths: [],
    options: null
  };

  if (args && args.length > 0) {
    var lastArg = args[args.length - 1];
    if (typeof(lastArg) === 'string' || lastArg instanceof OmniPath || lastArg instanceof url.Url) {
      // There is no "options" argument.  All arguments are paths.
      result.paths = Array.prototype.slice.call(args);
    }
    else {
      // The last argument is the "options" argument.  All others are paths.
      result.options = args[0];
      result.paths = Array.prototype.slice.call(args, 1);
    }
  }

  return result;
}
