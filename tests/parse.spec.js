'use strict';

describe('OmniPath.parse', function() {
  describe('root paths', function() {
    it('root (forward slash)', function() {
      var omniParse = OmniPath.parse('/');
      var pathParse = path.parse('/');
      var urlParse = url.parse('/', true);

      helper.equalsNative(omniParse, pathParse);
      helper.equalsNative(omniParse, urlParse);

      if (userAgent.isBrowser) {
        helper.equals(omniParse, {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/',
          path: '/',
          pathname: '/',
          root: '/',
          dir: '/'
        });
      }
      else if (userAgent.isPosix) {
        helper.equals(omniParse, {
          isFS: true,
          isPosix: true,
          isAbsolute: true,
          sep: '/',
          href: '/',
          path: '/',
          pathname: '/',
          root: '/',
          dir: '/'
        });
      }
      else if (userAgent.isWindows) {
        helper.equals(omniParse, {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        });
      }
    });

    it('root (backslash)', function() {
      var omniParse = OmniPath.parse('\\');
      var pathParse = path.parse('\\');

      helper.equalsNative(omniParse, pathParse);

      if (userAgent.isBrowser) {
        var urlParse = url.parse('\\', true);
        helper.equalsNative(omniParse, urlParse);
        helper.equals(omniParse, {
          isUrl: true,
          sep: '/',
          href: '%5C',
          path: '%5C',
          pathname: '%5C',
          base: '%5C',
          name: '%5C'
        });
      }
      else if (userAgent.isPosix) {
        helper.equals(omniParse, {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\',
          path: '\\',
          pathname: '\\',
          base: '\\',
          name: '\\'
        });
      }
      else if (userAgent.isWindows) {
        helper.equals(omniParse, {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        });
      }
    });

    it('root (Windows)', function() {
      var omniParse = OmniPath.parse('C:\\');
      var pathParse = path.parse('C:\\');

      helper.equalsNative(omniParse, pathParse);

      if (userAgent.isBrowser) {
        var urlParse = url.parse('C:\\', true);
        helper.equalsNative(omniParse, urlParse);
        helper.equals(omniParse, {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:%5C',
          path: '%5C',
          pathname: '%5C',
          base: '%5C',
          name: '%5C'
        });
      }
      else if (userAgent.isPosix) {
        helper.equals(omniParse, {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'C:\\',
          path: 'C:\\',
          pathname: 'C:\\',
          base: 'C:\\',
          name: 'C:\\'
        });
      }
      else if (userAgent.isWindows) {
        helper.equals(omniParse, {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        });
      }
    });

    it('root directory (forward slash)', function() {
      var omniParse = OmniPath.parse('/somedir/');
      var pathParse = path.parse('/somedir/');
      var urlParse = url.parse('/somedir/', true);

      helper.equalsNative(omniParse, pathParse);
      helper.equalsNative(omniParse, urlParse);

      if (userAgent.isBrowser) {
        helper.equals(omniParse, {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/somedir/',
          path: '/somedir/',
          pathname: '/somedir/',
          root: '/',
          dir: '/',
          base: 'somedir',
          name: 'somedir'
        });
      }
      else if (userAgent.isPosix) {
        helper.equals(omniParse, {
          isFS: true,
          isPosix: true,
          isAbsolute: true,
          sep: '/',
          href: '/somedir/',
          path: '/somedir/',
          pathname: '/somedir/',
          root: '/',
          dir: '/',
          base: 'somedir',
          name: 'somedir'
        });
      }
      else if (userAgent.isWindows) {
        helper.equals(omniParse, {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        });
      }
    });

    it('root directory (backslash)', function() {
      var omniParse = OmniPath.parse('\\somedir\\');
      var pathParse = path.parse('\\somedir\\');

      helper.equalsNative(omniParse, pathParse);

      if (userAgent.isBrowser) {
        var urlParse = url.parse('\\somedir\\', true);
        helper.equalsNative(omniParse, urlParse);
        helper.equals(omniParse, {
          isUrl: true,
          sep: '/',
          href: '%5Csomedir%5C',
          path: '%5Csomedir%5C',
          pathname: '%5Csomedir%5C',
          base: '%5Csomedir%5C',
          name: '%5Csomedir%5C'
        });
      }
      else if (userAgent.isPosix) {
        helper.equals(omniParse, {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\somedir\\',
          path: '\\somedir\\',
          pathname: '\\somedir\\',
          base: '\\somedir\\',
          name: '\\somedir\\'
        });
      }
      else if (userAgent.isWindows) {
        helper.equals(omniParse, {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        });
      }
    });

    it('root directory (Windows)', function() {
      var omniParse = OmniPath.parse('C:\\somedir\\');
      var pathParse = path.parse('C:\\somedir\\');

      helper.equalsNative(omniParse, pathParse);

      if (userAgent.isBrowser) {
        var urlParse = url.parse('C:\\somedir\\', true);
        helper.equalsNative(omniParse, urlParse);
        helper.equals(omniParse, {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:%5Csomedir%5C',
          path: '%5Csomedir%5C',
          pathname: '%5Csomedir%5C',
          base: '%5Csomedir%5C',
          name: '%5Csomedir%5C'
        });
      }
      else if (userAgent.isPosix) {
        helper.equals(omniParse, {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'C:\\somedir\\',
          path: 'C:\\somedir\\',
          pathname: 'C:\\somedir\\',
          base: 'C:\\somedir\\',
          name: 'C:\\somedir\\'
        });
      }
      else if (userAgent.isWindows) {
        helper.equals(omniParse, {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        });
      }
    });

    it('root file (forward slash)', function() {
      var omniParse = OmniPath.parse('/somefile.txt');
      var pathParse = path.parse('/somefile.txt');
      var urlParse = url.parse('/somefile.txt', true);

      helper.equalsNative(omniParse, pathParse);
      helper.equalsNative(omniParse, urlParse);

      if (userAgent.isBrowser) {
        helper.equals(omniParse, {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/somefile.txt',
          path: '/somefile.txt',
          pathname: '/somefile.txt',
          root: '/',
          dir: '/',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        });
      }
      else if (userAgent.isPosix) {
        helper.equals(omniParse, {
          isFS: true,
          isPosix: true,
          isAbsolute: true,
          sep: '/',
          href: '/somefile.txt',
          path: '/somefile.txt',
          pathname: '/somefile.txt',
          root: '/',
          dir: '/',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        });
      }
      else if (userAgent.isWindows) {
        helper.equals(omniParse, {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        });
      }
    });

    it('root file (backslash)', function() {
      var omniParse = OmniPath.parse('\\somefile.html');
      var pathParse = path.parse('\\somefile.html');

      helper.equalsNative(omniParse, pathParse);

      if (userAgent.isBrowser) {
        var urlParse = url.parse('\\somefile.txt', true);
        helper.equalsNative(omniParse, urlParse);
        helper.equals(omniParse, {
          isUrl: true,
          sep: '/',
          href: '%5Csomefile.html',
          path: '%5Csomefile.html',
          pathname: '%5Csomefile.html',
          base: '%5Csomefile.html',
          name: '%5Csomefile',
          ext: '.html'
        });
      }
      else if (userAgent.isPosix) {
        helper.equals(omniParse, {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\somefile.html',
          path: '\\somefile.html',
          pathname: '\\somefile.html',
          base: '\\somefile.html',
          name: '\\somefile',
          ext: '.html'
        });
      }
      else if (userAgent.isWindows) {
        helper.equals(omniParse, {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        });
      }
    });

    it('root file (Windows)', function() {
      var omniParse = OmniPath.parse('C:\\somefile.md');
      var pathParse = path.parse('C:\\somefile.md');

      helper.equalsNative(omniParse, pathParse);

      if (userAgent.isBrowser) {
        var urlParse = url.parse('C:\\somefile.md', true);
        helper.equalsNative(omniParse, urlParse);
        helper.equals(omniParse, {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:%5Csomefile.md',
          path: '%5Csomefile.md',
          pathname: '%5Csomefile.md',
          base: '%5Csomefile.md',
          name: '%5Csomefile',
          ext: '.md'
        });
      }
      else if (userAgent.isPosix) {
        helper.equals(omniParse, {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'C:\\somefile.md',
          path: 'C:\\somefile.md',
          pathname: 'C:\\somefile.md',
          base: 'C:\\somefile.md',
          name: 'C:\\somefile',
          ext: '.md'
        });
      }
      else if (userAgent.isWindows) {
        helper.equals(omniParse, {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        });
      }
    });
  });
});

describe.skip('asdf', function() {
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
