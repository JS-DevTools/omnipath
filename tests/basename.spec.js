'use strict';

describe('OmniPath.basename()', function() {
  describe('URLs', function() {
    it('should return an empty string if the URL has no path', function() {
      var omniBase = OmniPath.basename('http://localhost');
      expect(omniBase).to.equal('');
    });

    it('should return a root directory name', function() {
      var omniBase = OmniPath.basename('http://www.company.com:8080/somedir/');
      expect(omniBase).to.equal('somedir');
    });

    it('should return a root file name', function() {
      var omniBase = OmniPath.basename('http://www.company.com:8080/somefile.txt');
      expect(omniBase).to.equal('somefile.txt');
    });

    it('should return a directory name', function() {
      var omniBase = OmniPath.basename('http://server/path/to/a/directory/');
      expect(omniBase).to.equal('directory');
    });

    it('should return a file name', function() {
      var omniBase = OmniPath.basename('x://user:pass@www.server.com:443/path/to/a/file.html');
      expect(omniBase).to.equal('file.html');
    });

    it('should return the basename of a URL with a query', function() {
      var omniBase = OmniPath.basename('gopher://host/path/to/a/file.html?foo=\\bar&biz=/baz');
      expect(omniBase).to.equal('file.html');
    });

    it('should return the basename of a URL with a hash', function() {
      var omniBase = OmniPath.basename('ftp://192.168.1.1/path/to/a/direc.tory/#page1\\?not=a/&query');
      expect(omniBase).to.equal('direc.tory');
    });

    it('should return the basename of a URL with a query and hash', function() {
      var omniBase = OmniPath.basename('xyz://host/path/to/a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query');
      expect(omniBase).to.equal('file.html');
    });

    it('should return a basename without an extension', function() {
      var omniBase = OmniPath.basename('http://server/dir/subdir/somefile');
      expect(omniBase).to.equal('somefile');
    });

    it('should return a basename that starts with a dot', function() {
      var omniBase = OmniPath.basename('ftp://host/.dir/subdir/.hidden');
      expect(omniBase).to.equal('.hidden');
    });

    it('should return a basename that starts with a dot and has an extension', function() {
      var omniBase = OmniPath.basename('ftp://host/di.r/subdir/.hidden.html');
      expect(omniBase).to.equal('.hidden.html');
    });

    it('should return a basename that has multiple dots', function() {
      var omniBase = OmniPath.basename('gopher://www.google.com/dir/su.b.dir/hi.dd.en.html');
      expect(omniBase).to.equal('hi.dd.en.html');
    });

    it('should return a basename without an extension, even if an extension is given', function() {
      var omniBase = OmniPath.basename('http://server/dir/subdir/somefile', '.html');
      expect(omniBase).to.equal('somefile');
    });

    it('should omit the extension if it matches the given extension', function() {
      var omniBase = OmniPath.basename('ftp://host/.dir/subdir/somefile.html', '.html');
      expect(omniBase).to.equal('somefile');
    });

    it('should NOT omit the extension if it does not match the case of the given extension', function() {
      var omniBase = OmniPath.basename('ftp://host/.dir/subdir/somefile.html', '.HTML');
      expect(omniBase).to.equal('somefile.html');
    });

    it('should omit the extension if it matches the given extension without any dots', function() {
      var omniBase = OmniPath.basename('ftp://host/.dir/subdir/somefile', 'file');
      expect(omniBase).to.equal('some');
    });

    it('should return an empty string if the entire basename matches the given extension without any dots', function() {
      var omniBase = OmniPath.basename('ftp://host/.dir/subdir/somefile', 'somefile');
      expect(omniBase).to.equal('');
    });

    it('should omit the extension if it matches the given extension with multiple dots', function() {
      var omniBase = OmniPath.basename('ftp://host/.dir/subdir/somefile.min.js', '.min.js');
      expect(omniBase).to.equal('somefile');
    });

    it('should return an empty string if the entire basename matches the given extension', function() {
      var omniBase = OmniPath.basename('ftp://host/.dir/subdir/.hidden', '.hidden');
      expect(omniBase).to.equal('');
    });

    it('should return an empty string if the entire basename matches the given extension with multiple dots', function() {
      var omniBase = OmniPath.basename('ftp://host/.dir/subdir/.hidden.js', '.hidden.js');
      expect(omniBase).to.equal('');
    });

    helper.describeIfBrowser('relative URLs', function() {
      it('should return a relative directory name', function() {
        var omniBase = OmniPath.basename('path/to/a/directory/');
        expect(omniBase).to.equal('directory');
      });

      it('should return a relative file name', function() {
        var omniBase = OmniPath.basename('path/to/a/file.txt');
        expect(omniBase).to.equal('file.txt');
      });

      it('should return a host-relative directory name', function() {
        var omniBase = OmniPath.basename('/path/to/a/directory/');
        expect(omniBase).to.equal('directory');
      });

      it('should return a host-relative file name', function() {
        var omniBase = OmniPath.basename('/path/to/a/file.txt');
        expect(omniBase).to.equal('file.txt');
      });
    });
  });

  helper.describeIfPosix('POSIX', function() {
    it('should return an empty string for the root path', function() {
      var omniBase = OmniPath.basename('/');
      var nodeBase = path.basename('/');

      expect(omniBase).to.equal('');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a root directory name', function() {
      var omniBase = OmniPath.basename('/somedir/');
      var nodeBase = path.basename('/somedir/');

      expect(omniBase).to.equal('somedir');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a root file name', function() {
      var omniBase = OmniPath.basename('/somefile.txt');
      var nodeBase = path.basename('/somefile.txt');

      expect(omniBase).to.equal('somefile.txt');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return an absolute directory name', function() {
      var omniBase = OmniPath.basename('/path/to/a/directory/');
      var nodeBase = path.basename('/path/to/a/directory/');

      expect(omniBase).to.equal('directory');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a relative directory name', function() {
      var omniBase = OmniPath.basename('path/to/a/directory/');
      var nodeBase = path.basename('path/to/a/directory/');

      expect(omniBase).to.equal('directory');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return an absolute file name', function() {
      var omniBase = OmniPath.basename('/path/to/a/file.html');
      var nodeBase = path.basename('/path/to/a/file.html');

      expect(omniBase).to.equal('file.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a relative file name', function() {
      var omniBase = OmniPath.basename('path/to/a/file.txt');
      var nodeBase = path.basename('path/to/a/file.txt');

      expect(omniBase).to.equal('file.txt');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return the basename of a path containing # and ? characters', function() {
      var omniBase = OmniPath.basename('/path/?to=a/#file\\with#/slashes');
      var nodeBase = path.basename('/path/?to=a/#file\\with#/slashes');

      expect(omniBase).to.equal('slashes');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return the basename of a path with a query', function() {
      var omniBase = OmniPath.basename('/path/to/a/file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});
      var nodeBase = path.basename('/path/to/a/file.html');

      expect(omniBase).to.equal('file.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return the basename of a path with a hash', function() {
      var omniBase = OmniPath.basename('/path/to/a/direc.tory/#page1\\?not=a/&query', {allowFileHash: true});
      var nodeBase = path.basename('/path/to/a/direc.tory/');

      expect(omniBase).to.equal('direc.tory');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return the basename of a path with a query and hash', function() {
      var omniBase = OmniPath.basename('/path/to/a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});
      var nodeBase = path.basename('/path/to/a/file.html');

      expect(omniBase).to.equal('file.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a basename without an extension', function() {
      var omniBase = OmniPath.basename('/dir/subdir/somefile');
      var nodeBase = path.basename('/dir/subdir/somefile');

      expect(omniBase).to.equal('somefile');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a basename that starts with a dot', function() {
      var omniBase = OmniPath.basename('/.dir/subdir/.hidden');
      var nodeBase = path.basename('/.dir/subdir/.hidden');

      expect(omniBase).to.equal('.hidden');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a basename that starts with a dot and has an extension', function() {
      var omniBase = OmniPath.basename('/di.r/subdir/.hidden.html');
      var nodeBase = path.basename('/di.r/subdir/.hidden.html');

      expect(omniBase).to.equal('.hidden.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a basename that has multiple dots', function() {
      var omniBase = OmniPath.basename('/dir/su.b.dir/hi.dd.en.html');
      var nodeBase = path.basename('/dir/su.b.dir/hi.dd.en.html');

      expect(omniBase).to.equal('hi.dd.en.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a basename without an extension, even if an extension is given', function() {
      var omniBase = OmniPath.basename('/dir/subdir/somefile', '.html');
      var nodeBase = path.basename('/dir/subdir/somefile', '.html');

      expect(omniBase).to.equal('somefile');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should omit the extension if it matches the given extension', function() {
      var omniBase = OmniPath.basename('/.dir/subdir/somefile.html', '.html');
      var nodeBase = path.basename('/.dir/subdir/somefile.html', '.html');

      expect(omniBase).to.equal('somefile');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should NOT omit the extension if it does not match the case of the given extension', function() {
      var omniBase = OmniPath.basename('/.dir/subdir/somefile.html', '.HTML');
      var nodeBase = path.basename('/.dir/subdir/somefile.html', '.HTML');

      expect(omniBase).to.equal('somefile.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should omit the extension if it matches the given extension without any dots', function() {
      var omniBase = OmniPath.basename('/.dir/subdir/somefile', 'file');
      var nodeBase = path.basename('/.dir/subdir/somefile', 'file');

      expect(omniBase).to.equal('some');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return an empty string if the entire basename matches the given extension without any dots', function() {
      var omniBase = OmniPath.basename('/.dir/subdir/somefile', 'somefile');
      var nodeBase = path.basename('/.dir/subdir/somefile', 'somefile');

      expect(omniBase).to.equal('');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should omit the extension if it matches the given extension with multiple dots', function() {
      var omniBase = OmniPath.basename('/.dir/subdir/somefile.min.js', '.min.js');
      var nodeBase = path.basename('/.dir/subdir/somefile.min.js', '.min.js');

      expect(omniBase).to.equal('somefile');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return an empty string if the entire basename matches the given extension', function() {
      var omniBase = OmniPath.basename('/.dir/subdir/.hidden', '.hidden');
      var nodeBase = path.basename('/.dir/subdir/.hidden', '.hidden');

      expect(omniBase).to.equal('');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return an empty string if the entire basename matches the given extension with multiple dots', function() {
      var omniBase = OmniPath.basename('/.dir/subdir/.hidden.js', '.hidden.js');
      var nodeBase = path.basename('/.dir/subdir/.hidden.js', '.hidden.js');

      expect(omniBase).to.equal('');
      expect(omniBase).to.equal(nodeBase);
    });
  });

  helper.describeIfWindows('Windows', function() {
    it('should return an empty string for the root path', function() {
      var omniBase = OmniPath.basename('C:\\');
      var nodeBase = path.basename('C:\\');

      expect(omniBase).to.equal('');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a root directory name', function() {
      var omniBase = OmniPath.basename('C:\\somedir\\');
      var nodeBase = path.basename('C:\\somedir\\');

      expect(omniBase).to.equal('somedir');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a root file name', function() {
      var omniBase = OmniPath.basename('C:\\somefile.txt');
      var nodeBase = path.basename('C:\\somefile.txt');

      expect(omniBase).to.equal('somefile.txt');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return an absolute directory name', function() {
      var omniBase = OmniPath.basename('C:\\path\\to\\a\\directory\\');
      var nodeBase = path.basename('C:\\path\\to\\a\\directory\\');

      expect(omniBase).to.equal('directory');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return an absolute directory name with forward slashes', function() {
      var omniBase = OmniPath.basename('C:/path/to/a/directory/');
      var nodeBase = path.basename('C:/path/to/a/directory/');

      expect(omniBase).to.equal('directory');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a relative directory name', function() {
      var omniBase = OmniPath.basename('path\\to\\a\\directory\\');
      var nodeBase = path.basename('path\\to\\a\\directory\\');

      expect(omniBase).to.equal('directory');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a relative directory name with forward slashes', function() {
      var omniBase = OmniPath.basename('path/to/a/directory/');
      var nodeBase = path.basename('path/to/a/directory/');

      expect(omniBase).to.equal('directory');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return an absolute file name', function() {
      var omniBase = OmniPath.basename('\\path\\to\\a\\file.html');
      var nodeBase = path.basename('\\path\\to\\a\\file.html');

      expect(omniBase).to.equal('file.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return an absolute file name with forward slashes', function() {
      var omniBase = OmniPath.basename('/path/to/a/file.html');
      var nodeBase = path.basename('/path/to/a/file.html');

      expect(omniBase).to.equal('file.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a relative file name', function() {
      var omniBase = OmniPath.basename('path\\to\\a\\file.txt');
      var nodeBase = path.basename('path\\to\\a\\file.txt');

      expect(omniBase).to.equal('file.txt');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a relative file name with forward slashes', function() {
      var omniBase = OmniPath.basename('path/to/a/file.txt');
      var nodeBase = path.basename('path/to/a/file.txt');

      expect(omniBase).to.equal('file.txt');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return the basename of a path containing # and ? characters', function() {
      var omniBase = OmniPath.basename('C:\\path/?to=a\\#file\\with#/slashes');
      var nodeBase = path.basename('C:\\path/?to=a\\#file\\with#/slashes');

      expect(omniBase).to.equal('slashes');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return the basename of a path with a query', function() {
      var omniBase = OmniPath.basename('C:\\path/to\\a/file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});
      var nodeBase = path.basename('C:\\path/to\\a/file.html');

      expect(omniBase).to.equal('file.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return the basename of a path with a hash', function() {
      var omniBase = OmniPath.basename('C:\\path/to\\a/direc.tory/#page1\\?not=a/&query', {allowFileHash: true});
      var nodeBase = path.basename('C:\\path/to\\a/direc.tory/');

      expect(omniBase).to.equal('direc.tory');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return the basename of a path with a query and hash', function() {
      var omniBase = OmniPath.basename('C:\\path/to\\a/file.html?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});
      var nodeBase = path.basename('C:\\path/to\\a/file.html');

      expect(omniBase).to.equal('file.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a basename without an extension', function() {
      var omniBase = OmniPath.basename('C:\\dir\\subdir\\somefile');
      var nodeBase = path.basename('C:\\dir\\subdir\\somefile');

      expect(omniBase).to.equal('somefile');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a basename that starts with a dot', function() {
      var omniBase = OmniPath.basename('C:\\.dir\\subdir\\.hidden');
      var nodeBase = path.basename('C:\\.dir\\subdir\\.hidden');

      expect(omniBase).to.equal('.hidden');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a basename that starts with a dot and has an extension', function() {
      var omniBase = OmniPath.basename('C:\\di.r\\subdir\\.hidden.html');
      var nodeBase = path.basename('C:\\di.r\\subdir\\.hidden.html');

      expect(omniBase).to.equal('.hidden.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a basename that has multiple dots', function() {
      var omniBase = OmniPath.basename('C:\\dir\\su.b.dir\\hi.dd.en.html');
      var nodeBase = path.basename('C:\\dir\\su.b.dir\\hi.dd.en.html');

      expect(omniBase).to.equal('hi.dd.en.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return a basename without an extension, even if an extension is given', function() {
      var omniBase = OmniPath.basename('C:\\dir\\subdir\\somefile', '.html');
      var nodeBase = path.basename('C:\\dir\\subdir\\somefile', '.html');

      expect(omniBase).to.equal('somefile');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should omit the extension if it matches the given extension', function() {
      var omniBase = OmniPath.basename('C:\\.dir\\subdir\\somefile.html', '.html');
      var nodeBase = path.basename('C:\\.dir\\subdir\\somefile.html', '.html');

      expect(omniBase).to.equal('somefile');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should NOT omit the extension if it does not match the case of the given extension', function() {
      var omniBase = OmniPath.basename('C:\\.dir\\subdir\\somefile.html', '.HTML');
      var nodeBase = path.basename('C:\\.dir\\subdir\\somefile.html', '.HTML');

      expect(omniBase).to.equal('somefile.html');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should omit the extension if it matches the given extension without any dots', function() {
      var omniBase = OmniPath.basename('C:\\.dir\\subdir\\somefile', 'file');
      var nodeBase = path.basename('C:\\.dir\\subdir\\somefile', 'file');

      expect(omniBase).to.equal('some');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return an empty string if the entire basename matches the given extension without any dots', function() {
      var omniBase = OmniPath.basename('C:\\.dir\\subdir\\somefile', 'somefile');
      var nodeBase = path.basename('C:\\.dir\\subdir\\somefile', 'somefile');

      expect(omniBase).to.equal('');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should omit the extension if it matches the given extension with multiple dots', function() {
      var omniBase = OmniPath.basename('C:\\.dir\\subdir\\somefile.min.js', '.min.js');
      var nodeBase = path.basename('C:\\.dir\\subdir\\somefile.min.js', '.min.js');

      expect(omniBase).to.equal('somefile');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return an empty string if the entire basename matches the given extension', function() {
      var omniBase = OmniPath.basename('C:\\.dir\\subdir\\.hidden', '.hidden');
      var nodeBase = path.basename('C:\\.dir\\subdir\\.hidden', '.hidden');

      expect(omniBase).to.equal('');
      expect(omniBase).to.equal(nodeBase);
    });

    it('should return an empty string if the entire basename matches the given extension with multiple dots', function() {
      var omniBase = OmniPath.basename('C:\\.dir\\subdir\\.hidden.js', '.hidden.js');
      var nodeBase = path.basename('C:\\.dir\\subdir\\.hidden.js', '.hidden.js');

      expect(omniBase).to.equal('');
      expect(omniBase).to.equal(nodeBase);
    });
  });
});
