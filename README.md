OmniPath
============================
#### A consolidated API for working with POSIX paths, Windows paths, and URLs

<!--
[![Build Status](https://api.travis-ci.org/BigstickCarpet/omnipath.svg)](https://travis-ci.org/BigstickCarpet/omnipath)
[![Dependencies](https://david-dm.org/BigstickCarpet/omnipath.svg)](https://david-dm.org/BigstickCarpet/omnipath)
[![Coverage Status](https://coveralls.io/repos/BigstickCarpet/omnipath/badge.svg?branch=master&service=github)](https://coveralls.io/r/BigstickCarpet/omnipath)
[![Code Climate Score](https://codeclimate.com/github/BigstickCarpet/omnipath/badges/gpa.svg)](https://codeclimate.com/github/BigstickCarpet/omnipath)
[![Codacy Score](https://www.codacy.com/project/badge/XXXXXXXXXXXXXXXXXXXXXXXXXXXX)](https://www.codacy.com/public/jamesmessinger/omnipath)
[![Inline docs](http://inch-ci.org/github/BigstickCarpet/omnipath.svg?branch=master&style=shields)](http://inch-ci.org/github/BigstickCarpet/omnipath)

[![npm](http://img.shields.io/npm/v/omnipath.svg)](https://www.npmjs.com/package/omnipath)
[![Bower](http://img.shields.io/bower/v/omnipath.svg)](#bower)
[![License](https://img.shields.io/npm/l/omnipath.svg)](LICENSE)

[![Browser Compatibility](https://saucelabs.com/browser-matrix/omnipath.svg)](http://bigstickcarpet.github.io/omnipath)
-->

OmniPath is a single API that consolidates Node's native [path](https://nodejs.org/api/path.html#path_path) and [url](https://nodejs.org/api/url.html#url_url) modules, so you can write clean code without separate branches for different types of paths.  It has all the methods you're familiar with ([`parse`](#parsepath-options), [`format`](#formatpath-options), [`join`](#joinpath1-path2-options), [`resolve`](#resolvefrom-to-options), [`cwd`](#cwd), [`dirname`](#dirnamepath-options), [`basename`](#basenamepath-ext-options), etc.), and they work _consistently_ for POSIX paths, Windows paths, and URLs, in Node and in web browsers.


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

// OmniPath instances have all the same methods as the OmniPath class
var path = new OmniPath(somePath);
path.resolve(someOtherPath);
path.join(someOtherPath);
path.dirname();
path.basename(".html");
...

// OmniPath instances have all properties of url.parse() AND path.parse()
path.protocol;   // e.g. "http:", "file:"
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
Parses a path or URL string and returns an object with all the properties of [`url.parse`](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost) AND [`path.parse`](https://nodejs.org/api/path.html#path_path_parse_pathstring).

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
A POSIX path, Windows path, or URL to be parsed.  This parameter will usually be a string, but can also be a `Url` object (from [`url.parse`](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost)) or an existng `OmniPath` object.<br><br>
If the path is relative, then it will be resolved relative to [`process.cwd`](https://nodejs.org/api/process.html#process_process_cwd) in Node, or the current page when running in a web browser.  Thus, the parsed path will _always_ be absolute, not relative.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** [`OmniPath`](#OmniPath-object) object

```javascript
OmniPath.parse("http://server.com/dir/subdir/file.html");
OmniPath.parse("C:\\dir\\subdir\\file.html");
OmniPath.parse("/dir/subdir/file.html#page1", {allowFileHash: true});
```


### `format(path, [options])`
The opposite of [`parse`](#parsepath-options). Returns a formatted string from a parsed object. Similar to [`url.format`](https://nodejs.org/docs/latest/api/url.html#url_url_format_urlobj).

- **path** (_required_) - `Url` or `OmniPath`<br>
A parsed `OmniPath` object.  Can also be a `Url` object (from [`url.parse`](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost))

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

```javascript
var p = OmniPath.parse("C:\\dir\\subdir\\file.html");
var u = url.parse("http://server.com/dir/subdir/file.html");

OmniPath.format(p);        // => "C:\\dir\\subdir\\file.html"
OmniPath.format(u);        // => "http://server.com/dir/subdir/file.html"
```


### `join(path1, path2, ..., [options])`
Joins multiple path segments together and normalizes the result.

- **path1, path2, ...** (_optional_) - `string` or `Url` or `OmniPath`<br>
The path parts to join. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

```javascript
OmniPath.join("http://server.com/dir", "..", "otherdir/file.html");  // => "http://server.com/otherdir/file.html"
OmniPath.join("C:\\", "dir\\subdir", "\\file.html");                 // => "C:\\dir\\subdir\\file.html"
```


### `resolve(from..., to, [options])`
Resolves `to` to an absolute path.

If `to` isn't already absolute, `from` arguments are prepended in right to left order, until an absolute path is found. If after using all from paths still no absolute path is found, [`OmniPath.cwd`](#cwd) is used as well

- **from...** (_optional_) - `string` or `Url` or `OmniPath`<br>
The paths used to resolve `to`. See [`parse`](#parsepath-options) for details.

- **to** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to resolve. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

```javascript
OmniPath.resolve("http://server.com/dir", "otherdir/file.html");  // => "http://server.com/otherdir/file.html"
OmniPath.resolve("C:\\", "dir\\subdir", "\\file.html");           // => "C:\\file.html"
```


### `normalize(path, [options])`
Normalizes a path, taking care of `..` and `.`, and removing duplicate path separators.

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
The path to be normalized. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

```javascript
OmniPath.normalize("http://server.com//dir/./subdir/..//otherdir/file.html");  // => "http://server.com/dir/otherdir/file.html"
OmniPath.normalize("C:\\dir\\.\\subdir\\..\\file.html");                       // => "C:\\dir\\file.html"
```


### `dirname(path, [options])`
Returns the path's directory name.

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
A POSIX path, Windows path, or URL. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

```javascript
OmniPath.dirname("http://server.com/dir/subdir/file.html");  // => "/dir/subdir"
OmniPath.dirname("C:\\dir\\subdir\\file.html");              // => "C:\\dir\\subdir"
```


### `basename(path, [ext], [options])`
Returns the last portion of a path, optionally without the extension.

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
A POSIX path, Windows path, or URL. See [`parse`](#parsepath-options) for details.

- **ext** (_optional_) - `string`<br>
The expected extension. If this matches the path's extension, then it will _not_ be included in the return value.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

```javascript
OmniPath.basename("http://server.com/dir/subdir/file.html");  // => "file.html"
OmniPath.basename("C:\\dir\\subdir\\file.html", ".html");     // => "file"
OmniPath.basename("/dir/subdir/file.html", ".txt");           // => "file.html"
```


### `extname(path, [options])`
Returns the path's extension, if any.  If the path's basename begins with a period, then an empty string is returned.

- **path** (_required_) - `string` or `Url` or `OmniPath`<br>
A POSIX path, Windows path, or URL. See [`parse`](#parsepath-options) for details.

- **options** (_optional_) - `object`<br>
Options that determine how the path is parsed. See [options](#options) below.

- **Return Value:** `string`

```javascript
OmniPath.extname("http://server.com/dir/subdir/file.html");  // => ".html"
OmniPath.extname("C:\\dir\\subdir\\file");                   // => ""
OmniPath.extname("C:\\dir\\subdir\\file.");                  // => "."
OmniPath.extname("/dir/subdir/file.min.js");                 // => ".js"
OmniPath.extname("/dir/subdir/.hiddendir");                  // => ""
```


### `cwd()`
Returns the current working directory as a [`OmniPath`](#OmniPath-object) object.  In Node, the current working directory is [`process.cwd`](https://nodejs.org/api/process.html#process_process_cwd).  In web browsers, it is the directory of the current page.

- **Return Value:** [`OmniPath`](#OmniPath-object)

```javascript
var cwd = OmniPath.cwd();
cwd.href;       // e.g. "http://localhost:8080/dir/subdir/"
cwd.pathname;   // e.g. "/dir/subdir/"
cwd.dir;        // e.g. "/dir"
cwd.base;       // e.g. "subdir"
```


### `options`
The [OmniPath constructor](#OmniPathpath-options) and all static methods accept an optional "options" argument.  This argument determines how paths are parsed.  The following options can be set:

|property          |type      |default      |description
|:-----------------|:---------|:------------|:-------------
|`allowFileQuery`  |boolean   |false        |Determines whether a question mark (`?`) in a _file_ path should be interpreted as the start of a query string, like URLs, or as part of the file path. By default, it is treated as part of the file path.
|`allowFileHash`   |boolean   |false        |Determines whether a hash (`#`) in a _file_ path should be interpreted as the start of a hash, like URLs, or as part of the file path. By default, it is treated as part of the file path.


### `OmniPath(path, [options])`
This is the constructor for the [`OmniPath`](#OmniPath-object) class.  You can call it via `new OmniPath(somePath)` or via `OmniPath.parse(somePath)`.  Both are the same.

```javascript
var path = new OmniPath("http://server.com/dir/subdir/file.html");
var path = new OmniPath("C:\\dir\\subdir\\file.html");
var path = new OmniPath("/dir/subdir/file.html#page1", {allowFileHash: true});
```


### `OmniPath` object
`OmniPath` objects have instances methods corresponding to each of the static methods listed above, such as [`format`](#formatpath-options), [`join`](#joinpath1-path2-options), [`resolve`](#resolvefrom-to-options), [`dirname`](#dirnamepath-options), [`basename`](#basenamepath-ext-options), etc.  When calling these instance methods, you don't need to specify the `path` or `options` parameters, since you already passed those to the [constructor](#OmniPathpath-options).

`OmniPath` objects also have all the properties of [`url.parse`](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost) AND [`path.parse`](https://nodejs.org/api/path.html#path_path_parse_pathstring), plus a few extra helper properties:

|property          |type      |description
|:-----------------|:---------|:------------
|`isUrl`           |boolean   |Indicates whether the path is a URL (as opposed to a POSIX path or Windows path).  This will always be true when running in a web browser.
|`isFile`          |boolean   |Indicates whether the path is a POSIX or Windows file path (as opposed to a URL).
|`sep`             |string    |The path separator character. This will be a forward slash (`/`) for URLs.  For file paths, it will be a forward slash (`/`) on POSIX systems, and a backslash (`\`) on Windows systems.
|`href`            |string    |The full path, including all parts.<br>Examples:<br>`http://server:8080/dir/subdir?query=string#hash`<br>`/some/posix/path.ext`<br>`C:\some\windows\path.ext`
|`protocol`        |string    |The protocol, lowercased. Will always be empty for file paths.<br>Examples: `http:`, `https:`, `ftp:`, `file:`
|`slashes`         |boolean   |Indicates whether the protocol requires slashes after the colon. Will always be false for file paths.
|`auth`            |string    |The authentication portion of a URL.. Will always be empty for file paths.<br>Example: `user:pass`
|`host`            |string    |The hostname and port, lowercased. Will always be empty for file paths.<br>Examples: `localhost`, `host.com`, `host.com:8080`
|`hostname`        |string    |The hostname (without port), lowercased. Will always be empty for file paths.<br>Examples: `localhost`, `host.com`
|`port`            |string    |The port number. Will always be empty for file paths.<br>Example: `8080`
|`path`            |string    |Concatenation of `pathname` and `search`.<br>Example: `/dir/subdir/file.html?query=string`
|`pathname`        |string    |The path, which comes after the host and before the query, including a trailing slash if present.<br>Examples:<br>`/dir/subdir/`<br>`/dir/subdir/file.html`<br>`C:\dir\subdir\file.html`
|`root`            |string    |The path's root. This will always be a single forward slash for URLs and POSIX paths.  For Windows paths, it will include the drive letter.<br>Examples:<br>`/`<br>`C:\`
|`dir`             |string    |The path's parent directory. This will _never_ have a trailing slash.<br>Examples:<br>`/dir/subdir`<br>`C:\dir\subdir`
|`base`            |string    |The last portion of a path, which may be a file name or a directory name. This will _never_ have a leading or trailing slash.<br>Examples:<br>`filename.html`<br>`somedir`<br>`.hiddendir`
|`name`            |string    |The path's base name, without an extension.<br>Examples:<br>`filename`<br>`somedir`<br>`.hiddendir`
|`ext`             |string    |The path's extension. This will be empty if there is no extension.<br>Examples: `.html`, `.txt`
|`search`          |string    |The query string, including the leading question mark.<br>Example: `?foo=bar&biz=baz`
|`query`           |object    |The parsed query string.<br>Example: `{foo: "bar", biz: "baz"}`


Contributing
--------------------------
I welcome any contributions, enhancements, and bug-fixes.  [File an issue](https://github.com/BigstickCarpet/omnipath/issues) on GitHub and [submit a pull request](https://github.com/BigstickCarpet/omnipath/pulls).

#### Building/Testing
To build/test the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/bigstickcarpet/omnipath.git`

2. __Install dependencies__<br>
`npm install`

3. __Run the build script__<br>
`npm run build`

4. __Run the unit tests__<br>
`npm run mocha` (test in Node)<br>
`npm run karma` (test in web browsers)<br>
`npm test` (test in Node and browsers, and report code coverage)


License
--------------------------
OmniPath is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.
