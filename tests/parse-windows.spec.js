//'use strict';
//
//// Windows paths can only be tested when running in Node on a Windows OS,
//// otherwise, they'll be treated as relative URLs
//helper.describeIfWindows('OmniPath.parse - Windows', function() {
//  describe('absolute paths', function() {
//    it('should parse an absolute root directory path', function() {
//      var omniPath = OmniPath.parse('C:\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\',
//        pathname: 'C:\\',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root directory path without a slash', function() {
//      var omniPath = OmniPath.parse('C:');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\',
//        pathname: 'C:\\',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root directory path with forward slashes', function() {
//      var omniPath = OmniPath.parse('C:/');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\',
//        pathname: 'C:\\',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root directory path with forward slashes and no drive letter', function() {
//      var omniPath = OmniPath.parse('/');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\',
//        pathname: 'C:\\',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root directory path with no drive letter', function() {
//      var omniPath = OmniPath.parse('\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\',
//        pathname: 'C:\\',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root file path', function() {
//      var omniPath = OmniPath.parse('C:\\somefile.txt');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\somefile.txt',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\somefile.txt',
//        pathname: 'C:\\somefile.txt',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: 'somefile.txt',
//        name: 'somefile',
//        ext: '.txt',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root file path with forward slashes', function() {
//      var omniPath = OmniPath.parse('C:/somefile.txt');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\somefile.txt',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\somefile.txt',
//        pathname: 'C:\\somefile.txt',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: 'somefile.txt',
//        name: 'somefile',
//        ext: '.txt',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root file path with no drive letter', function() {
//      var omniPath = OmniPath.parse('\\somefile.txt');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\somefile.txt',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\somefile.txt',
//        pathname: 'C:\\somefile.txt',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: 'somefile.txt',
//        name: 'somefile',
//        ext: '.txt',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root file path with forward slashes and no drive letter', function() {
//      var omniPath = OmniPath.parse('/somefile.txt');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\somefile.txt',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\somefile.txt',
//        pathname: 'C:\\somefile.txt',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: 'somefile.txt',
//        name: 'somefile',
//        ext: '.txt',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\directory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\directory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\directory\\',
//        pathname: 'C:\\path\\to\\a\\directory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'directory',
//        name: 'directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path with forward slashes', function() {
//      var omniPath = OmniPath.parse('C:/path/to\\a/directory/');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\directory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\directory\\',
//        pathname: 'C:\\path\\to\\a\\directory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'directory',
//        name: 'directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path with forward slashes and no drive letter', function() {
//      var omniPath = OmniPath.parse('/path/to/a/directory/');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\directory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\directory\\',
//        pathname: 'C:\\path\\to\\a\\directory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'directory',
//        name: 'directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path, with an extension', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\direc.tory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\direc.tory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\direc.tory\\',
//        pathname: 'C:\\path\\to\\a\\direc.tory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'direc.tory',
//        name: 'direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path that starts with a dot', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\.directory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\.directory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\.directory\\',
//        pathname: 'C:\\path\\to\\a\\.directory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: '.directory',
//        name: '.directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path that starts with a dot and has an extension', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\.direc.tory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\.direc.tory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\.direc.tory\\',
//        pathname: 'C:\\path\\to\\a\\.direc.tory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: '.direc.tory',
//        name: '.direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path with multiple dots', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\di.rec.tory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\di.rec.tory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\di.rec.tory\\',
//        pathname: 'C:\\path\\to\\a\\di.rec.tory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'di.rec.tory',
//        name: 'di.rec',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\file');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file',
//        pathname: 'C:\\path\\to\\a\\file',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file',
//        name: 'file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path with forward slashes', function() {
//      var omniPath = OmniPath.parse('C:/path\\to/a/file');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file',
//        pathname: 'C:\\path\\to\\a\\file',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file',
//        name: 'file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path with forward slashes and no drive letter', function() {
//      var omniPath = OmniPath.parse('/path/to/a/file');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file',
//        pathname: 'C:\\path\\to\\a\\file',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file',
//        name: 'file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path, with an extension', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\file.foo');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file.foo',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file.foo',
//        pathname: 'C:\\path\\to\\a\\file.foo',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file.foo',
//        name: 'file',
//        ext: '.foo',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path that starts with a dot', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\.file');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\.file',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\.file',
//        pathname: 'C:\\path\\to\\a\\.file',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: '.file',
//        name: '.file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path that starts with a dot and has an extension', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\.file.foo');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\.file.foo',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\.file.foo',
//        pathname: 'C:\\path\\to\\a\\.file.foo',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: '.file.foo',
//        name: '.file',
//        ext: '.foo',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path that has multiple dots', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\file.foo.bar');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file.foo.bar',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file.foo.bar',
//        pathname: 'C:\\path\\to\\a\\file.foo.bar',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file.foo.bar',
//        name: 'file.foo',
//        ext: '.bar',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute path containing # and ? characters', function() {
//      var omniPath = OmniPath.parse('C:\\path\\?to=a\\#file\\with#/slashes');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\?to=a\\#file\\with#\\slashes',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\?to=a\\#file\\with#\\slashes',
//        pathname: 'C:\\path\\?to=a\\#file\\with#\\slashes',
//        root: 'C:\\',
//        dir: 'C:\\path\\?to=a\\#file\\with#',
//        base: 'slashes',
//        name: 'slashes',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute path with a query', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz',
//        pathname: 'C:\\path\\to\\a\\file.html',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file.html',
//        name: 'file',
//        ext: '.html',
//        search: '?foo=\\bar&biz=/baz',
//        query: {foo: '\\bar', biz: '/baz'},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute path with a hash', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\direc.tory\\#page1\\?not=a/&query', {allowFileHash: true});
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\direc.tory\\#page1\\?not=a/&query',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\direc.tory\\',
//        pathname: 'C:\\path\\to\\a\\direc.tory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'direc.tory',
//        name: 'direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: '#page1\\?not=a/&query'
//      });
//    });
//
//    it('should parse an absolute path with a query and hash', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz',
//        pathname: 'C:\\path\\to\\a\\file.html',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file.html',
//        name: 'file',
//        ext: '.html',
//        search: '?foo=\\bar&biz=/baz',
//        query: {foo: '\\bar', biz: '/baz'},
//        hash: '#page1\\?not=a/&query'
//      });
//    });
//  });
//
//  describe('relative paths', function() {
//    it('should parse a relative directory path', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\directory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\directory\\'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\directory\\'),
//        pathname: path.join(cwd, 'path\\to\\a\\directory\\'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: 'directory',
//        name: 'directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative directory path with forward slashes', function() {
//      var omniPath = OmniPath.parse('path/to/a/directory/');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\directory\\'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\directory\\'),
//        pathname: path.join(cwd, 'path\\to\\a\\directory\\'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: 'directory',
//        name: 'directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative directory path, with an extension', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\direc.tory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\direc.tory\\'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\direc.tory\\'),
//        pathname: path.join(cwd, 'path\\to\\a\\direc.tory\\'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: 'direc.tory',
//        name: 'direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative directory path that starts with a dot', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\.directory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\.directory\\'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\.directory\\'),
//        pathname: path.join(cwd, 'path\\to\\a\\.directory\\'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: '.directory',
//        name: '.directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative directory path that starts with a dot and has an extension', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\.direc.tory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\.direc.tory\\'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\.direc.tory\\'),
//        pathname: path.join(cwd, 'path\\to\\a\\.direc.tory\\'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: '.direc.tory',
//        name: '.direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative directory path with multiple dots', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\di.rec.tory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\di.rec.tory\\'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\di.rec.tory\\'),
//        pathname: path.join(cwd, 'path\\to\\a\\di.rec.tory\\'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: 'di.rec.tory',
//        name: 'di.rec',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative file path', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\file');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\file'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\file'),
//        pathname: path.join(cwd, 'path\\to\\a\\file'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: 'file',
//        name: 'file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative file path with forward slashes', function() {
//      var omniPath = OmniPath.parse('path/to\\a/file');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\file'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\file'),
//        pathname: path.join(cwd, 'path\\to\\a\\file'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: 'file',
//        name: 'file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative file path, with an extension', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\file.foo');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\file.foo'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\file.foo'),
//        pathname: path.join(cwd, 'path\\to\\a\\file.foo'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: 'file.foo',
//        name: 'file',
//        ext: '.foo',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative file path that starts with a dot', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\.file');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\.file'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\.file'),
//        pathname: path.join(cwd, 'path\\to\\a\\.file'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: '.file',
//        name: '.file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative file path that starts with a dot and has an extension', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\.file.foo');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\.file.foo'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\.file.foo'),
//        pathname: path.join(cwd, 'path\\to\\a\\.file.foo'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: '.file.foo',
//        name: '.file',
//        ext: '.foo',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative file path that has multiple dots', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\file.foo.bar');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\file.foo.bar'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\file.foo.bar'),
//        pathname: path.join(cwd, 'path\\to\\a\\file.foo.bar'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: 'file.foo.bar',
//        name: 'file.foo',
//        ext: '.bar',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative path containing # and ? characters', function() {
//      var omniPath = OmniPath.parse('path\\?to=a\\#file\\with#/slashes');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\?to=a\\#file\\with#\\slashes'),
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\?to=a\\#file\\with#/slashes'),
//        pathname: path.join(cwd, 'path\\?to=a\\#file\\with#/slashes'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\?to=a\\#file\\with#'),
//        base: 'slashes',
//        name: 'slashes',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative path with a query', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\file.html') + '?foo=\\bar&biz=/baz',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\file.html') + '?foo=\\bar&biz=/baz',
//        pathname: path.join(cwd, 'path\\to\\a\\file.html'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: 'file.html',
//        name: 'file',
//        ext: '.html',
//        search: '?foo=\\bar&biz=/baz',
//        query: {foo: '\\bar', biz: '/baz'},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative path with a hash', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\direc.tory\\#page1\\?not=a/&query', {allowFileHash: true});
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\direc.tory') + '\\#page1\\?not=a/&query',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\direc.tory\\'),
//        pathname: path.join(cwd, 'path\\to\\a\\direc.tory\\'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: 'direc.tory',
//        name: 'direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: '#page1\\?not=a/&query'
//      });
//    });
//
//    it('should parse a relative path with a query and hash', function() {
//      var omniPath = OmniPath.parse('path\\to\\a\\file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: path.join(cwd, 'path\\to\\a\\file.html') + '?foo=\\bar&biz=/baz#page1\\?not=a/&query',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: path.join(cwd, 'path\\to\\a\\file.html') + '?foo=\\bar&biz=/baz',
//        pathname: path.join(cwd, 'path\\to\\a\\file.html'),
//        root: 'C:\\',
//        dir: path.join(cwd, 'path\\to\\a'),
//        base: 'file.html',
//        name: 'file',
//        ext: '.html',
//        search: '?foo=\\bar&biz=/baz',
//        query: {foo: '\\bar', biz: '/baz'},
//        hash: '#page1\\?not=a/&query'
//      });
//    });
//  });
//
//  describe('UNC paths', function() {
//    it('should parse a UNC path with only a server name', function() {
//      var omniPath = OmniPath.parse('\\\\server');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: '\\\\server',
//        protocol: '',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '',
//        pathname: '',
//        root: '\\\\server\\',
//        dir: 'C:\\',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root directory path with forward slashes', function() {
//      var omniPath = OmniPath.parse('C:/');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\',
//        pathname: 'C:\\',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root directory path with forward slashes and no drive letter', function() {
//      var omniPath = OmniPath.parse('/');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\',
//        pathname: 'C:\\',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root directory path with no drive letter', function() {
//      var omniPath = OmniPath.parse('\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\',
//        pathname: 'C:\\',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root file path', function() {
//      var omniPath = OmniPath.parse('C:\\somefile.txt');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\somefile.txt',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\somefile.txt',
//        pathname: 'C:\\somefile.txt',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: 'somefile.txt',
//        name: 'somefile',
//        ext: '.txt',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root file path with forward slashes', function() {
//      var omniPath = OmniPath.parse('C:/somefile.txt');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\somefile.txt',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\somefile.txt',
//        pathname: 'C:\\somefile.txt',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: 'somefile.txt',
//        name: 'somefile',
//        ext: '.txt',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root file path with no drive letter', function() {
//      var omniPath = OmniPath.parse('\\somefile.txt');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\somefile.txt',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\somefile.txt',
//        pathname: 'C:\\somefile.txt',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: 'somefile.txt',
//        name: 'somefile',
//        ext: '.txt',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute root file path with forward slashes and no drive letter', function() {
//      var omniPath = OmniPath.parse('/somefile.txt');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\somefile.txt',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\somefile.txt',
//        pathname: 'C:\\somefile.txt',
//        root: 'C:\\',
//        dir: 'C:\\',
//        base: 'somefile.txt',
//        name: 'somefile',
//        ext: '.txt',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\directory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\directory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\directory\\',
//        pathname: 'C:\\path\\to\\a\\directory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'directory',
//        name: 'directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path with forward slashes', function() {
//      var omniPath = OmniPath.parse('C:/path/to\\a/directory/');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\directory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\directory\\',
//        pathname: 'C:\\path\\to\\a\\directory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'directory',
//        name: 'directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path with forward slashes and no drive letter', function() {
//      var omniPath = OmniPath.parse('/path/to/a/directory/');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\directory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\directory\\',
//        pathname: 'C:\\path\\to\\a\\directory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'directory',
//        name: 'directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path, with an extension', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\direc.tory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\direc.tory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\direc.tory\\',
//        pathname: 'C:\\path\\to\\a\\direc.tory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'direc.tory',
//        name: 'direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path that starts with a dot', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\.directory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\.directory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\.directory\\',
//        pathname: 'C:\\path\\to\\a\\.directory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: '.directory',
//        name: '.directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path that starts with a dot and has an extension', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\.direc.tory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\.direc.tory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\.direc.tory\\',
//        pathname: 'C:\\path\\to\\a\\.direc.tory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: '.direc.tory',
//        name: '.direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute directory path with multiple dots', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\di.rec.tory\\');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\di.rec.tory\\',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\di.rec.tory\\',
//        pathname: 'C:\\path\\to\\a\\di.rec.tory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'di.rec.tory',
//        name: 'di.rec',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\file');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file',
//        pathname: 'C:\\path\\to\\a\\file',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file',
//        name: 'file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path with forward slashes', function() {
//      var omniPath = OmniPath.parse('C:/path\\to/a/file');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file',
//        pathname: 'C:\\path\\to\\a\\file',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file',
//        name: 'file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path with forward slashes and no drive letter', function() {
//      var omniPath = OmniPath.parse('/path/to/a/file');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file',
//        pathname: 'C:\\path\\to\\a\\file',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file',
//        name: 'file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path, with an extension', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\file.foo');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file.foo',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file.foo',
//        pathname: 'C:\\path\\to\\a\\file.foo',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file.foo',
//        name: 'file',
//        ext: '.foo',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path that starts with a dot', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\.file');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\.file',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\.file',
//        pathname: 'C:\\path\\to\\a\\.file',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: '.file',
//        name: '.file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path that starts with a dot and has an extension', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\.file.foo');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\.file.foo',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\.file.foo',
//        pathname: 'C:\\path\\to\\a\\.file.foo',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: '.file.foo',
//        name: '.file',
//        ext: '.foo',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute file path that has multiple dots', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\file.foo.bar');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file.foo.bar',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file.foo.bar',
//        pathname: 'C:\\path\\to\\a\\file.foo.bar',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file.foo.bar',
//        name: 'file.foo',
//        ext: '.bar',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute path containing # and ? characters', function() {
//      var omniPath = OmniPath.parse('C:\\path\\?to=a\\#file\\with#/slashes');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\?to=a\\#file\\with#\\slashes',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\?to=a\\#file\\with#\\slashes',
//        pathname: 'C:\\path\\?to=a\\#file\\with#\\slashes',
//        root: 'C:\\',
//        dir: 'C:\\path\\?to=a\\#file\\with#',
//        base: 'slashes',
//        name: 'slashes',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute path with a query', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz',
//        pathname: 'C:\\path\\to\\a\\file.html',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file.html',
//        name: 'file',
//        ext: '.html',
//        search: '?foo=\\bar&biz=/baz',
//        query: {foo: '\\bar', biz: '/baz'},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute path with a hash', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\direc.tory\\#page1\\?not=a/&query', {allowFileHash: true});
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\direc.tory\\#page1\\?not=a/&query',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\direc.tory\\',
//        pathname: 'C:\\path\\to\\a\\direc.tory\\',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'direc.tory',
//        name: 'direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: '#page1\\?not=a/&query'
//      });
//    });
//
//    it('should parse an absolute path with a query and hash', function() {
//      var omniPath = OmniPath.parse('C:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz',
//        pathname: 'C:\\path\\to\\a\\file.html',
//        root: 'C:\\',
//        dir: 'C:\\path\\to\\a',
//        base: 'file.html',
//        name: 'file',
//        ext: '.html',
//        search: '?foo=\\bar&biz=/baz',
//        query: {foo: '\\bar', biz: '/baz'},
//        hash: '#page1\\?not=a/&query'
//      });
//    });
//  });
//
//  describe('special characters', function() {
//    it('should parse a path with special characters', function() {
//      var omniPath = OmniPath.parse('C:/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__');
//
//      helper.inspect(omniPath, {
//        isUrl: false,
//        isFile: true,
//        sep: '\\',
//        href: 'C:\\_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__\\__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
//        protocol: '',
//        slashes: false,
//        auth: '',
//        host: '',
//        hostname: '',
//        port: '',
//        path: 'C:\\_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__\\__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
//        pathname: 'C:\\_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__\\__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
//        root: 'C:\\',
//        dir: 'C:\\_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
//        base: '__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__',
//        name: '__({[ ! % , ',
//        ext: '. > < ? & $ # @ ` ~ ,)}]__',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//  });
//});
