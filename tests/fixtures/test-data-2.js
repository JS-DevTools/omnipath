(function() {
  // jscs:disable
  'use strict';

  global.TestData2 = {
    "slashes": {
      "slashes": {
        "p": ["/", "/", "\\", "/", "\\", "\\"],
        "isUrl": false,
        "join": {
          "posix": "/\\/\\/\\",
          "win32": "\\",
          "url": "/"
        }
      },
      "Windows root and slashes": {
        "p": ["C:\\", "\\", "/", "C:\\"],
        "isUrl": false,
        "join": {
          "posix": "C:\\/\\/C:\\",
          "win32": "C:\\C:\\",
          "url": "c:/C:/"
        }
      },
      "Windows root (without a slash) and slashes": {
        "p": ["C:", "/", "/", "\\"],
        "isUrl": false,
        "join": {
          "posix": "C:/\\",
          "win32": "C:\\",
          "url": "c:/"
        }
      },
      "UNC root and slashes": {
        "p": ["\\\\server\\", "\\", "/", "/", "\\", "/"],
        "isUrl": false,
        "join": {
          "posix": "\\\\server\\/\\/\\/",
          "win32": "\\server\\",
          "url": "/server/"
        }
      },
      "protocol and slashes": {
        "p": ["http://", "\\", "/", "/", "\\", "/"],
        "isUrl": true,
        "join": {
          "posix": "http:/\\/\\/",
          "win32": "http:\\",
          "url": "http:///"
        }
      },
      "protocol (without slashes) and slashes": {
        "p": ["http:", "\\", "/", "/", "\\", "/"],
        "isUrl": false,
        "join": {
          "posix": "http:/\\/\\/",
          "win32": "http:\\",
          "url": "http:/"
        }
      }
    },
    ". and .. segments": {
      "current dir": {
        "p": [".", "././.", ".", ".", "./."],
        "isUrl": false,
        "join": {
          "posix": ".",
          "win32": ".",
          "url": "."
        }
      },
      "parent dir": {
        "p": [".", "././.", ".", ".", "../."],
        "isUrl": false,
        "join": {
          "posix": "..",
          "win32": "..",
          "url": ".."
        }
      },
      "ancestor dir": {
        "p": ["..", "../../..", "..", "..", "../../"],
        "isUrl": false,
        "join": {
          "posix": "../../../../../../../../",
          "win32": "..\\..\\..\\..\\..\\..\\..\\..\\",
          "url": "../../../../../../../../"
        }
      },
      "attempt to go above root": {
        "p": ["/", "./..", "..", "../."],
        "isUrl": false,
        "join": {
          "posix": "/",
          "win32": "\\",
          "url": "/"
        }
      },
      "attempt to go above Windows root": {
        "p": ["C:\\", "\\.\\..", "..", "../."],
        "isUrl": false,
        "join": {
          "posix": ".",
          "win32": "C:\\",
          "url": "c://./"
        }
      },
      "attempt to go above UNC root": {
        "p": ["\\\\server", "\\share\\", "\\.\\..", "..", "../."],
        "isUrl": false,
        "join": {
          "posix": "\\\\server",
          "win32": "\\\\server\\share\\",
          "url": "/"
        }
      },
      "attempt to go above URL root": {
        "p": ["ftp://server.com", "./..", "..", "../."],
        "isUrl": true,
        "join": {
          "posix": "..",
          "win32": "..",
          "url": "ftp://server.com/"
        }
      }
    },
    "POSIX paths": {
      "root + path": {
        "p": ["/", "dir", "subdir/file.txt"],
        "isUrl": false,
        "join": {
          "posix": "/dir/subdir/file.txt",
          "win32": "\\dir\\subdir\\file.txt",
          "url": "/dir/subdir/file.txt"
        }
      },
      "absolute + relative": {
        "p": ["/dir/subdir/", "otherdir", "/anotherdir/file.html"],
        "isUrl": false,
        "join": {
          "posix": "/dir/subdir/otherdir/anotherdir/file.html",
          "win32": "\\dir\\subdir\\otherdir\\anotherdir\\file.html",
          "url": "/dir/subdir/otherdir/anotherdir/file.html"
        }
      },
      "absolute + relative + absolute": {
        "p": ["/dir/subdir", "/../file.html", "/fizz/buzz"],
        "isUrl": false,
        "join": {
          "posix": "/dir/file.html/fizz/buzz",
          "win32": "\\dir\\file.html\\fizz\\buzz",
          "url": "/dir/file.html/fizz/buzz"
        }
      },
      "absolute + relative + absolute + relative": {
        "p": ["/dir/subdir", "otherdir", "/fizz/buzz", "./../foo.bar"],
        "isUrl": false,
        "join": {
          "posix": "/dir/subdir/otherdir/fizz/foo.bar",
          "win32": "\\dir\\subdir\\otherdir\\fizz\\foo.bar",
          "url": "/dir/subdir/otherdir/fizz/foo.bar"
        }
      },
      "absolute + relative + URL + relative": {
        "p": ["/dir/subdir", "otherdir", "https://company.com/fizz/buzz", "./../foo.bar"],
        "isUrl": false,
        "join": {
          "posix": "/dir/subdir/otherdir/https:/company.com/fizz/foo.bar",
          "win32": "\\dir\\subdir\\otherdir\\https:\\company.com\\fizz\\foo.bar",
          "url": "/dir/subdir/otherdir/https:/company.com/fizz/foo.bar"
        }
      }
    },
    "Windows paths": {
      "root + path": {
        "p": ["C:\\", "dir", "subdir\\file.txt"],
        "isUrl": false,
        "join": {
          "posix": "C:\\/dir/subdir\\file.txt",
          "win32": "C:\\dir\\subdir\\file.txt",
          "url": "c:/dir/subdir/file.txt"
        }
      },
      "root (without slash) + path": {
        "p": ["c:", "dir", "subdir\\file.txt"],
        "isUrl": false,
        "join": {
          "posix": "c:/dir/subdir\\file.txt",
          "win32": "c:\\dir\\subdir\\file.txt",
          "url": "c:/dir/subdir/file.txt"
        }
      },
      "UNC root + path": {
        "p": ["\\\\server", "dir", "subdir\\file.txt"],
        "isUrl": false,
        "join": {
          "posix": "\\\\server/dir/subdir\\file.txt",
          "win32": "\\\\server\\dir\\subdir\\file.txt",
          "url": "/server/dir/subdir/file.txt"
        }
      },
      "absolute + relative": {
        "p": ["C:\\dir\\subdir\\", "otherdir", "/anotherdir/file.html"],
        "isUrl": false,
        "join": {
          "posix": "C:\\dir\\subdir\\/otherdir/anotherdir/file.html",
          "win32": "C:\\dir\\subdir\\otherdir\\anotherdir\\file.html",
          "url": "c:/dir/subdir/otherdir/anotherdir/file.html"
        }
      },
      "absolute + relative + absolute": {
        "p": ["C:\\dir\\subdir", "\\..\\file.html", "D:\\fizz\\buzz"],
        "isUrl": false,
        "join": {
          "posix": "C:\\dir\\subdir/\\..\\file.html/D:\\fizz\\buzz",
          "win32": "C:\\dir\\file.html\\D:\\fizz\\buzz",
          "url": "c:/dir/file.html/D:/fizz/buzz"
        }
      },
      "absolute + relative + absolute + relative": {
        "p": ["C:\\dir\\subdir", "otherdir", "D:\\fizz\\buzz", ".\\..\\foo.bar"],
        "isUrl": false,
        "join": {
          "posix": "C:\\dir\\subdir/otherdir/D:\\fizz\\buzz/.\\..\\foo.bar",
          "win32": "C:\\dir\\subdir\\otherdir\\D:\\fizz\\foo.bar",
          "url": "c:/dir/subdir/otherdir/D:/fizz/foo.bar"
        }
      },
      "absolute + relative + URL + relative": {
        "p": ["C:\\dir\\subdir", "otherdir", "https://company.com/fizz/buzz", ".\\..\\foo.bar"],
        "isUrl": false,
        "join": {
          "posix": "C:\\dir\\subdir/otherdir/https:/company.com/fizz/buzz/.\\..\\foo.bar",
          "win32": "C:\\dir\\subdir\\otherdir\\https:\\company.com\\fizz\\foo.bar",
          "url": "c:/dir/subdir/otherdir/https:/company.com/fizz/foo.bar"
        }
      }
    },
    "urls": {
      "protocol + server": {
        "p": ["http://", "server"],
        "isUrl": true,
        "join": {
          "posix": "http:/server",
          "win32": "http:\\server",
          "url": "http://server/"
        }
      },
      "protocol (without slashes) + server": {
        "p": ["http:", "server"],
        "isUrl": false,
        "join": {
          "posix": "http:/server",
          "win32": "http:\\server",
          "url": "http:/server"
        }
      },
      "protocol (without slashes) + slashes + server": {
        "p": ["http:", "//", "server"],
        "isUrl": false,
        "join": {
          "posix": "http:/server",
          "win32": "http:\\server",
          "url": "http://server/"
        }
      },
      "protocol + server + path": {
        "p": ["http://", "server.com", "dir", "subdir", "otherdir/"],
        "isUrl": true,
        "join": {
          "posix": "http:/server.com/dir/subdir/otherdir/",
          "win32": "http:\\server.com\\dir\\subdir\\otherdir\\",
          "url": "http://server.com/dir/subdir/otherdir/"
        }
      },
      "absolute + relative": {
        "p": ["http://server.com/dir/", "subdir", "/otherdir/file.html"],
        "isUrl": true,
        "join": {
          "posix": "http:/server.com/dir/subdir/otherdir/file.html",
          "win32": "http:\\server.com\\dir\\subdir\\otherdir\\file.html",
          "url": "http://server.com/dir/subdir/otherdir/file.html"
        }
      },
      "absolute + relative + absolute": {
        "p": ["http://server.com/dir/", "subdir", "/../file.html", "ftp://192.168.1.2/fizz/buzz"],
        "isUrl": true,
        "join": {
          "posix": "http:/server.com/dir/file.html/ftp:/192.168.1.2/fizz/buzz",
          "win32": "http:\\server.com\\dir\\file.html\\ftp:\\192.168.1.2\\fizz\\buzz",
          "url": "http://server.com/dir/file.html/ftp:/192.168.1.2/fizz/buzz"
        }
      },
      "absolute + relative + absolute + relative": {
        "p": ["http://server.com/dir/", "subdir", "ftp://192.168.1.2/fizz/buzz", "./../foo.bar"],
        "isUrl": true,
        "join": {
          "posix": "http:/server.com/dir/subdir/ftp:/192.168.1.2/fizz/foo.bar",
          "win32": "http:\\server.com\\dir\\subdir\\ftp:\\192.168.1.2\\fizz\\foo.bar",
          "url": "http://server.com/dir/subdir/ftp:/192.168.1.2/fizz/foo.bar"
        }
      }
    }
  };

  ////global.TestData2 = {};
  //global.TestData2.objects = {
  //  "OmniPath.Posix": {
  //    "p": [
  //      new OmniPath.Posix('dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true}),
  //      new OmniPath.Posix('dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true})
  //    ],
  //    "isUrl": false,
  //    "join": {
  //      "posix": "dir/.subdir/file.min.js",
  //      "win32": "dir\\.subdir\\file.min.js",
  //      "url": "dir/.subdir/file.min.js"
  //    }
  //  },
  //  "OmniPath.Windows": {
  //    "p": [
  //      new OmniPath.Windows('dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true}),
  //      new OmniPath.Windows('dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true})
  //      ],
  //    "isUrl": false,
  //    "join": {
  //      "posix": "dir\\.subdir\\file.min.js",
  //      "win32": "dir\\.subdir\\file.min.js",
  //      "url": "dir/.subdir/file.min.js"
  //    }
  //  },
  //  "OmniPath.Url": {
  //    "p": [
  //      new OmniPath.Url('dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true}),
  //      new OmniPath.Url('dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true})
  //      ],
  //    "isUrl": true,
  //    "join": {
  //      "posix": "dir/.subdir/file.min.js",
  //      "win32": "dir\\.subdir\\file.min.js",
  //      "url": "dir/.subdir/file.min.js"
  //    }
  //  },
  //  "URL object": {
  //    "p": (function() {
  //      var u = "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1";
  //      if (userAgent.isNode) {
  //        return [url.parse(u, true), url.parse(u, true)];
  //      }
  //      else {
  //        return [u, u];
  //      }
  //    })(),
  //    "options": {
  //      "allowFileQuery": true,
  //      "allowFileHash": true
  //    },
  //    "isUrl": true,
  //    "join": {
  //      "posix": "https:/user:pass@www.server.com:80/p/a/t/h",
  //      "win32": "https:\\user:pass@www.server.com:80\\p\\a\\t\\h",
  //      "url": "https://user:pass@www.server.com:80/p/a/t/h"
  //    }
  //  }
  //};

  //Object.keys(TestData2).forEach(function(suite) {
  //  Object.keys(TestData2[suite]).forEach(function(test) {
  //    var testObj = TestData2[suite][test];
  //  });
  //});
  //var x = JSON.stringify(TestData2, null, 2);
  //console.log(x);
  //process.exit();

})();
