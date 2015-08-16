//'use strict';
//
//describe('OmniPath.parse - URLs', function() {
//  describe('absolute URLs', function() {
//    it('should parse an absolute URL with all parts', function() {
//      var omniPath = OmniPath.parse('https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
//        protocol: 'https:',
//        slashes: true,
//        auth: 'user:pass',
//        host: 'www.server.com:80',
//        hostname: 'www.server.com',
//        port: '80',
//        path: '/p/a/t/h?foo=bar&biz=baz',
//        pathname: '/p/a/t/h',
//        root: '/',
//        dir: '/p/a/t',
//        base: 'h',
//        name: 'h',
//        ext: '',
//        search: '?foo=bar&biz=baz',
//        query: {foo: 'bar', biz: 'baz'},
//        hash: '#page1'
//      });
//    });
//
//    it('should parse an absolute URL with an unknown protocol', function() {
//      var omniPath = OmniPath.parse('foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1',
//        protocol: 'foobar:',
//        slashes: true,
//        auth: 'user:pass',
//        host: 'www.server.com:80',
//        hostname: 'www.server.com',
//        port: '80',
//        path: '/p/a/t/h?foo=bar&biz=baz',
//        pathname: '/p/a/t/h',
//        root: '/',
//        dir: '/p/a/t',
//        base: 'h',
//        name: 'h',
//        ext: '',
//        search: '?foo=bar&biz=baz',
//        query: {foo: 'bar', biz: 'baz'},
//        hash: '#page1'
//      });
//    });
//
//    it('should parse an absolute URL with a single-letter protocol', function() {
//      // This should be parsed as a URL, NOT a Windows path
//      var omniPath = OmniPath.parse('c://p/a/t/h');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'c://p/a/t/h',
//        protocol: 'c:',
//        slashes: true,
//        auth: '',
//        host: 'p',
//        hostname: 'p',
//        port: '',
//        path: '/a/t/h',
//        pathname: '/a/t/h',
//        root: '/',
//        dir: '/a/t',
//        base: 'h',
//        name: 'h',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with only hostname', function() {
//      var omniPath = OmniPath.parse('http://server');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/',
//        pathname: '/',
//        root: '/',
//        dir: '/',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with hostname and query', function() {
//      var omniPath = OmniPath.parse('http://server?foo=bar');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/?foo=bar',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/?foo=bar',
//        pathname: '/',
//        root: '/',
//        dir: '/',
//        base: '',
//        name: '',
//        ext: '',
//        search: '?foo=bar',
//        query: {foo: 'bar'},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with hostname and hash', function() {
//      var omniPath = OmniPath.parse('ftp://server#page1?not=a&query');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'ftp://server/#page1?not=a&query',
//        protocol: 'ftp:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/',
//        pathname: '/',
//        root: '/',
//        dir: '/',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: '#page1?not=a&query'
//      });
//    });
//
//    it('should parse an absolute URL with a root directory path', function() {
//      var omniPath = OmniPath.parse('gopher://server/');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'gopher://server/',
//        protocol: 'gopher:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/',
//        pathname: '/',
//        root: '/',
//        dir: '/',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with a root file path', function() {
//      var omniPath = OmniPath.parse('http://server/index.html');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/index.html',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/index.html',
//        pathname: '/index.html',
//        root: '/',
//        dir: '/',
//        base: 'index.html',
//        name: 'index',
//        ext: '.html',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with a directory path', function() {
//      var omniPath = OmniPath.parse('http://server/path/to/a/directory/');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/path/to/a/directory/',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/path/to/a/directory/',
//        pathname: '/path/to/a/directory/',
//        root: '/',
//        dir: '/path/to/a',
//        base: 'directory',
//        name: 'directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with a directory path and extension', function() {
//      var omniPath = OmniPath.parse('http://server/path/to/a/direc.tory/');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/path/to/a/direc.tory/',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/path/to/a/direc.tory/',
//        pathname: '/path/to/a/direc.tory/',
//        root: '/',
//        dir: '/path/to/a',
//        base: 'direc.tory',
//        name: 'direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with a directory path that starts with a dot', function() {
//      var omniPath = OmniPath.parse('http://server/path/to/a/.directory/');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/path/to/a/.directory/',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/path/to/a/.directory/',
//        pathname: '/path/to/a/.directory/',
//        root: '/',
//        dir: '/path/to/a',
//        base: '.directory',
//        name: '.directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with a directory path that starts with a dot and has an extension', function() {
//      var omniPath = OmniPath.parse('http://server/path/to/a/.direc.tory/');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/path/to/a/.direc.tory/',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/path/to/a/.direc.tory/',
//        pathname: '/path/to/a/.direc.tory/',
//        root: '/',
//        dir: '/path/to/a',
//        base: '.direc.tory',
//        name: '.direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with a directory path with multiple dots', function() {
//      var omniPath = OmniPath.parse('http://server/path/to/a/di.rec.tory/');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/path/to/a/di.rec.tory/',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/path/to/a/di.rec.tory/',
//        pathname: '/path/to/a/di.rec.tory/',
//        root: '/',
//        dir: '/path/to/a',
//        base: 'di.rec.tory',
//        name: 'di.rec',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with a file path', function() {
//      var omniPath = OmniPath.parse('http://server/path/to/a/file');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/path/to/a/file',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/path/to/a/file',
//        pathname: '/path/to/a/file',
//        root: '/',
//        dir: '/path/to/a',
//        base: 'file',
//        name: 'file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with a file path and extension', function() {
//      var omniPath = OmniPath.parse('http://server/path/to/a/file.foo');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/path/to/a/file.foo',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/path/to/a/file.foo',
//        pathname: '/path/to/a/file.foo',
//        root: '/',
//        dir: '/path/to/a',
//        base: 'file.foo',
//        name: 'file',
//        ext: '.foo',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with a file path that starts with a dot', function() {
//      var omniPath = OmniPath.parse('http://server/path/to/a/.file');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/path/to/a/.file',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/path/to/a/.file',
//        pathname: '/path/to/a/.file',
//        root: '/',
//        dir: '/path/to/a',
//        base: '.file',
//        name: '.file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with a file path that starts with a dot and has an extension', function() {
//      var omniPath = OmniPath.parse('http://server/path/to/a/.file.foo');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/path/to/a/.file.foo',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/path/to/a/.file.foo',
//        pathname: '/path/to/a/.file.foo',
//        root: '/',
//        dir: '/path/to/a',
//        base: '.file.foo',
//        name: '.file',
//        ext: '.foo',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse an absolute URL with a file path that has multiple dots', function() {
//      var omniPath = OmniPath.parse('http://server/path/to/a/file.foo.bar');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: 'http://server/path/to/a/file.foo.bar',
//        protocol: 'http:',
//        slashes: true,
//        auth: '',
//        host: 'server',
//        hostname: 'server',
//        port: '',
//        path: '/path/to/a/file.foo.bar',
//        pathname: '/path/to/a/file.foo.bar',
//        root: '/',
//        dir: '/path/to/a',
//        base: 'file.foo.bar',
//        name: 'file.foo',
//        ext: '.bar',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//  });
//
//  // Relative URLs can only be tested in a browser,
//  // otherwise, they will be treated as relative file paths
//  helper.describeIfBrowser('relative URLs', function() {
//    it('should parse a relative URL with all parts', function() {
//      var omniPath = OmniPath.parse('p/a/t/h?foo=bar&biz=baz#page1');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + helper.dirname() + '/p/a/t/h?foo=bar&biz=baz#page1',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: helper.dirname() + '/p/a/t/h?foo=bar&biz=baz',
//        pathname: helper.dirname() + '/p/a/t/h',
//        root: '/',
//        dir: helper.dirname() + '/p/a/t',
//        base: 'h',
//        name: 'h',
//        ext: '',
//        search: '?foo=bar&biz=baz',
//        query: {foo: 'bar', biz: 'baz'},
//        hash: '#page1'
//      });
//    });
//
//    it('should parse a relative URL with only a query', function() {
//      var omniPath = OmniPath.parse('?foo=bar&biz=baz');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.page() + '?foo=bar&biz=baz',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: location.pathname + '?foo=bar&biz=baz',
//        pathname: location.pathname,
//        root: '/',
//        dir: helper.dirname() || '/',
//        base: helper.basename(),
//        name: helper.name(),
//        ext: helper.ext(),
//        search: '?foo=bar&biz=baz',
//        query: {foo: 'bar', biz: 'baz'},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative URL with only a hash', function() {
//      var omniPath = OmniPath.parse('#page1?not=a&query');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.page() + location.search + '#page1?not=a&query',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: location.pathname + location.search,
//        pathname: location.pathname,
//        root: '/',
//        dir: helper.dirname() || '/',
//        base: helper.basename(),
//        name: helper.name(),
//        ext: helper.ext(),
//        search: location.search,
//        query: {},
//        hash: '#page1?not=a&query'
//      });
//    });
//
//    it('should parse an empty string as the current page', function() {
//      var omniPath = OmniPath.parse('');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.page() + location.search,  // The hash gets removed
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: location.pathname + location.search,
//        pathname: location.pathname,
//        root: '/',
//        dir: helper.dirname() || '/',
//        base: helper.basename(),
//        name: helper.name(),
//        ext: helper.ext(),
//        search: location.search,
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a host-relative URL with a root directory path', function() {
//      var omniPath = OmniPath.parse('/');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + '/',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: '/',
//        pathname: '/',
//        root: '/',
//        dir: '/',
//        base: '',
//        name: '',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a host-relative URL with a root file path', function() {
//      var omniPath = OmniPath.parse('/somefile.gif');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + '/somefile.gif',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: '/somefile.gif',
//        pathname: '/somefile.gif',
//        root: '/',
//        dir: '/',
//        base: 'somefile.gif',
//        name: 'somefile',
//        ext: '.gif',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative URL with a directory path', function() {
//      var omniPath = OmniPath.parse('path/to/a/directory/');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + helper.dirname() + '/path/to/a/directory/',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: helper.dirname() + '/path/to/a/directory/',
//        pathname: helper.dirname() + '/path/to/a/directory/',
//        root: '/',
//        dir: helper.dirname() + '/path/to/a',
//        base: 'directory',
//        name: 'directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative URL with a directory path and extension', function() {
//      var omniPath = OmniPath.parse('path/to/a/direc.tory/');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + helper.dirname() + '/path/to/a/direc.tory/',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: helper.dirname() + '/path/to/a/direc.tory/',
//        pathname: helper.dirname() + '/path/to/a/direc.tory/',
//        root: '/',
//        dir: helper.dirname() + '/path/to/a',
//        base: 'direc.tory',
//        name: 'direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative URL with a directory path that starts with a dot', function() {
//      var omniPath = OmniPath.parse('path/to/a/.directory/');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + helper.dirname() + '/path/to/a/.directory/',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: helper.dirname() + '/path/to/a/.directory/',
//        pathname: helper.dirname() + '/path/to/a/.directory/',
//        root: '/',
//        dir: helper.dirname() + '/path/to/a',
//        base: '.directory',
//        name: '.directory',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative URL with a directory path that starts with a dot and has an extension', function() {
//      var omniPath = OmniPath.parse('path/to/a/.direc.tory/');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + helper.dirname() + '/path/to/a/.direc.tory/',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: helper.dirname() + '/path/to/a/.direc.tory/',
//        pathname: helper.dirname() + '/path/to/a/.direc.tory/',
//        root: '/',
//        dir: helper.dirname() + '/path/to/a',
//        base: '.direc.tory',
//        name: '.direc',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative URL with a directory path with multiple dots', function() {
//      var omniPath = OmniPath.parse('path/to/a/di.rec.tory/');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + helper.dirname() + '/path/to/a/di.rec.tory/',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: helper.dirname() + '/path/to/a/di.rec.tory/',
//        pathname: helper.dirname() + '/path/to/a/di.rec.tory/',
//        root: '/',
//        dir: helper.dirname() + '/path/to/a',
//        base: 'di.rec.tory',
//        name: 'di.rec',
//        ext: '.tory',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative URL with a file path', function() {
//      var omniPath = OmniPath.parse('path/to/a/file');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + helper.dirname() + '/path/to/a/file',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: helper.dirname() + '/path/to/a/file',
//        pathname: helper.dirname() + '/path/to/a/file',
//        root: '/',
//        dir: helper.dirname() + '/path/to/a',
//        base: 'file',
//        name: 'file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative URL with a file path and extension', function() {
//      var omniPath = OmniPath.parse('path/to/a/file.foo');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + helper.dirname() + '/path/to/a/file.foo',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: helper.dirname() + '/path/to/a/file.foo',
//        pathname: helper.dirname() + '/path/to/a/file.foo',
//        root: '/',
//        dir: helper.dirname() + '/path/to/a',
//        base: 'file.foo',
//        name: 'file',
//        ext: '.foo',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative URL with a file path that starts with a dot', function() {
//      var omniPath = OmniPath.parse('path/to/a/.file');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + helper.dirname() + '/path/to/a/.file',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: helper.dirname() + '/path/to/a/.file',
//        pathname: helper.dirname() + '/path/to/a/.file',
//        root: '/',
//        dir: helper.dirname() + '/path/to/a',
//        base: '.file',
//        name: '.file',
//        ext: '',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative URL with a file path that starts with a dot and has an extension', function() {
//      var omniPath = OmniPath.parse('path/to/a/.file.foo');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + helper.dirname() + '/path/to/a/.file.foo',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: helper.dirname() + '/path/to/a/.file.foo',
//        pathname: helper.dirname() + '/path/to/a/.file.foo',
//        root: '/',
//        dir: helper.dirname() + '/path/to/a',
//        base: '.file.foo',
//        name: '.file',
//        ext: '.foo',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//
//    it('should parse a relative URL with a file path that has multiple dots', function() {
//      var omniPath = OmniPath.parse('path/to/a/file.foo.bar');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: helper.server() + helper.dirname() + '/path/to/a/file.foo.bar',
//        protocol: location.protocol,
//        slashes: true,
//        auth: '',
//        host: location.host,
//        hostname: location.hostname,
//        port: location.port,
//        path: helper.dirname() + '/path/to/a/file.foo.bar',
//        pathname: helper.dirname() + '/path/to/a/file.foo.bar',
//        root: '/',
//        dir: helper.dirname() + '/path/to/a',
//        base: 'file.foo.bar',
//        name: 'file.foo',
//        ext: '.bar',
//        search: '',
//        query: {},
//        hash: ''
//      });
//    });
//  });
//
//  describe('special characters', function() {
//    it('should parse a URL with encoded special characters', function() {
//      var omniPath = OmniPath.parse('-9a.t+8r://_-9a.t/+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__');
//
//      helper.inspect(omniPath, {
//        isUrl: true,
//        isFile: false,
//        sep: '/',
//        href: '-9a.t+8r://_-9a.t/+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
//        protocol: '-9a.t+8r:',
//        slashes: true,
//        auth: '',
//        host: '_-9a.t',
//        hostname: '_-9a.t',
//        port: '',
//        path: '/+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20',
//        pathname: '/+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20',
//        root: '/',
//        dir: '/',
//        base: '+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20',
//        name: '+8r_(%7B[%20!%20%%20,%20',
//        ext: '.%20%3E%20%3C%20',
//        search: '?%20&%20$%20',
//        query: {' ': '', ' $ ': ''},
//        hash: '#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__'
//      });
//    });
//
//    it('should parse a URL with non-encoded special characters', function() {
//      var omniPath = OmniPath.parse('-9a.t+8r://_-9a.t8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__');
//
//      if (userAgent.isNode && process.version.substr(0, 5) === 'v0.10') {
//        helper.inspect(omniPath, {
//          isUrl: true,
//          isFile: false,
//          sep: '/',
//          href: '-9a.t+8r://_-9a.t8r_/({[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)}]__/__({[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)}]__',
//          protocol: '-9a.t+8r:',
//          slashes: true,
//          auth: '',
//          host: '_-9a.t8r_',
//          hostname: '_-9a.t8r_',
//          port: '',
//          path: '/({[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20',
//          pathname: '/({[%20!%20%%20,%20.%20%3E%20%3C%20',
//          root: '/',
//          dir: '/',
//          base: '({[%20!%20%%20,%20.%20%3E%20%3C%20',
//          name: '({[%20!%20%%20,%20',
//          ext: '.%20%3E%20%3C%20',
//          search: '?%20&%20$%20',
//          query: {' ': '', ' $ ': ''},
//          hash: '#%20@%20%60%20~%20,)}]__/__({[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)}]__'
//        });
//      }
//      else {
//        helper.inspect(omniPath, {
//          isUrl: true,
//          isFile: false,
//          sep: '/',
//          href: '-9a.t+8r://_-9a.t8r_/(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__',
//          protocol: '-9a.t+8r:',
//          slashes: true,
//          auth: '',
//          host: '_-9a.t8r_',
//          hostname: '_-9a.t8r_',
//          port: '',
//          path: '/(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20',
//          pathname: '/(%7B[%20!%20%%20,%20.%20%3E%20%3C%20',
//          root: '/',
//          dir: '/',
//          base: '(%7B[%20!%20%%20,%20.%20%3E%20%3C%20',
//          name: '(%7B[%20!%20%%20,%20',
//          ext: '.%20%3E%20%3C%20',
//          search: '?%20&%20$%20',
//          query: {' ': '', ' $ ': ''},
//          hash: '#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__'
//        });
//      }
//    });
//
//    it('should throw a URIError if the URL is malformed', function() {
//      function tryToParse() {
//        OmniPath.parse('http://k2%^$%&$%*@%^(&^({}=110`');
//      }
//
//      expect(tryToParse).to.throw(URIError);
//    });
//  });
//});
