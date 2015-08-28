(function() {
  // jscs:disable
  'use strict';

  global.TestPairs = {
    "root paths": {
      "two root paths": {
        "p": [
          "/",
          "/"
        ],
        "isUrl": false,
        "join": {
          "posix": "/",
          "win32": "\\",
          "url": "/"
        }
      },
      "root (backslash)": {
        "p": [
          "\\",
          "\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\",
          "win32": "\\",
          "url": "/"
        }
      },
      "root (Windows)": {
        "p": [
          "C:\\",
          "C:\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:\\",
          "win32": "C:\\",
          "url": "c:/"
        }
      },
      "root (Windows) (without a slash)": {
        "p": [
          "C:",
          "C:"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:",
          "win32": "C:.",
          "url": "c:/"
        }
      },
      "root (UNC)": {
        "p": [
          "\\\\server\\",
          "\\\\server\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\\\server\\",
          "win32": "\\server\\",
          "url": "/server/"
        }
      },
      "root (UNC) (without slash)": {
        "p": [
          "\\\\server",
          "\\\\server"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\\\server",
          "win32": "\\server",
          "url": "/server"
        }
      },
      "root (URL)": {
        "p": [
          "http://host.name",
          "http://host.name"
        ],
        "isUrl": true,
        "join": {
          "posix": "http:/host.name",
          "win32": "http:\\host.name",
          "url": "http://host.name/"
        }
      },
      "root (with . and .. segments)": {
        "p": [
          "/./.././",
          "/./.././"
        ],
        "isUrl": false,
        "join": {
          "posix": "/",
          "win32": "\\",
          "url": "/"
        }
      },
      "root directory (forward slash)": {
        "p": [
          "/somedir/",
          "/somedir/"
        ],
        "isUrl": false,
        "join": {
          "posix": "/somedir/",
          "win32": "\\somedir\\",
          "url": "/somedir/"
        }
      },
      "root directory (backslash)": {
        "p": [
          "\\somedir\\",
          "\\somedir\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\somedir\\",
          "win32": "\\somedir\\",
          "url": "/somedir/"
        }
      },
      "root directory (Windows)": {
        "p": [
          "C:\\somedir\\",
          "C:\\somedir\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:\\somedir\\",
          "win32": "C:\\somedir\\",
          "url": "c:/somedir/"
        }
      },
      "root directory (UNC)": {
        "p": [
          "\\\\server\\dir\\",
          "\\\\server\\dir\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\\\server\\dir\\",
          "win32": "\\\\server\\dir\\",
          "url": "/server/dir/"
        }
      },
      "root directory (URL)": {
        "p": [
          "http://host.name/somedir/",
          "http://host.name/somedir/"
        ],
        "isUrl": true,
        "join": {
          "posix": "http:/host.name/somedir/",
          "win32": "http:\\host.name\\somedir\\",
          "url": "http://host.name/somedir/"
        }
      },
      "root directory (with . and .. segments)": {
        "p": [
          "/./.././somedir/./",
          "/./.././somedir/./"
        ],
        "isUrl": false,
        "join": {
          "posix": "/somedir/",
          "win32": "\\somedir\\",
          "url": "/somedir/"
        }
      },
      "root file (forward slash)": {
        "p": [
          "/somefile.txt",
          "/somefile.txt"
        ],
        "isUrl": false,
        "join": {
          "posix": "/somefile.txt",
          "win32": "\\somefile.txt",
          "url": "/somefile.txt"
        }
      },
      "root file (backslash)": {
        "p": [
          "\\somefile.html",
          "\\somefile.html"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\somefile.html",
          "win32": "\\somefile.html",
          "url": "/somefile.html"
        }
      },
      "root file (Windows)": {
        "p": [
          "C:\\somefile.md",
          "C:\\somefile.md"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:\\somefile.md",
          "win32": "C:\\somefile.md",
          "url": "c:/somefile.md"
        }
      },
      "root file (UNC)": {
        "p": [
          "\\\\server\\somefile.doc",
          "\\\\server\\somefile.doc"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\\\server\\somefile.doc",
          "win32": "\\\\server\\somefile.doc\\",
          "url": "/server/somefile.doc"
        }
      },
      "root file (URL)": {
        "p": [
          "http://host.name/somefile.html",
          "http://host.name/somefile.html"
        ],
        "isUrl": true,
        "join": {
          "posix": "http:/host.name/somefile.html",
          "win32": "http:\\host.name\\somefile.html",
          "url": "http://host.name/somefile.html"
        }
      },
      "root file (with . and .. segments)": {
        "p": [
          "/.././../somefile.txt",
          "/.././../somefile.txt"
        ],
        "isUrl": false,
        "join": {
          "posix": "/somefile.txt",
          "win32": "\\somefile.txt",
          "url": "/somefile.txt"
        }
      }
    },
    "absolute paths": {
      "absolute directory (forward slashes)": {
        "p": [
          "/dir/subdir/somedir/",
          "/dir/subdir/somedir/"
        ],
        "isUrl": false,
        "join": {
          "posix": "/dir/subdir/somedir/",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        }
      },
      "absolute directory (backslashes)": {
        "p": [
          "\\dir\\subdir\\somedir\\",
          "\\dir\\subdir\\somedir\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\dir\\subdir\\somedir\\",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        }
      },
      "absolute directory (Windows)": {
        "p": [
          "C:\\dir\\subdir\\somedir\\",
          "C:\\dir\\subdir\\somedir\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:\\dir\\subdir\\somedir\\",
          "win32": "C:\\dir\\subdir\\somedir\\",
          "url": "c:/dir/subdir/somedir/"
        }
      },
      "absolute directory (UNC)": {
        "p": [
          "\\\\server\\dir\\subdir\\somedir\\",
          "\\\\server\\dir\\subdir\\somedir\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\\\server\\dir\\subdir\\somedir\\",
          "win32": "\\\\server\\dir\\subdir\\somedir\\",
          "url": "/server/dir/subdir/somedir/"
        }
      },
      "absolute directory (URL)": {
        "p": [
          "http://host.name/dir/subdir/somedir/",
          "http://host.name/dir/subdir/somedir/"
        ],
        "isUrl": true,
        "join": {
          "posix": "http:/host.name/dir/subdir/somedir/",
          "win32": "http:\\host.name\\dir\\subdir\\somedir\\",
          "url": "http://host.name/dir/subdir/somedir/"
        }
      },
      "absolute directory (forward slashes + backslashes)": {
        "p": [
          "/dir\\subdir/somedir\\",
          "/dir\\subdir/somedir\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "/dir\\subdir/somedir\\",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        }
      },
      "absolute directory (backslashes + forward slashes)": {
        "p": [
          "\\dir/subdir\\somedir/",
          "\\dir/subdir\\somedir/"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\dir/subdir\\somedir/",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        }
      },
      "absolute directory (Windows + forward slashes)": {
        "p": [
          "C:/dir/subdir\\somedir/",
          "C:/dir/subdir\\somedir/"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:/dir/subdir\\somedir/",
          "win32": "C:\\dir\\subdir\\somedir\\",
          "url": "c:/dir/subdir/somedir/"
        }
      },
      "absolute directory (with . and .. segments)": {
        "p": [
          "/dir/./subdir/././somedir/../somedir/./",
          "/dir/./subdir/././somedir/../somedir/./"
        ],
        "isUrl": false,
        "join": {
          "posix": "/dir/subdir/somedir/",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        }
      },
      "absolute file (forward slashes)": {
        "p": [
          "/dir/subdir/somefile.txt",
          "/dir/subdir/somefile.txt"
        ],
        "isUrl": false,
        "join": {
          "posix": "/dir/subdir/somefile.txt",
          "win32": "\\dir\\subdir\\somefile.txt",
          "url": "/dir/subdir/somefile.txt"
        }
      },
      "absolute file (backslashes)": {
        "p": [
          "\\dir\\subdir\\somefile.html",
          "\\dir\\subdir\\somefile.html"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\dir\\subdir\\somefile.html",
          "win32": "\\dir\\subdir\\somefile.html",
          "url": "/dir/subdir/somefile.html"
        }
      },
      "absolute file (Windows)": {
        "p": [
          "C:\\dir\\subdir\\somefile.md",
          "C:\\dir\\subdir\\somefile.md"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:\\dir\\subdir\\somefile.md",
          "win32": "C:\\dir\\subdir\\somefile.md",
          "url": "c:/dir/subdir/somefile.md"
        }
      },
      "absolute file (UNC)": {
        "p": [
          "\\\\server\\dir\\subdir\\somefile.doc",
          "\\\\server\\dir\\subdir\\somefile.doc"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\\\server\\dir\\subdir\\somefile.doc",
          "win32": "\\\\server\\dir\\subdir\\somefile.doc",
          "url": "/server/dir/subdir/somefile.doc"
        }
      },
      "absolute file (URL)": {
        "p": [
          "http://host.name/dir/subdir/somefile.html",
          "http://host.name/dir/subdir/somefile.html"
        ],
        "isUrl": true,
        "join": {
          "posix": "http:/host.name/dir/subdir/somefile.html",
          "win32": "http:\\host.name\\dir\\subdir\\somefile.html",
          "url": "http://host.name/dir/subdir/somefile.html"
        }
      },
      "absolute file (forward slashes + backslashes)": {
        "p": [
          "/dir\\subdir/somedir\\somefile.txt",
          "/dir\\subdir/somedir\\somefile.txt"
        ],
        "isUrl": false,
        "join": {
          "posix": "/dir\\subdir/somedir\\somefile.txt",
          "win32": "\\dir\\subdir\\somedir\\somefile.txt",
          "url": "/dir/subdir/somedir/somefile.txt"
        }
      },
      "absolute file (backslashes + forward slashes)": {
        "p": [
          "\\dir/subdir\\somedir/somefile.html",
          "\\dir/subdir\\somedir/somefile.html"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\dir/subdir\\somedir/somefile.html",
          "win32": "\\dir\\subdir\\somedir\\somefile.html",
          "url": "/dir/subdir/somedir/somefile.html"
        }
      },
      "absolute file (Windows + forward slashes)": {
        "p": [
          "C:\\dir/subdir\\somedir/somefile.md",
          "C:\\dir/subdir\\somedir/somefile.md"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:\\dir/subdir\\somedir/somefile.md",
          "win32": "C:\\dir\\subdir\\somedir\\somefile.md",
          "url": "c:/dir/subdir/somedir/somefile.md"
        }
      },
      "absolute file (with . and .. segments)": {
        "p": [
          "/dir/./subdir/././../subdir/./somefile.txt",
          "/dir/./subdir/././../subdir/./somefile.txt"
        ],
        "isUrl": false,
        "join": {
          "posix": "/dir/subdir/somefile.txt",
          "win32": "\\dir\\subdir\\somefile.txt",
          "url": "/dir/subdir/somefile.txt"
        }
      }
    },
    "relative paths": {
      "relative directory (forward slashes)": {
        "p": [
          "dir/subdir/somedir/",
          "dir/subdir/somedir/"
        ],
        "isUrl": false,
        "join": {
          "posix": "dir/subdir/somedir/",
          "win32": "dir\\subdir\\somedir\\",
          "url": "dir/subdir/somedir/"
        }
      },
      "relative directory (backslashes)": {
        "p": [
          "dir\\subdir\\somedir\\",
          "dir\\subdir\\somedir\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "dir\\subdir\\somedir\\",
          "win32": "dir\\subdir\\somedir\\",
          "url": "dir/subdir/somedir/"
        }
      },
      "relative directory (forward slashes + backslashes)": {
        "p": [
          "dir\\subdir/somedir\\",
          "dir\\subdir/somedir\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "dir\\subdir/somedir\\",
          "win32": "dir\\subdir\\somedir\\",
          "url": "dir/subdir/somedir/"
        }
      },
      "relative directory (backslashes + forward slashes)": {
        "p": [
          "dir/subdir\\somedir/",
          "dir/subdir\\somedir/"
        ],
        "isUrl": false,
        "join": {
          "posix": "dir/subdir\\somedir/",
          "win32": "dir\\subdir\\somedir\\",
          "url": "dir/subdir/somedir/"
        }
      },
      "relative directory (with . and .. segments)": {
        "p": [
          ".././dir/././subdir/../subdir/somedir/./",
          ".././dir/././subdir/../subdir/somedir/./"
        ],
        "isUrl": false,
        "join": {
          "posix": "../dir/subdir/somedir/",
          "win32": "..\\dir\\subdir\\somedir\\",
          "url": "../dir/subdir/somedir/"
        }
      },
      "relative file (forward slashes)": {
        "p": [
          "dir/subdir/somefile.txt",
          "dir/subdir/somefile.txt"
        ],
        "isUrl": false,
        "join": {
          "posix": "dir/subdir/somefile.txt",
          "win32": "dir\\subdir\\somefile.txt",
          "url": "dir/subdir/somefile.txt"
        }
      },
      "relative file (backslashes)": {
        "p": [
          "dir\\subdir\\somefile.html",
          "dir\\subdir\\somefile.html"
        ],
        "isUrl": false,
        "join": {
          "posix": "dir\\subdir\\somefile.html",
          "win32": "dir\\subdir\\somefile.html",
          "url": "dir/subdir/somefile.html"
        }
      },
      "relative file (forward slashes + backslashes)": {
        "p": [
          "dir\\subdir/somedir\\somefile.txt",
          "dir\\subdir/somedir\\somefile.txt"
        ],
        "isUrl": false,
        "join": {
          "posix": "dir\\subdir/somedir\\somefile.txt",
          "win32": "dir\\subdir\\somedir\\somefile.txt",
          "url": "dir/subdir/somedir/somefile.txt"
        }
      },
      "relative file (backslashes + forward slashes)": {
        "p": [
          "dir/subdir\\somedir/somefile.html",
          "dir/subdir\\somedir/somefile.html"
        ],
        "isUrl": false,
        "join": {
          "posix": "dir/subdir\\somedir/somefile.html",
          "win32": "dir\\subdir\\somedir\\somefile.html",
          "url": "dir/subdir/somedir/somefile.html"
        }
      },
      "relative file (with . and .. segments)": {
        "p": [
          ".././dir/subdir/././somedir/../somedir/./somefile.html",
          ".././dir/subdir/././somedir/../somedir/./somefile.html"
        ],
        "isUrl": false,
        "join": {
          "posix": "../dir/subdir/somedir/somefile.html",
          "win32": "..\\dir\\subdir\\somedir\\somefile.html",
          "url": "../dir/subdir/somedir/somefile.html"
        }
      }
    },
    "URLs": {
      "URL with only a hostname": {
        "p": [
          "ftp://localhost",
          "ftp://localhost"
        ],
        "isUrl": true,
        "join": {
          "posix": "ftp:/localhost",
          "win32": "ftp:\\localhost",
          "url": "ftp://localhost/"
        }
      },
      "URL with only a host IP": {
        "p": [
          "smb://192.168.1.256",
          "smb://192.168.1.256"
        ],
        "isUrl": true,
        "join": {
          "posix": "smb:/192.168.1.256",
          "win32": "smb:\\192.168.1.256",
          "url": "smb://192.168.1.256/"
        }
      },
      "URL with only a host and query": {
        "p": [
          "gopher://localhost?foo=bar&biz=baz",
          "gopher://localhost?foo=bar&biz=baz"
        ],
        "options": {
          "allowFileQuery": true
        },
        "isUrl": true,
        "join": {
          "posix": "gopher:/localhost",
          "win32": "gopher:\\localhost",
          "url": "gopher://localhost/"
        }
      },
      "URL with only a host and hash": {
        "p": [
          "apple-maps://host.name#not?a=query",
          "apple-maps://host.name#not?a=query"
        ],
        "options": {
          "allowFileHash": true
        },
        "isUrl": true,
        "join": {
          "posix": "apple-maps:/host.name",
          "win32": "apple-maps:\\host.name",
          "url": "apple-maps://host.name/"
        }
      },
      "URL with all parts": {
        "p": [
          "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
        ],
        "options": {
          "allowFileQuery": true,
          "allowFileHash": true
        },
        "isUrl": true,
        "join": {
          "posix": "https:/user:pass@www.server.com:80/p/a/t/h",
          "win32": "https:\\user:pass@www.server.com:80\\p\\a\\t\\h",
          "url": "https://user:pass@www.server.com:80/p/a/t/h"
        }
      },
      "URL with unknown protocol": {
        "p": [
          "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
        ],
        "options": {
          "allowFileQuery": true,
          "allowFileHash": true
        },
        "isUrl": true,
        "join": {
          "posix": "foobar:/user:pass@www.server.com:80/p/a/t/h",
          "win32": "foobar:\\user:pass@www.server.com:80\\p\\a\\t\\h",
          "url": "foobar://user:pass@www.server.com:80/p/a/t/h"
        }
      },
      "URL with single-letter protocol": {
        "p": [
          "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
        ],
        "options": {
          "allowFileQuery": true,
          "allowFileHash": true
        },
        "isUrl": true,
        "join": {
          "posix": "c:/user:pass@www.server.com:80/p/a/t/h",
          "win32": "c:\\user:pass@www.server.com:80\\p\\a\\t\\h",
          "url": "c://user:pass@www.server.com:80/p/a/t/h"
        }
      }
    },
    "extensions": {
      "directory with an extension": {
        "p": [
          ".dir/sub.dir/some.dir/",
          ".dir/sub.dir/some.dir/"
        ],
        "isUrl": false,
        "join": {
          "posix": ".dir/sub.dir/some.dir/",
          "win32": ".dir\\sub.dir\\some.dir\\",
          "url": ".dir/sub.dir/some.dir/"
        }
      },
      "directory with multiple extensions": {
        "p": [
          "d:\\.dir\\sub.dir\\di.rec.tory\\",
          "d:\\.dir\\sub.dir\\di.rec.tory\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "d:\\.dir\\sub.dir\\di.rec.tory\\",
          "win32": "d:\\.dir\\sub.dir\\di.rec.tory\\",
          "url": "d:/.dir/sub.dir/di.rec.tory/"
        }
      },
      "hidden directory": {
        "p": [
          ".dir\\sub.dir\\.hidden\\",
          ".dir\\sub.dir\\.hidden\\"
        ],
        "isUrl": false,
        "join": {
          "posix": ".dir\\sub.dir\\.hidden\\",
          "win32": ".dir\\sub.dir\\.hidden\\",
          "url": ".dir/sub.dir/.hidden/"
        }
      },
      "hidden directory with an extension": {
        "p": [
          ".dir\\sub.dir/.hid.den\\",
          ".dir\\sub.dir/.hid.den\\"
        ],
        "isUrl": false,
        "join": {
          "posix": ".dir\\sub.dir/.hid.den\\",
          "win32": ".dir\\sub.dir\\.hid.den\\",
          "url": ".dir/sub.dir/.hid.den/"
        }
      },
      "file with an extension": {
        "p": [
          ".dir/sub.dir/somefile.txt",
          ".dir/sub.dir/somefile.txt"
        ],
        "isUrl": false,
        "join": {
          "posix": ".dir/sub.dir/somefile.txt",
          "win32": ".dir\\sub.dir\\somefile.txt",
          "url": ".dir/sub.dir/somefile.txt"
        }
      },
      "file with multiple extensions": {
        "p": [
          "d:\\.dir\\sub.dir\\somefile.min.js",
          "d:\\.dir\\sub.dir\\somefile.min.js"
        ],
        "isUrl": false,
        "join": {
          "posix": "d:\\.dir\\sub.dir\\somefile.min.js",
          "win32": "d:\\.dir\\sub.dir\\somefile.min.js",
          "url": "d:/.dir/sub.dir/somefile.min.js"
        }
      },
      "hidden file": {
        "p": [
          ".dir\\sub.dir\\.hidden",
          ".dir\\sub.dir\\.hidden"
        ],
        "isUrl": false,
        "join": {
          "posix": ".dir\\sub.dir\\.hidden",
          "win32": ".dir\\sub.dir\\.hidden",
          "url": ".dir/sub.dir/.hidden"
        }
      },
      "hidden file with an extension": {
        "p": [
          ".dir\\sub.dir/.hidden.md",
          ".dir\\sub.dir/.hidden.md"
        ],
        "isUrl": false,
        "join": {
          "posix": ".dir\\sub.dir/.hidden.md",
          "win32": ".dir\\sub.dir\\.hidden.md",
          "url": ".dir/sub.dir/.hidden.md"
        }
      }
    },
    "queries and hashes": {
      "path containing # and ? characters": {
        "p": [
          "/path/?to=a/#file\\with#/slashes",
          "/path/?to=a/#file\\with#/slashes"
        ],
        "isUrl": false,
        "join": {
          "posix": "/path/?to=a/#file\\with#/slashes",
          "win32": "\\path\\?to=a\\#file\\with#\\slashes",
          "url": "/path/"
        }
      },
      "path with a query": {
        "p": [
          "path/to/a/file.html?foo=\\bar&biz=/baz",
          "path/to/a/file.html?foo=\\bar&biz=/baz"
        ],
        "options": {
          "allowFileQuery": true
        },
        "isUrl": false,
        "join": {
          "posix": "path/to/a/file.html",
          "win32": "path\\to\\a\\file.html",
          "url": "path/to/a/file.html"
        }
      },
      "path with a hash": {
        "p": [
          "D:\\path\\to/a\\direc.tory/#page1\\?not=a/&query",
          "D:\\path\\to/a\\direc.tory/#page1\\?not=a/&query"
        ],
        "options": {
          "allowFileHash": true
        },
        "isUrl": false,
        "join": {
          "posix": "D:\\path\\to/a\\direc.tory/",
          "win32": "D:\\path\\to\\a\\direc.tory\\",
          "url": "d:/path/to/a/direc.tory/"
        }
      },
      "path with a query and a hash": {
        "p": [
          "\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz#page1\\?not=a/&query",
          "\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz#page1\\?not=a/&query"
        ],
        "options": {
          "allowFileQuery": true,
          "allowFileHash": true
        },
        "isUrl": false,
        "join": {
          "posix": "\\\\server/path\\to/a\\direc.tory/",
          "win32": "\\\\server\\path\\to\\a\\direc.tory\\",
          "url": "/server/path/to/a/direc.tory/"
        }
      }
    },
    "special cases": {
      "empty string": {
        "p": [
          "",
          ""
        ],
        "isUrl": false,
        "join": {
          "posix": ".",
          "win32": ".",
          "url": "."
        }
      },
      "path with non-encoded special characters": {
        "p": [
          "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
          "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__"
        ],
        "isUrl": false,
        "join": {
          "posix": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
          "win32": "\\_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__\\__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
          "url": "/_-9a.t+8r_({[ ! % , . > < "
        }
      },
      "path with encoded special characters": {
        "p": [
          "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
          "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__"
        ],
        "isUrl": false,
        "join": {
          "posix": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
          "win32": "\\_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__\\__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
          "url": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20"
        }
      }
    }
  };

  //global.TestPairs = {};
  global.TestPairs.objects = {
    "OmniPath.Posix": {
      "p": [
        new OmniPath.Posix('dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true}),
        new OmniPath.Posix('dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true})
      ],
      "isUrl": false,
      "join": {
        "posix": "dir/.subdir/file.min.js",
        "win32": "dir\\.subdir\\file.min.js",
        "url": "dir/.subdir/file.min.js"
      }
    },
    "OmniPath.Windows": {
      "p": [
        new OmniPath.Windows('dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true}),
        new OmniPath.Windows('dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true})
        ],
      "isUrl": false,
      "join": {
        "posix": "dir\\.subdir\\file.min.js",
        "win32": "dir\\.subdir\\file.min.js",
        "url": "dir/.subdir/file.min.js"
      }
    },
    "OmniPath.Url": {
      "p": [
        new OmniPath.Url('dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true}),
        new OmniPath.Url('dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true})
        ],
      "isUrl": true,
      "join": {
        "posix": "dir/.subdir/file.min.js",
        "win32": "dir\\.subdir\\file.min.js",
        "url": "dir/.subdir/file.min.js"
      }
    },
    "URL object": {
      "p": (function() {
        var u = "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1";
        if (userAgent.isNode) {
          return [url.parse(u, true), url.parse(u, true)];
        }
        else {
          return [u, u];
        }
      })(),
      "options": {
        "allowFileQuery": true,
        "allowFileHash": true
      },
      "isUrl": true,
      "join": {
        "posix": "https:/user:pass@www.server.com:80/p/a/t/h",
        "win32": "https:\\user:pass@www.server.com:80\\p\\a\\t\\h",
        "url": "https://user:pass@www.server.com:80/p/a/t/h"
      }
    }
  };

  //Object.keys(TestPairs).forEach(function(suite) {
  //  Object.keys(TestPairs[suite]).forEach(function(test) {
  //    var testObj = TestPairs[suite][test];
  //  });
  //});
  //var x = JSON.stringify(TestPairs, null, 2);
  //console.log(x);
  //process.exit();

})();
