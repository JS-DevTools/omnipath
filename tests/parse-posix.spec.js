'use strict';

// POSIX paths can only be tested when running in Node on a POSIX OS,
// otherwise, they'll be treated as relative URLs
helper.describeIfPosix('OmniPath.parse - POSIX', function() {
  describe('absolute paths', function() {
    it('should parse an absolute root directory path', function() {
      var omniPath = OmniPath.parse('/');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/',
        pathname: '/',
        root: '/',
        dir: '/',
        base: '',
        name: '',
        ext: '',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute root file path', function() {
      var omniPath = OmniPath.parse('/somefile.txt');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/somefile.txt',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/somefile.txt',
        pathname: '/somefile.txt',
        root: '/',
        dir: '/',
        base: 'somefile.txt',
        name: 'somefile',
        ext: '.txt',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute directory path', function() {
      var omniPath = OmniPath.parse('/path/to/a/directory/');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/directory/',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/directory/',
        pathname: '/path/to/a/directory/',
        root: '/',
        dir: '/path/to/a',
        base: 'directory',
        name: 'directory',
        ext: '',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute directory path, with an extension', function() {
      var omniPath = OmniPath.parse('/path/to/a/direc.tory/');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/direc.tory/',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/direc.tory/',
        pathname: '/path/to/a/direc.tory/',
        root: '/',
        dir: '/path/to/a',
        base: 'direc.tory',
        name: 'direc',
        ext: '.tory',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute directory path that starts with a dot', function() {
      var omniPath = OmniPath.parse('/path/to/a/.directory/');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/.directory/',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/.directory/',
        pathname: '/path/to/a/.directory/',
        root: '/',
        dir: '/path/to/a',
        base: '.directory',
        name: '.directory',
        ext: '',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute directory path that starts with a dot and has an extension', function() {
      var omniPath = OmniPath.parse('/path/to/a/.direc.tory/');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/.direc.tory/',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/.direc.tory/',
        pathname: '/path/to/a/.direc.tory/',
        root: '/',
        dir: '/path/to/a',
        base: '.direc.tory',
        name: '.direc',
        ext: '.tory',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute directory path with multiple dots', function() {
      var omniPath = OmniPath.parse('/path/to/a/di.rec.tory/');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/di.rec.tory/',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/di.rec.tory/',
        pathname: '/path/to/a/di.rec.tory/',
        root: '/',
        dir: '/path/to/a',
        base: 'di.rec.tory',
        name: 'di.rec',
        ext: '.tory',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute file path', function() {
      var omniPath = OmniPath.parse('/path/to/a/file');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/file',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/file',
        pathname: '/path/to/a/file',
        root: '/',
        dir: '/path/to/a',
        base: 'file',
        name: 'file',
        ext: '',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute file path, with an extension', function() {
      var omniPath = OmniPath.parse('/path/to/a/file.foo');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/file.foo',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/file.foo',
        pathname: '/path/to/a/file.foo',
        root: '/',
        dir: '/path/to/a',
        base: 'file.foo',
        name: 'file',
        ext: '.foo',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute file path that starts with a dot', function() {
      var omniPath = OmniPath.parse('/path/to/a/.file');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/.file',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/.file',
        pathname: '/path/to/a/.file',
        root: '/',
        dir: '/path/to/a',
        base: '.file',
        name: '.file',
        ext: '',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute file path that starts with a dot and has an extension', function() {
      var omniPath = OmniPath.parse('/path/to/a/.file.foo');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/.file.foo',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/.file.foo',
        pathname: '/path/to/a/.file.foo',
        root: '/',
        dir: '/path/to/a',
        base: '.file.foo',
        name: '.file',
        ext: '.foo',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute file path that has multiple dots', function() {
      var omniPath = OmniPath.parse('/path/to/a/file.foo.bar');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/file.foo.bar',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/file.foo.bar',
        pathname: '/path/to/a/file.foo.bar',
        root: '/',
        dir: '/path/to/a',
        base: 'file.foo.bar',
        name: 'file.foo',
        ext: '.bar',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute path containing # and ? characters', function() {
      var omniPath = OmniPath.parse('/path/?to=a/#file\\with#/slashes');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/?to=a/#file\\with#/slashes',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/?to=a/#file\\with#/slashes',
        pathname: '/path/?to=a/#file\\with#/slashes',
        root: '/',
        dir: '/path/?to=a/#file\\with#',
        base: 'slashes',
        name: 'slashes',
        ext: '',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse an absolute path with a query', function() {
      var omniPath = OmniPath.parse('/path/to/a/file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/file.html?foo=\\bar&biz=/baz',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/file.html?foo=\\bar&biz=/baz',
        pathname: '/path/to/a/file.html',
        root: '/',
        dir: '/path/to/a',
        base: 'file.html',
        name: 'file',
        ext: '.html',
        search: '?foo=\\bar&biz=/baz',
        query: {foo: '\\bar', biz: '/baz'},
        hash: ''
      });
    });

    it('should parse an absolute path with a hash', function() {
      var omniPath = OmniPath.parse('/path/to/a/direc.tory/#page1\\?not=a/&query', {allowFileHash: true});

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/direc.tory/#page1\\?not=a/&query',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/direc.tory/',
        pathname: '/path/to/a/direc.tory/',
        root: '/',
        dir: '/path/to/a',
        base: 'direc.tory',
        name: 'direc',
        ext: '.tory',
        search: '',
        query: {},
        hash: '#page1\\?not=a/&query'
      });
    });

    it('should parse an absolute path with a query and hash', function() {
      var omniPath = OmniPath.parse('/path/to/a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/path/to/a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/path/to/a/file.html?foo=\\bar&biz=/baz',
        pathname: '/path/to/a/file.html',
        root: '/',
        dir: '/path/to/a',
        base: 'file.html',
        name: 'file',
        ext: '.html',
        search: '?foo=\\bar&biz=/baz',
        query: {foo: '\\bar', biz: '/baz'},
        hash: '#page1\\?not=a/&query'
      });
    });
  });

  describe('relative paths', function() {
    it('should parse a relative directory path', function() {
      var omniPath = OmniPath.parse('path/to/a/directory/');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/directory/'),
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/directory/'),
        pathname: path.join(cwd, 'path/to/a/directory/'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: 'directory',
        name: 'directory',
        ext: '',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse a relative directory path, with an extension', function() {
      var omniPath = OmniPath.parse('path/to/a/direc.tory/');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/direc.tory/'),
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/direc.tory/'),
        pathname: path.join(cwd, 'path/to/a/direc.tory/'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: 'direc.tory',
        name: 'direc',
        ext: '.tory',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse a relative directory path that starts with a dot', function() {
      var omniPath = OmniPath.parse('path/to/a/.directory/');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/.directory/'),
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/.directory/'),
        pathname: path.join(cwd, 'path/to/a/.directory/'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: '.directory',
        name: '.directory',
        ext: '',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse a relative directory path that starts with a dot and has an extension', function() {
      var omniPath = OmniPath.parse('path/to/a/.direc.tory/');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/.direc.tory/'),
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/.direc.tory/'),
        pathname: path.join(cwd, 'path/to/a/.direc.tory/'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: '.direc.tory',
        name: '.direc',
        ext: '.tory',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse a relative directory path with multiple dots', function() {
      var omniPath = OmniPath.parse('path/to/a/di.rec.tory/');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/di.rec.tory/'),
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/di.rec.tory/'),
        pathname: path.join(cwd, 'path/to/a/di.rec.tory/'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: 'di.rec.tory',
        name: 'di.rec',
        ext: '.tory',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse a relative file path', function() {
      var omniPath = OmniPath.parse('path/to/a/file');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/file'),
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/file'),
        pathname: path.join(cwd, 'path/to/a/file'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: 'file',
        name: 'file',
        ext: '',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse a relative file path, with an extension', function() {
      var omniPath = OmniPath.parse('path/to/a/file.foo');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/file.foo'),
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/file.foo'),
        pathname: path.join(cwd, 'path/to/a/file.foo'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: 'file.foo',
        name: 'file',
        ext: '.foo',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse a relative file path that starts with a dot', function() {
      var omniPath = OmniPath.parse('path/to/a/.file');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/.file'),
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/.file'),
        pathname: path.join(cwd, 'path/to/a/.file'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: '.file',
        name: '.file',
        ext: '',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse a relative file path that starts with a dot and has an extension', function() {
      var omniPath = OmniPath.parse('path/to/a/.file.foo');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/.file.foo'),
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/.file.foo'),
        pathname: path.join(cwd, 'path/to/a/.file.foo'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: '.file.foo',
        name: '.file',
        ext: '.foo',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse a relative file path that has multiple dots', function() {
      var omniPath = OmniPath.parse('path/to/a/file.foo.bar');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/file.foo.bar'),
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/file.foo.bar'),
        pathname: path.join(cwd, 'path/to/a/file.foo.bar'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: 'file.foo.bar',
        name: 'file.foo',
        ext: '.bar',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse a relative path containing # and ? characters', function() {
      var omniPath = OmniPath.parse('path/?to=a/#file\\with#/slashes');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/?to=a/#file\\with#/slashes'),
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/?to=a/#file\\with#/slashes'),
        pathname: path.join(cwd, 'path/?to=a/#file\\with#/slashes'),
        root: '/',
        dir: path.join(cwd, 'path/?to=a/#file\\with#'),
        base: 'slashes',
        name: 'slashes',
        ext: '',
        search: '',
        query: {},
        hash: ''
      });
    });

    it('should parse a relative path with a query', function() {
      var omniPath = OmniPath.parse('path/to/a/file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/file.html') + '?foo=\\bar&biz=/baz',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/file.html') + '?foo=\\bar&biz=/baz',
        pathname: path.join(cwd, 'path/to/a/file.html'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: 'file.html',
        name: 'file',
        ext: '.html',
        search: '?foo=\\bar&biz=/baz',
        query: {foo: '\\bar', biz: '/baz'},
        hash: ''
      });
    });

    it('should parse a relative path with a hash', function() {
      var omniPath = OmniPath.parse('path/to/a/direc.tory/#page1\\?not=a/&query', {allowFileHash: true});

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/direc.tory/') + '#page1\\?not=a/&query',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/direc.tory/'),
        pathname: path.join(cwd, 'path/to/a/direc.tory/'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: 'direc.tory',
        name: 'direc',
        ext: '.tory',
        search: '',
        query: {},
        hash: '#page1\\?not=a/&query'
      });
    });

    it('should parse a relative path with a query and hash', function() {
      var omniPath = OmniPath.parse('path/to/a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: path.join(cwd, 'path/to/a/file.html') + '?foo=\\bar&biz=/baz#page1\\?not=a/&query',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: path.join(cwd, 'path/to/a/file.html') + '?foo=\\bar&biz=/baz',
        pathname: path.join(cwd, 'path/to/a/file.html'),
        root: '/',
        dir: path.join(cwd, 'path/to/a'),
        base: 'file.html',
        name: 'file',
        ext: '.html',
        search: '?foo=\\bar&biz=/baz',
        query: {foo: '\\bar', biz: '/baz'},
        hash: '#page1\\?not=a/&query'
      });
    });
  });

  describe('special characters', function() {
    it('should parse a path with special characters', function() {
      var omniPath = OmniPath.parse('/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__');

      helper.inspect(omniPath, {
        isUrl: false,
        isFile: true,
        sep: '/',
        href: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
        protocol: '',
        slashes: false,
        auth: '',
        host: '',
        hostname: '',
        port: '',
        path: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
        pathname: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
        root: '/',
        dir: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
        base: '__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
        name: '__({[ ! % , ',
        ext: '. > < ? & $ # @ ` ~ ,)}]__',
        search: '',
        query: {},
        hash: ''
      });
    });
  });
});
