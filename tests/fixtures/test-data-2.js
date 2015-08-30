(function() {
  // jscs:disable
  'use strict';

  var posixCWD = OmniPath.Posix.cwd();
  var windowsCWD = OmniPath.Windows.cwd();
  var urlCWD = OmniPath.Url.cwd();

  global.TestData2 = {
    "POSIX paths": {
      "root + path": {
        "p": [
          "/",
          "dir",
          "subdir/file.txt"
        ],
        "isUrl": false,
        "join": {
          "posix": "/dir/subdir/file.txt",
          "win32": "\\dir\\subdir\\file.txt",
          "url": "/dir/subdir/file.txt"
        },
        "resolve": {
          "posix": "/dir/subdir/file.txt",
          "win32": "\\dir\\subdir\\file.txt",
          "url": "/subdir/file.txt"
        }
      },
      "absolute + relative": {
        "p": [
          "/dir/subdir/",
          "otherdir",
          "/anotherdir/file.html"
        ],
        "isUrl": false,
        "join": {
          "posix": "/dir/subdir/otherdir/anotherdir/file.html",
          "win32": "\\dir\\subdir\\otherdir\\anotherdir\\file.html",
          "url": "/dir/subdir/otherdir/anotherdir/file.html"
        },
        "resolve": {
          "posix": "/anotherdir/file.html",
          "win32": "\\anotherdir\\file.html",
          "url": "/anotherdir/file.html"
        }
      },
      "absolute + relative + absolute": {
        "p": [
          "/dir/subdir",
          "/../file.html",
          "/fizz/buzz"
        ],
        "isUrl": false,
        "join": {
          "posix": "/dir/file.html/fizz/buzz",
          "win32": "\\dir\\file.html\\fizz\\buzz",
          "url": "/dir/file.html/fizz/buzz"
        },
        "resolve": {
          "posix": "/fizz/buzz",
          "win32": "\\fizz\\buzz",
          "url": "/fizz/buzz"
        }
      },
      "absolute + relative + absolute + relative": {
        "p": [
          "/dir/subdir",
          "otherdir",
          "/fizz/buzz",
          "./../foo.bar"
        ],
        "isUrl": false,
        "join": {
          "posix": "/dir/subdir/otherdir/fizz/foo.bar",
          "win32": "\\dir\\subdir\\otherdir\\fizz\\foo.bar",
          "url": "/dir/subdir/otherdir/fizz/foo.bar"
        },
        "resolve": {
          "posix": "/fizz/foo.bar",
          "win32": "\\fizz\\foo.bar",
          "url": "/foo.bar"
        }
      },
      "absolute + relative + URL + relative": {
        "p": [
          "/dir/subdir#page1",
          "otherdir",
          "https://company.com/fizz/buzz?foo=bar#page2",
          "./../foo.bar"
        ],
        "isUrl": false,
        "matchesNative": false,
        "join": {
          "posix": "/dir/subdir#page1/otherdir/https:/company.com/fizz/foo.bar",
          "win32": "\\dir\\subdir#page1\\otherdir\\https:\\company.com\\fizz\\foo.bar",
          "url": "/dir/subdir/otherdir/https:/company.com/fizz/foo.bar"
        },
        "resolve": {
          "posix": "https://company.com/foo.bar",
          "win32": "https://company.com/foo.bar",
          "url": "https://company.com/foo.bar"
        }
      },
      "file paths with ? and # characters": {
        "p": [
          "/dir#page1",
          "subdir/otherdir?fizz=buzz",
          "?foo=bar",
          "./../foo.bar#page2"
        ],
        "isUrl": false,
        "join": {
          "posix": "/dir#page1/subdir/otherdir?fizz=buzz/foo.bar#page2",
          "win32": "\\dir#page1\\subdir\\otherdir?fizz=buzz\\foo.bar#page2",
          "url": "/dir/subdir/foo.bar#page2"
        },
        "resolve": {
          "posix": "/dir#page1/subdir/otherdir?fizz=buzz/foo.bar#page2",
          "win32": "\\dir#page1\\subdir\\otherdir?fizz=buzz\\foo.bar#page2",
          "url": "/foo.bar#page2"
        }
      },
      "file paths with query and hash": {
        "p": [
          "/dir#page1",
          "subdir/otherdir?fizz=buzz",
          "?foo=bar#page2",
          "#page3"
        ],
        options: {allowFileQuery: true, allowFileHash: true},
        "isUrl": false,
        "matchesNative": false,
        "join": {
          "posix": "/dir/subdir/otherdir#page3",
          "win32": "\\dir\\subdir\\otherdir#page3",
          "url": "/dir/subdir/otherdir#page3"
        },
        "resolve": {
          "posix": "/dir/subdir/otherdir?foo=bar#page3",
          "win32": "\\dir\\subdir\\otherdir?foo=bar#page3",
          "url": "/subdir/otherdir?foo=bar#page3"
        }
      }
    },
    "Windows paths": {
      "root + path": {
        "p": [
          "C:\\",
          "dir",
          "subdir\\file.txt"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:\\/dir/subdir\\file.txt",
          "win32": "C:\\dir\\subdir\\file.txt",
          "url": "c:/dir/subdir/file.txt"
        },
        "resolve": {
          "posix": posixCWD + "C:\\/dir/subdir\\file.txt",
          "win32": "C:\\dir\\subdir\\file.txt",
          "url": "c:/subdir/file.txt"
        }
      },
      "root (without slash) + path": {
        "p": [
          "c:",
          "dir",
          "\\subdir\\file.txt"
        ],
        "isUrl": false,
        "join": {
          "posix": "c:/dir/\\subdir\\file.txt",
          "win32": "c:\\dir\\subdir\\file.txt",
          "url": "c:/dir/subdir/file.txt"
        },
        "resolve": {
          "posix": posixCWD + "c:/dir/\\subdir\\file.txt",
          "win32": "c:\\subdir\\file.txt",
          "url": "c:/subdir/file.txt"
        }
      },
      "UNC root + path": {
        "p": [
          "\\\\server",
          "dir",
          "subdir\\file.txt"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\\\server/dir/subdir\\file.txt",
          "win32": "\\\\server\\dir\\subdir\\file.txt",
          "url": "/server/dir/subdir/file.txt"
        },
        "resolve": {
          "posix": posixCWD + "\\\\server/dir/subdir\\file.txt",
          "win32": "\\server\\dir\\subdir\\file.txt",
          "url": "//server/subdir/file.txt"
        }
      },
      "absolute + relative": {
        "p": [
          "C:\\dir\\subdir\\",
          "otherdir",
          "/anotherdir/file.html"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:\\dir\\subdir\\/otherdir/anotherdir/file.html",
          "win32": "C:\\dir\\subdir\\otherdir\\anotherdir\\file.html",
          "url": "c:/dir/subdir/otherdir/anotherdir/file.html"
        },
        "resolve": {
          "posix": "/anotherdir/file.html",
          "win32": "C:\\anotherdir\\file.html",
          "url": "c:/anotherdir/file.html"
        }
      },
      "absolute + relative + absolute": {
        "p": [
          "C:\\dir\\subdir",
          "\\..\\file.html",
          "D:\\fizz\\buzz"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:\\dir\\subdir/\\..\\file.html/D:\\fizz\\buzz",
          "win32": "C:\\dir\\file.html\\D:\\fizz\\buzz",
          "url": "c:/dir/file.html/D:/fizz/buzz"
        },
        "resolve": {
          "posix": posixCWD + "C:\\dir\\subdir/\\..\\file.html/D:\\fizz\\buzz",
          "win32": "D:\\fizz\\buzz",
          "url": "d:/fizz/buzz"
        }
      },
      "absolute + relative + absolute + relative": {
        "p": [
          "C:\\dir\\subdir",
          "otherdir",
          "D:\\fizz\\buzz",
          ".\\..\\foo.bar"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:\\dir\\subdir/otherdir/D:\\fizz\\buzz/.\\..\\foo.bar",
          "win32": "C:\\dir\\subdir\\otherdir\\D:\\fizz\\foo.bar",
          "url": "c:/dir/subdir/otherdir/D:/fizz/foo.bar"
        },
        "resolve": {
          "posix": posixCWD + "C:\\dir\\subdir/otherdir/D:\\fizz\\buzz/.\\..\\foo.bar",
          "win32": "D:\\fizz\\foo.bar",
          "url": "d:/foo.bar"
        }
      },
      "absolute + relative + URL + relative": {
        "p": [
          "C:\\dir\\subdir#page1",
          "otherdir",
          "https://company.com/fizz/buzz?foo=bar#page2",
          ".\\..\\foo.bar"
        ],
        "isUrl": false,
        "matchesNative": false,
        "join": {
          "posix": "C:\\dir\\subdir#page1/otherdir/https:/company.com/fizz/buzz?foo=bar#page2/.\\..\\foo.bar",
          "win32": "C:\\dir\\subdir#page1\\otherdir\\https:\\company.com\\fizz\\foo.bar",
          "url": "c:/dir/subdir/otherdir/https:/company.com/fizz/foo.bar"
        },
        "resolve": {
          "posix": "https://company.com/foo.bar",
          "win32": "https://company.com/foo.bar",
          "url": "https://company.com/foo.bar"
        }
      },
      "file paths with ? and # characters": {
        "p": [
          "C:\\dir#page1",
          "subdir\\otherdir?fizz=buzz",
          "?foo=bar",
          ".\\..\\foo.bar#page2"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:\\dir#page1/subdir\\otherdir?fizz=buzz/?foo=bar/.\\..\\foo.bar#page2",
          "win32": "C:\\dir#page1\\subdir\\otherdir?fizz=buzz\\foo.bar#page2",
          "url": "c:/dir/subdir/foo.bar#page2"
        },
        "resolve": {
          "posix": posixCWD + "C:\\dir#page1/subdir\\otherdir?fizz=buzz/?foo=bar/.\\..\\foo.bar#page2",
          "win32": "C:\\dir#page1\\subdir\\otherdir?fizz=buzz\\foo.bar#page2",
          "url": "c:/foo.bar#page2"
        }
      },
      "file paths with query and hash": {
        "p": [
          "C:\\dir#page1",
          "subdir\\otherdir?fizz=buzz",
          "?foo=bar#page2",
          "#page3"
        ],
        options: {allowFileQuery: true, allowFileHash: true},
        "isUrl": false,
        "matchesNative": false,
        "join": {
          "posix": "C:\\dir/subdir\\otherdir#page3",
          "win32": "C:\\dir\\subdir\\otherdir#page3",
          "url": "c:/dir/subdir/otherdir#page3"
        },
        "resolve": {
          "posix": posixCWD + "C:\\dir/subdir\\otherdir?foo=bar#page3",
          "win32": "C:\\dir\\subdir\\otherdir?foo=bar#page3",
          "url": "c:/subdir/otherdir?foo=bar#page3"
        }
      }
    },
    "URLs": {
      "protocol + server": {
        "p": [
          "http://",
          "server"
        ],
        "isUrl": true,
        "join": {
          "posix": "http:/server",
          "win32": "http:\\server",
          "url": "http://server/"
        },
        "resolve": {
          "posix": "http:///server",
          "win32": "http:///server",
          "url": "http:///server"
        }
      },
      "protocol (without slashes) + server": {
        "p": [
          "http:",
          "server"
        ],
        "isUrl": false,
        "join": {
          "posix": "http:/server",
          "win32": "http:\\server",
          "url": "http:/server"
        },
        "resolve": {
          "posix": posixCWD + "http:/server",
          "win32": windowsCWD + "http:\\server",
          "url": "http:server"
        }
      },
      "protocol (without slashes) + slashes + server": {
        "p": [
          "http:",
          "//",
          "server"
        ],
        "isUrl": false,
        "join": {
          "posix": "http:/server",
          "win32": "http:\\server",
          "url": "http://server/"
        },
        "resolve": {
          "posix": "/server",
          "win32": "\\server",
          "url": "http:///server"
        }
      },
      "protocol + server + path": {
        "p": [
          "http://",
          "server.com",
          "dir",
          "subdir",
          "otherdir/"
        ],
        "isUrl": true,
        "join": {
          "posix": "http:/server.com/dir/subdir/otherdir/",
          "win32": "http:\\server.com\\dir\\subdir\\otherdir\\",
          "url": "http://server.com/dir/subdir/otherdir/"
        },
        "resolve": {
          "posix": "http:///otherdir/",
          "win32": "http:///otherdir/",
          "url": "http:///otherdir/"
        }
      },
      "protocol + server + path + query + hash": {
        "p": [
          "http://",
          "server.com",
          "dir/",
          "/subdir",
          "otherdir/",
          "?foo=bar",
          "#page3"
        ],
        "isUrl": true,
        "join": {
          "posix": "http:/server.com/dir/subdir/otherdir/?foo=bar/#page3",
          "win32": "http:\\server.com\\dir\\subdir\\otherdir\\?foo=bar\\#page3",
          "url": "http://server.com/dir/subdir/otherdir/#page3"
        },
        "resolve": {
          "posix": "http:///otherdir/?foo=bar#page3",
          "win32": "http:///otherdir/?foo=bar#page3",
          "url": "http:///otherdir/?foo=bar#page3"
        }
      },
      "absolute + relative": {
        "p": [
          "http://server.com/dir/",
          "subdir",
          "otherdir/file.html"
        ],
        "isUrl": true,
        "join": {
          "posix": "http:/server.com/dir/subdir/otherdir/file.html",
          "win32": "http:\\server.com\\dir\\subdir\\otherdir\\file.html",
          "url": "http://server.com/dir/subdir/otherdir/file.html"
        },
        "resolve": {
          "posix": "http://server.com/dir/otherdir/file.html",
          "win32": "http://server.com/dir/otherdir/file.html",
          "url": "http://server.com/dir/otherdir/file.html"
        }
      },
      "absolute + relative + absolute": {
        "p": [
          "http://server.com/dir/",
          "subdir",
          "../file.html",
          "ftp://192.168.1.2/fizz/buzz"
        ],
        "isUrl": true,
        "join": {
          "posix": "http:/server.com/dir/file.html/ftp:/192.168.1.2/fizz/buzz",
          "win32": "http:\\server.com\\dir\\file.html\\ftp:\\192.168.1.2\\fizz\\buzz",
          "url": "http://server.com/dir/file.html/ftp:/192.168.1.2/fizz/buzz"
        },
        "resolve": {
          "posix": "ftp://192.168.1.2/fizz/buzz",
          "win32": "ftp://192.168.1.2/fizz/buzz",
          "url": "ftp://192.168.1.2/fizz/buzz"
        }
      },
      "absolute + relative + absolute + relative": {
        "p": [
          "http://server.com/dir/",
          "subdir",
          "ftp://192.168.1.2/fizz/buzz/baz",
          "./../foo.bar"
        ],
        "isUrl": true,
        "join": {
          "posix": "http:/server.com/dir/subdir/ftp:/192.168.1.2/fizz/buzz/foo.bar",
          "win32": "http:\\server.com\\dir\\subdir\\ftp:\\192.168.1.2\\fizz\\buzz\\foo.bar",
          "url": "http://server.com/dir/subdir/ftp:/192.168.1.2/fizz/buzz/foo.bar"
        },
        "resolve": {
          "posix": "ftp://192.168.1.2/fizz/foo.bar",
          "win32": "ftp://192.168.1.2/fizz/foo.bar",
          "url": "ftp://192.168.1.2/fizz/foo.bar"
        }
      }
    },
    "slashes": {
      "slashes": {
        "p": [
          "/",
          "/",
          "\\",
          "/",
          "\\",
          "\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "/\\/\\/\\",
          "win32": "\\",
          "url": "/"
        },
        "resolve": {
          "posix": "/\\/\\",
          "win32": "\\",
          "url": "/"
        }
      },
      "Windows root and slashes": {
        "p": [
          "C:\\",
          "\\",
          "/",
          "C:\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:\\/\\/C:\\",
          "win32": "C:\\C:\\",
          "url": "c:/C:/"
        },
        "resolve": {
          "posix": "/C:\\",
          "win32": "C:\\",
          "url": "c:/"
        }
      },
      "Windows root (without a slash) and slashes": {
        "p": [
          "C:",
          "/",
          "/",
          "\\"
        ],
        "isUrl": false,
        "join": {
          "posix": "C:/\\",
          "win32": "C:\\",
          "url": "c:/"
        },
        "resolve": {
          "posix": "/\\",
          "win32": "C:\\",
          "url": "c:/"
        }
      },
      "UNC root and slashes": {
        "p": [
          "\\\\server\\",
          "\\",
          "/",
          "/",
          "\\",
          "/"
        ],
        "isUrl": false,
        "join": {
          "posix": "\\\\server\\/\\/\\/",
          "win32": "\\server\\",
          "url": "/server/"
        },
        "resolve": {
          "posix": "/",
          "win32": "\\",
          "url": "//server/"
        }
      },
      "protocol and slashes": {
        "p": [
          "http://",
          "\\",
          "/",
          "/",
          "\\",
          "/"
        ],
        "isUrl": true,
        "join": {
          "posix": "http:/\\/\\/",
          "win32": "http:\\",
          "url": "http:///"
        },
        "resolve": {
          "posix": "http:///",
          "win32": "http:///",
          "url": "http:///"
        }
      },
      "protocol (without slashes) and slashes": {
        "p": [
          "http:",
          "\\",
          "/",
          "/",
          "\\",
          "/"
        ],
        "isUrl": false,
        "join": {
          "posix": "http:/\\/\\/",
          "win32": "http:\\",
          "url": "http:/"
        },
        "resolve": {
          "posix": "/",
          "win32": "\\",
          "url": "http:/"
        }
      }
    },
    ". and .. segments": {
      "current dir": {
        "p": [
          ".",
          "././.",
          ".",
          ".",
          "./."
        ],
        "isUrl": false,
        "join": {
          "posix": ".",
          "win32": ".",
          "url": "."
        },
        "resolve": {
          "posix": posixCWD.substr(0, urlCWD.length - 1),
          "win32": windowsCWD.substr(0, urlCWD.length - 1),
          "url": userAgent.isBrowser ? urlCWD : urlCWD.substr(0, urlCWD.length - 1)
        }
      },
      "parent dir": {
        "p": [
          ".",
          "././.",
          ".",
          ".",
          "../."
        ],
        "isUrl": false,
        "join": {
          "posix": "..",
          "win32": "..",
          "url": ".."
        },
        "resolve": {
          "posix": "..",
          "win32": "..",
          "url": ".."
        }
      },
      "ancestor dir": {
        "p": [
          "..",
          "../../../../../..",
          "..",
          "..",
          "../../"
        ],
        "isUrl": false,
        "join": {
          "posix": "../../../../../../../../../../../",
          "win32": "..\\..\\..\\..\\..\\..\\..\\..\\..\\..\\..\\",
          "url": "../../../../../../../../../../../"
        },
        "resolve": {
          "posix": "/",
          "win32": "\\",
          "url": "/"
        }
      },
      "attempt to go above root": {
        "p": [
          "/",
          "../..",
          "./../../../..",
          "..",
          "../"
        ],
        "isUrl": false,
        "join": {
          "posix": "/",
          "win32": "\\",
          "url": "/"
        },
        "resolve": {
          "posix": "/",
          "win32": "\\",
          "url": "/"
        }
      },
      "attempt to go above Windows root": {
        "p": [
          "C:\\",
          "\\.\\..",
          "..",
          "../."
        ],
        "isUrl": false,
        "join": {
          "posix": ".",
          "win32": "C:\\",
          "url": "c://./"
        },
        "resolve": {
          "posix": posixCWD.substr(0, posixCWD.length - 1),
          "win32": "C:\\",
          "url": "c:/"
        }
      },
      "attempt to go above UNC root": {
        "p": [
          "\\\\server",
          "\\share\\",
          "\\.\\..",
          "..",
          "../."
        ],
        "isUrl": false,
        "join": {
          "posix": "\\\\server",
          "win32": "\\\\server\\share\\",
          "url": "/"
        },
        "resolve": {
          "posix": posixCWD + "\\\\server",
          "win32": "\\",
          "url": userAgent.isBrowser ? "//server/" : "//server/share/"
        }
      },
      "attempt to go above URL root": {
        "p": [
          "ftp://server.com",
          "./..",
          "..",
          "../."
        ],
        "isUrl": true,
        "join": {
          "posix": "..",
          "win32": "..",
          "url": "ftp://server.com/"
        },
        "resolve": {
          "posix": "..",
          "win32": "..",
          "url": "ftp://server.com/"
        }
      }
    }
  };

  //global.TestData2 = {};
  global.TestData2.objects = {
    "OmniPath.Posix": {
      "p": [
        new OmniPath.Posix('dir/#page1', {allowFileHash: true}),
        new OmniPath.Posix('.subdir/otherdir?fizz=buzz', {allowFileQuery: true}),
        new OmniPath.Posix('./../.'),
        new OmniPath.Posix('file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true})
      ],
      "isUrl": false,
      "matchesNative": false,
      "join": {
        "posix": "dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "win32": "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "url": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      },
      "resolve": {
        "posix": posixCWD + "dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "win32": windowsCWD + "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "url": urlCWD + "file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      }
    },
    "OmniPath.Windows": {
      "p": [
        new OmniPath.Windows('dir\\'),
        new OmniPath.Windows('.subdir\\otherdir'),
        new OmniPath.Windows('.\\..\\.'),
        new OmniPath.Windows('file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true})
      ],
      "isUrl": false,
      "matchesNative": false,
      "join": {
        "posix": "dir\\/.subdir\\otherdir/.\\..\\./file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "win32": "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "url": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      },
      "resolve": {
        "posix": posixCWD + "dir\\/.subdir\\otherdir/.\\..\\./file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "win32": windowsCWD + "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "url": urlCWD + "file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      }
    },
    "OmniPath.Url": {
      "p": [
        new OmniPath.Url('dir/'),
        new OmniPath.Url('.subdir\\otherdir'),
        new OmniPath.Url('./..\\.'),
        new OmniPath.Url('file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true})
      ],
      "isUrl": true,
      "matchesNative": false,
      "join": {
        "posix": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "win32": "dir\\.subdir\\file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "url": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      },
      "resolve": {
        "posix": urlCWD + "dir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "win32": urlCWD + "dir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "url": urlCWD + "dir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      }
    },
    "URL object": (function() {
      var u1 = 'http://server.com/dir/';
      var u2 = '.subdir\\otherdir';
      var u3 = './..\\.';
      var u4 = 'file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query';

      if (userAgent.isNode) {
        return {
          p: [url.parse(u1), url.parse(u2), url.parse(u3), url.parse(u4)],
          "options": {
            "allowFileQuery": true,
            "allowFileHash": true
          },
          "isUrl": true,
          "matchesNative": false,
          "join": {
            "posix": "http:/server.com/dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
            "win32": "http:\\server.com\\dir\\.subdir\\file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
            "url": "http://server.com/dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
          },
          "resolve": {
            "posix": "http://server.com/dir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
            "win32": "http://server.com/dir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
            "url": "http://server.com/dir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
          }
        };
      }
      else {
        return {
          p: [u1, u2, u3, u4],
          "options": {
            "allowFileQuery": true,
            "allowFileHash": true
          },
          "isUrl": true,
          "matchesNative": false,
          "join": {
            "posix": "http:/server.com/dir/.subdir\\otherdir/..\\./file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
            "win32": "http:\\server.com\\dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
            "url": "http://server.com/dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
          },
          "resolve": {
            "posix": "http://server.com/dir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
            "win32": "http://server.com/dir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
            "url": "http://server.com/dir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
          }
        };
      }
    })()
  };

})();
