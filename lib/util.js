'use strict';

var querystring = require('querystring');

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
  splitFile: splitFile
};

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
  if (p && typeof(p) === 'object' && typeof(p.format) === 'function') {
    p = p.format();
  }

  if (typeof(p) === 'string') {
    return p;
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

  // Copy private properties
  dest._options = src._options;

  return dest;
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
