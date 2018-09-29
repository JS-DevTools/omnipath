OmniPath
============================
#### A consolidated API for file paths and URLs

[![Build Status](https://api.travis-ci.org/James-Messinger/omnipath.svg?branch=master)](https://travis-ci.org/James-Messinger/omnipath)
[![Dependencies](https://david-dm.org/James-Messinger/omnipath.svg)](https://david-dm.org/James-Messinger/omnipath)
[![Coverage Status](https://coveralls.io/repos/github/James-Messinger/omnipath/badge.svg?branch=master)](https://coveralls.io/github/James-Messinger/omnipath)
[![Codacy Score](https://api.codacy.com/project/badge/2659dc57d28a466590b03eb539c8a91f)](https://www.codacy.com/public/jamesmessinger/omnipath)
[![Inline docs](http://inch-ci.org/github/James-Messinger/omnipath.svg?branch=master&style=shields)](http://inch-ci.org/github/James-Messinger/omnipath)

[![npm](http://img.shields.io/npm/v/omnipath.svg)](https://www.npmjs.com/package/omnipath)
[![Bower](http://img.shields.io/bower/v/omnipath.svg)](#bower)
[![License](https://img.shields.io/npm/l/omnipath.svg)](LICENSE)

[![Browser Compatibility](https://saucelabs.com/browser-matrix/omnipath.svg)](https://saucelabs.com/u/omnipath)

OmniPath is a single API that consolidates Node's native [path](https://nodejs.org/api/path.html#path_path) and [url](https://nodejs.org/api/url.html#url_url) modules, so you can write clean code without separate branches for different types of paths.  It has all the methods you're familiar with ([`parse`](#parsepath-options), [`format`](#formatpath-options), [`join`](#joinpath1-path2--options), [`resolve`](#resolvefrom-to-options), [`cwd`](#cwd), [`dirname`](#dirnamepath-options), [`basename`](#basenamepath-ext-options), etc.), and they _all_ support POSIX paths, Windows paths, UNC paths, and URLs.

You can use `OmniPath.win32`, `OmniPath.posix`, or `OmniPath.url` to treat paths a particular way, or you can just use `OmniPath` to automatically adjust based on the runtime environment.

[Tested](https://jamesmessinger.com/omnipath/test/index.html) in Node and all modern web browsers on Mac, Windows, and Linux.


Example
--------------------------

```javascript
// Returns an object with all properties of url.parse() AND path.parse()
OmniPath.parse(somePath);

// Calls url.resolve() or path.resolve(), as appropriate
OmniPath.resolve(somePath, someOtherPath);

// Joins paths or URLs, using the appropriate separator
OmniPath.join(somePath, someOtherPath);

// Works just like path.dirname(), even for URLs
OmniPath.dirname(somePath);

// Works just like path.basename(), even for URLs
OmniPath.basename(somePath, ".html");

// Alternate Syntax: Create an OmniPath instance, then call its methods
var path = new OmniPath(somePath);
path.resolve(someOtherPath);
path.join(someOtherPath);
path.dirname();
path.basename(".html");
...

// OmniPath instances have all properties of url.parse() AND path.parse()
path.protocol;   // e.g. "http:", "file:", etc.
path.hostname;   // e.g. "www.google.com"
path.query;      // e.g. "name=Joe&age=45"
path.hash;       // e.g. "#page1"
path.dir;        // e.g. "/dir/subdir/subsubdir"
path.base;       // e.g. "index.html"
path.ext;        // e.g. ".html"
...
```


Installation
--------------------------
#### Node
Install using [npm](https://docs.npmjs.com/getting-started/what-is-npm):

```bash
npm install omnipath
```

Then require it in your code:

```javascript
var OmniPath = require('omnipath');
```

#### Web Browsers
Install using [bower](http://bower.io/):

```bash
bower install omnipath
```

Then reference [`omnipath.js`](dist/omnipath.js) or [`omnipath.min.js`](dist/omnipath.min.js) in your HTML:

```html
<script src="bower_components/omnipath/dist/omnipath.js"></script>
```

Or, if you're using AMD (Require.js), then import it into your module:

```javascript
define(["omnipath"], function(OmniPath) { /* your module's code */ })
```


API
--------------------------
### `parse(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed.  This parameter will usually be a string, but can also be a `Url` object (from [`url.parse`](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost)) or an existing `OmniPath` object.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** [`OmniPath`](#omnipath-object) object

Parses a path or URL string and returns an object with all the properties of [`url.parse`](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost) AND [`path.parse`](https://nodejs.org/api/path.html#path_path_parse_pathstring).

If the path includes a protocol (e.g. "http://..., "file://...", etc.), then it will be parsed as a URL; otherwise, it will be parsed according to the runtime environment. That is, it will be parsed using [`path.win32`](https://nodejs.org/api/path.html#path_path_win32) on Windows, it will be parsed using [`path.posix`](https://nodejs.org/api/path.html#path_path_posix) on Mac, Linux, SunOS, etc., and it will be parsed using [`url.parse`](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost) when running in web browsers.  If you want to use a _particular_ parser regardless of the runtime environment, then call `OmniPath.win32.parse()`, `OmniPath.posix.parse()`, or `OmniPath.url.parse()` instead.

```javascript
OmniPath.parse("http://server.com/dir/subdir/file.html");
OmniPath.parse("C:\\dir\\subdir\\file.html");
OmniPath.parse("/dir/subdir/file.html#page1", {allowFileHash: true});
```


### `format(path, [options])`

- **path** (_required_) - `Url` or `OmniPath`<br>
A parsed `OmniPath` object.  Can also be a `Url` object (from [`url.parse`](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost))

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

The opposite of [`parse`](#parsepath-options). Returns a formatted string from a parsed object. Just like [`path.format`](https://nodejs.org/api/path.html#path_path_format_pathobject) or [`url.format`](https://nodejs.org/docs/latest/api/url.html#url_url_format_urlobj).

Just like Node's `path.format` and `url.format` methods, `OmniPath.format` does _not_ normalize the path, so it is possible to get results with redundant/mixed slashes, as well as "." and ".." sequences. Use [`normalize`](#normalizepath-options) instead if you want to ensure that the result is well-formatted.

```javascript
var p = OmniPath.parse("C:\\dir\\subdir\\file.html");
var u = url.parse("http://server.com/dir/subdir/file.html");

OmniPath.format(p);        // => "C:\\dir\\subdir\\file.html"
OmniPath.format(u);        // => "http://server.com/dir/subdir/file.html"
```


### `formatPart(path, part, [options])`

- **path** (_required_) - `Url` or `OmniPath`<br>
A parsed `OmniPath` object.  Can also be a `Url` object (from [`url.parse`](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost))

- **part** (_required_) - `string`<br>
The name of the rightmost part to include in the returned string. For example, "protocol" will only return the protocol part, whereas "port" will return the protocol, slashes, auth, hostname, and port.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

```javascript
OmniPath.formatPart("http://server.com:8080/dir/file.html", "hostname");  // => "http://server.com"
OmniPath.formatPart("http://server.com:8080/dir/file.html", "host");      // => "http://server.com:8080"
OmniPath.formatPart("http://server.com:8080/dir/file.html", "dir");       // => "http://server.com:8080/dir"
OmniPath.formatPart("C:\\dir\\subdir\\file.html", "pathname");            // => "C:\\dir\\subdir\\file.html"
```


### `join(path1, path2, ..., [options])`

- **path1, path2, ...** (_optional_) - `string` or `Url` or `OmniPath`<br>
The path parts to join. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

Joins multiple path segments together and normalizes the result. Just like [`path.join`](https://nodejs.org/api/path.html#path_path_join_path1_path2)

```javascript
OmniPath.join("http://server.com/dir", "..", "otherdir/file.html");  // => "http://server.com/otherdir/file.html"
OmniPath.join("C:\\", "dir/subdir", "\\file.html");                  // => "C:\\dir\\subdir\\file.html"
OmniPath.join("../dir", "./subdir", "..", "/file.html");             // => "../dir/file.html"
```


### `resolve(from..., to, [options])`

- **from...** (_optional_) - `string` or `Url` or `OmniPath`<br>
The paths used to resolve `to`. See [`parse`](#parsepath-options) for details.

- **to** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to resolve. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

Resolves `to` to an absolute path. Just like [`path.resolve`](https://nodejs.org/api/path.html#path_path_resolve_from_to)

If `to` isn't already absolute, `from` arguments are prepended in right to left order, until an absolute path is found. If after using all from paths still no absolute path is found, [`OmniPath.cwd`](#cwd) is used as well

```javascript
OmniPath.resolve("http://server.com/dir", "otherdir/file.html");  // => "http://server.com/otherdir/file.html"
OmniPath.resolve("C:\\", "dir\\subdir", "\\file.html");           // => "C:\\file.html"
```


### `normalize(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be normalized. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

Normalizes a path, taking care of `..` and `.`, and removing duplicate path separators. Just like [`path.normalize`](https://nodejs.org/api/path.html#path_path_normalize_p)

```javascript
OmniPath.normalize("http://server.com//dir/./subdir/..//otherdir/file.html");  // => "http://server.com/dir/otherdir/file.html"
OmniPath.normalize("C:\\dir\\.\\subdir\\..\\file.html");                       // => "C:\\dir\\file.html"
```


### `dirname(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

Returns the path's directory name.  Just like [`path.dirname`](https://nodejs.org/api/path.html#path_path_dirname_p)

```javascript
OmniPath.dirname("http://server.com/dir/subdir/file.html");  // => "/dir/subdir"
OmniPath.dirname("C:\\dir\\subdir\\file.html");              // => "C:\\dir\\subdir"
OmniPath.dirname("/dir/subdir/");                            // => "/dir"
```


### `basename(path, [ext], [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed. See [`parse`](#parsepath-options) for details.

- **ext** (_optional_) - `string`<br>
The expected extension. If this matches the path's extension, then it will _not_ be included in the return value.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

Returns the last portion of a path, optionally without the extension.  Just like [`path.basename`](https://nodejs.org/api/path.html#path_path_basename_p_ext)

```javascript
OmniPath.basename("http://server.com/dir/subdir/file.html");  // => "file.html"
OmniPath.basename("C:\\dir\\subdir\\file.html", ".html");     // => "file"
OmniPath.basename("/dir/subdir/file.html", ".txt");           // => "file.html"
```


### `extname(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

Returns the path's extension, if any.  Just like [`path.extname`](https://nodejs.org/api/path.html#path_path_extname_p)

If the path's basename begins with a period, then an empty string is returned.

```javascript
OmniPath.extname("http://server.com/dir/subdir/file.html");  // => ".html"
OmniPath.extname("C:\\dir\\subdir\\file");                   // => ""
OmniPath.extname("C:\\dir\\subdir\\file.");                  // => "."
OmniPath.extname("/dir/subdir/file.min.js");                 // => ".js"
OmniPath.extname("/dir/subdir/.hiddendir");                  // => ""
```


### `cwd()`

- **Return Value:** `string`

Returns the current working directory path.  In Node, the current working directory is [`process.cwd`](https://nodejs.org/api/process.html#process_process_cwd).  In web browsers, it is the directory of the current page.

```javascript
var cwd = OmniPath.parse(OmniPath.cwd());
cwd.href;       // e.g. "http://localhost:8080/dir/subdir/"
cwd.pathname;   // e.g. "/dir/subdir/"
cwd.dir;        // e.g. "/dir"
cwd.base;       // e.g. "subdir"
```


### `toUrl(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** [`Url` object](https://nodejs.org/docs/latest/api/url.html#url_url)

Converts the given path to a [`Url`](https://nodejs.org/docs/latest/api/url.html#url_url) object. If the path is already a URL, then it remain unchanged.  If it is a filesystem path, then it is converted to a `file://` URL.

You can also call `OmniPath.toUrlString()`, which does the same thing, but returns the result as a string instead of a `Url` object.

```javascript
OmniPath.toUrlString("https://localhost:8080/dir/subdir/"); // => (same string)
OmniPath.toUrlString("file:///Users/johndoe/documents/");   // => (same string)
OmniPath.toUrlString("/dir/subdir");                        // => "file:///dir/subdir"
OmniPath.toUrlString("C:\dir\subdir\file.txt");             // => "file:///C:/dir/subdir/file.txt"
OmniPath.toUrlString("\\server\\dir\\subdir\\");            // => "file://server/dir/subdir/"
```


### `isAbsolute(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `boolean`

Determines whether the path is absolute. Just like [`path.isAbsolute`](https://nodejs.org/api/path.html#path_path_isabsolute_path)

```javascript
OmniPath.isAbsolute("https://localhost:8080/dir/subdir/"); // => true
OmniPath.isAbsolute("file:///Users/johndoe/documents/");   // => true
OmniPath.isAbsolute("/dir/subdir");                        // => true
OmniPath.isAbsolute("C:\dir\subdir\file.txt");             // => true on Windows
OmniPath.isAbsolute("\\server\\dir\\subdir\\");            // => true on Windows and browsers
```


### `isUrl(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `boolean`

Determines whether the path is a URL (as opposed to a filesystem path). See [`parse`](#parsepath-options) for details about how this is determined.

```javascript
OmniPath.isUrl("https://localhost:8080/dir/subdir/"); // => true
OmniPath.isUrl("file:///Users/johndoe/documents/");   // => true
OmniPath.isUrl("/dir/subdir");                        // => false in Node, true in browsers
OmniPath.isUrl("C:\dir\subdir\file.txt");             // => false in Node, true in browsers
OmniPath.isUrl("\\server\\dir\\subdir\\");            // => false in Node, true in browsers
```


### `isFS(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `boolean`

Determines whether the path is a filesystem path (as opposed to a URL). See [`parse`](#parsepath-options) for details about how this is determined.

```javascript
OmniPath.isFS("https://localhost:8080/dir/subdir/"); // => false
OmniPath.isFS("file:///Users/johndoe/documents/");   // => false
OmniPath.isFS("/dir/subdir");                        // => true in Node, false in browsers
OmniPath.isFS("C:\dir\subdir\file.txt");             // => true in Node, false in browsers
OmniPath.isFS("\\server\\dir\\subdir\\");            // => true in Node, false in browsers
```


### `isPosix(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `boolean`

Determines whether the path is a POSIX filesystem path. See [`parse`](#parsepath-options) for details about how this is determined.

If this is `true`, then [`isFS`](#isfspath-options) will also be `true`.

```javascript
OmniPath.isPosix("https://localhost:8080/dir/subdir/"); // => false
OmniPath.isPosix("file:///Users/johndoe/documents/");   // => false
OmniPath.isPosix("/dir/subdir");                        // => true in Node, false in browsers
OmniPath.isPosix("C:\dir\subdir\file.txt");             // => true in Node, false in browsers
OmniPath.isPosix("\\server\\dir\\subdir\\");            // => true in Node, false in browsers
```


### `isWindows(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `boolean`

Determines whether the path is a Windows filesystem path. See [`parse`](#parsepath-options) for details about how this is determined.

If this is `true`, then [`isFS`](#isfspath-options) will also be `true`.

```javascript
OmniPath.isWindows("https://localhost:8080/dir/subdir/"); // => false
OmniPath.isWindows("file:///Users/johndoe/documents/");   // => false
OmniPath.isWindows("/dir/subdir");                        // => true in Node, false in browsers
OmniPath.isWindows("C:\dir\subdir\file.txt");             // => true in Node, false in browsers
OmniPath.isWindows("\\server\\dir\\subdir\\");            // => true in Node, false in browsers
```


### `isUnc(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `boolean`

Determines whether the path is a Windows UNC path. See [`parse`](#parsepath-options) for details about how this is determined.

If this is `true`, then [`isFS`](#isfspath-options) and [`isWindows`](#iswindowspath-options) will also be `true`.

```javascript
OmniPath.isUnc("https://localhost:8080/dir/subdir/"); // => false
OmniPath.isUnc("file:///Users/johndoe/documents/");   // => false
OmniPath.isUnc("/dir/subdir");                        // => false
OmniPath.isUnc("C:\dir\subdir\file.txt");             // => false
OmniPath.isUnc("\\server\\dir\\subdir\\");            // => true on Windows
```


### `sep(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `boolean`

Returns the path separator. Just like [`path.sep`](https://nodejs.org/api/path.html#path_path_sep)

This method returns the proper path separator for the path, which is not necessarily the one that's actually used in the path. For example, on Windows, the path "C:/dir/subdir/file.txt" is valid, but the path separator is still a backslash ("\").

If you just want to get the path separator for a given environment, then you can use `OmniPath.win32.sep`, `OmniPath.posix.sep`, or `OmniPath.url.sep` instead.

```javascript
OmniPath.sep("https://localhost:8080/dir/subdir/"); // => "/"
OmniPath.sep("file:///Users/johndoe/documents/");   // => "/"
OmniPath.sep("/dir/subdir");                        // => "/" on POSIX and browsers, "\" on Windows
OmniPath.sep("C:\dir\subdir\file.txt");             // => "\" on Windows, "/" elsewhere
OmniPath.sep("\\server\\dir\\subdir\\");            // => "\" on Windows, "/" elsewhere
```


### `delimiter(path, [options])`

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be parsed. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `boolean`

Returns the path separator. Just like [`path.delimiter`](https://nodejs.org/api/path.html#path_path_delimiter)

If you just want to get the path delimiter for a given environment, then you can use `OmniPath.win32.sep` or `OmniPath.posix.sep` instead.

URLs do not have a path delimiter, so an empty string is returned.

```javascript
OmniPath.delimiter("https://localhost:8080/dir/subdir/"); // => ""
OmniPath.delimiter("file:///Users/johndoe/documents/");   // => ""
OmniPath.delimiter("/dir/subdir");                        // => ":" on POSIX, ";" on Windows
OmniPath.delimiter("C:\dir\subdir\file.txt");             // => ":" on POSIX, ";" on Windows
OmniPath.delimiter("\\server\\dir\\subdir\\");            // => ":" on POSIX, ";" on Windows
```


### `options`
The [OmniPath constructor](#omnipathpath-options) and all static methods accept an optional "options" argument.  This argument determines how paths are parsed.  The following options can be set:

|property          |type      |default      |description
|:-----------------|:---------|:------------|:-------------
|`allowFileQuery`  |boolean   |false        |Determines whether a question mark (`?`) in a _file_ path should be interpreted as the start of a query string, like URLs, or as part of the file path. By default, it is treated as part of the file path.
|`allowFileHash`   |boolean   |false        |Determines whether a hash (`#`) in a _file_ path should be interpreted as the start of a hash, like URLs, or as part of the file path. By default, it is treated as part of the file path.


### `OmniPath(path, [options])`
This is the constructor for the [`OmniPath`](#omnipath-object) class.  You can call it via `new OmniPath(somePath)` or via `OmniPath.parse(somePath)`.  Both are the same.

```javascript
var path = new OmniPath("http://server.com/dir/subdir/file.html");
var path = new OmniPath("C:\\dir\\subdir\\file.html");
var path = new OmniPath("/dir/subdir/file.html#page1", {allowFileHash: true});
```


### `OmniPath` object
All of the methods listed above instantiate `OmniPath` objects internally, and then call their methods or return their property values.  You can create `OmniPath` objects yourself by calling `new OmniPath(somePath)`, and then use the properties and methods directly. The behavior is the same either way. It's just a matter of which syntax you prefer.

`OmniPath` objects have all the same members listed above, but may be easier to use &mdash; especially when performing multiple operations on the same path &mdash; since you don't need to specify the `path` and `options` parameters over and over again. Also, many members are simple properties instead of methods, which can result in cleaner syntax.

```javascript
var path = new OmniPath("http://server.com/dir/subdir/file.html?foo=bar");

// Methods
path.dirname();                         // => "/dir/subdir"
path.basename(".html");                 // => "file"
path.resolve("../anotherFile.html");    // => "http://server.com/dir/anotherFile.html"

// Properties
path.isUrl;                             // => true
path.isAbsolute;                        // => true
path.sep;                               // => "/"
path.pathname;                          // => "/dir/subdir/file.html"
path.base;                              // => "file.html"
path.name;                              // => "file"
path.query;                             // => {foo: "bar"}
```



Contributing
--------------------------
I welcome any contributions, enhancements, and bug-fixes.  [File an issue](https://github.com/James-Messinger/omnipath/issues) on GitHub and [submit a pull request](https://github.com/James-Messinger/omnipath/pulls).

#### Building/Testing
To build/test the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/James-Messinger/omnipath.git`

2. __Install dependencies__<br>
`npm install`

3. __Run the build script__<br>
`npm run build`

4. __Run the tests__<br>
`npm run mocha` (test in Node)<br>
`npm run karma` (test in web browsers)<br>
`npm test` (test in Node and browsers, and report code coverage)


License
--------------------------
OmniPath is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.
