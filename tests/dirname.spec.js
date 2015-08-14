'use strict';

describe('OmniPath.dirname()', function() {
  describe('URLs', function() {
    it('should return the root directory', function() {
      var omniDir = OmniPath.dirname('http://localhost');
      expect(omniDir).to.equal('/');
    });

    it('should return the directory of a root file URL', function() {
      var omniDir = OmniPath.dirname('http://www.company.com:8080/somefile.txt');
      expect(omniDir).to.equal('/');
    });

    it('should return the directory of an absolute directory URL', function() {
      var omniDir = OmniPath.dirname('http://server/path/to/a/directory/');
      expect(omniDir).to.equal('/path/to/a');
    });

    it('should return the directory of an absolute file URL', function() {
      var omniDir = OmniPath.dirname('x://user:pass@www.server.com:443/path/to/a/file');
      expect(omniDir).to.equal('/path/to/a');
    });

    it('should return the directory of a URL with a query', function() {
      var omniDir = OmniPath.dirname('gopher://host/path/to/a/file.html?foo=\\bar&biz=/baz');
      expect(omniDir).to.equal('/path/to/a');
    });

    it('should return the directory of a URL with a hash', function() {
      var omniDir = OmniPath.dirname('ftp://192.168.1.1/path/to/a/direc.tory/#page1\\?not=a/&query');
      expect(omniDir).to.equal('/path/to/a');
    });

    it('should return the directory of a URL with a query and hash', function() {
      var omniDir = OmniPath.dirname('xyz://host/path/to/a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query');
      expect(omniDir).to.equal('/path/to/a');
    });

    helper.describeIfBrowser('relative URLs', function() {
      it('should return the directory of a relative directory URL', function() {
        var omniDir = OmniPath.dirname('path/to/a/directory/');
        expect(omniDir).to.equal(helper.dirname() + '/path/to/a');
      });

      it('should return the directory of a relative file URL', function() {
        var omniDir = OmniPath.dirname('path/to/a/file');
        expect(omniDir).to.equal(helper.dirname() + '/path/to/a');
      });

      it('should return the directory of a host-relative directory URL', function() {
        var omniDir = OmniPath.dirname('/path/to/a/directory/');
        expect(omniDir).to.equal('/path/to/a');
      });

      it('should return the directory of a host-relative file URL', function() {
        var omniDir = OmniPath.dirname('/path/to/a/file');
        expect(omniDir).to.equal('/path/to/a');
      });
    });
  });

  helper.describeIfPosix('POSIX', function() {
    it('should return the root directory', function() {
      var omniDir = OmniPath.dirname('/');
      var nodeDir = path.dirname('/');

      expect(omniDir).to.equal('/');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a root file', function() {
      var omniDir = OmniPath.dirname('/somefile.txt');
      var nodeDir = path.dirname('/somefile.txt');

      expect(omniDir).to.equal('/');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of an absolute directory path', function() {
      var omniDir = OmniPath.dirname('/path/to/a/directory/');
      var nodeDir = path.dirname('/path/to/a/directory/');

      expect(omniDir).to.equal('/path/to/a');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a relative directory path', function() {
      var omniDir = OmniPath.dirname('path/to/a/directory/');
      var nodeDir = path.dirname(path.resolve('path/to/a/directory/'));

      expect(omniDir).to.equal(path.join(cwd, '/path/to/a'));
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of an absolute file path', function() {
      var omniDir = OmniPath.dirname('/path/to/a/file');
      var nodeDir = path.dirname('/path/to/a/file');

      expect(omniDir).to.equal('/path/to/a');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a relative file path', function() {
      var omniDir = OmniPath.dirname('path/to/a/file');
      var nodeDir = path.dirname(path.resolve('path/to/a/file'));

      expect(omniDir).to.equal(path.join(cwd, '/path/to/a'));
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return a directory containing # and ? characters', function() {
      var omniDir = OmniPath.dirname('/path/?to=a/#file\\with#/slashes');
      var nodeDir = path.dirname('/path/?to=a/#file\\with#/slashes');

      expect(omniDir).to.equal('/path/?to=a/#file\\with#');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a path with a query', function() {
      var omniDir = OmniPath.dirname('/path/to/a/file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});
      var nodeDir = path.dirname('/path/to/a/file.html');

      expect(omniDir).to.equal('/path/to/a');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a path with a hash', function() {
      var omniDir = OmniPath.dirname('/path/to/a/direc.tory/#page1\\?not=a/&query', {allowFileHash: true});
      var nodeDir = path.dirname('/path/to/a/direc.tory/');

      expect(omniDir).to.equal('/path/to/a');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a path with a query and hash', function() {
      var omniDir = OmniPath.dirname('/path/to/a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});
      var nodeDir = path.dirname('/path/to/a/file.html');

      expect(omniDir).to.equal('/path/to/a');
      expect(omniDir).to.equal(nodeDir);
    });
  });

  helper.describeIfWindows('Windows', function() {
    it('should return the root directory', function() {
      var omniDir = OmniPath.dirname('C:\\');
      var nodeDir = path.dirname('C:\\');

      expect(omniDir).to.equal('C:\\');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the root directory with a backslash', function() {
      var omniDir = OmniPath.dirname('/');
      var nodeDir = path.dirname('C:\\');

      expect(omniDir).to.equal('C:\\');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the root directory with a drive letter', function() {
      var omniDir = OmniPath.dirname('\\');
      var nodeDir = path.dirname('C:\\');

      expect(omniDir).to.equal('C:\\');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a root file', function() {
      var omniDir = OmniPath.dirname('c:\\somefile.txt');
      var nodeDir = path.dirname('c:\\somefile.txt');

      expect(omniDir).to.equal('c:\\');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of an absolute directory path', function() {
      var omniDir = OmniPath.dirname('C:\\path\\to\\a\\directory\\');
      var nodeDir = path.dirname('C:\\path\\to\\a\\directory\\');

      expect(omniDir).to.equal('C:\\path\\to\\a');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of an absolute directory path that has forward slashes', function() {
      var omniDir = OmniPath.dirname('C:/path\\to/a\\directory/');
      var nodeDir = path.dirname('C:\\path\\to\\a\\directory\\');

      expect(omniDir).to.equal('C:\\path\\to\\a');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a relative directory path', function() {
      var omniDir = OmniPath.dirname('path\\to\\a\\directory\\');
      var nodeDir = path.dirname(path.resolve('path\\to\\a\\directory\\'));

      expect(omniDir).to.equal(path.join(cwd, '\\path\\to\\a'));
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a relative directory path that has forward slashes', function() {
      var omniDir = OmniPath.dirname('path\\to/a\\directory/');
      var nodeDir = path.dirname(path.resolve('path\\to\\a\\directory\\'));

      expect(omniDir).to.equal(path.join(cwd, '\\path\\to\\a'));
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of an absolute file path', function() {
      var omniDir = OmniPath.dirname('c:\\path\\to\\a\\file');
      var nodeDir = path.dirname('c:\\path\\to\\a\\file');

      expect(omniDir).to.equal('c:\\path\\to\\a');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of an absolute file path that has forward slashes', function() {
      var omniDir = OmniPath.dirname('c:/path\\to/a\\file');
      var nodeDir = path.dirname('c:\\path\\to\\a\\file');

      expect(omniDir).to.equal('c:\\path\\to\\a');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a relative file path', function() {
      var omniDir = OmniPath.dirname('path\\to\\a\\file');
      var nodeDir = path.dirname(path.resolve('path\\to\\a\\file'));

      expect(omniDir).to.equal(path.join(cwd, '\\path\\to\\a'));
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a relative file path that has forward slashes', function() {
      var omniDir = OmniPath.dirname('path/to\\a/file');
      var nodeDir = path.dirname(path.resolve('path\\to\\a\\file'));

      expect(omniDir).to.equal(path.join(cwd, '\\path\\to\\a'));
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return a directory containing # and ? characters', function() {
      var omniDir = OmniPath.dirname('c:\\path\\?to=a\\#file\\with#/slashes');
      var nodeDir = path.dirname('c:\\path\\?to=a\\#file\\with#\\slashes');

      expect(omniDir).to.equal('c:\\path\\?to=a\\#file\\with#');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a path with a query', function() {
      var omniDir = OmniPath.dirname('D:\\path\\to\\a\\file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});
      var nodeDir = path.dirname('D:\\path\\to\\a\\file.html');

      expect(omniDir).to.equal('D:\\path\\to\\a');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a path with a hash', function() {
      var omniDir = OmniPath.dirname('x:/path\\to\\a\\direc.tory/#page1\\?not=a/&query', {allowFileHash: true});
      var nodeDir = path.dirname('x:\\path\\to\\a\\direc.tory\\');

      expect(omniDir).to.equal('x:\\path\\to\\a');
      expect(omniDir).to.equal(nodeDir);
    });

    it('should return the directory of a path with a query and hash', function() {
      var omniDir = OmniPath.dirname('X:\\path\\to\\a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});
      var nodeDir = path.dirname('X:\\path\\to\\a\\file.html');

      expect(omniDir).to.equal('X:\\path\\to\\a');
      expect(omniDir).to.equal(nodeDir);
    });
  });
});
