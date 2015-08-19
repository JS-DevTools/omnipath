'use strict';

describe('OmniPath.parse', function() {
  describe('root paths', function() {
    it('root (forward slash)', function() {
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
        helper.equalsNative(results.omni, path.parse('\\'));
        helper.equalsNative(results.url, url.parse('\\', true));
      }
    });

    it('root (Windows)', function() {
      var results = helper.invoke('parse', 'C:\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'C:\\',
          path: 'C:\\',
          pathname: 'C:\\',
          base: 'C:\\',
          name: 'C:\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: 'C:\\',
          path: 'C:\\',
          pathname: 'C:\\',
          root: 'C:\\',
          dir: 'C:\\'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:/',
          protocol: 'c:',
          path: '/',
          pathname: '/',
          root: '/',
          dir: '/'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('C:\\'));
        helper.equalsNative(results.url, url.parse('C:\\', true));
      }
    });

    it('root (Windows) (without a slash)', function() {
      var results = helper.invoke('parse', 'C:');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'C:',
          path: 'C:',
          pathname: 'C:',
          base: 'C:',
          name: 'C:'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'C:',
          path: 'C:',
          pathname: 'C:',
          root: 'C:',
          dir: 'C:'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:',
          protocol: 'c:'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('C:'));
        helper.equalsNative(results.url, url.parse('C:', true));
      }
    });

    it('root (UNC)', function() {
      var results = helper.invoke('parse', '\\\\server');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\\\server',
          path: '\\\\server',
          pathname: '\\\\server',
          base: '\\\\server',
          name: '\\\\server'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isUnc: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\\\server',
          path: '\\\\server',
          pathname: '\\\\server',
          root: '\\',
          dir: '\\',
          base: 'server',
          name: 'server'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '//server',
          path: '//server',
          pathname: '//server',
          root: '/',
          dir: '/',
          base: 'server',
          name: 'server'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\\\server'));
        helper.equalsNative(results.url, url.parse('\\\\server', true));
      }
    });

    it('root (URL)', function() {
      var results = helper.invoke('parse', 'http://host.name');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'http://host.name',
          path: 'http://host.name',
          pathname: 'http://host.name',
          dir: 'http:/',
          base: 'host.name',
          name: 'host',
          ext: '.name'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'http://host.name',
          path: 'http://host.name',
          pathname: 'http://host.name',
          dir: 'http:/',
          base: 'host.name',
          name: 'host',
          ext: '.name'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'http://host.name/',
          protocol: 'http:',
          slashes: true,
          host: 'host.name',
          hostname: 'host.name',
          path: '/',
          pathname: '/',
          root: '/',
          dir: '/'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.url, url.parse('http://host.name', true));
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
          href: '/somedir/',
          path: '/somedir/',
          pathname: '/somedir/',
          root: '/',
          dir: '/',
          base: 'somedir',
          name: 'somedir'
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
          href: '\\somedir\\',
          path: '\\somedir\\',
          pathname: '\\somedir\\',
          root: '\\',
          dir: '\\',
          base: 'somedir',
          name: 'somedir'
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
        helper.equalsNative(results.omni, path.parse('\\somedir\\'));
        helper.equalsNative(results.url, url.parse('\\somedir\\', true));
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
          href: 'C:\\somedir\\',
          path: 'C:\\somedir\\',
          pathname: 'C:\\somedir\\',
          root: 'C:\\',
          dir: 'C:\\',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:/somedir/',
          protocol: 'c:',
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
        helper.equalsNative(results.omni, path.parse('C:\\somedir\\'));
        helper.equalsNative(results.url, url.parse('C:\\somedir\\', true));
      }
    });

    it('root directory (UNC)', function() {
      var results = helper.invoke('parse', '\\\\server\\dir\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\\\server\\dir\\',
          path: '\\\\server\\dir\\',
          pathname: '\\\\server\\dir\\',
          base: '\\\\server\\dir\\',
          name: '\\\\server\\dir\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isUnc: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\\\server\\dir\\',
          path: '\\\\server\\dir\\',
          pathname: '\\\\server\\dir\\',
          root: '\\\\server\\dir\\',
          dir: '\\\\server\\dir\\'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '//server/dir/',
          path: '//server/dir/',
          pathname: '//server/dir/',
          root: '/',
          dir: '//server',
          base: 'dir',
          name: 'dir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\\\server\\dir\\'));
        helper.equalsNative(results.url, url.parse('\\\\server\\dir\\', true));
      }
    });

    it('root directory (URL)', function() {
      var results = helper.invoke('parse', 'http://host.name/somedir/');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'http://host.name/somedir/',
          path: 'http://host.name/somedir/',
          pathname: 'http://host.name/somedir/',
          dir: 'http://host.name',
          base: 'somedir',
          name: 'somedir'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'http://host.name/somedir/',
          path: 'http://host.name/somedir/',
          pathname: 'http://host.name/somedir/',
          dir: 'http://host.name',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'http://host.name/somedir/',
          protocol: 'http:',
          slashes: true,
          host: 'host.name',
          hostname: 'host.name',
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
        helper.equalsNative(results.url, url.parse('http://host.name/somedir/', true));
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
          href: '/somefile.txt',
          path: '/somefile.txt',
          pathname: '/somefile.txt',
          root: '/',
          dir: '/',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
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
          href: '\\somefile.html',
          path: '\\somefile.html',
          pathname: '\\somefile.html',
          root: '\\',
          dir: '\\',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/somefile.html',
          path: '/somefile.html',
          pathname: '/somefile.html',
          root: '/',
          dir: '/',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\somefile.html'));
        helper.equalsNative(results.url, url.parse('\\somefile.html', true));
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
          href: 'C:\\somefile.md',
          path: 'C:\\somefile.md',
          pathname: 'C:\\somefile.md',
          root: 'C:\\',
          dir: 'C:\\',
          base: 'somefile.md',
          name: 'somefile',
          ext: '.md'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:/somefile.md',
          protocol: 'c:',
          path: '/somefile.md',
          pathname: '/somefile.md',
          root: '/',
          dir: '/',
          base: 'somefile.md',
          name: 'somefile',
          ext: '.md'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('C:\\somefile.md'));
        helper.equalsNative(results.url, url.parse('C:\\somefile.md', true));
      }
    });

    it('root file (UNC)', function() {
      var results = helper.invoke('parse', '\\\\server\\somefile.doc');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\\\server\\somefile.doc',
          path: '\\\\server\\somefile.doc',
          pathname: '\\\\server\\somefile.doc',
          base: '\\\\server\\somefile.doc',
          name: '\\\\server\\somefile',
          ext: '.doc'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isUnc: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\\\server\\somefile.doc',
          path: '\\\\server\\somefile.doc',
          pathname: '\\\\server\\somefile.doc',
          root: '\\\\server\\somefile.doc',
          dir: '\\\\server\\somefile.doc'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '//server/somefile.doc',
          path: '//server/somefile.doc',
          pathname: '//server/somefile.doc',
          root: '/',
          dir: '//server',
          base: 'somefile.doc',
          name: 'somefile',
          ext: '.doc'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\\\server\\somefile.doc'));
        helper.equalsNative(results.url, url.parse('\\\\server\\somefile.doc', true));
      }
    });

    it('root file (URL)', function() {
      var results = helper.invoke('parse', 'http://host.name/somefile.html');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'http://host.name/somefile.html',
          path: 'http://host.name/somefile.html',
          pathname: 'http://host.name/somefile.html',
          dir: 'http://host.name',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'http://host.name/somefile.html',
          path: 'http://host.name/somefile.html',
          pathname: 'http://host.name/somefile.html',
          dir: 'http://host.name',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'http://host.name/somefile.html',
          protocol: 'http:',
          slashes: true,
          host: 'host.name',
          hostname: 'host.name',
          path: '/somefile.html',
          pathname: '/somefile.html',
          root: '/',
          dir: '/',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.url, url.parse('http://host.name/somefile.html', true));
      }
    });
  });

  describe('absolute paths', function() {
    it('absolute directory (forward slashes)', function() {
      var results = helper.invoke('parse', '/dir/subdir/somedir/');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: true,
          sep: '/',
          href: '/dir/subdir/somedir/',
          path: '/dir/subdir/somedir/',
          pathname: '/dir/subdir/somedir/',
          root: '/',
          dir: '/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '/dir/subdir/somedir/',
          path: '/dir/subdir/somedir/',
          pathname: '/dir/subdir/somedir/',
          root: '/',
          dir: '/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/dir/subdir/somedir/',
          path: '/dir/subdir/somedir/',
          pathname: '/dir/subdir/somedir/',
          root: '/',
          dir: '/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('/dir/subdir/somedir/'));
        helper.equalsNative(results.omni, url.parse('/dir/subdir/somedir/', true));
      }
    });

    it('absolute directory (backslashes)', function() {
      var results = helper.invoke('parse', '\\dir\\subdir\\somedir\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\dir\\subdir\\somedir\\',
          path: '\\dir\\subdir\\somedir\\',
          pathname: '\\dir\\subdir\\somedir\\',
          base: '\\dir\\subdir\\somedir\\',
          name: '\\dir\\subdir\\somedir\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\dir\\subdir\\somedir\\',
          path: '\\dir\\subdir\\somedir\\',
          pathname: '\\dir\\subdir\\somedir\\',
          root: '\\',
          dir: '\\dir\\subdir',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/dir/subdir/somedir/',
          path: '/dir/subdir/somedir/',
          pathname: '/dir/subdir/somedir/',
          root: '/',
          dir: '/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\dir\\subdir\\somedir\\'));
        helper.equalsNative(results.url, url.parse('\\dir\\subdir\\somedir\\', true));
      }
    });

    it('absolute directory (Windows)', function() {
      var results = helper.invoke('parse', 'C:\\dir\\subdir\\somedir\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'C:\\dir\\subdir\\somedir\\',
          path: 'C:\\dir\\subdir\\somedir\\',
          pathname: 'C:\\dir\\subdir\\somedir\\',
          base: 'C:\\dir\\subdir\\somedir\\',
          name: 'C:\\dir\\subdir\\somedir\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: 'C:\\dir\\subdir\\somedir\\',
          path: 'C:\\dir\\subdir\\somedir\\',
          pathname: 'C:\\dir\\subdir\\somedir\\',
          root: 'C:\\',
          dir: 'C:\\dir\\subdir',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:/dir/subdir/somedir/',
          protocol: 'c:',
          path: '/dir/subdir/somedir/',
          pathname: '/dir/subdir/somedir/',
          root: '/',
          dir: '/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('C:\\dir\\subdir\\somedir\\'));
        helper.equalsNative(results.url, url.parse('C:\\dir\\subdir\\somedir\\', true));
      }
    });

    it('absolute directory (UNC)', function() {
      var results = helper.invoke('parse', '\\\\server\\dir\\subdir\\somedir\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\\\server\\dir\\subdir\\somedir\\',
          path: '\\\\server\\dir\\subdir\\somedir\\',
          pathname: '\\\\server\\dir\\subdir\\somedir\\',
          base: '\\\\server\\dir\\subdir\\somedir\\',
          name: '\\\\server\\dir\\subdir\\somedir\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isUnc: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\\\server\\dir\\subdir\\somedir\\',
          path: '\\\\server\\dir\\subdir\\somedir\\',
          pathname: '\\\\server\\dir\\subdir\\somedir\\',
          root: '\\\\server\\dir\\',
          dir: '\\\\server\\dir\\subdir',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '//server/dir/subdir/somedir/',
          path: '//server/dir/subdir/somedir/',
          pathname: '//server/dir/subdir/somedir/',
          root: '/',
          dir: '//server/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\\\server\\dir\\subdir\\somedir\\'));
        helper.equalsNative(results.url, url.parse('\\\\server\\dir\\subdir\\somedir\\', true));
      }
    });

    it('absolute directory (URL)', function() {
      var results = helper.invoke('parse', 'http://host.name/dir/subdir/somedir/');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'http://host.name/dir/subdir/somedir/',
          path: 'http://host.name/dir/subdir/somedir/',
          pathname: 'http://host.name/dir/subdir/somedir/',
          dir: 'http://host.name/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'http://host.name/dir/subdir/somedir/',
          path: 'http://host.name/dir/subdir/somedir/',
          pathname: 'http://host.name/dir/subdir/somedir/',
          dir: 'http://host.name/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'http://host.name/dir/subdir/somedir/',
          protocol: 'http:',
          slashes: true,
          host: 'host.name',
          hostname: 'host.name',
          path: '/dir/subdir/somedir/',
          pathname: '/dir/subdir/somedir/',
          root: '/',
          dir: '/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.url, url.parse('http://host.name/dir/subdir/somedir/', true));
      }
    });

    it('absolute directory (forward slashes + backslashes)', function() {
      var results = helper.invoke('parse', '/dir\\subdir/somedir\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: true,
          sep: '/',
          href: '/dir\\subdir/somedir\\',
          path: '/dir\\subdir/somedir\\',
          pathname: '/dir\\subdir/somedir\\',
          root: '/',
          dir: '/dir\\subdir',
          base: 'somedir\\',
          name: 'somedir\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '/dir\\subdir/somedir\\',
          path: '/dir\\subdir/somedir\\',
          pathname: '/dir\\subdir/somedir\\',
          root: '/',
          dir: '/dir\\subdir',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/dir/subdir/somedir/',
          path: '/dir/subdir/somedir/',
          pathname: '/dir/subdir/somedir/',
          root: '/',
          dir: '/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('/dir\\subdir/somedir\\'));
        helper.equalsNative(results.url, url.parse('/dir\\subdir/somedir\\', true));
      }
    });

    it('absolute directory (backslashes + forward slashes)', function() {
      var results = helper.invoke('parse', '\\dir/subdir\\somedir/');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\dir/subdir\\somedir/',
          path: '\\dir/subdir\\somedir/',
          pathname: '\\dir/subdir\\somedir/',
          dir: '\\dir',
          base: 'subdir\\somedir',
          name: 'subdir\\somedir'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\dir/subdir\\somedir/',
          path: '\\dir/subdir\\somedir/',
          pathname: '\\dir/subdir\\somedir/',
          root: '\\',
          dir: '\\dir/subdir',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/dir/subdir/somedir/',
          path: '/dir/subdir/somedir/',
          pathname: '/dir/subdir/somedir/',
          root: '/',
          dir: '/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\dir/subdir\\somedir/'));
        helper.equalsNative(results.url, url.parse('\\dir/subdir\\somedir/', true));
      }
    });

    it('absolute directory (Windows + forward slashes)', function() {
      var results = helper.invoke('parse', 'C:/dir/subdir\\somedir/');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'C:/dir/subdir\\somedir/',
          path: 'C:/dir/subdir\\somedir/',
          pathname: 'C:/dir/subdir\\somedir/',
          dir: 'C:/dir',
          base: 'subdir\\somedir',
          name: 'subdir\\somedir'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: 'C:/dir/subdir\\somedir/',
          path: 'C:/dir/subdir\\somedir/',
          pathname: 'C:/dir/subdir\\somedir/',
          root: 'C:/',
          dir: 'C:/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:/dir/subdir/somedir/',
          protocol: 'c:',
          path: '/dir/subdir/somedir/',
          pathname: '/dir/subdir/somedir/',
          root: '/',
          dir: '/dir/subdir',
          base: 'somedir',
          name: 'somedir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('C:/dir/subdir\\somedir/'));
        helper.equalsNative(results.url, url.parse('C:/dir/subdir\\somedir/', true));
      }
    });

    it('absolute file (forward slashes)', function() {
      var results = helper.invoke('parse', '/dir/subdir/somefile.txt');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: true,
          sep: '/',
          href: '/dir/subdir/somefile.txt',
          path: '/dir/subdir/somefile.txt',
          pathname: '/dir/subdir/somefile.txt',
          root: '/',
          dir: '/dir/subdir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '/dir/subdir/somefile.txt',
          path: '/dir/subdir/somefile.txt',
          pathname: '/dir/subdir/somefile.txt',
          root: '/',
          dir: '/dir/subdir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/dir/subdir/somefile.txt',
          path: '/dir/subdir/somefile.txt',
          pathname: '/dir/subdir/somefile.txt',
          root: '/',
          dir: '/dir/subdir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('/dir/subdir/somefile.txt'));
        helper.equalsNative(results.omni, url.parse('/dir/subdir/somefile.txt', true));
      }
    });

    it('absolute file (backslashes)', function() {
      var results = helper.invoke('parse', '\\dir\\subdir\\somefile.html');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\dir\\subdir\\somefile.html',
          path: '\\dir\\subdir\\somefile.html',
          pathname: '\\dir\\subdir\\somefile.html',
          base: '\\dir\\subdir\\somefile.html',
          name: '\\dir\\subdir\\somefile',
          ext: '.html'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\dir\\subdir\\somefile.html',
          path: '\\dir\\subdir\\somefile.html',
          pathname: '\\dir\\subdir\\somefile.html',
          root: '\\',
          dir: '\\dir\\subdir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/dir/subdir/somefile.html',
          path: '/dir/subdir/somefile.html',
          pathname: '/dir/subdir/somefile.html',
          root: '/',
          dir: '/dir/subdir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\dir\\subdir\\somefile.html'));
        helper.equalsNative(results.url, url.parse('\\dir\\subdir\\somefile.html', true));
      }
    });

    it('absolute file (Windows)', function() {
      var results = helper.invoke('parse', 'C:\\dir\\subdir\\somefile.md');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'C:\\dir\\subdir\\somefile.md',
          path: 'C:\\dir\\subdir\\somefile.md',
          pathname: 'C:\\dir\\subdir\\somefile.md',
          base: 'C:\\dir\\subdir\\somefile.md',
          name: 'C:\\dir\\subdir\\somefile',
          ext: '.md'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: 'C:\\dir\\subdir\\somefile.md',
          path: 'C:\\dir\\subdir\\somefile.md',
          pathname: 'C:\\dir\\subdir\\somefile.md',
          root: 'C:\\',
          dir: 'C:\\dir\\subdir',
          base: 'somefile.md',
          name: 'somefile',
          ext: '.md'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:/dir/subdir/somefile.md',
          protocol: 'c:',
          path: '/dir/subdir/somefile.md',
          pathname: '/dir/subdir/somefile.md',
          root: '/',
          dir: '/dir/subdir',
          base: 'somefile.md',
          name: 'somefile',
          ext: '.md'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('C:\\dir\\subdir\\somefile.md'));
        helper.equalsNative(results.url, url.parse('C:\\dir\\subdir\\somefile.md', true));
      }
    });

    it('absolute file (UNC)', function() {
      var results = helper.invoke('parse', '\\\\server\\dir\\subdir\\somefile.doc');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\\\server\\dir\\subdir\\somefile.doc',
          path: '\\\\server\\dir\\subdir\\somefile.doc',
          pathname: '\\\\server\\dir\\subdir\\somefile.doc',
          base: '\\\\server\\dir\\subdir\\somefile.doc',
          name: '\\\\server\\dir\\subdir\\somefile',
          ext: '.doc'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isUnc: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\\\server\\dir\\subdir\\somefile.doc',
          path: '\\\\server\\dir\\subdir\\somefile.doc',
          pathname: '\\\\server\\dir\\subdir\\somefile.doc',
          root: '\\\\server\\dir\\',
          dir: '\\\\server\\dir\\subdir',
          base: 'somefile.doc',
          name: 'somefile',
          ext: '.doc'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '//server/dir/subdir/somefile.doc',
          path: '//server/dir/subdir/somefile.doc',
          pathname: '//server/dir/subdir/somefile.doc',
          root: '/',
          dir: '//server/dir/subdir',
          base: 'somefile.doc',
          name: 'somefile',
          ext: '.doc'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\\\server\\dir\\subdir\\somefile.doc'));
        helper.equalsNative(results.url, url.parse('\\\\server\\dir\\subdir\\somefile.doc', true));
      }
    });

    it('absolute file (URL)', function() {
      var results = helper.invoke('parse', 'http://host.name/dir/subdir/somefile.html');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'http://host.name/dir/subdir/somefile.html',
          path: 'http://host.name/dir/subdir/somefile.html',
          pathname: 'http://host.name/dir/subdir/somefile.html',
          dir: 'http://host.name/dir/subdir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'http://host.name/dir/subdir/somefile.html',
          path: 'http://host.name/dir/subdir/somefile.html',
          pathname: 'http://host.name/dir/subdir/somefile.html',
          dir: 'http://host.name/dir/subdir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'http://host.name/dir/subdir/somefile.html',
          protocol: 'http:',
          slashes: true,
          host: 'host.name',
          hostname: 'host.name',
          path: '/dir/subdir/somefile.html',
          pathname: '/dir/subdir/somefile.html',
          root: '/',
          dir: '/dir/subdir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.url, url.parse('http://host.name/dir/subdir/somefile.html', true));
      }
    });

    it('absolute file (forward slashes + backslashes)', function() {
      var results = helper.invoke('parse', '/dir\\subdir/somedir\\somefile.txt');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: true,
          sep: '/',
          href: '/dir\\subdir/somedir\\somefile.txt',
          path: '/dir\\subdir/somedir\\somefile.txt',
          pathname: '/dir\\subdir/somedir\\somefile.txt',
          root: '/',
          dir: '/dir\\subdir',
          base: 'somedir\\somefile.txt',
          name: 'somedir\\somefile',
          ext: '.txt'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '/dir\\subdir/somedir\\somefile.txt',
          path: '/dir\\subdir/somedir\\somefile.txt',
          pathname: '/dir\\subdir/somedir\\somefile.txt',
          root: '/',
          dir: '/dir\\subdir/somedir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/dir/subdir/somedir/somefile.txt',
          path: '/dir/subdir/somedir/somefile.txt',
          pathname: '/dir/subdir/somedir/somefile.txt',
          root: '/',
          dir: '/dir/subdir/somedir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('/dir\\subdir/somedir\\somefile.txt'));
        helper.equalsNative(results.url, url.parse('/dir\\subdir/somedir\\somefile.txt', true));
      }
    });

    it('absolute file (backslashes + forward slashes)', function() {
      var results = helper.invoke('parse', '\\dir/subdir\\somedir/somefile.html');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\dir/subdir\\somedir/somefile.html',
          path: '\\dir/subdir\\somedir/somefile.html',
          pathname: '\\dir/subdir\\somedir/somefile.html',
          dir: '\\dir/subdir\\somedir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\dir/subdir\\somedir/somefile.html',
          path: '\\dir/subdir\\somedir/somefile.html',
          pathname: '\\dir/subdir\\somedir/somefile.html',
          root: '\\',
          dir: '\\dir/subdir\\somedir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/dir/subdir/somedir/somefile.html',
          path: '/dir/subdir/somedir/somefile.html',
          pathname: '/dir/subdir/somedir/somefile.html',
          root: '/',
          dir: '/dir/subdir/somedir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\dir/subdir\\somedir/somefile.html'));
        helper.equalsNative(results.url, url.parse('\\dir/subdir\\somedir/somefile.html', true));
      }
    });

    it('absolute file (Windows + forward slashes)', function() {
      var results = helper.invoke('parse', 'C:\\dir/subdir\\somedir/somefile.md');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'C:\\dir/subdir\\somedir/somefile.md',
          path: 'C:\\dir/subdir\\somedir/somefile.md',
          pathname: 'C:\\dir/subdir\\somedir/somefile.md',
          dir: 'C:\\dir/subdir\\somedir',
          base: 'somefile.md',
          name: 'somefile',
          ext: '.md'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: 'C:\\dir/subdir\\somedir/somefile.md',
          path: 'C:\\dir/subdir\\somedir/somefile.md',
          pathname: 'C:\\dir/subdir\\somedir/somefile.md',
          root: 'C:\\',
          dir: 'C:\\dir/subdir\\somedir',
          base: 'somefile.md',
          name: 'somefile',
          ext: '.md'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c:/dir/subdir/somedir/somefile.md',
          protocol: 'c:',
          path: '/dir/subdir/somedir/somefile.md',
          pathname: '/dir/subdir/somedir/somefile.md',
          root: '/',
          dir: '/dir/subdir/somedir',
          base: 'somefile.md',
          name: 'somefile',
          ext: '.md'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('C:\\dir/subdir\\somedir/somefile.md'));
        helper.equalsNative(results.url, url.parse('C:\\dir/subdir\\somedir/somefile.md', true));
      }
    });
  });

  describe('relative paths', function() {
    it('relative directory (forward slashes)', function() {
      var results = helper.invoke('parse', 'dir/subdir/somedir/');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: false,
          sep: '/',
          href: 'dir/subdir/somedir/',
          path: 'dir/subdir/somedir/',
          pathname: 'dir/subdir/somedir/',
          dir: 'dir/subdir',
          base: 'somedir',
          name: 'somedir'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: 'dir/subdir/somedir/',
          path: 'dir/subdir/somedir/',
          pathname: 'dir/subdir/somedir/',
          dir: 'dir/subdir',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: 'dir/subdir/somedir/',
          path: 'dir/subdir/somedir/',
          pathname: 'dir/subdir/somedir/',
          dir: 'dir/subdir',
          base: 'somedir',
          name: 'somedir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('dir/subdir/somedir/'));
        helper.equalsNative(results.omni, url.parse('dir/subdir/somedir/', true));
      }
    });

    it('relative directory (backslashes)', function() {
      var results = helper.invoke('parse', 'dir\\subdir\\somedir\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'dir\\subdir\\somedir\\',
          path: 'dir\\subdir\\somedir\\',
          pathname: 'dir\\subdir\\somedir\\',
          base: 'dir\\subdir\\somedir\\',
          name: 'dir\\subdir\\somedir\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: 'dir\\subdir\\somedir\\',
          path: 'dir\\subdir\\somedir\\',
          pathname: 'dir\\subdir\\somedir\\',
          dir: 'dir\\subdir',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: 'dir/subdir/somedir/',
          path: 'dir/subdir/somedir/',
          pathname: 'dir/subdir/somedir/',
          dir: 'dir/subdir',
          base: 'somedir',
          name: 'somedir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('dir\\subdir\\somedir\\'));
        helper.equalsNative(results.url, url.parse('dir\\subdir\\somedir\\', true));
      }
    });

    it('relative directory (forward slashes + backslashes)', function() {
      var results = helper.invoke('parse', 'dir\\subdir/somedir\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: false,
          sep: '/',
          href: 'dir\\subdir/somedir\\',
          path: 'dir\\subdir/somedir\\',
          pathname: 'dir\\subdir/somedir\\',
          dir: 'dir\\subdir',
          base: 'somedir\\',
          name: 'somedir\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: 'dir\\subdir/somedir\\',
          path: 'dir\\subdir/somedir\\',
          pathname: 'dir\\subdir/somedir\\',
          dir: 'dir\\subdir',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: 'dir/subdir/somedir/',
          path: 'dir/subdir/somedir/',
          pathname: 'dir/subdir/somedir/',
          dir: 'dir/subdir',
          base: 'somedir',
          name: 'somedir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('dir\\subdir/somedir\\'));
        helper.equalsNative(results.url, url.parse('dir\\subdir/somedir\\', true));
      }
    });

    it('relative directory (backslashes + forward slashes)', function() {
      var results = helper.invoke('parse', 'dir/subdir\\somedir/');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'dir/subdir\\somedir/',
          path: 'dir/subdir\\somedir/',
          pathname: 'dir/subdir\\somedir/',
          dir: 'dir',
          base: 'subdir\\somedir',
          name: 'subdir\\somedir'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: 'dir/subdir\\somedir/',
          path: 'dir/subdir\\somedir/',
          pathname: 'dir/subdir\\somedir/',
          dir: 'dir/subdir',
          base: 'somedir',
          name: 'somedir'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: 'dir/subdir/somedir/',
          path: 'dir/subdir/somedir/',
          pathname: 'dir/subdir/somedir/',
          dir: 'dir/subdir',
          base: 'somedir',
          name: 'somedir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('dir/subdir\\somedir/'));
        helper.equalsNative(results.url, url.parse('dir/subdir\\somedir/', true));
      }
    });

    it('relative file (forward slashes)', function() {
      var results = helper.invoke('parse', 'dir/subdir/somefile.txt');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: false,
          sep: '/',
          href: 'dir/subdir/somefile.txt',
          path: 'dir/subdir/somefile.txt',
          pathname: 'dir/subdir/somefile.txt',
          dir: 'dir/subdir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: 'dir/subdir/somefile.txt',
          path: 'dir/subdir/somefile.txt',
          pathname: 'dir/subdir/somefile.txt',
          dir: 'dir/subdir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: 'dir/subdir/somefile.txt',
          path: 'dir/subdir/somefile.txt',
          pathname: 'dir/subdir/somefile.txt',
          dir: 'dir/subdir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('dir/subdir/somefile.txt'));
        helper.equalsNative(results.omni, url.parse('dir/subdir/somefile.txt', true));
      }
    });

    it('relative file (backslashes)', function() {
      var results = helper.invoke('parse', 'dir\\subdir\\somefile.html');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'dir\\subdir\\somefile.html',
          path: 'dir\\subdir\\somefile.html',
          pathname: 'dir\\subdir\\somefile.html',
          base: 'dir\\subdir\\somefile.html',
          name: 'dir\\subdir\\somefile',
          ext: '.html'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: 'dir\\subdir\\somefile.html',
          path: 'dir\\subdir\\somefile.html',
          pathname: 'dir\\subdir\\somefile.html',
          dir: 'dir\\subdir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: 'dir/subdir/somefile.html',
          path: 'dir/subdir/somefile.html',
          pathname: 'dir/subdir/somefile.html',
          dir: 'dir/subdir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('dir\\subdir\\somefile.html'));
        helper.equalsNative(results.url, url.parse('dir\\subdir\\somefile.html', true));
      }
    });

    it('relative file (forward slashes + backslashes)', function() {
      var results = helper.invoke('parse', 'dir\\subdir/somedir\\somefile.txt');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: false,
          sep: '/',
          href: 'dir\\subdir/somedir\\somefile.txt',
          path: 'dir\\subdir/somedir\\somefile.txt',
          pathname: 'dir\\subdir/somedir\\somefile.txt',
          dir: 'dir\\subdir',
          base: 'somedir\\somefile.txt',
          name: 'somedir\\somefile',
          ext: '.txt'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: 'dir\\subdir/somedir\\somefile.txt',
          path: 'dir\\subdir/somedir\\somefile.txt',
          pathname: 'dir\\subdir/somedir\\somefile.txt',
          dir: 'dir\\subdir/somedir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: 'dir/subdir/somedir/somefile.txt',
          path: 'dir/subdir/somedir/somefile.txt',
          pathname: 'dir/subdir/somedir/somefile.txt',
          dir: 'dir/subdir/somedir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('dir\\subdir/somedir\\somefile.txt'));
        helper.equalsNative(results.url, url.parse('dir\\subdir/somedir\\somefile.txt', true));
      }
    });

    it('relative file (backslashes + forward slashes)', function() {
      var results = helper.invoke('parse', 'dir/subdir\\somedir/somefile.html');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'dir/subdir\\somedir/somefile.html',
          path: 'dir/subdir\\somedir/somefile.html',
          pathname: 'dir/subdir\\somedir/somefile.html',
          dir: 'dir/subdir\\somedir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: 'dir/subdir\\somedir/somefile.html',
          path: 'dir/subdir\\somedir/somefile.html',
          pathname: 'dir/subdir\\somedir/somefile.html',
          dir: 'dir/subdir\\somedir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: 'dir/subdir/somedir/somefile.html',
          path: 'dir/subdir/somedir/somefile.html',
          pathname: 'dir/subdir/somedir/somefile.html',
          dir: 'dir/subdir/somedir',
          base: 'somefile.html',
          name: 'somefile',
          ext: '.html'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('dir/subdir\\somedir/somefile.html'));
        helper.equalsNative(results.url, url.parse('dir/subdir\\somedir/somefile.html', true));
      }
    });
  });

  describe('URLs', function() {
    it('URL with only a hostname', function() {
      var results = helper.invoke('parse', 'ftp://localhost');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'ftp://localhost',
          path: 'ftp://localhost',
          pathname: 'ftp://localhost',
          dir: 'ftp:/',
          base: 'localhost',
          name: 'localhost'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'ftp://localhost',
          path: 'ftp://localhost',
          pathname: 'ftp://localhost',
          dir: 'ftp:/',
          base: 'localhost',
          name: 'localhost'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'ftp://localhost/',
          protocol: 'ftp:',
          slashes: true,
          host: 'localhost',
          hostname: 'localhost',
          path: '/',
          pathname: '/',
          root: '/',
          dir: '/'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.url, url.parse('ftp://localhost', true));
      }
    });

    it('URL with only a host IP', function() {
      var results = helper.invoke('parse', 'smb://192.168.1.256');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'smb://192.168.1.256',
          path: 'smb://192.168.1.256',
          pathname: 'smb://192.168.1.256',
          dir: 'smb:/',
          base: '192.168.1.256',
          name: '192.168.1',
          ext: '.256'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'smb://192.168.1.256',
          path: 'smb://192.168.1.256',
          pathname: 'smb://192.168.1.256',
          dir: 'smb:/',
          base: '192.168.1.256',
          name: '192.168.1',
          ext: '.256'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'smb://192.168.1.256',
          protocol: 'smb:',
          slashes: true,
          host: '192.168.1.256',
          hostname: '192.168.1.256'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.url, url.parse('smb://192.168.1.256', true));
      }
    });

    it('URL with only a host and query', function() {
      var results = helper.invoke('parse', 'gopher://localhost?foo=bar&biz=baz', {allowFileQuery: true});
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'gopher://localhost?foo=bar&biz=baz',
          path: 'gopher://localhost?foo=bar&biz=baz',
          pathname: 'gopher://localhost',
          dir: 'gopher:/',
          base: 'localhost',
          name: 'localhost',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'}
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'gopher://localhost?foo=bar&biz=baz',
          path: 'gopher://localhost?foo=bar&biz=baz',
          pathname: 'gopher://localhost',
          dir: 'gopher:/',
          base: 'localhost',
          name: 'localhost',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'}
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'gopher://localhost/?foo=bar&biz=baz',
          protocol: 'gopher:',
          slashes: true,
          host: 'localhost',
          hostname: 'localhost',
          path: '/?foo=bar&biz=baz',
          pathname: '/',
          root: '/',
          dir: '/',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'}
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.url, url.parse('gopher://localhost?foo=bar&biz=baz', true));
      }
    });

    it('URL with only a host and hash', function() {
      var results = helper.invoke('parse', 'apple-maps://host.name#not?a=query', {allowFileHash: true});
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'apple-maps://host.name#not?a=query',
          path: 'apple-maps://host.name',
          pathname: 'apple-maps://host.name',
          dir: 'apple-maps:/',
          base: 'host.name',
          name: 'host',
          ext: '.name',
          hash: '#not?a=query'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'apple-maps://host.name#not?a=query',
          path: 'apple-maps://host.name',
          pathname: 'apple-maps://host.name',
          dir: 'apple-maps:/',
          base: 'host.name',
          name: 'host',
          ext: '.name',
          hash: '#not?a=query'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'apple-maps://host.name#not?a=query',
          protocol: 'apple-maps:',
          slashes: true,
          host: 'host.name',
          hostname: 'host.name',
          hash: '#not?a=query'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.url, url.parse('apple-maps://host.name#not?a=query', true));
      }
    });

    it('URL with all parts', function() {
      var results = helper.invoke('parse', 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1', {allowFileQuery: true, allowFileHash: true});
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
          path: 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz',
          pathname: 'https://user:pass@www.server.com:80/p/a/t/h',
          dir: 'https://user:pass@www.server.com:80/p/a/t',
          base: 'h',
          name: 'h',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'},
          hash: '#page1'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
          path: 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz',
          pathname: 'https://user:pass@www.server.com:80/p/a/t/h',
          dir: 'https://user:pass@www.server.com:80/p/a/t',
          base: 'h',
          name: 'h',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'},
          hash: '#page1'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
          protocol: 'https:',
          slashes: true,
          auth: 'user:pass',
          host: 'www.server.com:80',
          hostname: 'www.server.com',
          port: '80',
          path: '/p/a/t/h?foo=bar&biz=baz',
          pathname: '/p/a/t/h',
          root: '/',
          dir: '/p/a/t',
          base: 'h',
          name: 'h',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'},
          hash: '#page1'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.url, url.parse('https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1', true));
      }
    });

    it('URL with unknown protocol', function() {
      var results = helper.invoke('parse', 'foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1', {allowFileQuery: true, allowFileHash: true});
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
          path: 'foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz',
          pathname: 'foobar://user:pass@www.server.com:80/p/a/t/h',
          dir: 'foobar://user:pass@www.server.com:80/p/a/t',
          base: 'h',
          name: 'h',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'},
          hash: '#page1'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
          path: 'foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz',
          pathname: 'foobar://user:pass@www.server.com:80/p/a/t/h',
          dir: 'foobar://user:pass@www.server.com:80/p/a/t',
          base: 'h',
          name: 'h',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'},
          hash: '#page1'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
          protocol: 'foobar:',
          slashes: true,
          auth: 'user:pass',
          host: 'www.server.com:80',
          hostname: 'www.server.com',
          port: '80',
          path: '/p/a/t/h?foo=bar&biz=baz',
          pathname: '/p/a/t/h',
          root: '/',
          dir: '/p/a/t',
          base: 'h',
          name: 'h',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'},
          hash: '#page1'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.url, url.parse('foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1', true));
      }
    });

    it('URL with single-letter protocol', function() {
      var results = helper.invoke('parse', 'c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1', {allowFileQuery: true, allowFileHash: true});
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
          path: 'c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz',
          pathname: 'c://user:pass@www.server.com:80/p/a/t/h',
          dir: 'c://user:pass@www.server.com:80/p/a/t',
          base: 'h',
          name: 'h',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'},
          hash: '#page1'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: 'c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
          path: 'c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz',
          pathname: 'c://user:pass@www.server.com:80/p/a/t/h',
          root: 'c:/',
          dir: 'c://user:pass@www.server.com:80/p/a/t',
          base: 'h',
          name: 'h',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'},
          hash: '#page1'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
          protocol: 'c:',
          slashes: true,
          auth: 'user:pass',
          host: 'www.server.com:80',
          hostname: 'www.server.com',
          port: '80',
          path: '/p/a/t/h?foo=bar&biz=baz',
          pathname: '/p/a/t/h',
          root: '/',
          dir: '/p/a/t',
          base: 'h',
          name: 'h',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'},
          hash: '#page1'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.url, url.parse('c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1', true));
      }
    });

    it('URL object', function() {
      var urlObj = 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1';
      if (userAgent.isNode) {
        urlObj = url.parse(urlObj);
      }

      var results = helper.invoke('parse', urlObj, {allowFileQuery: true, allowFileHash: true});
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
          path: 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz',
          pathname: 'https://user:pass@www.server.com:80/p/a/t/h',
          dir: 'https://user:pass@www.server.com:80/p/a/t',
          base: 'h',
          name: 'h',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'},
          hash: '#page1'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
          path: 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz',
          pathname: 'https://user:pass@www.server.com:80/p/a/t/h',
          dir: 'https://user:pass@www.server.com:80/p/a/t',
          base: 'h',
          name: 'h',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'},
          hash: '#page1'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
          protocol: 'https:',
          slashes: true,
          auth: 'user:pass',
          host: 'www.server.com:80',
          hostname: 'www.server.com',
          port: '80',
          path: '/p/a/t/h?foo=bar&biz=baz',
          pathname: '/p/a/t/h',
          root: '/',
          dir: '/p/a/t',
          base: 'h',
          name: 'h',
          search: '?foo=bar&biz=baz',
          query: {foo: 'bar', biz: 'baz'},
          hash: '#page1'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.url, urlObj.parse('https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1', true));
      }
    });
  });

  describe('extensions', function() {
    it('directory with an extension', function() {
      var results = helper.invoke('parse', '.dir/sub.dir/some.dir/');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: false,
          sep: '/',
          href: '.dir/sub.dir/some.dir/',
          path: '.dir/sub.dir/some.dir/',
          pathname: '.dir/sub.dir/some.dir/',
          dir: '.dir/sub.dir',
          base: 'some.dir',
          name: 'some',
          ext: '.dir'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: '.dir/sub.dir/some.dir/',
          path: '.dir/sub.dir/some.dir/',
          pathname: '.dir/sub.dir/some.dir/',
          dir: '.dir/sub.dir',
          base: 'some.dir',
          name: 'some',
          ext: '.dir'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: '.dir/sub.dir/some.dir/',
          path: '.dir/sub.dir/some.dir/',
          pathname: '.dir/sub.dir/some.dir/',
          dir: '.dir/sub.dir',
          base: 'some.dir',
          name: 'some',
          ext: '.dir'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('.dir/sub.dir/some.dir/'));
        helper.equalsNative(results.omni, url.parse('.dir/sub.dir/some.dir/', true));
      }
    });

    it('directory with multiple extensions', function() {
      var results = helper.invoke('parse', 'd:\\.dir\\sub.dir\\di.rec.tory\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'd:\\.dir\\sub.dir\\di.rec.tory\\',
          path: 'd:\\.dir\\sub.dir\\di.rec.tory\\',
          pathname: 'd:\\.dir\\sub.dir\\di.rec.tory\\',
          base: 'd:\\.dir\\sub.dir\\di.rec.tory\\',
          name: 'd:\\.dir\\sub.dir\\di.rec',
          ext: '.tory\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: 'd:\\.dir\\sub.dir\\di.rec.tory\\',
          path: 'd:\\.dir\\sub.dir\\di.rec.tory\\',
          pathname: 'd:\\.dir\\sub.dir\\di.rec.tory\\',
          root: 'd:\\',
          dir: 'd:\\.dir\\sub.dir',
          base: 'di.rec.tory',
          name: 'di.rec',
          ext: '.tory'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'd:/.dir/sub.dir/di.rec.tory/',
          protocol: 'd:',
          path: '/.dir/sub.dir/di.rec.tory/',
          pathname: '/.dir/sub.dir/di.rec.tory/',
          root: '/',
          dir: '/.dir/sub.dir',
          base: 'di.rec.tory',
          name: 'di.rec',
          ext: '.tory'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('d:\\.dir\\sub.dir\\di.rec.tory\\'));
        helper.equalsNative(results.url, url.parse('d:\\.dir\\sub.dir\\di.rec.tory\\', true));
      }
    });

    it('hidden directory', function() {
      var results = helper.invoke('parse', '.dir\\sub.dir\\.hidden\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '.dir\\sub.dir\\.hidden\\',
          path: '.dir\\sub.dir\\.hidden\\',
          pathname: '.dir\\sub.dir\\.hidden\\',
          base: '.dir\\sub.dir\\.hidden\\',
          name: '.dir\\sub.dir\\',
          ext: '.hidden\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: '.dir\\sub.dir\\.hidden\\',
          path: '.dir\\sub.dir\\.hidden\\',
          pathname: '.dir\\sub.dir\\.hidden\\',
          dir: '.dir\\sub.dir',
          base: '.hidden',
          name: '.hidden'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: '.dir/sub.dir/.hidden/',
          path: '.dir/sub.dir/.hidden/',
          pathname: '.dir/sub.dir/.hidden/',
          dir: '.dir/sub.dir',
          base: '.hidden',
          name: '.hidden'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('.dir\\sub.dir\\.hidden\\'));
        helper.equalsNative(results.url, url.parse('.dir\\sub.dir\\.hidden\\', true));
      }
    });

    it('hidden directory with an extension', function() {
      var results = helper.invoke('parse', '.dir\\sub.dir/.hid.den\\');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: false,
          sep: '/',
          href: '.dir\\sub.dir/.hid.den\\',
          path: '.dir\\sub.dir/.hid.den\\',
          pathname: '.dir\\sub.dir/.hid.den\\',
          dir: '.dir\\sub.dir',
          base: '.hid.den\\',
          name: '.hid',
          ext: '.den\\'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: '.dir\\sub.dir/.hid.den\\',
          path: '.dir\\sub.dir/.hid.den\\',
          pathname: '.dir\\sub.dir/.hid.den\\',
          dir: '.dir\\sub.dir',
          base: '.hid.den',
          name: '.hid',
          ext: '.den'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: '.dir/sub.dir/.hid.den/',
          path: '.dir/sub.dir/.hid.den/',
          pathname: '.dir/sub.dir/.hid.den/',
          dir: '.dir/sub.dir',
          base: '.hid.den',
          name: '.hid',
          ext: '.den'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('.dir\\sub.dir/.hid.den\\'));
        helper.equalsNative(results.url, url.parse('.dir\\sub.dir/.hid.den\\', true));
      }
    });

    it('file with an extension', function() {
      var results = helper.invoke('parse', '.dir/sub.dir/somefile.txt');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: false,
          sep: '/',
          href: '.dir/sub.dir/somefile.txt',
          path: '.dir/sub.dir/somefile.txt',
          pathname: '.dir/sub.dir/somefile.txt',
          dir: '.dir/sub.dir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: '.dir/sub.dir/somefile.txt',
          path: '.dir/sub.dir/somefile.txt',
          pathname: '.dir/sub.dir/somefile.txt',
          dir: '.dir/sub.dir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: '.dir/sub.dir/somefile.txt',
          path: '.dir/sub.dir/somefile.txt',
          pathname: '.dir/sub.dir/somefile.txt',
          dir: '.dir/sub.dir',
          base: 'somefile.txt',
          name: 'somefile',
          ext: '.txt'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('.dir/sub.dir/somefile.txt'));
        helper.equalsNative(results.omni, url.parse('.dir/sub.dir/somefile.txt', true));
      }
    });

    it('file with multiple extensions', function() {
      var results = helper.invoke('parse', 'd:\\.dir\\sub.dir\\somefile.min.js');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'd:\\.dir\\sub.dir\\somefile.min.js',
          path: 'd:\\.dir\\sub.dir\\somefile.min.js',
          pathname: 'd:\\.dir\\sub.dir\\somefile.min.js',
          base: 'd:\\.dir\\sub.dir\\somefile.min.js',
          name: 'd:\\.dir\\sub.dir\\somefile.min',
          ext: '.js'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: 'd:\\.dir\\sub.dir\\somefile.min.js',
          path: 'd:\\.dir\\sub.dir\\somefile.min.js',
          pathname: 'd:\\.dir\\sub.dir\\somefile.min.js',
          root: 'd:\\',
          dir: 'd:\\.dir\\sub.dir',
          base: 'somefile.min.js',
          name: 'somefile.min',
          ext: '.js'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'd:/.dir/sub.dir/somefile.min.js',
          protocol: 'd:',
          path: '/.dir/sub.dir/somefile.min.js',
          pathname: '/.dir/sub.dir/somefile.min.js',
          root: '/',
          dir: '/.dir/sub.dir',
          base: 'somefile.min.js',
          name: 'somefile.min',
          ext: '.js'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('d:\\.dir\\sub.dir\\somefile.min.js'));
        helper.equalsNative(results.url, url.parse('d:\\.dir\\sub.dir\\somefile.min.js', true));
      }
    });

    it('hidden file', function() {
      var results = helper.invoke('parse', '.dir\\sub.dir\\.hidden');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '.dir\\sub.dir\\.hidden',
          path: '.dir\\sub.dir\\.hidden',
          pathname: '.dir\\sub.dir\\.hidden',
          base: '.dir\\sub.dir\\.hidden',
          name: '.dir\\sub.dir\\',
          ext: '.hidden'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: '.dir\\sub.dir\\.hidden',
          path: '.dir\\sub.dir\\.hidden',
          pathname: '.dir\\sub.dir\\.hidden',
          dir: '.dir\\sub.dir',
          base: '.hidden',
          name: '.hidden'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: '.dir/sub.dir/.hidden',
          path: '.dir/sub.dir/.hidden',
          pathname: '.dir/sub.dir/.hidden',
          dir: '.dir/sub.dir',
          base: '.hidden',
          name: '.hidden'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('.dir\\sub.dir\\.hidden'));
        helper.equalsNative(results.url, url.parse('.dir\\sub.dir\\.hidden', true));
      }
    });

    it('hidden file with an extension', function() {
      var results = helper.invoke('parse', '.dir\\sub.dir/.hidden.md');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: false,
          sep: '/',
          href: '.dir\\sub.dir/.hidden.md',
          path: '.dir\\sub.dir/.hidden.md',
          pathname: '.dir\\sub.dir/.hidden.md',
          dir: '.dir\\sub.dir',
          base: '.hidden.md',
          name: '.hidden',
          ext: '.md'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: false,
          sep: '\\',
          href: '.dir\\sub.dir/.hidden.md',
          path: '.dir\\sub.dir/.hidden.md',
          pathname: '.dir\\sub.dir/.hidden.md',
          dir: '.dir\\sub.dir',
          base: '.hidden.md',
          name: '.hidden',
          ext: '.md'
        },
        url: {
          isUrl: true,
          isAbsolute: false,
          sep: '/',
          href: '.dir/sub.dir/.hidden.md',
          path: '.dir/sub.dir/.hidden.md',
          pathname: '.dir/sub.dir/.hidden.md',
          dir: '.dir/sub.dir',
          base: '.hidden.md',
          name: '.hidden',
          ext: '.md'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('.dir\\sub.dir/.hidden.md'));
        helper.equalsNative(results.url, url.parse('.dir\\sub.dir/.hidden.md', true));
      }
    });
  });

  describe('queries and hashes', function() {
    it('path containing # and ? characters', function() {
      var results = helper.invoke('parse', '/path/?to=a/#file\\with#/slashes');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: true,
          sep: '/',
          href: '/path/?to=a/#file\\with#/slashes',
          path: '/path/?to=a/#file\\with#/slashes',
          pathname: '/path/?to=a/#file\\with#/slashes',
          root: '/',
          dir: '/path/?to=a/#file\\with#',
          base: 'slashes',
          name: 'slashes'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '/path/?to=a/#file\\with#/slashes',
          path: '/path/?to=a/#file\\with#/slashes',
          pathname: '/path/?to=a/#file\\with#/slashes',
          root: '/',
          dir: '/path/?to=a/#file\\with#',
          base: 'slashes',
          name: 'slashes'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/path/?to=a/#file%5Cwith#/slashes',
          path: '/path/?to=a/',
          pathname: '/path/',
          root: '/',
          dir: '/',
          base: 'path',
          name: 'path',
          search: '?to=a/',
          query: {to: 'a/'},
          hash: '#file%5Cwith#/slashes'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('/path/?to=a/#file\\with#/slashes'));
        helper.equalsNative(results.url, url.parse('/path/?to=a/#file\\with#/slashes', true));
      }
    });

    it('path with a query', function() {
      var results = helper.invoke('parse', 'path/to/a/file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'path/to/a/file.html?foo=\\bar&biz=/baz',
          path: 'path/to/a/file.html?foo=\\bar&biz=/baz',
          pathname: 'path/to/a/file.html',
          dir: 'path/to/a',
          base: 'file.html',
          name: 'file',
          ext: '.html',
          search: '?foo=\\bar&biz=/baz',
          query: {foo: '\\bar', biz: '/baz'}
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\',
          href: 'path/to/a/file.html?foo=\\bar&biz=/baz',
          path: 'path/to/a/file.html?foo=\\bar&biz=/baz',
          pathname: 'path/to/a/file.html',
          dir: 'path/to/a',
          base: 'file.html',
          name: 'file',
          ext: '.html',
          search: '?foo=\\bar&biz=/baz',
          query: {foo: '\\bar', biz: '/baz'}
        },
        url: {
          isUrl: true,
          sep: '/',
          href: 'path/to/a/file.html?foo=/bar&biz=/baz',
          path: 'path/to/a/file.html?foo=/bar&biz=/baz',
          pathname: 'path/to/a/file.html',
          dir: 'path/to/a',
          base: 'file.html',
          name: 'file',
          ext: '.html',
          search: '?foo=/bar&biz=/baz',
          query: {foo: '/bar', biz: '/baz'}
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('path/to/a/file.html'));
        helper.equalsNative(results.url, url.parse('path/to/a/file.html?foo=\\bar&biz=/baz', true));
      }
    });

    it('path with a hash', function() {
      var results = helper.invoke('parse', 'D:\\path\\to/a\\direc.tory/#page1\\?not=a/&query', {allowFileHash: true});
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: 'D:\\path\\to/a\\direc.tory/#page1\\?not=a/&query',
          path: 'D:\\path\\to/a\\direc.tory/',
          pathname: 'D:\\path\\to/a\\direc.tory/',
          dir: 'D:\\path\\to',
          base: 'a\\direc.tory',
          name: 'a\\direc',
          ext: '.tory',
          hash: '#page1\\?not=a/&query'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: 'D:\\path\\to/a\\direc.tory/#page1\\?not=a/&query',
          path: 'D:\\path\\to/a\\direc.tory/',
          pathname: 'D:\\path\\to/a\\direc.tory/',
          root: 'D:\\',
          dir: 'D:\\path\\to/a',
          base: 'direc.tory',
          name: 'direc',
          ext: '.tory',
          hash: '#page1\\?not=a/&query'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: 'd:/path/to/a/direc.tory/#page1%5C?not=a/&query',
          protocol: 'd:',
          path: '/path/to/a/direc.tory/',
          pathname: '/path/to/a/direc.tory/',
          root: '/',
          dir: '/path/to/a',
          base: 'direc.tory',
          name: 'direc',
          ext: '.tory',
          hash: '#page1%5C?not=a/&query'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('D:\\path\\to/a\\direc.tory/'));
        helper.equalsNative(results.url, url.parse('D:\\path\\to/a\\direc.tory/#page1\\?not=a/&query', true));
      }
    });

    it('path with a query and a hash', function() {
      var results = helper.invoke('parse', '\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/',
          href: '\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz#page1\\?not=a/&query',
          path: '\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz',
          pathname: '\\\\server/path\\to/a\\direc.tory/',
          dir: '\\\\server/path\\to',
          base: 'a\\direc.tory',
          name: 'a\\direc',
          ext: '.tory',
          search: '?foo=\\bar&biz=/baz',
          query: {foo: '\\bar', biz: '/baz'},
          hash: '#page1\\?not=a/&query'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isUnc: true,
          isAbsolute: true,
          sep: '\\',
          href: '\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz#page1\\?not=a/&query',
          path: '\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz',
          pathname: '\\\\server/path\\to/a\\direc.tory/',
          root: '\\\\server/path\\',
          dir: '\\\\server/path\\to/a',
          base: 'direc.tory',
          name: 'direc',
          ext: '.tory',
          search: '?foo=\\bar&biz=/baz',
          query: {foo: '\\bar', biz: '/baz'},
          hash: '#page1\\?not=a/&query'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '//server/path/to/a/direc.tory/?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query',
          path: '//server/path/to/a/direc.tory/?foo=%5Cbar&biz=/baz',
          pathname: '//server/path/to/a/direc.tory/',
          root: '/',
          dir: '//server/path/to/a',
          base: 'direc.tory',
          name: 'direc',
          ext: '.tory',
          search: '?foo=%5Cbar&biz=/baz',
          query: {foo: '\\bar', biz: '/baz'},
          hash: '#page1%5C?not=a/&query'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('\\\\server/path\\to/a\\direc.tory/'));
        helper.equalsNative(results.url, url.parse('\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz#page1\\?not=a/&query', true));
      }
    });
  });

  describe('special characters', function() {
    it('empty string', function() {
      var results = helper.invoke('parse', '');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          sep: '/'
        },
        win32: {
          isFS: true,
          isWindows: true,
          sep: '\\'
        },
        url: {
          isUrl: true,
          sep: '/'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse(''));
        helper.equalsNative(results.url, url.parse('', true));
      }
    });

    it('path with non-encoded special characters', function() {
      var results = helper.invoke('parse', '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: true,
          sep: '/',
          href: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
          path: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
          pathname: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
          root: '/',
          dir: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
          base: '__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
          name: '__({[ ! % , ',
          ext: '. > < ? & $ # @ ` ~ ,)}]__'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
          path: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
          pathname: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
          root: '/',
          dir: '/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
          base: '__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
          name: '__({[ ! % , ',
          ext: '. > < ? & $ # @ ` ~ ,)}]__'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
          path: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20',
          pathname: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20',
          root: '/',
          dir: '/',
          base: '_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20',
          name: '_-9a.t+8r_(%7B[%20!%20%%20,%20',
          ext: '.%20%3E%20%3C%20',
          search: '?%20&%20$%20',
          query: {' ': '', ' $ ': ''},
          hash: '#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__'));
        helper.equalsNative(results.url, url.parse('/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__', true));
      }
    });

    it('path with encoded special characters', function() {
      var results = helper.invoke('parse', '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__');
      helper.equals(results, {
        posix: {
          isFS: true,
          isPosix: true,
          isAbsolute: true,
          sep: '/',
          href: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
          path: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
          pathname: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
          root: '/',
          dir: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
          base: '__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
          name: '__(%7B[%20!%20%%20,%20',
          ext: '.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__'
        },
        win32: {
          isFS: true,
          isWindows: true,
          isAbsolute: true,
          sep: '\\',
          href: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
          path: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
          pathname: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
          root: '/',
          dir: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
          base: '__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
          name: '__(%7B[%20!%20%%20,%20',
          ext: '.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__'
        },
        url: {
          isUrl: true,
          isAbsolute: true,
          sep: '/',
          href: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
          path: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20',
          pathname: '/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20',
          root: '/',
          dir: '/',
          base: '_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20',
          name: '_-9a.t+8r_(%7B[%20!%20%%20,%20',
          ext: '.%20%3E%20%3C%20',
          search: '?%20&%20$%20',
          query: {' ': '', ' $ ': ''},
          hash: '#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__'
        }
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        helper.equalsNative(results.omni, path.parse('/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__'));
        helper.equalsNative(results.url, url.parse('/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__', true));
      }
    });
  });

  describe('invalid arguments', function() {
    it('no arguments', function() {
      function notGonnaWork() {
        helper.invoke('parse');
      }

      expect(notGonnaWork).to.throw(Error, 'Expected a file path or URL, but got undefined undefined');
    });

    it('null', function() {
      function notGonnaWork() {
        helper.invoke('parse', null);
      }

      expect(notGonnaWork).to.throw(Error, 'Expected a file path or URL, but got object null');
    });

    it('object', function() {
      function notGonnaWork() {
        helper.invoke('parse', {href: 'foobar'});
      }

      expect(notGonnaWork).to.throw(Error, 'Expected a file path or URL, but got object [object Object]');
    });
  });
});
