'use strict';

describe('OmniPath.parse', function() {
  describe('root paths', function() {
    it.only('root (forward slash)', function() {
      var results = helper.invoke('parse', '/');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: true,
          sep: '/',
          href: '/',
          path: '/',
          pathname: '/',
          root: '/',
          dir: '/'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '/',
          path: '/',
          pathname: '/',
          root: '/',
          dir: '/'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/',
          path: '/',
          pathname: '/',
          root: '/',
          dir: '/'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('/'));
        helper.equalsNative(results.omni, url.parse('/', true));
      }
    });

    it('root (backslash)', function() {
      var results = helper.invoke('parse', '\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\',
          path: '\\',
          pathname: '\\',
          base: '\\',
          name: '\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        },
        url: {
          isUrl: true,
          sep: '/',
          href: '%5C',
          path: '%5C',
          pathname: '%5C',
          base: '%5C',
          name: '%5C'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\'));
        helper.equalsNative(results.omni, url.parse('C:\\', true));
      }
    });

    it('root (Windows)', function() {
      var results = helper.invoke('parse', 'C:\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        },
        win32: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'C:\\',
          path: 'C:\\',
          pathname: 'C:\\',
          base: 'C:\\',
          name: 'C:\\'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:%5C',
          path: '%5C',
          pathname: '%5C',
          base: '%5C',
          name: '%5C'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('C:\\'));
        helper.equalsNative(results.omni, url.parse('C:\\', true));
      }
    });

    it('root directory (forward slash)', function() {
      var results = helper.invoke('parse', '/somedir/');
      helper.equals(results, {
        posix: {
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
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        },
        url: {
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
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('/somedir/'));
        helper.equalsNative(results.omni, url.parse('/somedir/', true));
      }
    });

    it('root directory (backslash)', function() {
      var results = helper.invoke('parse', '\\somedir\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\somedir\\',
          path: '\\somedir\\',
          pathname: '\\somedir\\',
          base: '\\somedir\\',
          name: '\\somedir\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        },
        url: {
          isUrl: true,
          sep: '/',
          href: '%5Csomedir%5C',
          path: '%5Csomedir%5C',
          pathname: '%5Csomedir%5C',
          base: '%5Csomedir%5C',
          name: '%5Csomedir%5C'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\somedir\\'));
        helper.equalsNative(results.omni, url.parse('\\somedir\\', true));
      }
    });

    it('root directory (Windows)', function() {
      var results = helper.invoke('parse', 'C:\\somedir\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'C:\\somedir\\',
          path: 'C:\\somedir\\',
          pathname: 'C:\\somedir\\',
          base: 'C:\\somedir\\',
          name: 'C:\\somedir\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:%5Csomedir%5C',
          path: '%5Csomedir%5C',
          pathname: '%5Csomedir%5C',
          base: '%5Csomedir%5C',
          name: '%5Csomedir%5C'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('C:\\somedir\\'));
        helper.equalsNative(results.omni, url.parse('C:\\somedir\\', true));
      }
    });

    it('root file (forward slash)', function() {
      var results = helper.invoke('parse', '/somefile.txt');
      helper.equals(results, {
        posix: {
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
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        },
        url: {
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
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('/somefile.txt'));
        helper.equalsNative(results.omni, url.parse('/somefile.txt', true));
      }
    });

    it('root file (backslash)', function() {
      var results = helper.invoke('parse', '\\somefile.html');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\somefile.html',
          path: '\\somefile.html',
          pathname: '\\somefile.html',
          base: '\\somefile.html',
          name: '\\somefile',
          ext: '.html'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        },
        url: {
          isUrl: true,
          sep: '/',
          href: '%5Csomefile.html',
          path: '%5Csomefile.html',
          pathname: '%5Csomefile.html',
          base: '%5Csomefile.html',
          name: '%5Csomefile',
          ext: '.html'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\somefile.html'));
        helper.equalsNative(results.omni, url.parse('\\somefile.txt', true));
      }
    });

    it('root file (Windows)', function() {
      var results = helper.invoke('parse', 'C:\\somefile.md');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'C:\\somefile.md',
          path: 'C:\\somefile.md',
          pathname: 'C:\\somefile.md',
          base: 'C:\\somefile.md',
          name: 'C:\\somefile',
          ext: '.md'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\',
          path: '\\',
          pathname: '\\',
          root: '\\',
          dir: '\\'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:%5Csomefile.md',
          path: '%5Csomefile.md',
          pathname: '%5Csomefile.md',
          base: '%5Csomefile.md',
          name: '%5Csomefile',
          ext: '.md'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('C:\\somefile.md'));
        helper.equalsNative(results.omni, url.parse('C:\\somefile.md', true));
      }
    });
  });
});
//
//describe.skip('asdf', function() {
//  it('should parse an absolute root file path', function() {
//    var omniPath = OmniPath.parse('/somefile.txt'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/somefile.txt',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/somefile.txt',
//      pathname: '/somefile.txt',
//      root: '/',
//      dir: '/',
//      base: 'somefile.txt',
//      name: 'somefile',
//      ext: '.txt',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute directory path', function() {
//    var omniPath = OmniPath.parse('/path/to/a/directory/'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/directory/',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/directory/',
//      pathname: '/path/to/a/directory/',
//      root: '/',
//      dir: '/path/to/a',
//      base: 'directory',
//      name: 'directory',
//      ext: '',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute directory path, with an extension', function() {
//    var omniPath = OmniPath.parse('/path/to/a/direc.tory/'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/direc.tory/',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/direc.tory/',
//      pathname: '/path/to/a/direc.tory/',
//      root: '/',
//      dir: '/path/to/a',
//      base: 'direc.tory',
//      name: 'direc',
//      ext: '.tory',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute directory path that starts with a dot', function() {
//    var omniPath = OmniPath.parse('/path/to/a/.directory/'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/.directory/',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/.directory/',
//      pathname: '/path/to/a/.directory/',
//      root: '/',
//      dir: '/path/to/a',
//      base: '.directory',
//      name: '.directory',
//      ext: '',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute directory path that starts with a dot and has an extension', function() {
//    var omniPath = OmniPath.parse('/path/to/a/.direc.tory/'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/.direc.tory/',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/.direc.tory/',
//      pathname: '/path/to/a/.direc.tory/',
//      root: '/',
//      dir: '/path/to/a',
//      base: '.direc.tory',
//      name: '.direc',
//      ext: '.tory',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute directory path with multiple dots', function() {
//    var omniPath = OmniPath.parse('/path/to/a/di.rec.tory/'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/di.rec.tory/',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/di.rec.tory/',
//      pathname: '/path/to/a/di.rec.tory/',
//      root: '/',
//      dir: '/path/to/a',
//      base: 'di.rec.tory',
//      name: 'di.rec',
//      ext: '.tory',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute file path', function() {
//    var omniPath = OmniPath.parse('/path/to/a/file'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/file',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/file',
//      pathname: '/path/to/a/file',
//      root: '/',
//      dir: '/path/to/a',
//      base: 'file',
//      name: 'file',
//      ext: '',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute file path, with an extension', function() {
//    var omniPath = OmniPath.parse('/path/to/a/file.foo'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/file.foo',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/file.foo',
//      pathname: '/path/to/a/file.foo',
//      root: '/',
//      dir: '/path/to/a',
//      base: 'file.foo',
//      name: 'file',
//      ext: '.foo',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute file path that starts with a dot', function() {
//    var omniPath = OmniPath.parse('/path/to/a/.file'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/.file',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/.file',
//      pathname: '/path/to/a/.file',
//      root: '/',
//      dir: '/path/to/a',
//      base: '.file',
//      name: '.file',
//      ext: '',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute file path that starts with a dot and has an extension', function() {
//    var omniPath = OmniPath.parse('/path/to/a/.file.foo'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/.file.foo',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/.file.foo',
//      pathname: '/path/to/a/.file.foo',
//      root: '/',
//      dir: '/path/to/a',
//      base: '.file.foo',
//      name: '.file',
//      ext: '.foo',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute file path that has multiple dots', function() {
//    var omniPath = OmniPath.parse('/path/to/a/file.foo.bar'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/file.foo.bar',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/file.foo.bar',
//      pathname: '/path/to/a/file.foo.bar',
//      root: '/',
//      dir: '/path/to/a',
//      base: 'file.foo.bar',
//      name: 'file.foo',
//      ext: '.bar',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute path containing # and ? characters', function() {
//    var omniPath = OmniPath.parse('/path/?to=a/#file\\with#/slashes'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/?to=a/#file\\with#/slashes',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/?to=a/#file\\with#/slashes',
//      pathname: '/path/?to=a/#file\\with#/slashes',
//      root: '/',
//      dir: '/path/?to=a/#file\\with#',
//      base: 'slashes',
//      name: 'slashes',
//      ext: '',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute path with a query', function() {
//    var omniPath = OmniPath.parse('/path/to/a/file.html?foo=\\bar&biz=/baz', {allowFileQuery: true}));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/file.html?foo=\\bar&biz=/baz',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/file.html?foo=\\bar&biz=/baz',
//      pathname: '/path/to/a/file.html',
//      root: '/',
//      dir: '/path/to/a',
//      base: 'file.html',
//      name: 'file',
//      ext: '.html',
//      search: '?foo=\\bar&biz=/baz',
//      query: {foo: '\\bar', biz: '/baz'},
//      hash: ''
//    });
//  });
//
//  it('should parse an absolute path with a hash', function() {
//    var omniPath = OmniPath.parse('/path/to/a/direc.tory/#page1\\?not=a/&query', {allowFileHash: true}));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/direc.tory/#page1\\?not=a/&query',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/direc.tory/',
//      pathname: '/path/to/a/direc.tory/',
//      root: '/',
//      dir: '/path/to/a',
//      base: 'direc.tory',
//      name: 'direc',
//      ext: '.tory',
//      search: '',
//      query: {},
//      hash: '#page1\\?not=a/&query'
//    });
//  });
//
//  it('should parse an absolute path with a query and hash', function() {
//    var omniPath = OmniPath.parse('/path/to/a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true}));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/path/to/a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/path/to/a/file.html?foo=\\bar&biz=/baz',
//      pathname: '/path/to/a/file.html',
//      root: '/',
//      dir: '/path/to/a',
//      base: 'file.html',
//      name: 'file',
//      ext: '.html',
//      search: '?foo=\\bar&biz=/baz',
//      query: {foo: '\\bar', biz: '/baz'},
//      hash: '#page1\\?not=a/&query'
//    });
//  });
//
//  it('should parse a relative directory path', function() {
//    var omniPath = OmniPath.parse('path/to/a/directory/'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/directory/'),
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/directory/'),
//      pathname: posix.join(cwd, 'path/to/a/directory/'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: 'directory',
//      name: 'directory',
//      ext: '',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse a relative directory path, with an extension', function() {
//    var omniPath = OmniPath.parse('path/to/a/direc.tory/'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/direc.tory/'),
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/direc.tory/'),
//      pathname: posix.join(cwd, 'path/to/a/direc.tory/'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: 'direc.tory',
//      name: 'direc',
//      ext: '.tory',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse a relative directory path that starts with a dot', function() {
//    var omniPath = OmniPath.parse('path/to/a/.directory/'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/.directory/'),
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/.directory/'),
//      pathname: posix.join(cwd, 'path/to/a/.directory/'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: '.directory',
//      name: '.directory',
//      ext: '',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse a relative directory path that starts with a dot and has an extension', function() {
//    var omniPath = OmniPath.parse('path/to/a/.direc.tory/'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/.direc.tory/'),
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/.direc.tory/'),
//      pathname: posix.join(cwd, 'path/to/a/.direc.tory/'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: '.direc.tory',
//      name: '.direc',
//      ext: '.tory',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse a relative directory path with multiple dots', function() {
//    var omniPath = OmniPath.parse('path/to/a/di.rec.tory/'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/di.rec.tory/'),
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/di.rec.tory/'),
//      pathname: posix.join(cwd, 'path/to/a/di.rec.tory/'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: 'di.rec.tory',
//      name: 'di.rec',
//      ext: '.tory',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse a relative file path', function() {
//    var omniPath = OmniPath.parse('path/to/a/file'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/file'),
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/file'),
//      pathname: posix.join(cwd, 'path/to/a/file'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: 'file',
//      name: 'file',
//      ext: '',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse a relative file path, with an extension', function() {
//    var omniPath = OmniPath.parse('path/to/a/file.foo'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/file.foo'),
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/file.foo'),
//      pathname: posix.join(cwd, 'path/to/a/file.foo'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: 'file.foo',
//      name: 'file',
//      ext: '.foo',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse a relative file path that starts with a dot', function() {
//    var omniPath = OmniPath.parse('path/to/a/.file'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/.file'),
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/.file'),
//      pathname: posix.join(cwd, 'path/to/a/.file'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: '.file',
//      name: '.file',
//      ext: '',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse a relative file path that starts with a dot and has an extension', function() {
//    var omniPath = OmniPath.parse('path/to/a/.file.foo'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/.file.foo'),
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/.file.foo'),
//      pathname: posix.join(cwd, 'path/to/a/.file.foo'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: '.file.foo',
//      name: '.file',
//      ext: '.foo',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse a relative file path that has multiple dots', function() {
//    var omniPath = OmniPath.parse('path/to/a/file.foo.bar'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/file.foo.bar'),
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/file.foo.bar'),
//      pathname: posix.join(cwd, 'path/to/a/file.foo.bar'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: 'file.foo.bar',
//      name: 'file.foo',
//      ext: '.bar',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse a relative path containing # and ? characters', function() {
//    var omniPath = OmniPath.parse('path/?to=a/#file\\with#/slashes'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/?to=a/#file\\with#/slashes'),
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/?to=a/#file\\with#/slashes'),
//      pathname: posix.join(cwd, 'path/?to=a/#file\\with#/slashes'),
//      root: '/',
//      dir: posix.join(cwd, 'path/?to=a/#file\\with#'),
//      base: 'slashes',
//      name: 'slashes',
//      ext: '',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//
//  it('should parse a relative path with a query', function() {
//    var omniPath = OmniPath.parse('path/to/a/file.html?foo=\\bar&biz=/baz', {allowFileQuery: true}));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/file.html') + '?foo=\\bar&biz=/baz',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/file.html') + '?foo=\\bar&biz=/baz',
//      pathname: posix.join(cwd, 'path/to/a/file.html'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: 'file.html',
//      name: 'file',
//      ext: '.html',
//      search: '?foo=\\bar&biz=/baz',
//      query: {foo: '\\bar', biz: '/baz'},
//      hash: ''
//    });
//  });
//
//  it('should parse a relative path with a hash', function() {
//    var omniPath = OmniPath.parse('path/to/a/direc.tory/#page1\\?not=a/&query', {allowFileHash: true}));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/direc.tory/') + '#page1\\?not=a/&query',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/direc.tory/'),
//      pathname: posix.join(cwd, 'path/to/a/direc.tory/'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: 'direc.tory',
//      name: 'direc',
//      ext: '.tory',
//      search: '',
//      query: {},
//      hash: '#page1\\?not=a/&query'
//    });
//  });
//
//  it('should parse a relative path with a query and hash', function() {
//    var omniPath = OmniPath.parse('path/to/a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true}));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: posix.join(cwd, 'path/to/a/file.html') + '?foo=\\bar&biz=/baz#page1\\?not=a/&query',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: posix.join(cwd, 'path/to/a/file.html') + '?foo=\\bar&biz=/baz',
//      pathname: posix.join(cwd, 'path/to/a/file.html'),
//      root: '/',
//      dir: posix.join(cwd, 'path/to/a'),
//      base: 'file.html',
//      name: 'file',
//      ext: '.html',
//      search: '?foo=\\bar&biz=/baz',
//      query: {foo: '\\bar', biz: '/baz'},
//      hash: '#page1\\?not=a/&query'
//    });
//  });
//
//  it('should parse a path with special characters', function() {
//    var omniPath = OmniPath.parse('/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__'));
//
//    helper.inspect(omniPath, {
//      isUrl: false,
//      isFile: true,
//      sep: '/',
//      href: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
//      protocol: '',
//      slashes: false,
//      auth: '',
//      host: '',
//      hostname: '',
//      port: '',
//      path: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
//      pathname: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
//      root: '/',
//      dir: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
//      base: '__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
//      name: '__({[ ! % , ',
//      ext: '. > < ? & $ # @ ` ~ ,)}]__',
//      search: '',
//      query: {},
//      hash: ''
//    });
//  });
//});
