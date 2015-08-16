'use strict';

describe('OmniPath.extname', function() {
  describe('URLs', function() {
    it('should return an empty string if the URL has no path', function() {
      var omniExt = OmniPath.extname('http://localhost');
      expect(omniExt).to.equal('');
    });

    it('should return an empty string for a root directory', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/somedir/');
      expect(omniExt).to.equal('');
    });

    it('should return an empty string for a root directory that begins with a dot', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.hidden/');
      expect(omniExt).to.equal('');
    });

    it('should return the extension of a root directory that has an extension', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/direc.tory/');
      expect(omniExt).to.equal('.tory');
    });

    it('should return the extension of a root directory that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.hid.den/');
      expect(omniExt).to.equal('.den');
    });

    it('should return the extension of a root directory that has multiple dots', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.di.rec.tory/');
      expect(omniExt).to.equal('.tory');
    });

    it('should return an empty string for a directory', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.dir/sub.dir/somedir/');
      expect(omniExt).to.equal('');
    });

    it('should return an empty string for a directory that begins with a dot', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.dir/sub.dir/.hidden/');
      expect(omniExt).to.equal('');
    });

    it('should return the extension of a directory that has an extension', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.dir/sub.dir/direc.tory/');
      expect(omniExt).to.equal('.tory');
    });

    it('should return the extension of a directory that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.dir/sub.dir/.hid.den/');
      expect(omniExt).to.equal('.den');
    });

    it('should return the extension of a directory that has multiple dots', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.dir/sub.dir/.di.rec.tory/');
      expect(omniExt).to.equal('.tory');
    });

    it('should return an empty string for a root file without an extension', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/somefile');
      expect(omniExt).to.equal('');
    });

    it('should return an empty string for a root file that begins with a dot and has no extension', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.hidden');
      expect(omniExt).to.equal('');
    });

    it('should return the extension of a root file that has an extension', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/somefile.html');
      expect(omniExt).to.equal('.html');
    });

    it('should return the extension of a root file that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.hidden.txt');
      expect(omniExt).to.equal('.txt');
    });

    it('should return the extension of a root file that has multiple dots', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/somefile.min.js');
      expect(omniExt).to.equal('.js');
    });

    it('should return an empty string for a file without an extension', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.dir/sub.dir/somefile');
      expect(omniExt).to.equal('');
    });

    it('should return an empty string for a file that begins with a dot and has no extension', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.dir/sub.dir/.hidden');
      expect(omniExt).to.equal('');
    });

    it('should return the extension of a file that has an extension', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.dir/sub.dir/somefile.css');
      expect(omniExt).to.equal('.css');
    });

    it('should return the extension of a file that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.dir/sub.dir/.hidden.config');
      expect(omniExt).to.equal('.config');
    });

    it('should return the extension of a file that has multiple dots', function() {
      var omniExt = OmniPath.extname('http://www.company.com:8080/.dir/sub.dir/.hidden.min.js');
      expect(omniExt).to.equal('.js');
    });

    it('should return the extension of a URL with a query', function() {
      var omniExt = OmniPath.extname('gopher://host/path/to/a/file.html?foo=\\bar&biz=/baz');
      expect(omniExt).to.equal('.html');
    });

    it('should return the extension of a URL with a hash', function() {
      var omniExt = OmniPath.extname('ftp://192.168.1.1/path/to/a/.direc.tory/#page1\\?not=a/&query');
      expect(omniExt).to.equal('.tory');
    });

    it('should return the extension of a URL with a query and hash', function() {
      var omniExt = OmniPath.extname('xyz://host/path/to/a/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query');
      expect(omniExt).to.equal('.js');
    });

    helper.describeIfBrowser('relative URLs', function() {
      it('should return an empty string for a relative directory', function() {
        var omniExt = OmniPath.extname('.dir/sub.dir/somedir/');
        expect(omniExt).to.equal('');
      });

      it('should return an empty string for a relative directory that begins with a dot', function() {
        var omniExt = OmniPath.extname('.dir/sub.dir/.hidden/');
        expect(omniExt).to.equal('');
      });

      it('should return the extension of a relative directory that has an extension', function() {
        var omniExt = OmniPath.extname('.dir/sub.dir/direc.tory/');
        expect(omniExt).to.equal('.tory');
      });

      it('should return the extension of a relative directory that begins with a dot and has an extension', function() {
        var omniExt = OmniPath.extname('.dir/sub.dir/.hid.den/');
        expect(omniExt).to.equal('.den');
      });

      it('should return the extension of a relative directory that has multiple dots', function() {
        var omniExt = OmniPath.extname('.dir/sub.dir/.di.rec.tory/');
        expect(omniExt).to.equal('.tory');
      });

      it('should return an empty string for a relative file without an extension', function() {
        var omniExt = OmniPath.extname('.dir/sub.dir/somefile');
        expect(omniExt).to.equal('');
      });

      it('should return an empty string for a relative file that begins with a dot and has no extension', function() {
        var omniExt = OmniPath.extname('.dir/sub.dir/.hidden');
        expect(omniExt).to.equal('');
      });

      it('should return the extension of a relative file that has an extension', function() {
        var omniExt = OmniPath.extname('.dir/sub.dir/somefile.css');
        expect(omniExt).to.equal('.css');
      });

      it('should return the extension of a relative file that begins with a dot and has an extension', function() {
        var omniExt = OmniPath.extname('.dir/sub.dir/.hidden.config');
        expect(omniExt).to.equal('.config');
      });

      it('should return the extension of a relative file that has multiple dots', function() {
        var omniExt = OmniPath.extname('.dir/sub.dir/.hidden.min.js');
        expect(omniExt).to.equal('.js');
      });

      it('should return the extension of a relative URL with a query', function() {
        var omniExt = OmniPath.extname('path/to/a/file.html?foo=\\bar&biz=/baz');
        expect(omniExt).to.equal('.html');
      });

      it('should return the extension of a relative URL with a hash', function() {
        var omniExt = OmniPath.extname('/path/to/a/.direc.tory/#page1\\?not=a/&query');
        expect(omniExt).to.equal('.tory');
      });

      it('should return the extension of a relative URL with a query and hash', function() {
        var omniExt = OmniPath.extname('path/to/a/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query');
        expect(omniExt).to.equal('.js');
      });
    });
  });

  helper.describeIfPosix('POSIX', function() {
    it('should return an empty string for the root path', function() {
      var omniExt = OmniPath.extname('/');
      var nodeExt = path.extname('/');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a root directory', function() {
      var omniExt = OmniPath.extname('/somedir/');
      var nodeExt = path.extname('/somedir/');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a root directory that begins with a dot', function() {
      var omniExt = OmniPath.extname('/.somedir/');
      var nodeExt = path.extname('/.somedir/');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a root directory that has an extension', function() {
      var omniExt = OmniPath.extname('/some.dir/');
      var nodeExt = path.extname('/some.dir/');

      expect(omniExt).to.equal('.dir');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a root directory that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('/.hid.den/');
      var nodeExt = path.extname('/.hid.den/');

      expect(omniExt).to.equal('.den');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for an absolute directory', function() {
      var omniExt = OmniPath.extname('/.dir/sub.dir/somedir/');
      var nodeExt = path.extname('/.dir/sub.dir/somedir/');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for an absolute directory that begins with a dot', function() {
      var omniExt = OmniPath.extname('/.dir/sub.dir/.somedir/');
      var nodeExt = path.extname('/.dir/sub.dir/.somedir/');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of an absolute directory that has an extension', function() {
      var omniExt = OmniPath.extname('/.dir/sub.dir/some.dir/');
      var nodeExt = path.extname('/.dir/sub.dir/some.dir/');

      expect(omniExt).to.equal('.dir');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of an absolute directory that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('/.dir/sub.dir/.hid.den/');
      var nodeExt = path.extname('/.dir/sub.dir/.hid.den/');

      expect(omniExt).to.equal('.den');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a relative directory', function() {
      var omniExt = OmniPath.extname('.dir/sub.dir/somedir/');
      var nodeExt = path.extname('.dir/sub.dir/somedir/');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a relative directory that begins with a dot', function() {
      var omniExt = OmniPath.extname('.dir/sub.dir/.somedir/');
      var nodeExt = path.extname('.dir/sub.dir/.somedir/');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a relative directory that has an extension', function() {
      var omniExt = OmniPath.extname('.dir/sub.dir/some.dir/');
      var nodeExt = path.extname('.dir/sub.dir/some.dir/');

      expect(omniExt).to.equal('.dir');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a relative directory that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('.dir/sub.dir/.hid.den/');
      var nodeExt = path.extname('.dir/sub.dir/.hid.den/');

      expect(omniExt).to.equal('.den');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a root file without an extension', function() {
      var omniExt = OmniPath.extname('/somefile');
      var nodeExt = path.extname('/somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a root file that begins with a dot and has no extension', function() {
      var omniExt = OmniPath.extname('/.somefile');
      var nodeExt = path.extname('/.somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a root file that has an extension', function() {
      var omniExt = OmniPath.extname('/somefile.txt');
      var nodeExt = path.extname('/somefile.txt');

      expect(omniExt).to.equal('.txt');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a root file that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('/.hidden.txt');
      var nodeExt = path.extname('/.hidden.txt');

      expect(omniExt).to.equal('.txt');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for an absolute file without an extension', function() {
      var omniExt = OmniPath.extname('/.dir/sub.dir/somefile');
      var nodeExt = path.extname('/.dir/sub.dir/somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for an absolute file that begins with a dot and has no extension', function() {
      var omniExt = OmniPath.extname('/.dir/sub.dir/.somefile');
      var nodeExt = path.extname('/.dir/sub.dir/.somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of an absolute file that has an extension', function() {
      var omniExt = OmniPath.extname('/.dir/sub.dir/somefile.html');
      var nodeExt = path.extname('/.dir/sub.dir/somefile.html');

      expect(omniExt).to.equal('.html');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of an absolute file that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('/.dir/sub.dir/.hidden.config');
      var nodeExt = path.extname('/.dir/sub.dir/.hidden.config');

      expect(omniExt).to.equal('.config');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a relative file without an extension', function() {
      var omniExt = OmniPath.extname('.dir/sub.dir/somefile');
      var nodeExt = path.extname('.dir/sub.dir/somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a relative file that begins with a dot and has no extension', function() {
      var omniExt = OmniPath.extname('.dir/sub.dir/.somefile');
      var nodeExt = path.extname('.dir/sub.dir/.somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a relative file that has an extension', function() {
      var omniExt = OmniPath.extname('.dir/sub.dir/somefile.md');
      var nodeExt = path.extname('.dir/sub.dir/somefile.md');

      expect(omniExt).to.equal('.md');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a relative file that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('.dir/sub.dir/.hid.den');
      var nodeExt = path.extname('.dir/sub.dir/.hid.den');

      expect(omniExt).to.equal('.den');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a path containing # and ? characters', function() {
      var omniExt = OmniPath.extname('/path/?to=a/#file\\with#/slashes.foo');
      var nodeExt = path.extname('/path/?to=a/#file\\with#/slashes.foo');

      expect(omniExt).to.equal('.foo');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a path with a query', function() {
      var omniExt = OmniPath.extname('/path/to/a/file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});
      var nodeExt = path.extname('/path/to/a/file.html');

      expect(omniExt).to.equal('.html');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a path with a hash', function() {
      var omniExt = OmniPath.extname('path/to/a/direc.tory/#page1\\?not=a/&query', {allowFileHash: true});
      var nodeExt = path.extname('path/to/a/direc.tory/');

      expect(omniExt).to.equal('.tory');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a path with a query and hash', function() {
      var omniExt = OmniPath.extname('path/to/a/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});
      var nodeExt = path.extname('path/to/a/file.min.js');

      expect(omniExt).to.equal('.js');
      expect(omniExt).to.equal(nodeExt);
    });
  });

  helper.describeIfWindows('Windows', function() {
    it('should return an empty string for the root path', function() {
      var omniExt = OmniPath.extname('D:\\');
      var nodeExt = path.extname('D:\\');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for the root path with forward slashes', function() {
      var omniExt = OmniPath.extname('D:/');
      var nodeExt = path.extname('D:/');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for the root path without a drive letter', function() {
      var omniExt = OmniPath.extname('\\');
      var nodeExt = path.extname('\\');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a root directory', function() {
      var omniExt = OmniPath.extname('C:\\somedir\\');
      var nodeExt = path.extname('C:\\somedir\\');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a root directory with forward slashes', function() {
      var omniExt = OmniPath.extname('C:/somedir/');
      var nodeExt = path.extname('C:/somedir/');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a root directory with no drive letter', function() {
      var omniExt = OmniPath.extname('\\somedir\\');
      var nodeExt = path.extname('\\somedir\\');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a root directory that begins with a dot', function() {
      var omniExt = OmniPath.extname('C:\\.somedir\\');
      var nodeExt = path.extname('C:\\.somedir\\');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a root directory that has an extension', function() {
      var omniExt = OmniPath.extname('C:\\some.dir\\');
      var nodeExt = path.extname('C:\\some.dir\\');

      expect(omniExt).to.equal('.dir');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a root directory that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('C:\\.hid.den\\');
      var nodeExt = path.extname('C:\\.hid.den\\');

      expect(omniExt).to.equal('.den');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for an absolute directory', function() {
      var omniExt = OmniPath.extname('C:\\.dir\\sub.dir\\somedir\\');
      var nodeExt = path.extname('C:\\.dir\\sub.dir\\somedir\\');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for an absolute directory with forward slashes', function() {
      var omniExt = OmniPath.extname('C:/.dir/sub.dir/somedir/');
      var nodeExt = path.extname('C:/.dir/sub.dir/somedir/');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for an absolute directory with no drive letter', function() {
      var omniExt = OmniPath.extname('\\.dir\\sub.dir/somedir\\');
      var nodeExt = path.extname('\\.dir\\sub.dir/somedir\\');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for an absolute directory that begins with a dot', function() {
      var omniExt = OmniPath.extname('C:\\.dir\\sub.dir\\.somedir\\');
      var nodeExt = path.extname('C:\\.dir\\sub.dir\\.somedir\\');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of an absolute directory that has an extension', function() {
      var omniExt = OmniPath.extname('C:\\.dir\\sub.dir\\some.dir\\');
      var nodeExt = path.extname('C:\\.dir\\sub.dir\\some.dir\\');

      expect(omniExt).to.equal('.dir');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of an absolute directory that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('C:\\.dir\\sub.dir\\.hid.den\\');
      var nodeExt = path.extname('C:\\.dir\\sub.dir\\.hid.den\\');

      expect(omniExt).to.equal('.den');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a relative directory', function() {
      var omniExt = OmniPath.extname('.dir\\sub.dir\\somedir\\');
      var nodeExt = path.extname('.dir\\sub.dir\\somedir\\');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a relative directory with forward slashes', function() {
      var omniExt = OmniPath.extname('.dir/sub.dir/somedir/');
      var nodeExt = path.extname('.dir/sub.dir/somedir/');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a relative directory that begins with a dot', function() {
      var omniExt = OmniPath.extname('.dir\\sub.dir\\.somedir\\');
      var nodeExt = path.extname('.dir\\sub.dir\\.somedir\\');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a relative directory that has an extension', function() {
      var omniExt = OmniPath.extname('.dir\\sub.dir\\some.dir\\');
      var nodeExt = path.extname('.dir\\sub.dir\\some.dir\\');

      expect(omniExt).to.equal('.dir');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a relative directory that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('.dir\\sub.dir\\.hid.den\\');
      var nodeExt = path.extname('.dir\\sub.dir\\.hid.den\\');

      expect(omniExt).to.equal('.den');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a root file without an extension', function() {
      var omniExt = OmniPath.extname('C:\\somefile');
      var nodeExt = path.extname('C:\\somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a root file with forward slashes', function() {
      var omniExt = OmniPath.extname('C:/somefile');
      var nodeExt = path.extname('C:/somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a root file with no drive letter', function() {
      var omniExt = OmniPath.extname('/somefile');
      var nodeExt = path.extname('/somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a root file that begins with a dot and has no extension', function() {
      var omniExt = OmniPath.extname('C:\\.somefile');
      var nodeExt = path.extname('C:\\.somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a root file that has an extension', function() {
      var omniExt = OmniPath.extname('C:\\somefile.txt');
      var nodeExt = path.extname('C:\\somefile.txt');

      expect(omniExt).to.equal('.txt');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a root file that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('C:\\.hidden.txt');
      var nodeExt = path.extname('C:\\.hidden.txt');

      expect(omniExt).to.equal('.txt');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for an absolute file without an extension', function() {
      var omniExt = OmniPath.extname('C:\\.dir\\sub.dir\\somefile');
      var nodeExt = path.extname('C:\\.dir\\sub.dir\\somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for an absolute file with forward slashes', function() {
      var omniExt = OmniPath.extname('C:/.dir/sub.dir/somefile');
      var nodeExt = path.extname('C:/.dir/sub.dir/somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for an absolute file with no drive letter', function() {
      var omniExt = OmniPath.extname('/.dir/sub.dir\\somefile');
      var nodeExt = path.extname('/.dir/sub.dir\\somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for an absolute file that begins with a dot and has no extension', function() {
      var omniExt = OmniPath.extname('C:\\.dir\\sub.dir\\.somefile');
      var nodeExt = path.extname('C:\\.dir\\sub.dir\\.somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of an absolute file that has an extension', function() {
      var omniExt = OmniPath.extname('C:\\.dir\\sub.dir\\somefile.html');
      var nodeExt = path.extname('C:\\.dir\\sub.dir\\somefile.html');

      expect(omniExt).to.equal('.html');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of an absolute file that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('C:\\.dir\\sub.dir\\.hidden.config');
      var nodeExt = path.extname('C:\\.dir\\sub.dir\\.hidden.config');

      expect(omniExt).to.equal('.config');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a relative file without an extension', function() {
      var omniExt = OmniPath.extname('.dir\\sub.dir\\somefile');
      var nodeExt = path.extname('.dir\\sub.dir\\somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a relative file with forward slashes', function() {
      var omniExt = OmniPath.extname('.dir/sub.dir/somefile');
      var nodeExt = path.extname('.dir/sub.dir/somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return an empty string for a relative file that begins with a dot and has no extension', function() {
      var omniExt = OmniPath.extname('.dir\\sub.dir\\.somefile');
      var nodeExt = path.extname('.dir\\sub.dir\\.somefile');

      expect(omniExt).to.equal('');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a relative file that has an extension', function() {
      var omniExt = OmniPath.extname('.dir\\sub.dir\\somefile.md');
      var nodeExt = path.extname('.dir\\sub.dir\\somefile.md');

      expect(omniExt).to.equal('.md');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a relative file that begins with a dot and has an extension', function() {
      var omniExt = OmniPath.extname('.dir\\sub.dir\\.hid.den');
      var nodeExt = path.extname('.dir\\sub.dir\\.hid.den');

      expect(omniExt).to.equal('.den');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a path containing # and ? characters', function() {
      var omniExt = OmniPath.extname('C:\\path/?to=a/#file\\with#/slashes.foo');
      var nodeExt = path.extname('C:\\path/?to=a/#file\\with#/slashes.foo');

      expect(omniExt).to.equal('.foo');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a path with a query', function() {
      var omniExt = OmniPath.extname('C:\\path/to/a/file.html?foo=\\bar&biz=/baz', {allowFileQuery: true});
      var nodeExt = path.extname('C:\\path/to/a/file.html');

      expect(omniExt).to.equal('.html');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a path with a hash', function() {
      var omniExt = OmniPath.extname('path/to/a/direc.tory/#page1\\?not=a/&query', {allowFileHash: true});
      var nodeExt = path.extname('path/to/a/direc.tory\\');

      expect(omniExt).to.equal('.tory');
      expect(omniExt).to.equal(nodeExt);
    });

    it('should return the extension of a path with a query and hash', function() {
      var omniExt = OmniPath.extname('path/to/a/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true});
      var nodeExt = path.extname('path/to/a/file.min.js');

      expect(omniExt).to.equal('.js');
      expect(omniExt).to.equal(nodeExt);
    });
  });
});
