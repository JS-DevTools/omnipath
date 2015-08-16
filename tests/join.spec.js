//'use strict';
//
//describe('OmniPath.join', function() {
//  describe.only('URLs', function() {
//    it('should return the root directory', function() {
//      var omniJoin = OmniPath.join('http://localhost');
//      expect(omniJoin).to.equal('/');
//    });
//
//    it('should return the directory of a root file URL', function() {
//      var omniJoin = OmniPath.join('http://www.company.com:8080/somefile.txt');
//      expect(omniJoin).to.equal('/');
//    });
//
//    it('should return the directory of an absolute directory URL', function() {
//      var omniJoin = OmniPath.join('http://server/path/to/a/directory/');
//      expect(omniJoin).to.equal('/path/to/a');
//    });
//
//    it('should return the directory of an absolute file URL', function() {
//      var omniJoin = OmniPath.join('x://user:pass@www.server.com:443/path/to/a/file');
//      expect(omniJoin).to.equal('/path/to/a');
//    });
//
//    it('should return the directory of a URL with a query', function() {
//      var omniJoin = OmniPath.join('gopher://host/path/to/a/file.html?foo=\\bar&biz=/baz');
//      expect(omniJoin).to.equal('/path/to/a');
//    });
//
//    it('should return the directory of a URL with a hash', function() {
//      var omniJoin = OmniPath.join('ftp://192.168.1.1/path/to/a/direc.tory/#page1\\?not=a/&query');
//      expect(omniJoin).to.equal('/path/to/a');
//    });
//
//    it('should return the directory of a URL with a query and hash', function() {
//      var omniJoin = OmniPath.join('xyz://host/path/to/a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query');
//      expect(omniJoin).to.equal('/path/to/a');
//    });
//
//    helper.describeIfBrowser('relative URLs', function() {
//      it('should return the directory of a relative directory URL', function() {
//        var omniJoin = OmniPath.join('path/to/a/directory/');
//        expect(omniJoin).to.equal(helper.join() + '/path/to/a');
//      });
//
//      it('should return the directory of a relative file URL', function() {
//        var omniJoin = OmniPath.join('path/to/a/file');
//        expect(omniJoin).to.equal(helper.join() + '/path/to/a');
//      });
//
//      it('should return the directory of a host-relative directory URL', function() {
//        var omniJoin = OmniPath.join('/path/to/a/directory/');
//        expect(omniJoin).to.equal('/path/to/a');
//      });
//
//      it('should return the directory of a host-relative file URL', function() {
//        var omniJoin = OmniPath.join('/path/to/a/file');
//        expect(omniJoin).to.equal('/path/to/a');
//      });
//    });
//  });
//
//  helper.describeIfPosix('POSIX', function() {
//    it('should return the root directory', function() {
//      var omniJoin = OmniPath.join('/');
//      var nodeJoin = path.join('/');
//
//      expect(omniJoin).to.equal('/');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a root file', function() {
//      var omniJoin = OmniPath.join('/somefile.txt');
//      var nodeJoin = path.join('/somefile.txt');
//
//      expect(omniJoin).to.equal('/');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of an absolute directory path', function() {
//      var omniJoin = OmniPath.join('/path/to/a/directory/');
//      var nodeJoin = path.join('/path/to/a/directory/');
//
//      expect(omniJoin).to.equal('/path/to/a');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a relative directory path', function() {
//      var omniJoin = OmniPath.join('path/to/a/directory/');
//      var nodeJoin = path.join(path.resolve('path/to/a/directory/'));
//
//      expect(omniJoin).to.equal(path.join(cwd, '/path/to/a'));
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of an absolute file path', function() {
//      var omniJoin = OmniPath.join('/path/to/a/file');
//      var nodeJoin = path.join('/path/to/a/file');
//
//      expect(omniJoin).to.equal('/path/to/a');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a relative file path', function() {
//      var omniJoin = OmniPath.join('path/to/a/file');
//      var nodeJoin = path.join(path.resolve('path/to/a/file'));
//
//      expect(omniJoin).to.equal(path.join(cwd, '/path/to/a'));
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return a directory containing # and ? characters', function() {
//      var omniJoin = OmniPath.join('/path/?to=a/#file\\with#/slashes');
//      var nodeJoin = path.join('/path/?to=a/#file\\with#/slashes');
//
//      expect(omniJoin).to.equal('/path/?to=a/#file\\with#');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a path with a query', function() {
//      var omniJoin = OmniPath.join('/path/to/a/file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});
//      var nodeJoin = path.join('/path/to/a/file.html');
//
//      expect(omniJoin).to.equal('/path/to/a');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a path with a hash', function() {
//      var omniJoin = OmniPath.join('/path/to/a/direc.tory/#page1\\?not=a/&query', {allowFileHash: true});
//      var nodeJoin = path.join('/path/to/a/direc.tory/');
//
//      expect(omniJoin).to.equal('/path/to/a');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a path with a query and hash', function() {
//      var omniJoin = OmniPath.join('/path/to/a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});
//      var nodeJoin = path.join('/path/to/a/file.html');
//
//      expect(omniJoin).to.equal('/path/to/a');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//  });
//
//  helper.describeIfWindows('Windows', function() {
//    it('should return the root directory', function() {
//      var omniJoin = OmniPath.join('C:\\');
//      var nodeJoin = path.join('C:\\');
//
//      expect(omniJoin).to.equal('C:\\');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the root directory with a backslash', function() {
//      var omniJoin = OmniPath.join('/');
//      var nodeJoin = path.join('C:\\');
//
//      expect(omniJoin).to.equal('C:\\');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the root directory with a drive letter', function() {
//      var omniJoin = OmniPath.join('\\');
//      var nodeJoin = path.join('C:\\');
//
//      expect(omniJoin).to.equal('C:\\');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a root file', function() {
//      var omniJoin = OmniPath.join('c:\\somefile.txt');
//      var nodeJoin = path.join('c:\\somefile.txt');
//
//      expect(omniJoin).to.equal('c:\\');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of an absolute directory path', function() {
//      var omniJoin = OmniPath.join('C:\\path\\to\\a\\directory\\');
//      var nodeJoin = path.join('C:\\path\\to\\a\\directory\\');
//
//      expect(omniJoin).to.equal('C:\\path\\to\\a');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of an absolute directory path that has forward slashes', function() {
//      var omniJoin = OmniPath.join('C:/path\\to/a\\directory/');
//      var nodeJoin = path.join('C:\\path\\to\\a\\directory\\');
//
//      expect(omniJoin).to.equal('C:\\path\\to\\a');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a relative directory path', function() {
//      var omniJoin = OmniPath.join('path\\to\\a\\directory\\');
//      var nodeJoin = path.join(path.resolve('path\\to\\a\\directory\\'));
//
//      expect(omniJoin).to.equal(path.join(cwd, '\\path\\to\\a'));
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a relative directory path that has forward slashes', function() {
//      var omniJoin = OmniPath.join('path\\to/a\\directory/');
//      var nodeJoin = path.join(path.resolve('path\\to\\a\\directory\\'));
//
//      expect(omniJoin).to.equal(path.join(cwd, '\\path\\to\\a'));
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of an absolute file path', function() {
//      var omniJoin = OmniPath.join('c:\\path\\to\\a\\file');
//      var nodeJoin = path.join('c:\\path\\to\\a\\file');
//
//      expect(omniJoin).to.equal('c:\\path\\to\\a');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of an absolute file path that has forward slashes', function() {
//      var omniJoin = OmniPath.join('c:/path\\to/a\\file');
//      var nodeJoin = path.join('c:\\path\\to\\a\\file');
//
//      expect(omniJoin).to.equal('c:\\path\\to\\a');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a relative file path', function() {
//      var omniJoin = OmniPath.join('path\\to\\a\\file');
//      var nodeJoin = path.join(path.resolve('path\\to\\a\\file'));
//
//      expect(omniJoin).to.equal(path.join(cwd, '\\path\\to\\a'));
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a relative file path that has forward slashes', function() {
//      var omniJoin = OmniPath.join('path/to\\a/file');
//      var nodeJoin = path.join(path.resolve('path\\to\\a\\file'));
//
//      expect(omniJoin).to.equal(path.join(cwd, '\\path\\to\\a'));
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return a directory containing # and ? characters', function() {
//      var omniJoin = OmniPath.join('c:\\path\\?to=a\\#file\\with#/slashes');
//      var nodeJoin = path.join('c:\\path\\?to=a\\#file\\with#\\slashes');
//
//      expect(omniJoin).to.equal('c:\\path\\?to=a\\#file\\with#');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a path with a query', function() {
//      var omniJoin = OmniPath.join('D:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});
//      var nodeJoin = path.join('D:\\path\\to\\a\\file.html');
//
//      expect(omniJoin).to.equal('D:\\path\\to\\a');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a path with a hash', function() {
//      var omniJoin = OmniPath.join('x:/path\\to\\a\\direc.tory/#page1\\?not=a/&query', {allowFileHash: true});
//      var nodeJoin = path.join('x:\\path\\to\\a\\direc.tory\\');
//
//      expect(omniJoin).to.equal('x:\\path\\to\\a');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//
//    it('should return the directory of a path with a query and hash', function() {
//      var omniJoin = OmniPath.join('X:\\path\\to\\a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});
//      var nodeJoin = path.join('X:\\path\\to\\a\\file.html');
//
//      expect(omniJoin).to.equal('X:\\path\\to\\a');
//      expect(omniJoin).to.equal(nodeJoin);
//    });
//  });
//});
