(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.OmniPath = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**!
 * OmniPath v1.0.0-beta.13
 *
 * @link https://github.com/BigstickCarpet/omnipath
 * @license MIT
 */
module.exports = require('./omni-path');
module.exports.Posix = module.exports.posix = require('./omni-posix');
module.exports.Windows = module.exports.windows = module.exports.win32 = require('./omni-windows');
module.exports.Url = module.exports.url = require('./omni-url');

},{"./omni-path":4,"./omni-posix":5,"./omni-url":6,"./omni-windows":7}],2:[function(require,module,exports){
(function (process){
(function() {
  'use strict';

  var nodeVersion = /\d+\.\d+/.exec(process.version);
  if (nodeVersion && parseFloat(nodeVersion) >= 0.12) {
    // We're running in Node v0.12+, so use the built-in "path" module
    module.exports = require('path');
    return;
  }

  // On older versions of Node and Browserify, use the following code instead of the built-in "path" module.
  // This code is direct copy of the "path" module from Node v0.12
  // https://github.com/joyent/node/blob/master/lib/path.js

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  'use strict';


  var isWindows = process.platform === 'win32';
  var util = require('../util');


  // resolves . and .. elements in a path array with directory names there
  // must be no slashes or device names (c:\) in the array
  // (so also no leading and trailing slashes - it does not distinguish
  // relative and absolute paths)
  function normalizeArray(parts, allowAboveRoot) {
    var res = [];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];

      // ignore empty parts
      if (!p || p === '.')
        continue;

      if (p === '..') {
        if (res.length && res[res.length - 1] !== '..') {
          res.pop();
        } else if (allowAboveRoot) {
          res.push('..');
        }
      } else {
        res.push(p);
      }
    }

    return res;
  }

  // returns an array with empty elements removed from either end of the input
  // array or the original array if no elements need to be removed
  function trimArray(arr) {
    var lastIndex = arr.length - 1;
    var start = 0;
    for (; start <= lastIndex; start++) {
      if (arr[start])
        break;
    }

    var end = lastIndex;
    for (; end >= 0; end--) {
      if (arr[end])
        break;
    }

    if (start === 0 && end === lastIndex)
      return arr;
    if (start > end)
      return [];
    return arr.slice(start, end + 1);
  }

  // Regex to split a windows path into three parts: [*, device, slash,
  // tail] windows-only
  var splitDeviceRe =
      /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

  // Regex to split the tail part of the above into [*, dir, basename, ext]
  var splitTailRe =
      /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

  var win32 = {};

  // Function to split a filename into [root, dir, basename, ext]
  function win32SplitPath(filename) {
    // Separate device+slash from tail
    var result = splitDeviceRe.exec(filename),
        device = (result[1] || '') + (result[2] || ''),
        tail = result[3] || '';
    // Split the tail into dir, basename and extension
    var result2 = splitTailRe.exec(tail),
        dir = result2[1],
        basename = result2[2],
        ext = result2[3];
    return [device, dir, basename, ext];
  }

  function win32StatPath(path) {
    var result = splitDeviceRe.exec(path),
        device = result[1] || '',
        isUnc = !!device && device[1] !== ':';
    return {
      device: device,
      isUnc: isUnc,
      isAbsolute: isUnc || !!result[2], // UNC paths are always absolute
      tail: result[3]
    };
  }

  function normalizeUNCRoot(device) {
    return '\\\\' + device.replace(/^[\\\/]+/, '').replace(/[\\\/]+/g, '\\');
  }

  // path.resolve([from ...], to)
  win32.resolve = function() {
    var resolvedDevice = '',
        resolvedTail = '',
        resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1; i--) {
      var path;
      if (i >= 0) {
        path = arguments[i];
      } else if (!resolvedDevice) {
        path = process.cwd();
      } else {
        // Windows has the concept of drive-specific current working
        // directories. If we've resolved a drive letter but not yet an
        // absolute path, get cwd for that drive. We're sure the device is not
        // an unc path at this points, because unc paths are always absolute.
        path = process.env['=' + resolvedDevice];
        // Verify that a drive-local cwd was found and that it actually points
        // to our drive. If not, default to the drive's root.
        if (!path || path.substr(0, 3).toLowerCase() !==
            resolvedDevice.toLowerCase() + '\\') {
          path = resolvedDevice + '\\';
        }
      }

      // Skip empty and invalid entries
      if (!util.isString(path)) {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }

      var result = win32StatPath(path),
          device = result.device,
          isUnc = result.isUnc,
          isAbsolute = result.isAbsolute,
          tail = result.tail;

      if (device &&
          resolvedDevice &&
          device.toLowerCase() !== resolvedDevice.toLowerCase()) {
        // This path points to another device so it is not applicable
        continue;
      }

      if (!resolvedDevice) {
        resolvedDevice = device;
      }
      if (!resolvedAbsolute) {
        resolvedTail = tail + '\\' + resolvedTail;
        resolvedAbsolute = isAbsolute;
      }

      if (resolvedDevice && resolvedAbsolute) {
        break;
      }
    }

    // Convert slashes to backslashes when `resolvedDevice` points to an UNC
    // root. Also squash multiple slashes into a single one where appropriate.
    if (isUnc) {
      resolvedDevice = normalizeUNCRoot(resolvedDevice);
    }

    // At this point the path should be resolved to a full absolute path,
    // but handle relative paths to be safe (might happen when process.cwd()
    // fails)

    // Normalize the tail path
    resolvedTail = normalizeArray(resolvedTail.split(/[\\\/]+/),
                                  !resolvedAbsolute).join('\\');

    return (resolvedDevice + (resolvedAbsolute ? '\\' : '') + resolvedTail) ||
           '.';
  };


  win32.normalize = function(path) {
    var result = win32StatPath(path),
        device = result.device,
        isUnc = result.isUnc,
        isAbsolute = result.isAbsolute,
        tail = result.tail,
        trailingSlash = /[\\\/]$/.test(tail);

    // Normalize the tail path
    tail = normalizeArray(tail.split(/[\\\/]+/), !isAbsolute).join('\\');

    if (!tail && !isAbsolute) {
      tail = '.';
    }
    if (tail && trailingSlash) {
      tail += '\\';
    }

    // Convert slashes to backslashes when `device` points to an UNC root.
    // Also squash multiple slashes into a single one where appropriate.
    if (isUnc) {
      device = normalizeUNCRoot(device);
    }

    return device + (isAbsolute ? '\\' : '') + tail;
  };


  win32.isAbsolute = function(path) {
    return win32StatPath(path).isAbsolute;
  };

  win32.join = function() {
    var paths = [];
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!util.isString(arg)) {
        throw new TypeError('Arguments to path.join must be strings');
      }
      if (arg) {
        paths.push(arg);
      }
    }

    var joined = paths.join('\\');

    // Make sure that the joined path doesn't start with two slashes, because
    // normalize() will mistake it for an UNC path then.
    //
    // This step is skipped when it is very clear that the user actually
    // intended to point at an UNC path. This is assumed when the first
    // non-empty string arguments starts with exactly two slashes followed by
    // at least one more non-slash character.
    //
    // Note that for normalize() to treat a path as an UNC path it needs to
    // have at least 2 components, so we don't filter for that here.
    // This means that the user can use join to construct UNC paths from
    // a server name and a share name; for example:
    //   path.join('//server', 'share') -> '\\\\server\\share\')
    if (!/^[\\\/]{2}[^\\\/]/.test(paths[0])) {
      joined = joined.replace(/^[\\\/]{2,}/, '\\');
    }

    return win32.normalize(joined);
  };


  // path.relative(from, to)
  // it will solve the relative path from 'from' to 'to', for instance:
  // from = 'C:\\orandea\\test\\aaa'
  // to = 'C:\\orandea\\impl\\bbb'
  // The output of the function should be: '..\\..\\impl\\bbb'
  win32.relative = function(from, to) {
    from = win32.resolve(from);
    to = win32.resolve(to);

    // windows is not case sensitive
    var lowerFrom = from.toLowerCase();
    var lowerTo = to.toLowerCase();

    var toParts = trimArray(to.split('\\'));

    var lowerFromParts = trimArray(lowerFrom.split('\\'));
    var lowerToParts = trimArray(lowerTo.split('\\'));

    var length = Math.min(lowerFromParts.length, lowerToParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (lowerFromParts[i] !== lowerToParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    if (samePartsLength == 0) {
      return to;
    }

    var outputParts = [];
    for (var i = samePartsLength; i < lowerFromParts.length; i++) {
      outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('\\');
  };


  win32._makeLong = function(path) {
    // Note: this will *probably* throw somewhere.
    if (!util.isString(path))
      return path;

    if (!path) {
      return '';
    }

    var resolvedPath = win32.resolve(path);

    if (/^[a-zA-Z]\:\\/.test(resolvedPath)) {
      // path is local filesystem path, which needs to be converted
      // to long UNC path.
      return '\\\\?\\' + resolvedPath;
    } else if (/^\\\\[^?.]/.test(resolvedPath)) {
      // path is network UNC path, which needs to be converted
      // to long UNC path.
      return '\\\\?\\UNC\\' + resolvedPath.substring(2);
    }

    return path;
  };


  win32.dirname = function(path) {
    var result = win32SplitPath(path),
        root = result[0],
        dir = result[1];

    if (!root && !dir) {
      // No dirname whatsoever
      return '.';
    }

    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }

    return root + dir;
  };


  win32.basename = function(path, ext) {
    var f = win32SplitPath(path)[2];
    // TODO: make this comparison case-insensitive on windows?
    if (ext && f.substr(-1 * ext.length) === ext) {
      f = f.substr(0, f.length - ext.length);
    }
    return f;
  };


  win32.extname = function(path) {
    return win32SplitPath(path)[3];
  };


  win32.format = function(pathObject) {
    if (!util.isObject(pathObject)) {
      throw new TypeError(
          "Parameter 'pathObject' must be an object, not " + typeof pathObject
      );
    }

    var root = pathObject.root || '';

    if (!util.isString(root)) {
      throw new TypeError(
          "'pathObject.root' must be a string or undefined, not " +
          typeof pathObject.root
      );
    }

    var dir = pathObject.dir;
    var base = pathObject.base || '';
    if (!dir) {
      return base;
    }
    if (dir[dir.length - 1] === win32.sep) {
      return dir + base;
    }
    return dir + win32.sep + base;
  };


  win32.parse = function(pathString) {
    if (!util.isString(pathString)) {
      throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
      );
    }
    var allParts = win32SplitPath(pathString);
    if (!allParts || allParts.length !== 4) {
      throw new TypeError("Invalid path '" + pathString + "'");
    }
    return {
      root: allParts[0],
      dir: allParts[0] + allParts[1].slice(0, -1),
      base: allParts[2],
      ext: allParts[3],
      name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
    };
  };


  win32.sep = '\\';
  win32.delimiter = ';';


  // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.
  var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  var posix = {};


  function posixSplitPath(filename) {
    return splitPathRe.exec(filename).slice(1);
  }


  // path.resolve([from ...], to)
  // posix version
  posix.resolve = function() {
    var resolvedPath = '',
        resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = (i >= 0) ? arguments[i] : process.cwd();

      // Skip empty and invalid entries
      if (!util.isString(path)) {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path[0] === '/';
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeArray(resolvedPath.split('/'),
                                  !resolvedAbsolute).join('/');

    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
  };

  // path.normalize(path)
  // posix version
  posix.normalize = function(path) {
    var isAbsolute = posix.isAbsolute(path),
        trailingSlash = path && path[path.length - 1] === '/';

    // Normalize the path
    path = normalizeArray(path.split('/'), !isAbsolute).join('/');

    if (!path && !isAbsolute) {
      path = '.';
    }
    if (path && trailingSlash) {
      path += '/';
    }

    return (isAbsolute ? '/' : '') + path;
  };

  // posix version
  posix.isAbsolute = function(path) {
    return path.charAt(0) === '/';
  };

  // posix version
  posix.join = function() {
    var path = '';
    for (var i = 0; i < arguments.length; i++) {
      var segment = arguments[i];
      if (!util.isString(segment)) {
        throw new TypeError('Arguments to path.join must be strings');
      }
      if (segment) {
        if (!path) {
          path += segment;
        } else {
          path += '/' + segment;
        }
      }
    }
    return posix.normalize(path);
  };


  // path.relative(from, to)
  // posix version
  posix.relative = function(from, to) {
    from = posix.resolve(from).substr(1);
    to = posix.resolve(to).substr(1);

    var fromParts = trimArray(from.split('/'));
    var toParts = trimArray(to.split('/'));

    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('/');
  };


  posix._makeLong = function(path) {
    return path;
  };


  posix.dirname = function(path) {
    var result = posixSplitPath(path),
        root = result[0],
        dir = result[1];

    if (!root && !dir) {
      // No dirname whatsoever
      return '.';
    }

    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }

    return root + dir;
  };


  posix.basename = function(path, ext) {
    var f = posixSplitPath(path)[2];
    // TODO: make this comparison case-insensitive on windows?
    if (ext && f.substr(-1 * ext.length) === ext) {
      f = f.substr(0, f.length - ext.length);
    }
    return f;
  };


  posix.extname = function(path) {
    return posixSplitPath(path)[3];
  };


  posix.format = function(pathObject) {
    if (!util.isObject(pathObject)) {
      throw new TypeError(
          "Parameter 'pathObject' must be an object, not " + typeof pathObject
      );
    }

    var root = pathObject.root || '';

    if (!util.isString(root)) {
      throw new TypeError(
          "'pathObject.root' must be a string or undefined, not " +
          typeof pathObject.root
      );
    }

    var dir = pathObject.dir ? pathObject.dir + posix.sep : '';
    var base = pathObject.base || '';
    return dir + base;
  };


  posix.parse = function(pathString) {
    if (!util.isString(pathString)) {
      throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
      );
    }
    var allParts = posixSplitPath(pathString);
    if (!allParts || allParts.length !== 4) {
      throw new TypeError("Invalid path '" + pathString + "'");
    }
    allParts[1] = allParts[1] || '';
    allParts[2] = allParts[2] || '';
    allParts[3] = allParts[3] || '';

    return {
      root: allParts[0],
      dir: allParts[0] + allParts[1].slice(0, -1),
      base: allParts[2],
      ext: allParts[3],
      name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
    };
  };


  posix.sep = '/';
  posix.delimiter = ':';


  if (isWindows)
    module.exports = win32;
  else /* posix */
    module.exports = posix;

  module.exports.posix = posix;
  module.exports.win32 = win32;

})();

}).call(this,require('_process'))

},{"../util":8,"_process":9,"path":2}],3:[function(require,module,exports){
(function (process){
(function() {
  'use strict';

  var nodeVersion = /\d+\.\d+/.exec(process.version);
  if (nodeVersion && parseFloat(nodeVersion) >= 0.12) {
    // We're running in Node v0.12+, so use the built-in "url" module
    module.exports = require('url');
    return;
  }

  // On older versions of Node and Browserify, use the following code instead of the built-in "url" module.
  // This code is direct copy of the "url" module from Node v0.12
  // https://github.com/joyent/node/blob/master/lib/url.js

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  var punycode = require('punycode');
  var util = require('../util');

  exports.parse = urlParse;
  exports.resolve = urlResolve;
  exports.resolveObject = urlResolveObject;
  exports.format = urlFormat;

  exports.Url = Url;

  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  }

  // Reference: RFC 3986, RFC 1808, RFC 2396

  // define these here so at least they only have to be
  // compiled once on the first module load.
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
      portPattern = /:[0-9]*$/,

      // Special case for a simple path URL
      simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

      // RFC 2396: characters reserved for delimiting URLs.
      // We actually just auto-escape these.
      delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

      // RFC 2396: characters not allowed for various reasons.
      unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

      // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
      autoEscape = ['\''].concat(unwise),
      // Characters that are never ever allowed in a hostname.
      // Note that any invalid chars are also handled, but these
      // are the ones that are *expected* to be seen, so we fast-path
      // them.
      nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
      hostEndingChars = ['/', '?', '#'],
      hostnameMaxLen = 255,
      hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
      hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
      // protocols that can allow "unsafe" and "unwise" chars.
      unsafeProtocol = {
        'javascript': true,
        'javascript:': true
      },
      // protocols that never have a hostname.
      hostlessProtocol = {
        'javascript': true,
        'javascript:': true
      },
      // protocols that always contain a // bit.
      slashedProtocol = {
        'http': true,
        'https': true,
        'ftp': true,
        'gopher': true,
        'file': true,
        'http:': true,
        'https:': true,
        'ftp:': true,
        'gopher:': true,
        'file:': true
      },
      querystring = require('querystring');

  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && util.isObject(url) && url instanceof Url) return url;

    var u = new Url;
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
  }

  Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
    if (!util.isString(url)) {
      throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'),
        splitter =
            (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
        uSplit = url.split(splitter),
        slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);

    var rest = url;

    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim();

    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        this.path = rest;
        this.href = rest;
        this.pathname = simplePath[1];
        if (simplePath[2]) {
          this.search = simplePath[2];
          if (parseQueryString) {
            this.query = querystring.parse(this.search.substr(1));
          } else {
            this.query = this.search.substr(1);
          }
        } else if (parseQueryString) {
          this.search = '';
          this.query = {};
        }
        return this;
      }
    }

    var proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      this.protocol = lowerProto;
      rest = rest.substr(proto.length);
    }

    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === '//';
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        this.slashes = true;
      }
    }

    if (!hostlessProtocol[proto] &&
        (slashes || (proto && !slashedProtocol[proto]))) {

      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c

      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.

      // find the first instance of any hostEndingChars
      var hostEnd = -1;
      for (var i = 0; i < hostEndingChars.length; i++) {
        var hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }

      // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.
      var auth, atSign;
      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
      }

      // Now we have a portion which is definitely the auth.
      // Pull that off.
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        this.auth = decodeURIComponent(auth);
      }

      // the host is the remaining to the left of the first non-host char
      hostEnd = -1;
      for (var i = 0; i < nonHostChars.length; i++) {
        var hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          hostEnd = hec;
      }
      // if we still have not hit it, then the entire thing is a host.
      if (hostEnd === -1)
        hostEnd = rest.length;

      this.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);

      // pull out port.
      this.parseHost();

      // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.
      this.hostname = this.hostname || '';

      // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.
      var ipv6Hostname = this.hostname[0] === '[' &&
          this.hostname[this.hostname.length - 1] === ']';

      // validate a little.
      if (!ipv6Hostname) {
        var hostparts = this.hostname.split(/\./);
        for (var i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part) continue;
          if (!part.match(hostnamePartPattern)) {
            var newpart = '';
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x';
              } else {
                newpart += part[j];
              }
            }
            // we test again with ASCII char only
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = '/' + notHost.join('.') + rest;
              }
              this.hostname = validParts.join('.');
              break;
            }
          }
        }
      }

      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = '';
      } else {
        // hostnames are always lower case.
        this.hostname = this.hostname.toLowerCase();
      }

      if (!ipv6Hostname) {
        // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        this.hostname = punycode.toASCII(this.hostname);
      }

      var p = this.port ? ':' + this.port : '';
      var h = this.hostname || '';
      this.host = h + p;
      this.href += this.host;

      // strip [ and ] from the hostname
      // the host field still retains them, though
      if (ipv6Hostname) {
        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
        if (rest[0] !== '/') {
          rest = '/' + rest;
        }
      }
    }

    // now rest is set to the post-host stuff.
    // chop off any delim chars.
    if (!unsafeProtocol[lowerProto]) {

      // First, make 100% sure that any "autoEscape" chars get
      // escaped, even if encodeURIComponent doesn't think they
      // need to be.
      for (var i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1)
          continue;
        var esc = encodeURIComponent(ae);
        if (esc === ae) {
          esc = escape(ae);
        }
        rest = rest.split(ae).join(esc);
      }
    }


    // chop off from the tail first.
    var hash = rest.indexOf('#');
    if (hash !== -1) {
      // got a fragment string.
      this.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf('?');
    if (qm !== -1) {
      this.search = rest.substr(qm);
      this.query = rest.substr(qm + 1);
      if (parseQueryString) {
        this.query = querystring.parse(this.query);
      }
      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      // no query string, but parseQueryString still requested
      this.search = '';
      this.query = {};
    }
    if (rest) this.pathname = rest;
    if (slashedProtocol[lowerProto] &&
        this.hostname && !this.pathname) {
      this.pathname = '/';
    }

    //to support http.request
    if (this.pathname || this.search) {
      var p = this.pathname || '';
      var s = this.search || '';
      this.path = p + s;
    }

    // finally, reconstruct the href based on what has been validated.
    this.href = this.format();
    return this;
  };

  // format a parsed object into a url string
  function urlFormat(obj) {
    // ensure it's an object, and not a string url.
    // If it's an obj, this is a no-op.
    // this way, you can call url_format() on strings
    // to clean up potentially wonky urls.
    if (util.isString(obj)) obj = urlParse(obj);
    if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
    return obj.format();
  }

  Url.prototype.format = function() {
    var auth = this.auth || '';
    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ':');
      auth += '@';
    }

    var protocol = this.protocol || '',
        pathname = this.pathname || '',
        hash = this.hash || '',
        host = false,
        query = '';

    if (this.host) {
      host = auth + this.host;
    } else if (this.hostname) {
      host = auth + (this.hostname.indexOf(':') === -1 ?
          this.hostname :
          '[' + this.hostname + ']');
      if (this.port) {
        host += ':' + this.port;
      }
    }

    if (this.query &&
        util.isObject(this.query) &&
        Object.keys(this.query).length) {
      query = querystring.stringify(this.query);
    }

    var search = this.search || (query && ('?' + query)) || '';

    if (protocol && protocol.substr(-1) !== ':') protocol += ':';

    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (this.slashes ||
        (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = '//' + (host || '');
      if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) {
      host = '';
    }

    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;

    pathname = pathname.replace(/[?#]/g, function(match) {
      return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');

    return protocol + host + pathname + search + hash;
  };

  function urlResolve(source, relative) {
    return urlParse(source, false, true).resolve(relative);
  }

  Url.prototype.resolve = function(relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };

  function urlResolveObject(source, relative) {
    if (!source) return relative;
    return urlParse(source, false, true).resolveObject(relative);
  }

  Url.prototype.resolveObject = function(relative) {
    if (util.isString(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }

    var result = new Url();
    var tkeys = Object.keys(this);
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    }

    // hash is always overridden, no matter what.
    // even href="" will remove it.
    result.hash = relative.hash;

    // if the relative url is empty, then there's nothing left to do here.
    if (relative.href === '') {
      result.href = result.format();
      return result;
    }

    // hrefs like //foo/bar always cut to the protocol.
    if (relative.slashes && !relative.protocol) {
      // take everything except the protocol from relative
      var rkeys = Object.keys(relative);
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== 'protocol')
          result[rkey] = relative[rkey];
      }

      //urlParse appends trailing / to urls like http://www.example.com
      if (slashedProtocol[result.protocol] &&
          result.hostname && !result.pathname) {
        result.path = result.pathname = '/';
      }

      result.href = result.format();
      return result;
    }

    if (relative.protocol && relative.protocol !== result.protocol) {
      // if it's a known url protocol, then changing
      // the protocol does weird things
      // first, if it's not file:, then we MUST have a host,
      // and if there was a path
      // to begin with, then we MUST have a path.
      // if it is file:, then the host is dropped,
      // because that's known to be hostless.
      // anything else is assumed to be absolute.
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }
        result.href = result.format();
        return result;
      }

      result.protocol = relative.protocol;
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        var relPath = (relative.pathname || '').split('/');
        while (relPath.length && !(relative.host = relPath.shift()));
        if (!relative.host) relative.host = '';
        if (!relative.hostname) relative.hostname = '';
        if (relPath[0] !== '') relPath.unshift('');
        if (relPath.length < 2) relPath.unshift('');
        result.pathname = relPath.join('/');
      } else {
        result.pathname = relative.pathname;
      }
      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || '';
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port;
      // to support http.request
      if (result.pathname || result.search) {
        var p = result.pathname || '';
        var s = result.search || '';
        result.path = p + s;
      }
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }

    var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
        isRelAbs = (
            relative.host ||
            relative.pathname && relative.pathname.charAt(0) === '/'
        ),
        mustEndAbs = (isRelAbs || isSourceAbs ||
                      (result.host && relative.pathname)),
        removeAllDots = mustEndAbs,
        srcPath = result.pathname && result.pathname.split('/') || [],
        relPath = relative.pathname && relative.pathname.split('/') || [],
        psychotic = result.protocol && !slashedProtocol[result.protocol];

    // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
    if (psychotic) {
      result.hostname = '';
      result.port = null;
      if (result.host) {
        if (srcPath[0] === '') srcPath[0] = result.host;
        else srcPath.unshift(result.host);
      }
      result.host = '';
      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;
        if (relative.host) {
          if (relPath[0] === '') relPath[0] = relative.host;
          else relPath.unshift(relative.host);
        }
        relative.host = null;
      }
      mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }

    if (isRelAbs) {
      // it's absolute.
      result.host = (relative.host || relative.host === '') ?
                    relative.host : result.host;
      result.hostname = (relative.hostname || relative.hostname === '') ?
                        relative.hostname : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath;
      // fall through to the dot-handling below.
    } else if (relPath.length) {
      // it's relative
      // throw away the existing file, and take the new path instead.
      if (!srcPath) srcPath = [];
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative.search;
      result.query = relative.query;
    } else if (!util.isNullOrUndefined(relative.search)) {
      // just pull out the search.
      // like href='?foo'.
      // Put this after the other two cases because it simplifies the booleans
      if (psychotic) {
        result.hostname = result.host = srcPath.shift();
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        var authInHost = result.host && result.host.indexOf('@') > 0 ?
                         result.host.split('@') : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      result.search = relative.search;
      result.query = relative.query;
      //to support http.request
      if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : '') +
                      (result.search ? result.search : '');
      }
      result.href = result.format();
      return result;
    }

    if (!srcPath.length) {
      // no path at all.  easy.
      // we've already handled the other stuff above.
      result.pathname = null;
      //to support http.request
      if (result.search) {
        result.path = '/' + result.search;
      } else {
        result.path = null;
      }
      result.href = result.format();
      return result;
    }

    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (
        (result.host || relative.host || srcPath.length > 1) &&
        (last === '.' || last === '..') || last === '');

    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];
      if (last === '.') {
        srcPath.splice(i, 1);
      } else if (last === '..') {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift('..');
      }
    }

    if (mustEndAbs && srcPath[0] !== '' &&
        (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
      srcPath.unshift('');
    }

    if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
      srcPath.push('');
    }

    var isAbsolute = srcPath[0] === '' ||
        (srcPath[0] && srcPath[0].charAt(0) === '/');

    // put the host back
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? '' :
                                      srcPath.length ? srcPath.shift() : '';
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    mustEndAbs = mustEndAbs || (result.host && srcPath.length);

    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift('');
    }

    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join('/');
    }

    //to support request.http
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };

  Url.prototype.parseHost = function() {
    var host = this.host;
    var port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ':') {
        this.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host) this.hostname = host;
  };

})();

}).call(this,require('_process'))

},{"../util":8,"_process":9,"punycode":10,"querystring":13,"url":3}],4:[function(require,module,exports){
(function (process){
'use strict';

var path             = require('./node/path'),
    url              = require('./node/url'),
    util             = require('./util'),
    querystring      = require('querystring'),
    protocolPattern  = /^[a-z0-9.+-]+:\/\//i,
    backslashPattern = /\\/g;

module.exports = OmniPath;

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

/**
 * Returns the directory name of the given path or URL. Identical to Node's {@link path.dirname}.
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
 * Returns the last portion of the given path or URL. Identical to Node's {@link path.basename}.
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
 * Returns the extension of the given path or URL. Identical to Node's {@link path.extname}.
 *
 * {@link https://nodejs.org/api/path.html#path_path_extname_p}
 *
 * @param   {string|Url|OmniPath}  p          - The file path or URL to parse
 * @param   {PathOptions}          [options]  - Options that determine how paths are parsed
 * @returns {string}
 */
OmniPath.extname = OmniPath.ext;

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
// * Resolves `to` to an absolute path. Identical to Node's {@link path.resolve} or {@link url.resolve}.
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
// * Resolves the given path or url, relative to this one. Identical to Node's {@link path.resolve}
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
 * and standardizing slashes. Identical to Node's {@link path.normalize}.
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
 * and standardizing slashes. Identical to Node's {@link path.normalize}.
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
 * Returns the given path or URL as a formatted string. Identical to Node's {@link path.format} or {@link url.format}.
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
 * Returns the formatted path or URL string. Identical to Node's {@link path.format} or {@link url.format}.
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
 * Parses the given path or URL, and returns a {@link OmniPath} object. Identical to Node's
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
 * Identical to Node's {@link path.parse} and {@link url.parse}.
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
    for (var i = 0; i < util.props.length; i++) {
      var prop = util.props[i];
      this[prop] = p[prop];
    }
    this.options = options || p._options || this._options;
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

}).call(this,require('_process'))

},{"./node/path":2,"./node/url":3,"./util":8,"_process":9,"querystring":13}],5:[function(require,module,exports){
'use strict';

var posix    = require('./node/path').posix,
    OmniPath = require('./index'),
    util     = require('./util');

module.exports = OmniPosix;

/**
 * An {@link OmniPath} subclass that always treats paths as POSIX paths.
 *
 * @constructor
 */
function OmniPosix(p, options) {
  this._path = posix;
  this.parse(p, options);
}

util.inherits(OmniPosix, OmniPath);
OmniPosix.sep = posix.sep;
OmniPosix.delimiter = posix.delimiter;

/**
 * Parses the given path as a POSIX path, and sets the corresponding properties of this {@link OmniPosix} object.
 *
 * @param   {string|Url|OmniPosix}  p         - The file path or URL to parse
 * @param   {PathOptions}           [options] - Options that determine how paths are parsed
 */
OmniPosix.prototype.parse = function(p, options) {
  p = OmniPath.prototype.parse.apply(this, arguments);
  if (typeof(p) === 'string') {
    var split = util.splitFile(p, options);
    var parsed = posix.parse(split.pathname);

    this.isFS = true;
    this.isPosix = true;
    this.isAbsolute = posix.isAbsolute(split.pathname);
    this.sep = posix.sep;
    this.delimiter = posix.delimiter;
    this.href = p;
    this.path = split.pathname + split.search;
    this.pathname = split.pathname;
    this.root = parsed.root;
    this.dir = parsed.dir;
    this.base = parsed.base;
    this.name = parsed.name;
    this.ext = parsed.ext;
    this.search = split.search;
    this.query = split.query;
    this.hash = split.hash;
  }
};

/**
 * Creates a clone of this {@link OmniPosix} object.
 *
 * @param {PathOptions} [options] - Options that determine how paths are parsed
 * @returns {OmniPosix}
 */
OmniPosix.prototype.clone = function(options) {
  return new OmniPosix(this, options);
};

/**
 * Returns the directory name of the path.
 *
 * @returns {string}
 */
OmniPosix.prototype.dirname = function() {
  return posix.dirname(this.pathname);
};

/**
 * Returns the last portion of the path.
 *
 * @param   {string} [ext] - The portion of the file extension to leave off
 * @returns {string}
 */
OmniPosix.prototype.basename = function(ext) {
  return posix.basename(this.base, ext);
};

},{"./index":1,"./node/path":2,"./util":8}],6:[function(require,module,exports){
'use strict';

var posix          = require('./node/path').posix,
    url            = require('./node/url'),
    OmniPath       = require('./omni-path'),
    util           = require('./util'),
    slashesPattern = /^\/*/;

module.exports = OmniUrl;

/**
 * An {@link OmniPath} subclass that always treats paths as URLs.
 *
 * @constructor
 */
function OmniUrl(p, options) {
  this._path = posix;
  this.parse(p, options);
}

util.inherits(OmniUrl, OmniPath);
OmniUrl.sep = '/';

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
 * Returns the directory name of the path.
 *
 * @returns {string}
 */
OmniUrl.prototype.dirname = function() {
  return posix.dirname(this.pathname);
};

/**
 * Returns the last portion of the path.
 *
 * @param   {string} [ext] - The portion of the file extension to leave off
 * @returns {string}
 */
OmniUrl.prototype.basename = function(ext) {
  return posix.basename(this.base, ext);
};

/**
 * Normalizes the URL, resolving any "." and ".." segments, eliminating redundant slashes,
 * and standardizing slashes.
 *
 * @returns {string}
 */
OmniUrl.prototype.normalize = function() {
  var formatted = this._getFormattedPathname();
  var normalized = posix.normalize(formatted);

  var pathnameIsBlank = false;
  if (normalized === '.') {
    // Special case for URLs without a pathname
    normalized = '/';
    pathnameIsBlank = true;
  }

  var clone = this.clone();
  clone.pathname = normalized;
  formatted = url.format(clone);

  if (formatted === '/' && pathnameIsBlank) {
    // Special case for URLs that resolve to cwd ("", ".", "././.", etc.)
    return '.';
  }
  else {
    return formatted;
  }
};

/**
 * Returns the formatted path or URL string.
 *
 * @returns {string}
 */
OmniUrl.prototype.format = function() {
  var clone = this.clone();
  clone.pathname = this._getFormattedPathname();
  return url.format(clone);
};

/**
 * Returns a formatted URL string.
 *
 * @returns {string}
 */
OmniUrl.prototype.toUrlString = function() {
  return url.format(this);
};

/**
 * Returns the formatted pathname by combining {@link OmniUrl#dir} and {@link OmniUrl#base}.
 *
 * @returns {string}
 * @private
 */
OmniUrl.prototype._getFormattedPathname = function() {
  var pathname = this.pathname;

  if (this.dir || this.base) {
    var oldPathname = pathname;

    if (this.dir === this.sep) {
      // Special case for root paths, to match `url.format()` behavior
      var slashes = slashesPattern.exec(this.pathname) || [''];
      pathname = slashes[0] + this.base;
    }
    else {
      pathname = posix.format(this);
    }

    // Maintain any trailing slash on the pathname, for consistency with Node's "url" module
    if (this._endsWithSeparator(oldPathname) && !this._endsWithSeparator(pathname)) {
      pathname += posix.sep;
    }
  }

  return pathname;
};

},{"./node/path":2,"./node/url":3,"./omni-path":4,"./util":8}],7:[function(require,module,exports){
'use strict';

var win32            = require('./node/path').win32,
    OmniPath         = require('./index'),
    util             = require('./util'),
    uncPattern       = /^[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+/, // This matches Node 0.12.7
    splitUncPattern  = /^\/+([^\/]+)(.*)/,
    backslashPattern = /\\/g;

module.exports = OmniWindows;

/**
 * An {@link OmniPath} subclass that always treats paths as Windows paths.
 *
 * @constructor
 */
function OmniWindows(p, options) {
  this._path = win32;
  this.parse(p, options);
}

util.inherits(OmniWindows, OmniPath);
OmniWindows.sep = win32.sep;
OmniWindows.delimiter = win32.delimiter;

/**
 * Parses the given path as a WINDOWS path, and sets the corresponding properties of this {@link OmniWindows} object.
 *
 * @param   {string|Url|OmniWindows}  p         - The file path or URL to parse
 * @param   {PathOptions}             [options] - Options that determine how paths are parsed
 */
OmniWindows.prototype.parse = function(p, options) {
  p = OmniPath.prototype.parse.apply(this, arguments);
  if (typeof(p) === 'string') {
    var split = util.splitFile(p, options);
    var parsed = win32.parse(split.pathname);

    this.isFS = true;
    this.isWindows = true;
    this.isAbsolute = win32.isAbsolute(split.pathname);
    this.isUnc = uncPattern.test(split.pathname);
    this.sep = win32.sep;
    this.delimiter = win32.delimiter;
    this.href = p;
    this.path = split.pathname + split.search;
    this.pathname = split.pathname;
    this.root = parsed.root;
    this.dir = parsed.dir;
    this.base = parsed.base;
    this.name = parsed.name;
    this.ext = parsed.ext;
    this.search = split.search;
    this.query = split.query;
    this.hash = split.hash;
  }
};

/**
 * Creates a clone of this {@link OmniWindows} object.
 *
 * @param {PathOptions} [options] - Options that determine how paths are parsed
 * @returns {OmniWindows}
 */
OmniWindows.prototype.clone = function(options) {
  return new OmniWindows(this, options);
};

/**
 * Returns the directory name of the path.
 *
 * @returns {string}
 */
OmniWindows.prototype.dirname = function() {
  return win32.dirname(this.pathname);
};

/**
 * Returns the last portion of the path.
 *
 * @param   {string} [ext] - The portion of the file extension to leave off
 * @returns {string}
 */
OmniWindows.prototype.basename = function(ext) {
  return win32.basename(this.base, ext);
};

/**
 * Returns a formatted URL string.
 *
 * @returns {string}
 */
OmniWindows.prototype.toUrlString = function() {
  var clone = this.clone();

  // Convert Windows path separators to forward slashes
  clone.pathname = clone.pathname.replace(backslashPattern, '/');

  if (this.isUnc) {
    var split = splitUncPattern.exec(clone.pathname);
    if (split) {
      clone.hostname = split[1];
      clone.pathname = split[2] || '/';
    }
  }

  return OmniPath.prototype.toUrlString.apply(clone, arguments);
};

/**
 * Determines whether the given path (or path part) begins with a separator character.
 *
 * @param {string} p - A path, or path part
 * @returns {boolean}
 * @protected
 */
OmniWindows.prototype._startsWithSeparator = function(p) {
  var firstChar = p[0];
  return firstChar === this.sep || firstChar === '/';
};

/**
 * Determines whether the given path (or path part) ends with a separator character.
 *
 * @param {string} p - A path, or path part
 * @returns {boolean}
 * @protected
 */
OmniWindows.prototype._endsWithSeparator = function(p) {
  var lastChar = p.substr(-1);
  return lastChar === this.sep || lastChar === '/';
};

},{"./index":1,"./node/path":2,"./util":8}],8:[function(require,module,exports){
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

},{"querystring":13}],9:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],10:[function(require,module,exports){
(function (global){
/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],11:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],12:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],13:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":11,"./encode":12}]},{},[1])(1)
});
//# sourceMappingURL=omnipath.js.map
