(function() {
  // jscs:disable
  'use strict';

  global.TestPaths = {
    "root paths": {
      "root (forward slash)": {
        "p": "/",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/",
            "path": "/",
            "pathname": "/",
            "root": "/",
            "dir": "/"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/",
            "path": "/",
            "pathname": "/",
            "root": "/",
            "dir": "/"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/",
            "path": "/",
            "pathname": "/",
            "root": "/",
            "dir": "/"
          }
        },
        "toUrlString": {
          "posix": "file:///",
          "win32": "file:///",
          "url": "/"
        },
        "format": {
          "posix": "//",
          "win32": "/\\",
          "url": "/"
        },
        "normalize": {
          "posix": "/",
          "win32": "\\",
          "url": "/"
        },
        "join": {
          "posix": "/",
          "win32": "\\",
          "url": "/"
        }
      },
      "root (backslash)": {
        "p": "\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\",
            "path": "\\",
            "pathname": "\\",
            "base": "\\",
            "name": "\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\",
            "path": "\\",
            "pathname": "\\",
            "root": "\\",
            "dir": "\\"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/",
            "path": "/",
            "pathname": "/",
            "root": "/",
            "dir": "/"
          }
        },
        "toUrlString": {
          "posix": "file:///%5C",
          "win32": "file:///",
          "url": "/"
        },
        "format": {
          "posix": "\\",
          "win32": "\\",
          "url": "/"
        },
        "normalize": {
          "posix": "\\",
          "win32": "\\",
          "url": "/"
        },
        "join": {
          "posix": "\\",
          "win32": "\\",
          "url": "/"
        }
      },
      "root (Windows)": {
        "p": "C:\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "C:\\",
            "path": "C:\\",
            "pathname": "C:\\",
            "base": "C:\\",
            "name": "C:\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "C:\\",
            "path": "C:\\",
            "pathname": "C:\\",
            "root": "C:\\",
            "dir": "C:\\"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "c:/",
            "protocol": "c:",
            "path": "/",
            "pathname": "/",
            "root": "/",
            "dir": "/"
          }
        },
        "toUrlString": {
          "posix": "file:///C:%5C",
          "win32": "file:///C:/",
          "url": "c:/"
        },
        "format": {
          "posix": "C:\\",
          "win32": "C:\\",
          "url": "c:/"
        },
        "normalize": {
          "posix": "C:\\",
          "win32": "C:\\",
          "url": "c:/"
        },
        "join": {
          "posix": "C:\\",
          "win32": "C:\\",
          "url": "c:/"
        }
      },
      "root (Windows) (without a slash)": {
        "p": "C:",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "C:",
            "path": "C:",
            "pathname": "C:",
            "base": "C:",
            "name": "C:"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "C:",
            "path": "C:",
            "pathname": "C:",
            "root": "C:",
            "dir": "C:"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "c:",
            "protocol": "c:"
          }
        },
        "toUrlString": {
          "posix": "file:///C:",
          "win32": "file:///C:",
          "url": "c:"
        },
        "format": {
          "posix": "C:",
          "win32": "C:\\",
          "url": "c:"
        },
        "normalize": {
          "posix": "C:",
          "win32": "C:.",
          "url": "c:/"
        },
        "join": {
          "posix": "C:",
          "win32": "C:.",
          "url": "c:/"
        }
      },
      "root (UNC)": {
        "p": "\\\\server\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\\\server\\",
            "path": "\\\\server\\",
            "pathname": "\\\\server\\",
            "base": "\\\\server\\",
            "name": "\\\\server\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isUnc": false,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\\\server\\",
            "path": "\\\\server\\",
            "pathname": "\\\\server\\",
            "root": "\\",
            "dir": "\\",
            "base": "server",
            "name": "server"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "//server/",
            "path": "//server/",
            "pathname": "//server/",
            "root": "/",
            "dir": "/",
            "base": "server",
            "name": "server"
          }
        },
        "toUrlString": {
          "posix": "file:///%5C%5Cserver%5C",
          "win32": "file:////server/",
          "url": "//server/"
        },
        "format": {
          "posix": "\\\\server\\",
          "win32": "\\server",
          "url": "//server/"
        },
        "normalize": {
          "posix": "\\\\server\\",
          "win32": "\\server\\",
          "url": "/server/"
        },
        "join": {
          "posix": "\\\\server\\",
          "win32": "\\server\\",
          "url": "/server/"
        }
      },
      "root (UNC) (without slash)": {
        "p": "\\\\server",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\\\server",
            "path": "\\\\server",
            "pathname": "\\\\server",
            "base": "\\\\server",
            "name": "\\\\server"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isUnc": false,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\\\server",
            "path": "\\\\server",
            "pathname": "\\\\server",
            "root": "\\",
            "dir": "\\",
            "base": "server",
            "name": "server"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "//server",
            "path": "//server",
            "pathname": "//server",
            "root": "/",
            "dir": "/",
            "base": "server",
            "name": "server"
          }
        },
        "toUrlString": {
          "posix": "file:///%5C%5Cserver",
          "win32": "file:////server",
          "url": "//server"
        },
        "format": {
          "posix": "\\\\server",
          "win32": "\\server",
          "url": "//server"
        },
        "normalize": {
          "posix": "\\\\server",
          "win32": "\\server",
          "url": "/server"
        },
        "join": {
          "posix": "\\\\server",
          "win32": "\\server",
          "url": "/server"
        }
      },
      "root (URL)": {
        "p": "http://host.name",
        "isUrl": true,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "http://host.name",
            "path": "http://host.name",
            "pathname": "http://host.name",
            "dir": "http:/",
            "base": "host.name",
            "name": "host",
            "ext": ".name"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "http://host.name",
            "path": "http://host.name",
            "pathname": "http://host.name",
            "dir": "http:/",
            "base": "host.name",
            "name": "host",
            "ext": ".name"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "http://host.name/",
            "protocol": "http:",
            "slashes": true,
            "host": "host.name",
            "hostname": "host.name",
            "path": "/",
            "pathname": "/",
            "root": "/",
            "dir": "/"
          }
        },
        "toUrlString": {
          "posix": "file:///http://host.name",
          "win32": "file:///http://host.name",
          "url": "http://host.name/"
        },
        "format": {
          "posix": "http://host.name",
          "win32": "http:/\\host.name",
          "url": "http://host.name/"
        },
        "normalize": {
          "posix": "http:/host.name",
          "win32": "http:\\host.name",
          "url": "http://host.name/"
        },
        "join": {
          "posix": "http:/host.name",
          "win32": "http:\\host.name",
          "url": "http://host.name/"
        }
      },
      "root (with . and .. segments)": {
        "p": "/./.././",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/./.././",
            "path": "/./.././",
            "pathname": "/./.././",
            "root": "/",
            "dir": "/./..",
            "base": ".",
            "name": "."
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/./.././",
            "path": "/./.././",
            "pathname": "/./.././",
            "root": "/",
            "dir": "/./..",
            "base": ".",
            "name": "."
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/./.././",
            "path": "/./.././",
            "pathname": "/./.././",
            "root": "/",
            "dir": "/./..",
            "base": ".",
            "name": "."
          }
        },
        "toUrlString": {
          "posix": "file:///./.././",
          "win32": "file:///./.././",
          "url": "/./.././"
        },
        "format": {
          "posix": "/./../.",
          "win32": "/./..\\.",
          "url": "/./.././"
        },
        "normalize": {
          "posix": "/",
          "win32": "\\",
          "url": "/"
        },
        "join": {
          "posix": "/",
          "win32": "\\",
          "url": "/"
        }
      },
      "root directory (forward slash)": {
        "p": "/somedir/",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/somedir/",
            "path": "/somedir/",
            "pathname": "/somedir/",
            "root": "/",
            "dir": "/",
            "base": "somedir",
            "name": "somedir"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/somedir/",
            "path": "/somedir/",
            "pathname": "/somedir/",
            "root": "/",
            "dir": "/",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/somedir/",
            "path": "/somedir/",
            "pathname": "/somedir/",
            "root": "/",
            "dir": "/",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///somedir/",
          "win32": "file:///somedir/",
          "url": "/somedir/"
        },
        "format": {
          "posix": "//somedir",
          "win32": "/\\somedir",
          "url": "/somedir/"
        },
        "normalize": {
          "posix": "/somedir/",
          "win32": "\\somedir\\",
          "url": "/somedir/"
        },
        "join": {
          "posix": "/somedir/",
          "win32": "\\somedir\\",
          "url": "/somedir/"
        }
      },
      "root directory (backslash)": {
        "p": "\\somedir\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\somedir\\",
            "path": "\\somedir\\",
            "pathname": "\\somedir\\",
            "base": "\\somedir\\",
            "name": "\\somedir\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\somedir\\",
            "path": "\\somedir\\",
            "pathname": "\\somedir\\",
            "root": "\\",
            "dir": "\\",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/somedir/",
            "path": "/somedir/",
            "pathname": "/somedir/",
            "root": "/",
            "dir": "/",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///%5Csomedir%5C",
          "win32": "file:///somedir/",
          "url": "/somedir/"
        },
        "format": {
          "posix": "\\somedir\\",
          "win32": "\\somedir",
          "url": "/somedir/"
        },
        "normalize": {
          "posix": "\\somedir\\",
          "win32": "\\somedir\\",
          "url": "/somedir/"
        },
        "join": {
          "posix": "\\somedir\\",
          "win32": "\\somedir\\",
          "url": "/somedir/"
        }
      },
      "root directory (Windows)": {
        "p": "C:\\somedir\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "C:\\somedir\\",
            "path": "C:\\somedir\\",
            "pathname": "C:\\somedir\\",
            "base": "C:\\somedir\\",
            "name": "C:\\somedir\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "C:\\somedir\\",
            "path": "C:\\somedir\\",
            "pathname": "C:\\somedir\\",
            "root": "C:\\",
            "dir": "C:\\",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "c:/somedir/",
            "protocol": "c:",
            "path": "/somedir/",
            "pathname": "/somedir/",
            "root": "/",
            "dir": "/",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///C:%5Csomedir%5C",
          "win32": "file:///C:/somedir/",
          "url": "c:/somedir/"
        },
        "format": {
          "posix": "C:\\somedir\\",
          "win32": "C:\\somedir",
          "url": "c:/somedir/"
        },
        "normalize": {
          "posix": "C:\\somedir\\",
          "win32": "C:\\somedir\\",
          "url": "c:/somedir/"
        },
        "join": {
          "posix": "C:\\somedir\\",
          "win32": "C:\\somedir\\",
          "url": "c:/somedir/"
        }
      },
      "root directory (UNC)": {
        "p": "\\\\server\\dir\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\\\server\\dir\\",
            "path": "\\\\server\\dir\\",
            "pathname": "\\\\server\\dir\\",
            "base": "\\\\server\\dir\\",
            "name": "\\\\server\\dir\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isUnc": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\\\server\\dir\\",
            "path": "\\\\server\\dir\\",
            "pathname": "\\\\server\\dir\\",
            "root": "\\\\server\\dir\\",
            "dir": "\\\\server\\dir\\"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "//server/dir/",
            "path": "//server/dir/",
            "pathname": "//server/dir/",
            "root": "/",
            "dir": "//server",
            "base": "dir",
            "name": "dir"
          }
        },
        "toUrlString": {
          "posix": "file:///%5C%5Cserver%5Cdir%5C",
          "win32": "file://server/dir/",
          "url": "//server/dir/"
        },
        "format": {
          "posix": "\\\\server\\dir\\",
          "win32": "\\\\server\\dir\\",
          "url": "//server/dir/"
        },
        "normalize": {
          "posix": "\\\\server\\dir\\",
          "win32": "\\\\server\\dir\\",
          "url": "/server/dir/"
        },
        "join": {
          "posix": "\\\\server\\dir\\",
          "win32": "\\\\server\\dir\\",
          "url": "/server/dir/"
        }
      },
      "root directory (URL)": {
        "p": "http://host.name/somedir/",
        "isUrl": true,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "http://host.name/somedir/",
            "path": "http://host.name/somedir/",
            "pathname": "http://host.name/somedir/",
            "dir": "http://host.name",
            "base": "somedir",
            "name": "somedir"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "http://host.name/somedir/",
            "path": "http://host.name/somedir/",
            "pathname": "http://host.name/somedir/",
            "dir": "http://host.name",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "http://host.name/somedir/",
            "protocol": "http:",
            "slashes": true,
            "host": "host.name",
            "hostname": "host.name",
            "path": "/somedir/",
            "pathname": "/somedir/",
            "root": "/",
            "dir": "/",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///http://host.name/somedir/",
          "win32": "file:///http://host.name/somedir/",
          "url": "http://host.name/somedir/"
        },
        "format": {
          "posix": "http://host.name/somedir",
          "win32": "http://host.name\\somedir",
          "url": "http://host.name/somedir/"
        },
        "normalize": {
          "posix": "http:/host.name/somedir/",
          "win32": "http:\\host.name\\somedir\\",
          "url": "http://host.name/somedir/"
        },
        "join": {
          "posix": "http:/host.name/somedir/",
          "win32": "http:\\host.name\\somedir\\",
          "url": "http://host.name/somedir/"
        }
      },
      "root directory (with . and .. segments)": {
        "p": "/./.././somedir/./",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/./.././somedir/./",
            "path": "/./.././somedir/./",
            "pathname": "/./.././somedir/./",
            "root": "/",
            "dir": "/./.././somedir",
            "base": ".",
            "name": "."
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/./.././somedir/./",
            "path": "/./.././somedir/./",
            "pathname": "/./.././somedir/./",
            "root": "/",
            "dir": "/./.././somedir",
            "base": ".",
            "name": "."
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/./.././somedir/./",
            "path": "/./.././somedir/./",
            "pathname": "/./.././somedir/./",
            "root": "/",
            "dir": "/./.././somedir",
            "base": ".",
            "name": "."
          }
        },
        "toUrlString": {
          "posix": "file:///./.././somedir/./",
          "win32": "file:///./.././somedir/./",
          "url": "/./.././somedir/./"
        },
        "format": {
          "posix": "/./.././somedir/.",
          "win32": "/./.././somedir\\.",
          "url": "/./.././somedir/./"
        },
        "normalize": {
          "posix": "/somedir/",
          "win32": "\\somedir\\",
          "url": "/somedir/"
        },
        "join": {
          "posix": "/somedir/",
          "win32": "\\somedir\\",
          "url": "/somedir/"
        }
      },
      "root file (forward slash)": {
        "p": "/somefile.txt",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/somefile.txt",
            "path": "/somefile.txt",
            "pathname": "/somefile.txt",
            "root": "/",
            "dir": "/",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/somefile.txt",
            "path": "/somefile.txt",
            "pathname": "/somefile.txt",
            "root": "/",
            "dir": "/",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/somefile.txt",
            "path": "/somefile.txt",
            "pathname": "/somefile.txt",
            "root": "/",
            "dir": "/",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          }
        },
        "toUrlString": {
          "posix": "file:///somefile.txt",
          "win32": "file:///somefile.txt",
          "url": "/somefile.txt"
        },
        "format": {
          "posix": "//somefile.txt",
          "win32": "/\\somefile.txt",
          "url": "/somefile.txt"
        },
        "normalize": {
          "posix": "/somefile.txt",
          "win32": "\\\somefile.txt",
          "url": "/somefile.txt"
        },
        "join": {
          "posix": "/somefile.txt",
          "win32": "\\\somefile.txt",
          "url": "/somefile.txt"
        }
      },
      "root file (backslash)": {
        "p": "\\somefile.html",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\somefile.html",
            "path": "\\somefile.html",
            "pathname": "\\somefile.html",
            "base": "\\somefile.html",
            "name": "\\somefile",
            "ext": ".html"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\somefile.html",
            "path": "\\somefile.html",
            "pathname": "\\somefile.html",
            "root": "\\",
            "dir": "\\",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/somefile.html",
            "path": "/somefile.html",
            "pathname": "/somefile.html",
            "root": "/",
            "dir": "/",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          }
        },
        "toUrlString": {
          "posix": "file:///%5Csomefile.html",
          "win32": "file:///somefile.html",
          "url": "/somefile.html"
        },
        "format": {
          "posix": "\\somefile.html",
          "win32": "\\somefile.html",
          "url": "/somefile.html"
        },
        "normalize": {
          "posix": "\\somefile.html",
          "win32": "\\somefile.html",
          "url": "/somefile.html"
        },
        "join": {
          "posix": "\\somefile.html",
          "win32": "\\somefile.html",
          "url": "/somefile.html"
        }
      },
      "root file (Windows)": {
        "p": "C:\\somefile.md",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "C:\\somefile.md",
            "path": "C:\\somefile.md",
            "pathname": "C:\\somefile.md",
            "base": "C:\\somefile.md",
            "name": "C:\\somefile",
            "ext": ".md"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "C:\\somefile.md",
            "path": "C:\\somefile.md",
            "pathname": "C:\\somefile.md",
            "root": "C:\\",
            "dir": "C:\\",
            "base": "somefile.md",
            "name": "somefile",
            "ext": ".md"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "c:/somefile.md",
            "protocol": "c:",
            "path": "/somefile.md",
            "pathname": "/somefile.md",
            "root": "/",
            "dir": "/",
            "base": "somefile.md",
            "name": "somefile",
            "ext": ".md"
          }
        },
        "toUrlString": {
          "posix": "file:///C:%5Csomefile.md",
          "win32": "file:///C:/somefile.md",
          "url": "c:/somefile.md"
        },
        "format": {
          "posix": "C:\\somefile.md",
          "win32": "C:\\somefile.md",
          "url": "c:/somefile.md"
        },
        "normalize": {
          "posix": "C:\\somefile.md",
          "win32": "C:\\somefile.md",
          "url": "c:/somefile.md"
        },
        "join": {
          "posix": "C:\\somefile.md",
          "win32": "C:\\somefile.md",
          "url": "c:/somefile.md"
        }
      },
      "root file (UNC)": {
        "p": "\\\\server\\somefile.doc",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\\\server\\somefile.doc",
            "path": "\\\\server\\somefile.doc",
            "pathname": "\\\\server\\somefile.doc",
            "base": "\\\\server\\somefile.doc",
            "name": "\\\\server\\somefile",
            "ext": ".doc"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isUnc": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\\\server\\somefile.doc",
            "path": "\\\\server\\somefile.doc",
            "pathname": "\\\\server\\somefile.doc",
            "root": "\\\\server\\somefile.doc",
            "dir": "\\\\server\\somefile.doc"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "//server/somefile.doc",
            "path": "//server/somefile.doc",
            "pathname": "//server/somefile.doc",
            "root": "/",
            "dir": "//server",
            "base": "somefile.doc",
            "name": "somefile",
            "ext": ".doc"
          }
        },
        "toUrlString": {
          "posix": "file:///%5C%5Cserver%5Csomefile.doc",
          "win32": "file://server/somefile.doc",
          "url": "//server/somefile.doc"
        },
        "format": {
          "posix": "\\\\server\\somefile.doc",
          "win32": "\\\\server\\somefile.doc\\",
          "url": "//server/somefile.doc"
        },
        "normalize": {
          "posix": "\\\\server\\somefile.doc",
          "win32": "\\\\server\\somefile.doc\\",
          "url": "/server/somefile.doc"
        },
        "join": {
          "posix": "\\\\server\\somefile.doc",
          "win32": "\\\\server\\somefile.doc\\",
          "url": "/server/somefile.doc"
        }
      },
      "root file (URL)": {
        "p": "http://host.name/somefile.html",
        "isUrl": true,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "http://host.name/somefile.html",
            "path": "http://host.name/somefile.html",
            "pathname": "http://host.name/somefile.html",
            "dir": "http://host.name",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "http://host.name/somefile.html",
            "path": "http://host.name/somefile.html",
            "pathname": "http://host.name/somefile.html",
            "dir": "http://host.name",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "http://host.name/somefile.html",
            "protocol": "http:",
            "slashes": true,
            "host": "host.name",
            "hostname": "host.name",
            "path": "/somefile.html",
            "pathname": "/somefile.html",
            "root": "/",
            "dir": "/",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          }
        },
        "toUrlString": {
          "posix": "file:///http://host.name/somefile.html",
          "win32": "file:///http://host.name/somefile.html",
          "url": "http://host.name/somefile.html"
        },
        "format": {
          "posix": "http://host.name/somefile.html",
          "win32": "http://host.name\\somefile.html",
          "url": "http://host.name/somefile.html"
        },
        "normalize": {
          "posix": "http:/host.name/somefile.html",
          "win32": "http:\\host.name\\somefile.html",
          "url": "http://host.name/somefile.html"
        },
        "join": {
          "posix": "http:/host.name/somefile.html",
          "win32": "http:\\host.name\\somefile.html",
          "url": "http://host.name/somefile.html"
        }
      },
      "root file (with . and .. segments)": {
        "p": "/.././../somefile.txt",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/.././../somefile.txt",
            "path": "/.././../somefile.txt",
            "pathname": "/.././../somefile.txt",
            "root": "/",
            "dir": "/.././..",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/.././../somefile.txt",
            "path": "/.././../somefile.txt",
            "pathname": "/.././../somefile.txt",
            "root": "/",
            "dir": "/.././..",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/.././../somefile.txt",
            "path": "/.././../somefile.txt",
            "pathname": "/.././../somefile.txt",
            "root": "/",
            "dir": "/.././..",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          }
        },
        "toUrlString": {
          "posix": "file:///.././../somefile.txt",
          "win32": "file:///.././../somefile.txt",
          "url": "/.././../somefile.txt"
        },
        "format": {
          "posix": "/.././../somefile.txt",
          "win32": "/.././..\\somefile.txt",
          "url": "/.././../somefile.txt"
        },
        "normalize": {
          "posix": "/somefile.txt",
          "win32": "\\somefile.txt",
          "url": "/somefile.txt"
        },
        "join": {
          "posix": "/somefile.txt",
          "win32": "\\somefile.txt",
          "url": "/somefile.txt"
        }
      }
    },
    "absolute paths": {
      "absolute directory (forward slashes)": {
        "p": "/dir/subdir/somedir/",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/dir/subdir/somedir/",
            "path": "/dir/subdir/somedir/",
            "pathname": "/dir/subdir/somedir/",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/dir/subdir/somedir/",
            "path": "/dir/subdir/somedir/",
            "pathname": "/dir/subdir/somedir/",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/dir/subdir/somedir/",
            "path": "/dir/subdir/somedir/",
            "pathname": "/dir/subdir/somedir/",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///dir/subdir/somedir/",
          "win32": "file:///dir/subdir/somedir/",
          "url": "/dir/subdir/somedir/"
        },
        "format": {
          "posix": "/dir/subdir/somedir",
          "win32": "/dir/subdir\\somedir",
          "url": "/dir/subdir/somedir/"
        },
        "normalize": {
          "posix": "/dir/subdir/somedir/",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        },
        "join": {
          "posix": "/dir/subdir/somedir/",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        }
      },
      "absolute directory (backslashes)": {
        "p": "\\dir\\subdir\\somedir\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\dir\\subdir\\somedir\\",
            "path": "\\dir\\subdir\\somedir\\",
            "pathname": "\\dir\\subdir\\somedir\\",
            "base": "\\dir\\subdir\\somedir\\",
            "name": "\\dir\\subdir\\somedir\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\dir\\subdir\\somedir\\",
            "path": "\\dir\\subdir\\somedir\\",
            "pathname": "\\dir\\subdir\\somedir\\",
            "root": "\\",
            "dir": "\\dir\\subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/dir/subdir/somedir/",
            "path": "/dir/subdir/somedir/",
            "pathname": "/dir/subdir/somedir/",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///%5Cdir%5Csubdir%5Csomedir%5C",
          "win32": "file:///dir/subdir/somedir/",
          "url": "/dir/subdir/somedir/"
        },
        "format": {
          "posix": "\\dir\\subdir\\somedir\\",
          "win32": "\\dir\\subdir\\somedir",
          "url": "/dir/subdir/somedir/"
        },
        "normalize": {
          "posix": "\\dir\\subdir\\somedir\\",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        },
        "join": {
          "posix": "\\dir\\subdir\\somedir\\",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        }
      },
      "absolute directory (Windows)": {
        "p": "C:\\dir\\subdir\\somedir\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "C:\\dir\\subdir\\somedir\\",
            "path": "C:\\dir\\subdir\\somedir\\",
            "pathname": "C:\\dir\\subdir\\somedir\\",
            "base": "C:\\dir\\subdir\\somedir\\",
            "name": "C:\\dir\\subdir\\somedir\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "C:\\dir\\subdir\\somedir\\",
            "path": "C:\\dir\\subdir\\somedir\\",
            "pathname": "C:\\dir\\subdir\\somedir\\",
            "root": "C:\\",
            "dir": "C:\\dir\\subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "c:/dir/subdir/somedir/",
            "protocol": "c:",
            "path": "/dir/subdir/somedir/",
            "pathname": "/dir/subdir/somedir/",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///C:%5Cdir%5Csubdir%5Csomedir%5C",
          "win32": "file:///C:/dir/subdir/somedir/",
          "url": "c:/dir/subdir/somedir/"
        },
        "format": {
          "posix": "C:\\dir\\subdir\\somedir\\",
          "win32": "C:\\dir\\subdir\\somedir",
          "url": "c:/dir/subdir/somedir/"
        },
        "normalize": {
          "posix": "C:\\dir\\subdir\\somedir\\",
          "win32": "C:\\dir\\subdir\\somedir\\",
          "url": "c:/dir/subdir/somedir/"
        },
        "join": {
          "posix": "C:\\dir\\subdir\\somedir\\",
          "win32": "C:\\dir\\subdir\\somedir\\",
          "url": "c:/dir/subdir/somedir/"
        }
      },
      "absolute directory (UNC)": {
        "p": "\\\\server\\dir\\subdir\\somedir\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\\\server\\dir\\subdir\\somedir\\",
            "path": "\\\\server\\dir\\subdir\\somedir\\",
            "pathname": "\\\\server\\dir\\subdir\\somedir\\",
            "base": "\\\\server\\dir\\subdir\\somedir\\",
            "name": "\\\\server\\dir\\subdir\\somedir\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isUnc": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\\\server\\dir\\subdir\\somedir\\",
            "path": "\\\\server\\dir\\subdir\\somedir\\",
            "pathname": "\\\\server\\dir\\subdir\\somedir\\",
            "root": "\\\\server\\dir\\",
            "dir": "\\\\server\\dir\\subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "//server/dir/subdir/somedir/",
            "path": "//server/dir/subdir/somedir/",
            "pathname": "//server/dir/subdir/somedir/",
            "root": "/",
            "dir": "//server/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///%5C%5Cserver%5Cdir%5Csubdir%5Csomedir%5C",
          "win32": "file://server/dir/subdir/somedir/",
          "url": "//server/dir/subdir/somedir/"
        },
        "format": {
          "posix": "\\\\server\\dir\\subdir\\somedir\\",
          "win32": "\\\\server\\dir\\subdir\\somedir",
          "url": "//server/dir/subdir/somedir/"
        },
        "normalize": {
          "posix": "\\\\server\\dir\\subdir\\somedir\\",
          "win32": "\\\\server\\dir\\subdir\\somedir\\",
          "url": "/server/dir/subdir/somedir/"
        },
        "join": {
          "posix": "\\\\server\\dir\\subdir\\somedir\\",
          "win32": "\\\\server\\dir\\subdir\\somedir\\",
          "url": "/server/dir/subdir/somedir/"
        }
      },
      "absolute directory (URL)": {
        "p": "http://host.name/dir/subdir/somedir/",
        "isUrl": true,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "http://host.name/dir/subdir/somedir/",
            "path": "http://host.name/dir/subdir/somedir/",
            "pathname": "http://host.name/dir/subdir/somedir/",
            "dir": "http://host.name/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "http://host.name/dir/subdir/somedir/",
            "path": "http://host.name/dir/subdir/somedir/",
            "pathname": "http://host.name/dir/subdir/somedir/",
            "dir": "http://host.name/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "http://host.name/dir/subdir/somedir/",
            "protocol": "http:",
            "slashes": true,
            "host": "host.name",
            "hostname": "host.name",
            "path": "/dir/subdir/somedir/",
            "pathname": "/dir/subdir/somedir/",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///http://host.name/dir/subdir/somedir/",
          "win32": "file:///http://host.name/dir/subdir/somedir/",
          "url": "http://host.name/dir/subdir/somedir/"
        },
        "format": {
          "posix": "http://host.name/dir/subdir/somedir",
          "win32": "http://host.name/dir/subdir\\somedir",
          "url": "http://host.name/dir/subdir/somedir/"
        },
        "normalize": {
          "posix": "http:/host.name/dir/subdir/somedir/",
          "win32": "http:\\host.name\\dir\\subdir\\somedir\\",
          "url": "http://host.name/dir/subdir/somedir/"
        },
        "join": {
          "posix": "http:/host.name/dir/subdir/somedir/",
          "win32": "http:\\host.name\\dir\\subdir\\somedir\\",
          "url": "http://host.name/dir/subdir/somedir/"
        }
      },
      "absolute directory (forward slashes + backslashes)": {
        "p": "/dir\\subdir/somedir\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/dir\\subdir/somedir\\",
            "path": "/dir\\subdir/somedir\\",
            "pathname": "/dir\\subdir/somedir\\",
            "root": "/",
            "dir": "/dir\\subdir",
            "base": "somedir\\",
            "name": "somedir\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/dir\\subdir/somedir\\",
            "path": "/dir\\subdir/somedir\\",
            "pathname": "/dir\\subdir/somedir\\",
            "root": "/",
            "dir": "/dir\\subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/dir/subdir/somedir/",
            "path": "/dir/subdir/somedir/",
            "pathname": "/dir/subdir/somedir/",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///dir%5Csubdir/somedir%5C",
          "win32": "file:///dir/subdir/somedir/",
          "url": "/dir/subdir/somedir/"
        },
        "format": {
          "posix": "/dir\\subdir/somedir\\",
          "win32": "/dir\\subdir\\somedir",
          "url": "/dir/subdir/somedir/"
        },
        "normalize": {
          "posix": "/dir\\subdir/somedir\\",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        },
        "join": {
          "posix": "/dir\\subdir/somedir\\",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        }
      },
      "absolute directory (backslashes + forward slashes)": {
        "p": "\\dir/subdir\\somedir/",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\dir/subdir\\somedir/",
            "path": "\\dir/subdir\\somedir/",
            "pathname": "\\dir/subdir\\somedir/",
            "dir": "\\dir",
            "base": "subdir\\somedir",
            "name": "subdir\\somedir"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\dir/subdir\\somedir/",
            "path": "\\dir/subdir\\somedir/",
            "pathname": "\\dir/subdir\\somedir/",
            "root": "\\",
            "dir": "\\dir/subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/dir/subdir/somedir/",
            "path": "/dir/subdir/somedir/",
            "pathname": "/dir/subdir/somedir/",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///%5Cdir/subdir%5Csomedir/",
          "win32": "file:///dir/subdir/somedir/",
          "url": "/dir/subdir/somedir/"
        },
        "format": {
          "posix": "\\dir/subdir\\somedir",
          "win32": "\\dir/subdir\\somedir",
          "url": "/dir/subdir/somedir/"
        },
        "normalize": {
          "posix": "\\dir/subdir\\somedir/",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        },
        "join": {
          "posix": "\\dir/subdir\\somedir/",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        }
      },
      "absolute directory (Windows + forward slashes)": {
        "p": "C:/dir/subdir\\somedir/",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "C:/dir/subdir\\somedir/",
            "path": "C:/dir/subdir\\somedir/",
            "pathname": "C:/dir/subdir\\somedir/",
            "dir": "C:/dir",
            "base": "subdir\\somedir",
            "name": "subdir\\somedir"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "C:/dir/subdir\\somedir/",
            "path": "C:/dir/subdir\\somedir/",
            "pathname": "C:/dir/subdir\\somedir/",
            "root": "C:/",
            "dir": "C:/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "c:/dir/subdir/somedir/",
            "protocol": "c:",
            "path": "/dir/subdir/somedir/",
            "pathname": "/dir/subdir/somedir/",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///C:/dir/subdir%5Csomedir/",
          "win32": "file:///C:/dir/subdir/somedir/",
          "url": "c:/dir/subdir/somedir/"
        },
        "format": {
          "posix": "C:/dir/subdir\\somedir",
          "win32": "C:/dir/subdir\\somedir",
          "url": "c:/dir/subdir/somedir/"
        },
        "normalize": {
          "posix": "C:/dir/subdir\\somedir/",
          "win32": "C:\\dir\\subdir\\somedir\\",
          "url": "c:/dir/subdir/somedir/"
        },
        "join": {
          "posix": "C:/dir/subdir\\somedir/",
          "win32": "C:\\dir\\subdir\\somedir\\",
          "url": "c:/dir/subdir/somedir/"
        }
      },
      "absolute directory (with . and .. segments)": {
        "p": "/dir/./subdir/././somedir/../somedir/./",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/dir/./subdir/././somedir/../somedir/./",
            "path": "/dir/./subdir/././somedir/../somedir/./",
            "pathname": "/dir/./subdir/././somedir/../somedir/./",
            "root": "/",
            "dir": "/dir/./subdir/././somedir/../somedir",
            "base": ".",
            "name": "."
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/dir/./subdir/././somedir/../somedir/./",
            "path": "/dir/./subdir/././somedir/../somedir/./",
            "pathname": "/dir/./subdir/././somedir/../somedir/./",
            "root": "/",
            "dir": "/dir/./subdir/././somedir/../somedir",
            "base": ".",
            "name": "."
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/dir/./subdir/././somedir/../somedir/./",
            "path": "/dir/./subdir/././somedir/../somedir/./",
            "pathname": "/dir/./subdir/././somedir/../somedir/./",
            "root": "/",
            "dir": "/dir/./subdir/././somedir/../somedir",
            "base": ".",
            "name": "."
          }
        },
        "toUrlString": {
          "posix": "file:///dir/./subdir/././somedir/../somedir/./",
          "win32": "file:///dir/./subdir/././somedir/../somedir/./",
          "url": "/dir/./subdir/././somedir/../somedir/./"
        },
        "format": {
          "posix": "/dir/./subdir/././somedir/../somedir/.",
          "win32": "/dir/./subdir/././somedir/../somedir\\.",
          "url": "/dir/./subdir/././somedir/../somedir/./"
        },
        "normalize": {
          "posix": "/dir/subdir/somedir/",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        },
        "join": {
          "posix": "/dir/subdir/somedir/",
          "win32": "\\dir\\subdir\\somedir\\",
          "url": "/dir/subdir/somedir/"
        }
      },
      "absolute file (forward slashes)": {
        "p": "/dir/subdir/somefile.txt",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/dir/subdir/somefile.txt",
            "path": "/dir/subdir/somefile.txt",
            "pathname": "/dir/subdir/somefile.txt",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/dir/subdir/somefile.txt",
            "path": "/dir/subdir/somefile.txt",
            "pathname": "/dir/subdir/somefile.txt",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/dir/subdir/somefile.txt",
            "path": "/dir/subdir/somefile.txt",
            "pathname": "/dir/subdir/somefile.txt",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          }
        },
        "toUrlString": {
          "posix": "file:///dir/subdir/somefile.txt",
          "win32": "file:///dir/subdir/somefile.txt",
          "url": "/dir/subdir/somefile.txt"
        },
        "format": {
          "posix": "/dir/subdir/somefile.txt",
          "win32": "/dir/subdir\\somefile.txt",
          "url": "/dir/subdir/somefile.txt"
        },
        "normalize": {
          "posix": "/dir/subdir/somefile.txt",
          "win32": "\\dir\\subdir\\somefile.txt",
          "url": "/dir/subdir/somefile.txt"
        },
        "join": {
          "posix": "/dir/subdir/somefile.txt",
          "win32": "\\dir\\subdir\\somefile.txt",
          "url": "/dir/subdir/somefile.txt"
        }
      },
      "absolute file (backslashes)": {
        "p": "\\dir\\subdir\\somefile.html",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\dir\\subdir\\somefile.html",
            "path": "\\dir\\subdir\\somefile.html",
            "pathname": "\\dir\\subdir\\somefile.html",
            "base": "\\dir\\subdir\\somefile.html",
            "name": "\\dir\\subdir\\somefile",
            "ext": ".html"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\dir\\subdir\\somefile.html",
            "path": "\\dir\\subdir\\somefile.html",
            "pathname": "\\dir\\subdir\\somefile.html",
            "root": "\\",
            "dir": "\\dir\\subdir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/dir/subdir/somefile.html",
            "path": "/dir/subdir/somefile.html",
            "pathname": "/dir/subdir/somefile.html",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          }
        },
        "toUrlString": {
          "posix": "file:///%5Cdir%5Csubdir%5Csomefile.html",
          "win32": "file:///dir/subdir/somefile.html",
          "url": "/dir/subdir/somefile.html"
        },
        "format": {
          "posix": "\\dir\\subdir\\somefile.html",
          "win32": "\\dir\\subdir\\somefile.html",
          "url": "/dir/subdir/somefile.html"
        },
        "normalize": {
          "posix": "\\dir\\subdir\\somefile.html",
          "win32": "\\dir\\subdir\\somefile.html",
          "url": "/dir/subdir/somefile.html"
        },
        "join": {
          "posix": "\\dir\\subdir\\somefile.html",
          "win32": "\\dir\\subdir\\somefile.html",
          "url": "/dir/subdir/somefile.html"
        }
      },
      "absolute file (Windows)": {
        "p": "C:\\dir\\subdir\\somefile.md",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "C:\\dir\\subdir\\somefile.md",
            "path": "C:\\dir\\subdir\\somefile.md",
            "pathname": "C:\\dir\\subdir\\somefile.md",
            "base": "C:\\dir\\subdir\\somefile.md",
            "name": "C:\\dir\\subdir\\somefile",
            "ext": ".md"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "C:\\dir\\subdir\\somefile.md",
            "path": "C:\\dir\\subdir\\somefile.md",
            "pathname": "C:\\dir\\subdir\\somefile.md",
            "root": "C:\\",
            "dir": "C:\\dir\\subdir",
            "base": "somefile.md",
            "name": "somefile",
            "ext": ".md"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "c:/dir/subdir/somefile.md",
            "protocol": "c:",
            "path": "/dir/subdir/somefile.md",
            "pathname": "/dir/subdir/somefile.md",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somefile.md",
            "name": "somefile",
            "ext": ".md"
          }
        },
        "toUrlString": {
          "posix": "file:///C:%5Cdir%5Csubdir%5Csomefile.md",
          "win32": "file:///C:/dir/subdir/somefile.md",
          "url": "c:/dir/subdir/somefile.md"
        },
        "format": {
          "posix": "C:\\dir\\subdir\\somefile.md",
          "win32": "C:\\dir\\subdir\\somefile.md",
          "url": "c:/dir/subdir/somefile.md"
        },
        "normalize": {
          "posix": "C:\\dir\\subdir\\somefile.md",
          "win32": "C:\\dir\\subdir\\somefile.md",
          "url": "c:/dir/subdir/somefile.md"
        },
        "join": {
          "posix": "C:\\dir\\subdir\\somefile.md",
          "win32": "C:\\dir\\subdir\\somefile.md",
          "url": "c:/dir/subdir/somefile.md"
        }
      },
      "absolute file (UNC)": {
        "p": "\\\\server\\dir\\subdir\\somefile.doc",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\\\server\\dir\\subdir\\somefile.doc",
            "path": "\\\\server\\dir\\subdir\\somefile.doc",
            "pathname": "\\\\server\\dir\\subdir\\somefile.doc",
            "base": "\\\\server\\dir\\subdir\\somefile.doc",
            "name": "\\\\server\\dir\\subdir\\somefile",
            "ext": ".doc"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isUnc": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\\\server\\dir\\subdir\\somefile.doc",
            "path": "\\\\server\\dir\\subdir\\somefile.doc",
            "pathname": "\\\\server\\dir\\subdir\\somefile.doc",
            "root": "\\\\server\\dir\\",
            "dir": "\\\\server\\dir\\subdir",
            "base": "somefile.doc",
            "name": "somefile",
            "ext": ".doc"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "//server/dir/subdir/somefile.doc",
            "path": "//server/dir/subdir/somefile.doc",
            "pathname": "//server/dir/subdir/somefile.doc",
            "root": "/",
            "dir": "//server/dir/subdir",
            "base": "somefile.doc",
            "name": "somefile",
            "ext": ".doc"
          }
        },
        "toUrlString": {
          "posix": "file:///%5C%5Cserver%5Cdir%5Csubdir%5Csomefile.doc",
          "win32": "file://server/dir/subdir/somefile.doc",
          "url": "//server/dir/subdir/somefile.doc"
        },
        "format": {
          "posix": "\\\\server\\dir\\subdir\\somefile.doc",
          "win32": "\\\\server\\dir\\subdir\\somefile.doc",
          "url": "//server/dir/subdir/somefile.doc"
        },
        "normalize": {
          "posix": "\\\\server\\dir\\subdir\\somefile.doc",
          "win32": "\\\\server\\dir\\subdir\\somefile.doc",
          "url": "/server/dir/subdir/somefile.doc"
        },
        "join": {
          "posix": "\\\\server\\dir\\subdir\\somefile.doc",
          "win32": "\\\\server\\dir\\subdir\\somefile.doc",
          "url": "/server/dir/subdir/somefile.doc"
        }
      },
      "absolute file (URL)": {
        "p": "http://host.name/dir/subdir/somefile.html",
        "isUrl": true,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "http://host.name/dir/subdir/somefile.html",
            "path": "http://host.name/dir/subdir/somefile.html",
            "pathname": "http://host.name/dir/subdir/somefile.html",
            "dir": "http://host.name/dir/subdir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "http://host.name/dir/subdir/somefile.html",
            "path": "http://host.name/dir/subdir/somefile.html",
            "pathname": "http://host.name/dir/subdir/somefile.html",
            "dir": "http://host.name/dir/subdir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "http://host.name/dir/subdir/somefile.html",
            "protocol": "http:",
            "slashes": true,
            "host": "host.name",
            "hostname": "host.name",
            "path": "/dir/subdir/somefile.html",
            "pathname": "/dir/subdir/somefile.html",
            "root": "/",
            "dir": "/dir/subdir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          }
        },
        "toUrlString": {
          "posix": "file:///http://host.name/dir/subdir/somefile.html",
          "win32": "file:///http://host.name/dir/subdir/somefile.html",
          "url": "http://host.name/dir/subdir/somefile.html"
        },
        "format": {
          "posix": "http://host.name/dir/subdir/somefile.html",
          "win32": "http://host.name/dir/subdir\\somefile.html",
          "url": "http://host.name/dir/subdir/somefile.html"
        },
        "normalize": {
          "posix": "http:/host.name/dir/subdir/somefile.html",
          "win32": "http:\\host.name\\dir\\subdir\\somefile.html",
          "url": "http://host.name/dir/subdir/somefile.html"
        },
        "join": {
          "posix": "http:/host.name/dir/subdir/somefile.html",
          "win32": "http:\\host.name\\dir\\subdir\\somefile.html",
          "url": "http://host.name/dir/subdir/somefile.html"
        }
      },
      "absolute file (forward slashes + backslashes)": {
        "p": "/dir\\subdir/somedir\\somefile.txt",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/dir\\subdir/somedir\\somefile.txt",
            "path": "/dir\\subdir/somedir\\somefile.txt",
            "pathname": "/dir\\subdir/somedir\\somefile.txt",
            "root": "/",
            "dir": "/dir\\subdir",
            "base": "somedir\\somefile.txt",
            "name": "somedir\\somefile",
            "ext": ".txt"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/dir\\subdir/somedir\\somefile.txt",
            "path": "/dir\\subdir/somedir\\somefile.txt",
            "pathname": "/dir\\subdir/somedir\\somefile.txt",
            "root": "/",
            "dir": "/dir\\subdir/somedir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/dir/subdir/somedir/somefile.txt",
            "path": "/dir/subdir/somedir/somefile.txt",
            "pathname": "/dir/subdir/somedir/somefile.txt",
            "root": "/",
            "dir": "/dir/subdir/somedir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          }
        },
        "toUrlString": {
          "posix": "file:///dir%5Csubdir/somedir%5Csomefile.txt",
          "win32": "file:///dir/subdir/somedir/somefile.txt",
          "url": "/dir/subdir/somedir/somefile.txt"
        },
        "format": {
          "posix": "/dir\\subdir/somedir\\somefile.txt",
          "win32": "/dir\\subdir/somedir\\somefile.txt",
          "url": "/dir/subdir/somedir/somefile.txt"
        },
        "normalize": {
          "posix": "/dir\\subdir/somedir\\somefile.txt",
          "win32": "\\dir\\subdir\\somedir\\somefile.txt",
          "url": "/dir/subdir/somedir/somefile.txt"
        },
        "join": {
          "posix": "/dir\\subdir/somedir\\somefile.txt",
          "win32": "\\dir\\subdir\\somedir\\somefile.txt",
          "url": "/dir/subdir/somedir/somefile.txt"
        }
      },
      "absolute file (backslashes + forward slashes)": {
        "p": "\\dir/subdir\\somedir/somefile.html",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\dir/subdir\\somedir/somefile.html",
            "path": "\\dir/subdir\\somedir/somefile.html",
            "pathname": "\\dir/subdir\\somedir/somefile.html",
            "dir": "\\dir/subdir\\somedir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\dir/subdir\\somedir/somefile.html",
            "path": "\\dir/subdir\\somedir/somefile.html",
            "pathname": "\\dir/subdir\\somedir/somefile.html",
            "root": "\\",
            "dir": "\\dir/subdir\\somedir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/dir/subdir/somedir/somefile.html",
            "path": "/dir/subdir/somedir/somefile.html",
            "pathname": "/dir/subdir/somedir/somefile.html",
            "root": "/",
            "dir": "/dir/subdir/somedir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          }
        },
        "toUrlString": {
          "posix": "file:///%5Cdir/subdir%5Csomedir/somefile.html",
          "win32": "file:///dir/subdir/somedir/somefile.html",
          "url": "/dir/subdir/somedir/somefile.html"
        },
        "format": {
          "posix": "\\dir/subdir\\somedir/somefile.html",
          "win32": "\\dir/subdir\\somedir\\somefile.html",
          "url": "/dir/subdir/somedir/somefile.html"
        },
        "normalize": {
          "posix": "\\dir/subdir\\somedir/somefile.html",
          "win32": "\\dir\\subdir\\somedir\\somefile.html",
          "url": "/dir/subdir/somedir/somefile.html"
        },
        "join": {
          "posix": "\\dir/subdir\\somedir/somefile.html",
          "win32": "\\dir\\subdir\\somedir\\somefile.html",
          "url": "/dir/subdir/somedir/somefile.html"
        }
      },
      "absolute file (Windows + forward slashes)": {
        "p": "C:\\dir/subdir\\somedir/somefile.md",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "C:\\dir/subdir\\somedir/somefile.md",
            "path": "C:\\dir/subdir\\somedir/somefile.md",
            "pathname": "C:\\dir/subdir\\somedir/somefile.md",
            "dir": "C:\\dir/subdir\\somedir",
            "base": "somefile.md",
            "name": "somefile",
            "ext": ".md"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "C:\\dir/subdir\\somedir/somefile.md",
            "path": "C:\\dir/subdir\\somedir/somefile.md",
            "pathname": "C:\\dir/subdir\\somedir/somefile.md",
            "root": "C:\\",
            "dir": "C:\\dir/subdir\\somedir",
            "base": "somefile.md",
            "name": "somefile",
            "ext": ".md"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "c:/dir/subdir/somedir/somefile.md",
            "protocol": "c:",
            "path": "/dir/subdir/somedir/somefile.md",
            "pathname": "/dir/subdir/somedir/somefile.md",
            "root": "/",
            "dir": "/dir/subdir/somedir",
            "base": "somefile.md",
            "name": "somefile",
            "ext": ".md"
          }
        },
        "toUrlString": {
          "posix": "file:///C:%5Cdir/subdir%5Csomedir/somefile.md",
          "win32": "file:///C:/dir/subdir/somedir/somefile.md",
          "url": "c:/dir/subdir/somedir/somefile.md"
        },
        "format": {
          "posix": "C:\\dir/subdir\\somedir/somefile.md",
          "win32": "C:\\dir/subdir\\somedir\\somefile.md",
          "url": "c:/dir/subdir/somedir/somefile.md"
        },
        "normalize": {
          "posix": "C:\\dir/subdir\\somedir/somefile.md",
          "win32": "C:\\dir\\subdir\\somedir\\somefile.md",
          "url": "c:/dir/subdir/somedir/somefile.md"
        },
        "join": {
          "posix": "C:\\dir/subdir\\somedir/somefile.md",
          "win32": "C:\\dir\\subdir\\somedir\\somefile.md",
          "url": "c:/dir/subdir/somedir/somefile.md"
        }
      },
      "absolute file (with . and .. segments)": {
        "p": "/dir/./subdir/././../subdir/./somefile.txt",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/dir/./subdir/././../subdir/./somefile.txt",
            "path": "/dir/./subdir/././../subdir/./somefile.txt",
            "pathname": "/dir/./subdir/././../subdir/./somefile.txt",
            "root": "/",
            "dir": "/dir/./subdir/././../subdir/.",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/dir/./subdir/././../subdir/./somefile.txt",
            "path": "/dir/./subdir/././../subdir/./somefile.txt",
            "pathname": "/dir/./subdir/././../subdir/./somefile.txt",
            "root": "/",
            "dir": "/dir/./subdir/././../subdir/.",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/dir/./subdir/././../subdir/./somefile.txt",
            "path": "/dir/./subdir/././../subdir/./somefile.txt",
            "pathname": "/dir/./subdir/././../subdir/./somefile.txt",
            "root": "/",
            "dir": "/dir/./subdir/././../subdir/.",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          }
        },
        "toUrlString": {
          "posix": "file:///dir/./subdir/././../subdir/./somefile.txt",
          "win32": "file:///dir/./subdir/././../subdir/./somefile.txt",
          "url": "/dir/./subdir/././../subdir/./somefile.txt"
        },
        "format": {
          "posix": "/dir/./subdir/././../subdir/./somefile.txt",
          "win32": "/dir/./subdir/././../subdir/.\\somefile.txt",
          "url": "/dir/./subdir/././../subdir/./somefile.txt"
        },
        "normalize": {
          "posix": "/dir/subdir/somefile.txt",
          "win32": "\\dir\\subdir\\somefile.txt",
          "url": "/dir/subdir/somefile.txt"
        },
        "join": {
          "posix": "/dir/subdir/somefile.txt",
          "win32": "\\dir\\subdir\\somefile.txt",
          "url": "/dir/subdir/somefile.txt"
        }
      }
    },
    "relative paths": {
      "relative directory (forward slashes)": {
        "p": "dir/subdir/somedir/",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
            "delimiter": ":",
            "href": "dir/subdir/somedir/",
            "path": "dir/subdir/somedir/",
            "pathname": "dir/subdir/somedir/",
            "dir": "dir/subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": "dir/subdir/somedir/",
            "path": "dir/subdir/somedir/",
            "pathname": "dir/subdir/somedir/",
            "dir": "dir/subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": "dir/subdir/somedir/",
            "path": "dir/subdir/somedir/",
            "pathname": "dir/subdir/somedir/",
            "dir": "dir/subdir",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///dir/subdir/somedir/",
          "win32": "file:///dir/subdir/somedir/",
          "url": "dir/subdir/somedir/"
        },
        "format": {
          "posix": "dir/subdir/somedir",
          "win32": "dir/subdir\\somedir",
          "url": "dir/subdir/somedir/"
        },
        "normalize": {
          "posix": "dir/subdir/somedir/",
          "win32": "dir\\subdir\\somedir\\",
          "url": "dir/subdir/somedir/"
        },
        "join": {
          "posix": "dir/subdir/somedir/",
          "win32": "dir\\subdir\\somedir\\",
          "url": "dir/subdir/somedir/"
        }
      },
      "relative directory (backslashes)": {
        "p": "dir\\subdir\\somedir\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "dir\\subdir\\somedir\\",
            "path": "dir\\subdir\\somedir\\",
            "pathname": "dir\\subdir\\somedir\\",
            "base": "dir\\subdir\\somedir\\",
            "name": "dir\\subdir\\somedir\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": "dir\\subdir\\somedir\\",
            "path": "dir\\subdir\\somedir\\",
            "pathname": "dir\\subdir\\somedir\\",
            "dir": "dir\\subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": "dir/subdir/somedir/",
            "path": "dir/subdir/somedir/",
            "pathname": "dir/subdir/somedir/",
            "dir": "dir/subdir",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///dir%5Csubdir%5Csomedir%5C",
          "win32": "file:///dir/subdir/somedir/",
          "url": "dir/subdir/somedir/"
        },
        "format": {
          "posix": "dir\\subdir\\somedir\\",
          "win32": "dir\\subdir\\somedir",
          "url": "dir/subdir/somedir/"
        },
        "normalize": {
          "posix": "dir\\subdir\\somedir\\",
          "win32": "dir\\subdir\\somedir\\",
          "url": "dir/subdir/somedir/"
        },
        "join": {
          "posix": "dir\\subdir\\somedir\\",
          "win32": "dir\\subdir\\somedir\\",
          "url": "dir/subdir/somedir/"
        }
      },
      "relative directory (forward slashes + backslashes)": {
        "p": "dir\\subdir/somedir\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
            "delimiter": ":",
            "href": "dir\\subdir/somedir\\",
            "path": "dir\\subdir/somedir\\",
            "pathname": "dir\\subdir/somedir\\",
            "dir": "dir\\subdir",
            "base": "somedir\\",
            "name": "somedir\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": "dir\\subdir/somedir\\",
            "path": "dir\\subdir/somedir\\",
            "pathname": "dir\\subdir/somedir\\",
            "dir": "dir\\subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": "dir/subdir/somedir/",
            "path": "dir/subdir/somedir/",
            "pathname": "dir/subdir/somedir/",
            "dir": "dir/subdir",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///dir%5Csubdir/somedir%5C",
          "win32": "file:///dir/subdir/somedir/",
          "url": "dir/subdir/somedir/"
        },
        "format": {
          "posix": "dir\\subdir/somedir\\",
          "win32": "dir\\subdir\\somedir",
          "url": "dir/subdir/somedir/"
        },
        "normalize": {
          "posix": "dir\\subdir/somedir\\",
          "win32": "dir\\subdir\\somedir\\",
          "url": "dir/subdir/somedir/"
        },
        "join": {
          "posix": "dir\\subdir/somedir\\",
          "win32": "dir\\subdir\\somedir\\",
          "url": "dir/subdir/somedir/"
        }
      },
      "relative directory (backslashes + forward slashes)": {
        "p": "dir/subdir\\somedir/",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "dir/subdir\\somedir/",
            "path": "dir/subdir\\somedir/",
            "pathname": "dir/subdir\\somedir/",
            "dir": "dir",
            "base": "subdir\\somedir",
            "name": "subdir\\somedir"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": "dir/subdir\\somedir/",
            "path": "dir/subdir\\somedir/",
            "pathname": "dir/subdir\\somedir/",
            "dir": "dir/subdir",
            "base": "somedir",
            "name": "somedir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": "dir/subdir/somedir/",
            "path": "dir/subdir/somedir/",
            "pathname": "dir/subdir/somedir/",
            "dir": "dir/subdir",
            "base": "somedir",
            "name": "somedir"
          }
        },
        "toUrlString": {
          "posix": "file:///dir/subdir%5Csomedir/",
          "win32": "file:///dir/subdir/somedir/",
          "url": "dir/subdir/somedir/"
        },
        "format": {
          "posix": "dir/subdir\\somedir",
          "win32": "dir/subdir\\somedir",
          "url": "dir/subdir/somedir/"
        },
        "normalize": {
          "posix": "dir/subdir\\somedir/",
          "win32": "dir\\subdir\\somedir\\",
          "url": "dir/subdir/somedir/"
        },
        "join": {
          "posix": "dir/subdir\\somedir/",
          "win32": "dir\\subdir\\somedir\\",
          "url": "dir/subdir/somedir/"
        }
      },
      "relative directory (with . and .. segments)": {
        "p": ".././dir/././subdir/../subdir/somedir/./",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": ".././dir/././subdir/../subdir/somedir/./",
            "path": ".././dir/././subdir/../subdir/somedir/./",
            "pathname": ".././dir/././subdir/../subdir/somedir/./",
            "dir": ".././dir/././subdir/../subdir/somedir",
            "base": ".",
            "name": "."
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": ".././dir/././subdir/../subdir/somedir/./",
            "path": ".././dir/././subdir/../subdir/somedir/./",
            "pathname": ".././dir/././subdir/../subdir/somedir/./",
            "dir": ".././dir/././subdir/../subdir/somedir",
            "base": ".",
            "name": "."
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": ".././dir/././subdir/../subdir/somedir/./",
            "path": ".././dir/././subdir/../subdir/somedir/./",
            "pathname": ".././dir/././subdir/../subdir/somedir/./",
            "dir": ".././dir/././subdir/../subdir/somedir",
            "base": ".",
            "name": "."
          }
        },
        "toUrlString": {
          "posix": "file:///.././dir/././subdir/../subdir/somedir/./",
          "win32": "file:///.././dir/././subdir/../subdir/somedir/./",
          "url": ".././dir/././subdir/../subdir/somedir/./"
        },
        "format": {
          "posix": ".././dir/././subdir/../subdir/somedir/.",
          "win32": ".././dir/././subdir/../subdir/somedir\\.",
          "url": ".././dir/././subdir/../subdir/somedir/./"
        },
        "normalize": {
          "posix": "../dir/subdir/somedir/",
          "win32": "..\\dir\\subdir\\somedir\\",
          "url": "../dir/subdir/somedir/"
        },
        "join": {
          "posix": "../dir/subdir/somedir/",
          "win32": "..\\dir\\subdir\\somedir\\",
          "url": "../dir/subdir/somedir/"
        }
      },
      "relative file (forward slashes)": {
        "p": "dir/subdir/somefile.txt",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
            "delimiter": ":",
            "href": "dir/subdir/somefile.txt",
            "path": "dir/subdir/somefile.txt",
            "pathname": "dir/subdir/somefile.txt",
            "dir": "dir/subdir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": "dir/subdir/somefile.txt",
            "path": "dir/subdir/somefile.txt",
            "pathname": "dir/subdir/somefile.txt",
            "dir": "dir/subdir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": "dir/subdir/somefile.txt",
            "path": "dir/subdir/somefile.txt",
            "pathname": "dir/subdir/somefile.txt",
            "dir": "dir/subdir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          }
        },
        "toUrlString": {
          "posix": "file:///dir/subdir/somefile.txt",
          "win32": "file:///dir/subdir/somefile.txt",
          "url": "dir/subdir/somefile.txt"
        },
        "format": {
          "posix": "dir/subdir/somefile.txt",
          "win32": "dir/subdir\\somefile.txt",
          "url": "dir/subdir/somefile.txt"
        },
        "normalize": {
          "posix": "dir/subdir/somefile.txt",
          "win32": "dir\\subdir\\somefile.txt",
          "url": "dir/subdir/somefile.txt"
        },
        "join": {
          "posix": "dir/subdir/somefile.txt",
          "win32": "dir\\subdir\\somefile.txt",
          "url": "dir/subdir/somefile.txt"
        }
      },
      "relative file (backslashes)": {
        "p": "dir\\subdir\\somefile.html",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "dir\\subdir\\somefile.html",
            "path": "dir\\subdir\\somefile.html",
            "pathname": "dir\\subdir\\somefile.html",
            "base": "dir\\subdir\\somefile.html",
            "name": "dir\\subdir\\somefile",
            "ext": ".html"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": "dir\\subdir\\somefile.html",
            "path": "dir\\subdir\\somefile.html",
            "pathname": "dir\\subdir\\somefile.html",
            "dir": "dir\\subdir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": "dir/subdir/somefile.html",
            "path": "dir/subdir/somefile.html",
            "pathname": "dir/subdir/somefile.html",
            "dir": "dir/subdir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          }
        },
        "toUrlString": {
          "posix": "file:///dir%5Csubdir%5Csomefile.html",
          "win32": "file:///dir/subdir/somefile.html",
          "url": "dir/subdir/somefile.html"
        },
        "format": {
          "posix": "dir\\subdir\\somefile.html",
          "win32": "dir\\subdir\\somefile.html",
          "url": "dir/subdir/somefile.html"
        },
        "normalize": {
          "posix": "dir\\subdir\\somefile.html",
          "win32": "dir\\subdir\\somefile.html",
          "url": "dir/subdir/somefile.html"
        },
        "join": {
          "posix": "dir\\subdir\\somefile.html",
          "win32": "dir\\subdir\\somefile.html",
          "url": "dir/subdir/somefile.html"
        }
      },
      "relative file (forward slashes + backslashes)": {
        "p": "dir\\subdir/somedir\\somefile.txt",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
            "delimiter": ":",
            "href": "dir\\subdir/somedir\\somefile.txt",
            "path": "dir\\subdir/somedir\\somefile.txt",
            "pathname": "dir\\subdir/somedir\\somefile.txt",
            "dir": "dir\\subdir",
            "base": "somedir\\somefile.txt",
            "name": "somedir\\somefile",
            "ext": ".txt"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": "dir\\subdir/somedir\\somefile.txt",
            "path": "dir\\subdir/somedir\\somefile.txt",
            "pathname": "dir\\subdir/somedir\\somefile.txt",
            "dir": "dir\\subdir/somedir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": "dir/subdir/somedir/somefile.txt",
            "path": "dir/subdir/somedir/somefile.txt",
            "pathname": "dir/subdir/somedir/somefile.txt",
            "dir": "dir/subdir/somedir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          }
        },
        "toUrlString": {
          "posix": "file:///dir%5Csubdir/somedir%5Csomefile.txt",
          "win32": "file:///dir/subdir/somedir/somefile.txt",
          "url": "dir/subdir/somedir/somefile.txt"
        },
        "format": {
          "posix": "dir\\subdir/somedir\\somefile.txt",
          "win32": "dir\\subdir/somedir\\somefile.txt",
          "url": "dir/subdir/somedir/somefile.txt"
        },
        "normalize": {
          "posix": "dir\\subdir/somedir\\somefile.txt",
          "win32": "dir\\subdir\\somedir\\somefile.txt",
          "url": "dir/subdir/somedir/somefile.txt"
        },
        "join": {
          "posix": "dir\\subdir/somedir\\somefile.txt",
          "win32": "dir\\subdir\\somedir\\somefile.txt",
          "url": "dir/subdir/somedir/somefile.txt"
        }
      },
      "relative file (backslashes + forward slashes)": {
        "p": "dir/subdir\\somedir/somefile.html",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "dir/subdir\\somedir/somefile.html",
            "path": "dir/subdir\\somedir/somefile.html",
            "pathname": "dir/subdir\\somedir/somefile.html",
            "dir": "dir/subdir\\somedir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": "dir/subdir\\somedir/somefile.html",
            "path": "dir/subdir\\somedir/somefile.html",
            "pathname": "dir/subdir\\somedir/somefile.html",
            "dir": "dir/subdir\\somedir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": "dir/subdir/somedir/somefile.html",
            "path": "dir/subdir/somedir/somefile.html",
            "pathname": "dir/subdir/somedir/somefile.html",
            "dir": "dir/subdir/somedir",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          }
        },
        "toUrlString": {
          "posix": "file:///dir/subdir%5Csomedir/somefile.html",
          "win32": "file:///dir/subdir/somedir/somefile.html",
          "url": "dir/subdir/somedir/somefile.html"
        },
        "format": {
          "posix": "dir/subdir\\somedir/somefile.html",
          "win32": "dir/subdir\\somedir\\somefile.html",
          "url": "dir/subdir/somedir/somefile.html"
        },
        "normalize": {
          "posix": "dir/subdir\\somedir/somefile.html",
          "win32": "dir\\subdir\\somedir\\somefile.html",
          "url": "dir/subdir/somedir/somefile.html"
        },
        "join": {
          "posix": "dir/subdir\\somedir/somefile.html",
          "win32": "dir\\subdir\\somedir\\somefile.html",
          "url": "dir/subdir/somedir/somefile.html"
        }
      },
      "relative file (with . and .. segments)": {
        "p": ".././dir/subdir/././somedir/../somedir/./somefile.html",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": ".././dir/subdir/././somedir/../somedir/./somefile.html",
            "path": ".././dir/subdir/././somedir/../somedir/./somefile.html",
            "pathname": ".././dir/subdir/././somedir/../somedir/./somefile.html",
            "dir": ".././dir/subdir/././somedir/../somedir/.",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": ".././dir/subdir/././somedir/../somedir/./somefile.html",
            "path": ".././dir/subdir/././somedir/../somedir/./somefile.html",
            "pathname": ".././dir/subdir/././somedir/../somedir/./somefile.html",
            "dir": ".././dir/subdir/././somedir/../somedir/.",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": ".././dir/subdir/././somedir/../somedir/./somefile.html",
            "path": ".././dir/subdir/././somedir/../somedir/./somefile.html",
            "pathname": ".././dir/subdir/././somedir/../somedir/./somefile.html",
            "dir": ".././dir/subdir/././somedir/../somedir/.",
            "base": "somefile.html",
            "name": "somefile",
            "ext": ".html"
          }
        },
        "toUrlString": {
          "posix": "file:///.././dir/subdir/././somedir/../somedir/./somefile.html",
          "win32": "file:///.././dir/subdir/././somedir/../somedir/./somefile.html",
          "url": ".././dir/subdir/././somedir/../somedir/./somefile.html"
        },
        "format": {
          "posix": ".././dir/subdir/././somedir/../somedir/./somefile.html",
          "win32": ".././dir/subdir/././somedir/../somedir/.\\somefile.html",
          "url": ".././dir/subdir/././somedir/../somedir/./somefile.html"
        },
        "normalize": {
          "posix": "../dir/subdir/somedir/somefile.html",
          "win32": "..\\dir\\subdir\\somedir\\somefile.html",
          "url": "../dir/subdir/somedir/somefile.html"
        },
        "join": {
          "posix": "../dir/subdir/somedir/somefile.html",
          "win32": "..\\dir\\subdir\\somedir\\somefile.html",
          "url": "../dir/subdir/somedir/somefile.html"
        }
      }
    },
    "URLs": {
      "URL with only a hostname": {
        "p": "ftp://localhost",
        "isUrl": true,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "ftp://localhost",
            "path": "ftp://localhost",
            "pathname": "ftp://localhost",
            "dir": "ftp:/",
            "base": "localhost",
            "name": "localhost"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "ftp://localhost",
            "path": "ftp://localhost",
            "pathname": "ftp://localhost",
            "dir": "ftp:/",
            "base": "localhost",
            "name": "localhost"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "ftp://localhost/",
            "protocol": "ftp:",
            "slashes": true,
            "host": "localhost",
            "hostname": "localhost",
            "path": "/",
            "pathname": "/",
            "root": "/",
            "dir": "/"
          }
        },
        "toUrlString": {
          "posix": "file:///ftp://localhost",
          "win32": "file:///ftp://localhost",
          "url": "ftp://localhost/"
        },
        "format": {
          "posix": "ftp://localhost",
          "win32": "ftp:/\\localhost",
          "url": "ftp://localhost/"
        },
        "normalize": {
          "posix": "ftp:/localhost",
          "win32": "ftp:\\localhost",
          "url": "ftp://localhost/"
        },
        "join": {
          "posix": "ftp:/localhost",
          "win32": "ftp:\\localhost",
          "url": "ftp://localhost/"
        }
      },
      "URL with only a host IP": {
        "p": "smb://192.168.1.256",
        "isUrl": true,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "smb://192.168.1.256",
            "path": "smb://192.168.1.256",
            "pathname": "smb://192.168.1.256",
            "dir": "smb:/",
            "base": "192.168.1.256",
            "name": "192.168.1",
            "ext": ".256"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "smb://192.168.1.256",
            "path": "smb://192.168.1.256",
            "pathname": "smb://192.168.1.256",
            "dir": "smb:/",
            "base": "192.168.1.256",
            "name": "192.168.1",
            "ext": ".256"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "smb://192.168.1.256",
            "protocol": "smb:",
            "slashes": true,
            "host": "192.168.1.256",
            "hostname": "192.168.1.256"
          }
        },
        "toUrlString": {
          "posix": "file:///smb://192.168.1.256",
          "win32": "file:///smb://192.168.1.256",
          "url": "smb://192.168.1.256"
        },
        "format": {
          "posix": "smb://192.168.1.256",
          "win32": "smb:/\\192.168.1.256",
          "url": "smb://192.168.1.256"
        },
        "normalize": {
          "posix": "smb:/192.168.1.256",
          "win32": "smb:\\192.168.1.256",
          "url": "smb://192.168.1.256/"
        },
        "join": {
          "posix": "smb:/192.168.1.256",
          "win32": "smb:\\192.168.1.256",
          "url": "smb://192.168.1.256/"
        }
      },
      "URL with only a host and query": {
        "p": "gopher://localhost?foo=bar&biz=baz",
        "options": {
          "allowFileQuery": true
        },
        "isUrl": true,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "gopher://localhost?foo=bar&biz=baz",
            "path": "gopher://localhost?foo=bar&biz=baz",
            "pathname": "gopher://localhost",
            "dir": "gopher:/",
            "base": "localhost",
            "name": "localhost",
            "search": "?foo=bar&biz=baz",
            "query": {
              "foo": "bar",
              "biz": "baz"
            }
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "gopher://localhost?foo=bar&biz=baz",
            "path": "gopher://localhost?foo=bar&biz=baz",
            "pathname": "gopher://localhost",
            "dir": "gopher:/",
            "base": "localhost",
            "name": "localhost",
            "search": "?foo=bar&biz=baz",
            "query": {
              "foo": "bar",
              "biz": "baz"
            }
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "gopher://localhost/?foo=bar&biz=baz",
            "protocol": "gopher:",
            "slashes": true,
            "host": "localhost",
            "hostname": "localhost",
            "path": "/?foo=bar&biz=baz",
            "pathname": "/",
            "root": "/",
            "dir": "/",
            "search": "?foo=bar&biz=baz",
            "query": {
              "foo": "bar",
              "biz": "baz"
            }
          }
        },
        "toUrlString": {
          "posix": "file:///gopher://localhost?foo=bar&biz=baz",
          "win32": "file:///gopher://localhost?foo=bar&biz=baz",
          "url": "gopher://localhost/?foo=bar&biz=baz"
        },
        "format": {
          "posix": "gopher://localhost?foo=bar&biz=baz",
          "win32": "gopher:/\\localhost?foo=bar&biz=baz",
          "url": "gopher://localhost/?foo=bar&biz=baz"
        },
        "normalize": {
          "posix": "gopher:/localhost?foo=bar&biz=baz",
          "win32": "gopher:\\localhost?foo=bar&biz=baz",
          "url": "gopher://localhost/?foo=bar&biz=baz"
        },
        "join": {
          "posix": "gopher:/localhost",
          "win32": "gopher:\\localhost",
          "url": "gopher://localhost/"
        }
      },
      "URL with only a host and hash": {
        "p": "apple-maps://host.name#not?a=query",
        "options": {
          "allowFileHash": true
        },
        "isUrl": true,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "apple-maps://host.name#not?a=query",
            "path": "apple-maps://host.name",
            "pathname": "apple-maps://host.name",
            "dir": "apple-maps:/",
            "base": "host.name",
            "name": "host",
            "ext": ".name",
            "hash": "#not?a=query"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "apple-maps://host.name#not?a=query",
            "path": "apple-maps://host.name",
            "pathname": "apple-maps://host.name",
            "dir": "apple-maps:/",
            "base": "host.name",
            "name": "host",
            "ext": ".name",
            "hash": "#not?a=query"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "apple-maps://host.name#not?a=query",
            "protocol": "apple-maps:",
            "slashes": true,
            "host": "host.name",
            "hostname": "host.name",
            "hash": "#not?a=query"
          }
        },
        "toUrlString": {
          "posix": "file:///apple-maps://host.name#not?a=query",
          "win32": "file:///apple-maps://host.name#not?a=query",
          "url": "apple-maps://host.name#not?a=query"
        },
        "format": {
          "posix": "apple-maps://host.name#not?a=query",
          "win32": "apple-maps:/\\host.name#not?a=query",
          "url": "apple-maps://host.name#not?a=query"
        },
        "normalize": {
          "posix": "apple-maps:/host.name#not?a=query",
          "win32": "apple-maps:\\host.name#not?a=query",
          "url": "apple-maps://host.name/#not?a=query"
        },
        "join": {
          "posix": "apple-maps:/host.name",
          "win32": "apple-maps:\\host.name",
          "url": "apple-maps://host.name/"
        }
      },
      "URL with all parts": {
        "p": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
        "options": {
          "allowFileQuery": true,
          "allowFileHash": true
        },
        "isUrl": true,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
            "path": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz",
            "pathname": "https://user:pass@www.server.com:80/p/a/t/h",
            "dir": "https://user:pass@www.server.com:80/p/a/t",
            "base": "h",
            "name": "h",
            "search": "?foo=bar&biz=baz",
            "query": {
              "foo": "bar",
              "biz": "baz"
            },
            "hash": "#page1"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
            "path": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz",
            "pathname": "https://user:pass@www.server.com:80/p/a/t/h",
            "dir": "https://user:pass@www.server.com:80/p/a/t",
            "base": "h",
            "name": "h",
            "search": "?foo=bar&biz=baz",
            "query": {
              "foo": "bar",
              "biz": "baz"
            },
            "hash": "#page1"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
            "protocol": "https:",
            "slashes": true,
            "auth": "user:pass",
            "host": "www.server.com:80",
            "hostname": "www.server.com",
            "port": "80",
            "path": "/p/a/t/h?foo=bar&biz=baz",
            "pathname": "/p/a/t/h",
            "root": "/",
            "dir": "/p/a/t",
            "base": "h",
            "name": "h",
            "search": "?foo=bar&biz=baz",
            "query": {
              "foo": "bar",
              "biz": "baz"
            },
            "hash": "#page1"
          }
        },
        "toUrlString": {
          "posix": "file:///https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "win32": "file:///https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "url": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
        },
        "format": {
          "posix": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "win32": "https://user:pass@www.server.com:80/p/a/t\\h?foo=bar&biz=baz#page1",
          "url": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
        },
        "normalize": {
          "posix": "https:/user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "win32": "https:\\user:pass@www.server.com:80\\p\\a\\t\\h?foo=bar&biz=baz#page1",
          "url": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
        },
        "join": {
          "posix": "https:/user:pass@www.server.com:80/p/a/t/h",
          "win32": "https:\\user:pass@www.server.com:80\\p\\a\\t\\h",
          "url": "https://user:pass@www.server.com:80/p/a/t/h"
        }
      },
      "URL with unknown protocol": {
        "p": "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
        "options": {
          "allowFileQuery": true,
          "allowFileHash": true
        },
        "isUrl": true,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
            "path": "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz",
            "pathname": "foobar://user:pass@www.server.com:80/p/a/t/h",
            "dir": "foobar://user:pass@www.server.com:80/p/a/t",
            "base": "h",
            "name": "h",
            "search": "?foo=bar&biz=baz",
            "query": {
              "foo": "bar",
              "biz": "baz"
            },
            "hash": "#page1"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
            "path": "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz",
            "pathname": "foobar://user:pass@www.server.com:80/p/a/t/h",
            "dir": "foobar://user:pass@www.server.com:80/p/a/t",
            "base": "h",
            "name": "h",
            "search": "?foo=bar&biz=baz",
            "query": {
              "foo": "bar",
              "biz": "baz"
            },
            "hash": "#page1"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
            "protocol": "foobar:",
            "slashes": true,
            "auth": "user:pass",
            "host": "www.server.com:80",
            "hostname": "www.server.com",
            "port": "80",
            "path": "/p/a/t/h?foo=bar&biz=baz",
            "pathname": "/p/a/t/h",
            "root": "/",
            "dir": "/p/a/t",
            "base": "h",
            "name": "h",
            "search": "?foo=bar&biz=baz",
            "query": {
              "foo": "bar",
              "biz": "baz"
            },
            "hash": "#page1"
          }
        },
        "toUrlString": {
          "posix": "file:///foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "win32": "file:///foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "url": "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
        },
        "format": {
          "posix": "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "win32": "foobar://user:pass@www.server.com:80/p/a/t\\h?foo=bar&biz=baz#page1",
          "url": "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
        },
        "normalize": {
          "posix": "foobar:/user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "win32": "foobar:\\user:pass@www.server.com:80\\p\\a\\t\\h?foo=bar&biz=baz#page1",
          "url": "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
        },
        "join": {
          "posix": "foobar:/user:pass@www.server.com:80/p/a/t/h",
          "win32": "foobar:\\user:pass@www.server.com:80\\p\\a\\t\\h",
          "url": "foobar://user:pass@www.server.com:80/p/a/t/h"
        }
      },
      "URL with single-letter protocol": {
        "p": "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
        "options": {
          "allowFileQuery": true,
          "allowFileHash": true
        },
        "isUrl": true,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
            "path": "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz",
            "pathname": "c://user:pass@www.server.com:80/p/a/t/h",
            "dir": "c://user:pass@www.server.com:80/p/a/t",
            "base": "h",
            "name": "h",
            "search": "?foo=bar&biz=baz",
            "query": {
              "foo": "bar",
              "biz": "baz"
            },
            "hash": "#page1"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
            "path": "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz",
            "pathname": "c://user:pass@www.server.com:80/p/a/t/h",
            "root": "c:/",
            "dir": "c://user:pass@www.server.com:80/p/a/t",
            "base": "h",
            "name": "h",
            "search": "?foo=bar&biz=baz",
            "query": {
              "foo": "bar",
              "biz": "baz"
            },
            "hash": "#page1"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
            "protocol": "c:",
            "slashes": true,
            "auth": "user:pass",
            "host": "www.server.com:80",
            "hostname": "www.server.com",
            "port": "80",
            "path": "/p/a/t/h?foo=bar&biz=baz",
            "pathname": "/p/a/t/h",
            "root": "/",
            "dir": "/p/a/t",
            "base": "h",
            "name": "h",
            "search": "?foo=bar&biz=baz",
            "query": {
              "foo": "bar",
              "biz": "baz"
            },
            "hash": "#page1"
          }
        },
        "toUrlString": {
          "posix": "file:///c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "win32": "file:///c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "url": "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
        },
        "format": {
          "posix": "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "win32": "c://user:pass@www.server.com:80/p/a/t\\h?foo=bar&biz=baz#page1",
          "url": "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
        },
        "normalize": {
          "posix": "c:/user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "win32": "c:\\user:pass@www.server.com:80\\p\\a\\t\\h?foo=bar&biz=baz#page1",
          "url": "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
        },
        "join": {
          "posix": "c:/user:pass@www.server.com:80/p/a/t/h",
          "win32": "c:\\user:pass@www.server.com:80\\p\\a\\t\\h",
          "url": "c://user:pass@www.server.com:80/p/a/t/h"
        }
      }
    },
    "extensions": {
      "directory with an extension": {
        "p": ".dir/sub.dir/some.dir/",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
            "delimiter": ":",
            "href": ".dir/sub.dir/some.dir/",
            "path": ".dir/sub.dir/some.dir/",
            "pathname": ".dir/sub.dir/some.dir/",
            "dir": ".dir/sub.dir",
            "base": "some.dir",
            "name": "some",
            "ext": ".dir"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": ".dir/sub.dir/some.dir/",
            "path": ".dir/sub.dir/some.dir/",
            "pathname": ".dir/sub.dir/some.dir/",
            "dir": ".dir/sub.dir",
            "base": "some.dir",
            "name": "some",
            "ext": ".dir"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": ".dir/sub.dir/some.dir/",
            "path": ".dir/sub.dir/some.dir/",
            "pathname": ".dir/sub.dir/some.dir/",
            "dir": ".dir/sub.dir",
            "base": "some.dir",
            "name": "some",
            "ext": ".dir"
          }
        },
        "toUrlString": {
          "posix": "file:///.dir/sub.dir/some.dir/",
          "win32": "file:///.dir/sub.dir/some.dir/",
          "url": ".dir/sub.dir/some.dir/"
        },
        "format": {
          "posix": ".dir/sub.dir/some.dir",
          "win32": ".dir/sub.dir\\some.dir",
          "url": ".dir/sub.dir/some.dir/"
        },
        "normalize": {
          "posix": ".dir/sub.dir/some.dir/",
          "win32": ".dir\\sub.dir\\some.dir\\",
          "url": ".dir/sub.dir/some.dir/"
        },
        "join": {
          "posix": ".dir/sub.dir/some.dir/",
          "win32": ".dir\\sub.dir\\some.dir\\",
          "url": ".dir/sub.dir/some.dir/"
        }
      },
      "directory with multiple extensions": {
        "p": "d:\\.dir\\sub.dir\\di.rec.tory\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "d:\\.dir\\sub.dir\\di.rec.tory\\",
            "path": "d:\\.dir\\sub.dir\\di.rec.tory\\",
            "pathname": "d:\\.dir\\sub.dir\\di.rec.tory\\",
            "base": "d:\\.dir\\sub.dir\\di.rec.tory\\",
            "name": "d:\\.dir\\sub.dir\\di.rec",
            "ext": ".tory\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "d:\\.dir\\sub.dir\\di.rec.tory\\",
            "path": "d:\\.dir\\sub.dir\\di.rec.tory\\",
            "pathname": "d:\\.dir\\sub.dir\\di.rec.tory\\",
            "root": "d:\\",
            "dir": "d:\\.dir\\sub.dir",
            "base": "di.rec.tory",
            "name": "di.rec",
            "ext": ".tory"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "d:/.dir/sub.dir/di.rec.tory/",
            "protocol": "d:",
            "path": "/.dir/sub.dir/di.rec.tory/",
            "pathname": "/.dir/sub.dir/di.rec.tory/",
            "root": "/",
            "dir": "/.dir/sub.dir",
            "base": "di.rec.tory",
            "name": "di.rec",
            "ext": ".tory"
          }
        },
        "toUrlString": {
          "posix": "file:///d:%5C.dir%5Csub.dir%5Cdi.rec.tory%5C",
          "win32": "file:///d:/.dir/sub.dir/di.rec.tory/",
          "url": "d:/.dir/sub.dir/di.rec.tory/"
        },
        "format": {
          "posix": "d:\\.dir\\sub.dir\\di.rec.tory\\",
          "win32": "d:\\.dir\\sub.dir\\di.rec.tory",
          "url": "d:/.dir/sub.dir/di.rec.tory/"
        },
        "normalize": {
          "posix": "d:\\.dir\\sub.dir\\di.rec.tory\\",
          "win32": "d:\\.dir\\sub.dir\\di.rec.tory\\",
          "url": "d:/.dir/sub.dir/di.rec.tory/"
        },
        "join": {
          "posix": "d:\\.dir\\sub.dir\\di.rec.tory\\",
          "win32": "d:\\.dir\\sub.dir\\di.rec.tory\\",
          "url": "d:/.dir/sub.dir/di.rec.tory/"
        }
      },
      "hidden directory": {
        "p": ".dir\\sub.dir\\.hidden\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": ".dir\\sub.dir\\.hidden\\",
            "path": ".dir\\sub.dir\\.hidden\\",
            "pathname": ".dir\\sub.dir\\.hidden\\",
            "base": ".dir\\sub.dir\\.hidden\\",
            "name": ".dir\\sub.dir\\",
            "ext": ".hidden\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": ".dir\\sub.dir\\.hidden\\",
            "path": ".dir\\sub.dir\\.hidden\\",
            "pathname": ".dir\\sub.dir\\.hidden\\",
            "dir": ".dir\\sub.dir",
            "base": ".hidden",
            "name": ".hidden"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": ".dir/sub.dir/.hidden/",
            "path": ".dir/sub.dir/.hidden/",
            "pathname": ".dir/sub.dir/.hidden/",
            "dir": ".dir/sub.dir",
            "base": ".hidden",
            "name": ".hidden"
          }
        },
        "toUrlString": {
          "posix": "file:///.dir%5Csub.dir%5C.hidden%5C",
          "win32": "file:///.dir/sub.dir/.hidden/",
          "url": ".dir/sub.dir/.hidden/"
        },
        "format": {
          "posix": ".dir\\sub.dir\\.hidden\\",
          "win32": ".dir\\sub.dir\\.hidden",
          "url": ".dir/sub.dir/.hidden/"
        },
        "normalize": {
          "posix": ".dir\\sub.dir\\.hidden\\",
          "win32": ".dir\\sub.dir\\.hidden\\",
          "url": ".dir/sub.dir/.hidden/"
        },
        "join": {
          "posix": ".dir\\sub.dir\\.hidden\\",
          "win32": ".dir\\sub.dir\\.hidden\\",
          "url": ".dir/sub.dir/.hidden/"
        }
      },
      "hidden directory with an extension": {
        "p": ".dir\\sub.dir/.hid.den\\",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
            "delimiter": ":",
            "href": ".dir\\sub.dir/.hid.den\\",
            "path": ".dir\\sub.dir/.hid.den\\",
            "pathname": ".dir\\sub.dir/.hid.den\\",
            "dir": ".dir\\sub.dir",
            "base": ".hid.den\\",
            "name": ".hid",
            "ext": ".den\\"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": ".dir\\sub.dir/.hid.den\\",
            "path": ".dir\\sub.dir/.hid.den\\",
            "pathname": ".dir\\sub.dir/.hid.den\\",
            "dir": ".dir\\sub.dir",
            "base": ".hid.den",
            "name": ".hid",
            "ext": ".den"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": ".dir/sub.dir/.hid.den/",
            "path": ".dir/sub.dir/.hid.den/",
            "pathname": ".dir/sub.dir/.hid.den/",
            "dir": ".dir/sub.dir",
            "base": ".hid.den",
            "name": ".hid",
            "ext": ".den"
          }
        },
        "toUrlString": {
          "posix": "file:///.dir%5Csub.dir/.hid.den%5C",
          "win32": "file:///.dir/sub.dir/.hid.den/",
          "url": ".dir/sub.dir/.hid.den/"
        },
        "format": {
          "posix": ".dir\\sub.dir/.hid.den\\",
          "win32": ".dir\\sub.dir\\.hid.den",
          "url": ".dir/sub.dir/.hid.den/"
        },
        "normalize": {
          "posix": ".dir\\sub.dir/.hid.den\\",
          "win32": ".dir\\sub.dir\\.hid.den\\",
          "url": ".dir/sub.dir/.hid.den/"
        },
        "join": {
          "posix": ".dir\\sub.dir/.hid.den\\",
          "win32": ".dir\\sub.dir\\.hid.den\\",
          "url": ".dir/sub.dir/.hid.den/"
        }
      },
      "file with an extension": {
        "p": ".dir/sub.dir/somefile.txt",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
            "delimiter": ":",
            "href": ".dir/sub.dir/somefile.txt",
            "path": ".dir/sub.dir/somefile.txt",
            "pathname": ".dir/sub.dir/somefile.txt",
            "dir": ".dir/sub.dir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": ".dir/sub.dir/somefile.txt",
            "path": ".dir/sub.dir/somefile.txt",
            "pathname": ".dir/sub.dir/somefile.txt",
            "dir": ".dir/sub.dir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": ".dir/sub.dir/somefile.txt",
            "path": ".dir/sub.dir/somefile.txt",
            "pathname": ".dir/sub.dir/somefile.txt",
            "dir": ".dir/sub.dir",
            "base": "somefile.txt",
            "name": "somefile",
            "ext": ".txt"
          }
        },
        "toUrlString": {
          "posix": "file:///.dir/sub.dir/somefile.txt",
          "win32": "file:///.dir/sub.dir/somefile.txt",
          "url": ".dir/sub.dir/somefile.txt"
        },
        "format": {
          "posix": ".dir/sub.dir/somefile.txt",
          "win32": ".dir/sub.dir\\somefile.txt",
          "url": ".dir/sub.dir/somefile.txt"
        },
        "normalize": {
          "posix": ".dir/sub.dir/somefile.txt",
          "win32": ".dir\\sub.dir\\somefile.txt",
          "url": ".dir/sub.dir/somefile.txt"
        },
        "join": {
          "posix": ".dir/sub.dir/somefile.txt",
          "win32": ".dir\\sub.dir\\somefile.txt",
          "url": ".dir/sub.dir/somefile.txt"
        }
      },
      "file with multiple extensions": {
        "p": "d:\\.dir\\sub.dir\\somefile.min.js",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "d:\\.dir\\sub.dir\\somefile.min.js",
            "path": "d:\\.dir\\sub.dir\\somefile.min.js",
            "pathname": "d:\\.dir\\sub.dir\\somefile.min.js",
            "base": "d:\\.dir\\sub.dir\\somefile.min.js",
            "name": "d:\\.dir\\sub.dir\\somefile.min",
            "ext": ".js"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "d:\\.dir\\sub.dir\\somefile.min.js",
            "path": "d:\\.dir\\sub.dir\\somefile.min.js",
            "pathname": "d:\\.dir\\sub.dir\\somefile.min.js",
            "root": "d:\\",
            "dir": "d:\\.dir\\sub.dir",
            "base": "somefile.min.js",
            "name": "somefile.min",
            "ext": ".js"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "d:/.dir/sub.dir/somefile.min.js",
            "protocol": "d:",
            "path": "/.dir/sub.dir/somefile.min.js",
            "pathname": "/.dir/sub.dir/somefile.min.js",
            "root": "/",
            "dir": "/.dir/sub.dir",
            "base": "somefile.min.js",
            "name": "somefile.min",
            "ext": ".js"
          }
        },
        "toUrlString": {
          "posix": "file:///d:%5C.dir%5Csub.dir%5Csomefile.min.js",
          "win32": "file:///d:/.dir/sub.dir/somefile.min.js",
          "url": "d:/.dir/sub.dir/somefile.min.js"
        },
        "format": {
          "posix": "d:\\.dir\\sub.dir\\somefile.min.js",
          "win32": "d:\\.dir\\sub.dir\\somefile.min.js",
          "url": "d:/.dir/sub.dir/somefile.min.js"
        },
        "normalize": {
          "posix": "d:\\.dir\\sub.dir\\somefile.min.js",
          "win32": "d:\\.dir\\sub.dir\\somefile.min.js",
          "url": "d:/.dir/sub.dir/somefile.min.js"
        },
        "join": {
          "posix": "d:\\.dir\\sub.dir\\somefile.min.js",
          "win32": "d:\\.dir\\sub.dir\\somefile.min.js",
          "url": "d:/.dir/sub.dir/somefile.min.js"
        }
      },
      "hidden file": {
        "p": ".dir\\sub.dir\\.hidden",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": ".dir\\sub.dir\\.hidden",
            "path": ".dir\\sub.dir\\.hidden",
            "pathname": ".dir\\sub.dir\\.hidden",
            "base": ".dir\\sub.dir\\.hidden",
            "name": ".dir\\sub.dir\\",
            "ext": ".hidden"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": ".dir\\sub.dir\\.hidden",
            "path": ".dir\\sub.dir\\.hidden",
            "pathname": ".dir\\sub.dir\\.hidden",
            "dir": ".dir\\sub.dir",
            "base": ".hidden",
            "name": ".hidden"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": ".dir/sub.dir/.hidden",
            "path": ".dir/sub.dir/.hidden",
            "pathname": ".dir/sub.dir/.hidden",
            "dir": ".dir/sub.dir",
            "base": ".hidden",
            "name": ".hidden"
          }
        },
        "toUrlString": {
          "posix": "file:///.dir%5Csub.dir%5C.hidden",
          "win32": "file:///.dir/sub.dir/.hidden",
          "url": ".dir/sub.dir/.hidden"
        },
        "format": {
          "posix": ".dir\\sub.dir\\.hidden",
          "win32": ".dir\\sub.dir\\.hidden",
          "url": ".dir/sub.dir/.hidden"
        },
        "normalize": {
          "posix": ".dir\\sub.dir\\.hidden",
          "win32": ".dir\\sub.dir\\.hidden",
          "url": ".dir/sub.dir/.hidden"
        },
        "join": {
          "posix": ".dir\\sub.dir\\.hidden",
          "win32": ".dir\\sub.dir\\.hidden",
          "url": ".dir/sub.dir/.hidden"
        }
      },
      "hidden file with an extension": {
        "p": ".dir\\sub.dir/.hidden.md",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
            "delimiter": ":",
            "href": ".dir\\sub.dir/.hidden.md",
            "path": ".dir\\sub.dir/.hidden.md",
            "pathname": ".dir\\sub.dir/.hidden.md",
            "dir": ".dir\\sub.dir",
            "base": ".hidden.md",
            "name": ".hidden",
            "ext": ".md"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": false,
            "sep": "\\",
            "delimiter": ";",
            "href": ".dir\\sub.dir/.hidden.md",
            "path": ".dir\\sub.dir/.hidden.md",
            "pathname": ".dir\\sub.dir/.hidden.md",
            "dir": ".dir\\sub.dir",
            "base": ".hidden.md",
            "name": ".hidden",
            "ext": ".md"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": false,
            "sep": "/",
            "href": ".dir/sub.dir/.hidden.md",
            "path": ".dir/sub.dir/.hidden.md",
            "pathname": ".dir/sub.dir/.hidden.md",
            "dir": ".dir/sub.dir",
            "base": ".hidden.md",
            "name": ".hidden",
            "ext": ".md"
          }
        },
        "toUrlString": {
          "posix": "file:///.dir%5Csub.dir/.hidden.md",
          "win32": "file:///.dir/sub.dir/.hidden.md",
          "url": ".dir/sub.dir/.hidden.md"
        },
        "format": {
          "posix": ".dir\\sub.dir/.hidden.md",
          "win32": ".dir\\sub.dir\\.hidden.md",
          "url": ".dir/sub.dir/.hidden.md"
        },
        "normalize": {
          "posix": ".dir\\sub.dir/.hidden.md",
          "win32": ".dir\\sub.dir\\.hidden.md",
          "url": ".dir/sub.dir/.hidden.md"
        },
        "join": {
          "posix": ".dir\\sub.dir/.hidden.md",
          "win32": ".dir\\sub.dir\\.hidden.md",
          "url": ".dir/sub.dir/.hidden.md"
        }
      }
    },
    "queries and hashes": {
      "path containing # and ? characters": {
        "p": "/path/?to=a/#file\\with#/slashes",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/path/?to=a/#file\\with#/slashes",
            "path": "/path/?to=a/#file\\with#/slashes",
            "pathname": "/path/?to=a/#file\\with#/slashes",
            "root": "/",
            "dir": "/path/?to=a/#file\\with#",
            "base": "slashes",
            "name": "slashes"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/path/?to=a/#file\\with#/slashes",
            "path": "/path/?to=a/#file\\with#/slashes",
            "pathname": "/path/?to=a/#file\\with#/slashes",
            "root": "/",
            "dir": "/path/?to=a/#file\\with#",
            "base": "slashes",
            "name": "slashes"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/path/?to=a/#file%5Cwith#/slashes",
            "path": "/path/?to=a/",
            "pathname": "/path/",
            "root": "/",
            "dir": "/",
            "base": "path",
            "name": "path",
            "search": "?to=a/",
            "query": {
              "to": "a/"
            },
            "hash": "#file%5Cwith#/slashes"
          }
        },
        "toUrlString": {
          "posix": "file:///path/%3Fto=a/%23file%5Cwith%23/slashes",
          "win32": "file:///path/%3Fto=a/%23file/with%23/slashes",
          "url": "/path/?to=a/#file%5Cwith#/slashes"
        },
        "format": {
          "posix": "/path/?to=a/#file\\with#/slashes",
          "win32": "/path/?to=a/#file\\with#\\slashes",
          "url": "/path/?to=a/#file%5Cwith#/slashes"
        },
        "normalize": {
          "posix": "/path/?to=a/#file\\with#/slashes",
          "win32": "\\path\\?to=a\\#file\\with#\\slashes",
          "url": "/path/?to=a/#file%5Cwith#/slashes"
        },
        "join": {
          "posix": "/path/?to=a/#file\\with#/slashes",
          "win32": "\\path\\?to=a\\#file\\with#\\slashes",
          "url": "/path/"
        }
      },
      "path with a query": {
        "p": "path/to/a/file.html?foo=\\bar&biz=/baz",
        "options": {
          "allowFileQuery": true
        },
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "path/to/a/file.html?foo=\\bar&biz=/baz",
            "path": "path/to/a/file.html?foo=\\bar&biz=/baz",
            "pathname": "path/to/a/file.html",
            "dir": "path/to/a",
            "base": "file.html",
            "name": "file",
            "ext": ".html",
            "search": "?foo=\\bar&biz=/baz",
            "query": {
              "foo": "\\bar",
              "biz": "/baz"
            }
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "path/to/a/file.html?foo=\\bar&biz=/baz",
            "path": "path/to/a/file.html?foo=\\bar&biz=/baz",
            "pathname": "path/to/a/file.html",
            "dir": "path/to/a",
            "base": "file.html",
            "name": "file",
            "ext": ".html",
            "search": "?foo=\\bar&biz=/baz",
            "query": {
              "foo": "\\bar",
              "biz": "/baz"
            }
          },
          "url": {
            "isUrl": true,
            "sep": "/",
            "href": "path/to/a/file.html?foo=/bar&biz=/baz",
            "path": "path/to/a/file.html?foo=/bar&biz=/baz",
            "pathname": "path/to/a/file.html",
            "dir": "path/to/a",
            "base": "file.html",
            "name": "file",
            "ext": ".html",
            "search": "?foo=/bar&biz=/baz",
            "query": {
              "foo": "/bar",
              "biz": "/baz"
            }
          }
        },
        "toUrlString": {
          "posix": "file:///path/to/a/file.html?foo=%5Cbar&biz=/baz",
          "win32": "file:///path/to/a/file.html?foo=%5Cbar&biz=/baz",
          "url": "path/to/a/file.html?foo=/bar&biz=/baz"
        },
        "format": {
          "posix": "path/to/a/file.html?foo=\\bar&biz=/baz",
          "win32": "path/to/a\\file.html?foo=\\bar&biz=/baz",
          "url": "path/to/a/file.html?foo=/bar&biz=/baz"
        },
        "normalize": {
          "posix": "path/to/a/file.html?foo=\\bar&biz=/baz",
          "win32": "path\\to\\a\\file.html?foo=\\bar&biz=/baz",
          "url": "path/to/a/file.html?foo=/bar&biz=/baz"
        },
        "join": {
          "posix": "path/to/a/file.html",
          "win32": "path\\to\\a\\file.html",
          "url": "path/to/a/file.html"
        }
      },
      "path with a hash": {
        "p": "D:\\path\\to/a\\direc.tory/#page1\\?not=a/&query",
        "options": {
          "allowFileHash": true
        },
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "D:\\path\\to/a\\direc.tory/#page1\\?not=a/&query",
            "path": "D:\\path\\to/a\\direc.tory/",
            "pathname": "D:\\path\\to/a\\direc.tory/",
            "dir": "D:\\path\\to",
            "base": "a\\direc.tory",
            "name": "a\\direc",
            "ext": ".tory",
            "hash": "#page1\\?not=a/&query"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "D:\\path\\to/a\\direc.tory/#page1\\?not=a/&query",
            "path": "D:\\path\\to/a\\direc.tory/",
            "pathname": "D:\\path\\to/a\\direc.tory/",
            "root": "D:\\",
            "dir": "D:\\path\\to/a",
            "base": "direc.tory",
            "name": "direc",
            "ext": ".tory",
            "hash": "#page1\\?not=a/&query"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "d:/path/to/a/direc.tory/#page1%5C?not=a/&query",
            "protocol": "d:",
            "path": "/path/to/a/direc.tory/",
            "pathname": "/path/to/a/direc.tory/",
            "root": "/",
            "dir": "/path/to/a",
            "base": "direc.tory",
            "name": "direc",
            "ext": ".tory",
            "hash": "#page1%5C?not=a/&query"
          }
        },
        "toUrlString": {
          "posix": "file:///D:%5Cpath%5Cto/a%5Cdirec.tory/#page1%5C?not=a/&query",
          "win32": "file:///D:/path/to/a/direc.tory/#page1%5C?not=a/&query",
          "url": "d:/path/to/a/direc.tory/#page1%5C?not=a/&query"
        },
        "format": {
          "posix": "D:\\path\\to/a\\direc.tory#page1\\?not=a/&query",
          "win32": "D:\\path\\to/a\\direc.tory#page1\\?not=a/&query",
          "url": "d:/path/to/a/direc.tory/#page1%5C?not=a/&query"
        },
        "normalize": {
          "posix": "D:\\path\\to/a\\direc.tory/#page1\\?not=a/&query",
          "win32": "D:\\path\\to\\a\\direc.tory\\#page1\\?not=a/&query",
          "url": "d:/path/to/a/direc.tory/#page1%5C?not=a/&query"
        },
        "join": {
          "posix": "D:\\path\\to/a\\direc.tory/",
          "win32": "D:\\path\\to\\a\\direc.tory\\",
          "url": "d:/path/to/a/direc.tory/"
        }
      },
      "path with a query and a hash": {
        "p": "\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "options": {
          "allowFileQuery": true,
          "allowFileHash": true
        },
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":",
            "href": "\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz#page1\\?not=a/&query",
            "path": "\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz",
            "pathname": "\\\\server/path\\to/a\\direc.tory/",
            "dir": "\\\\server/path\\to",
            "base": "a\\direc.tory",
            "name": "a\\direc",
            "ext": ".tory",
            "search": "?foo=\\bar&biz=/baz",
            "query": {
              "foo": "\\bar",
              "biz": "/baz"
            },
            "hash": "#page1\\?not=a/&query"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isUnc": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz#page1\\?not=a/&query",
            "path": "\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz",
            "pathname": "\\\\server/path\\to/a\\direc.tory/",
            "root": "\\\\server/path\\",
            "dir": "\\\\server/path\\to/a",
            "base": "direc.tory",
            "name": "direc",
            "ext": ".tory",
            "search": "?foo=\\bar&biz=/baz",
            "query": {
              "foo": "\\bar",
              "biz": "/baz"
            },
            "hash": "#page1\\?not=a/&query"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "//server/path/to/a/direc.tory/?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
            "path": "//server/path/to/a/direc.tory/?foo=%5Cbar&biz=/baz",
            "pathname": "//server/path/to/a/direc.tory/",
            "root": "/",
            "dir": "//server/path/to/a",
            "base": "direc.tory",
            "name": "direc",
            "ext": ".tory",
            "search": "?foo=%5Cbar&biz=/baz",
            "query": {
              "foo": "\\bar",
              "biz": "/baz"
            },
            "hash": "#page1%5C?not=a/&query"
          }
        },
        "toUrlString": {
          "posix": "file:///%5C%5Cserver/path%5Cto/a%5Cdirec.tory/?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
          "win32": "file://server/path/to/a/direc.tory/?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
          "url": "//server/path/to/a/direc.tory/?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
        },
        "format": {
          "posix": "\\\\server/path\\to/a\\direc.tory?foo=\\bar&biz=/baz#page1\\?not=a/&query",
          "win32": "\\\\server/path\\to/a\\direc.tory?foo=\\bar&biz=/baz#page1\\?not=a/&query",
          "url": "//server/path/to/a/direc.tory/?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
        },
        "normalize": {
          "posix": "\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz#page1\\?not=a/&query",
          "win32": "\\\\server\\path\\to\\a\\direc.tory\\?foo=\\bar&biz=/baz#page1\\?not=a/&query",
          "url": "/server/path/to/a/direc.tory/?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
        },
        "join": {
          "posix": "\\\\server/path\\to/a\\direc.tory/",
          "win32": "\\\\server\\path\\to\\a\\direc.tory\\",
          "url": "/server/path/to/a/direc.tory/"
        }
      }
    },
    "special cases": {
      "empty string": {
        "p": "",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "delimiter": ":"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\",
            "delimiter": ";"
          },
          "url": {
            "isUrl": true,
            "sep": "/"
          }
        },
        "toUrlString": {
          "posix": "file://",
          "win32": "file://",
          "url": ""
        },
        "format": {
          "posix": "",
          "win32": "",
          "url": ""
        },
        "normalize": {
          "posix": ".",
          "win32": ".",
          "url": "."
        },
        "join": {
          "posix": ".",
          "win32": ".",
          "url": "."
        }
      },
      "path with non-encoded special characters": {
        "p": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
            "path": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
            "pathname": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
            "root": "/",
            "dir": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
            "base": "__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
            "name": "__({[ ! % , ",
            "ext": ". > < ? & $ # @ ` ~ ,)}]__"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
            "path": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
            "pathname": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
            "root": "/",
            "dir": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
            "base": "__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
            "name": "__({[ ! % , ",
            "ext": ". > < ? & $ # @ ` ~ ,)}]__"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
            "path": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20",
            "pathname": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20",
            "root": "/",
            "dir": "/",
            "base": "_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20",
            "name": "_-9a.t+8r_(%7B[%20!%20%%20,%20",
            "ext": ".%20%3E%20%3C%20",
            "search": "?%20&%20$%20",
            "query": {
              " ": "",
              " $ ": ""
            },
            "hash": "#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__"
          }
        },
        "toUrlString": {
          "posix": "file:///_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20%3F%20&%20$%20%23%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20%3F%20&%20$%20%23%20@%20%60%20~%20,)%7D]__",
          "win32": "file:///_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20%3F%20&%20$%20%23%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20%3F%20&%20$%20%23%20@%20%60%20~%20,)%7D]__",
          "url": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__"
        },
        "format": {
          "posix": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
          "win32": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__\\__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
          "url": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__"
        },
        "normalize": {
          "posix": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
          "win32": "\\_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__\\__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
          "url": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__"
        },
        "join": {
          "posix": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
          "win32": "\\_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__\\__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
          "url": "/_-9a.t+8r_({[ ! % , . > < "
        }
      },
      "path with encoded special characters": {
        "p": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
        "isUrl": false,
        "parse": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
            "delimiter": ":",
            "href": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
            "path": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
            "pathname": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
            "root": "/",
            "dir": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
            "base": "__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
            "name": "__(%7B[%20!%20%%20,%20",
            "ext": ".%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
            "delimiter": ";",
            "href": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
            "path": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
            "pathname": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
            "root": "/",
            "dir": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
            "base": "__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
            "name": "__(%7B[%20!%20%%20,%20",
            "ext": ".%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__"
          },
          "url": {
            "isUrl": true,
            "isAbsolute": true,
            "sep": "/",
            "href": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
            "path": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20",
            "pathname": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20",
            "root": "/",
            "dir": "/",
            "base": "_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20",
            "name": "_-9a.t+8r_(%7B[%20!%20%%20,%20",
            "ext": ".%20%3E%20%3C%20",
            "search": "?%20&%20$%20",
            "query": {
              " ": "",
              " $ ": ""
            },
            "hash": "#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__"
          }
        },
        "toUrlString": {
          "posix": "file:///_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20%3F%20&%20$%20%23%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20%3F%20&%20$%20%23%20@%20%60%20~%20,)%7D]__",
          "win32": "file:///_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20%3F%20&%20$%20%23%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20%3F%20&%20$%20%23%20@%20%60%20~%20,)%7D]__",
          "url": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__"
        },
        "format": {
          "posix": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
          "win32": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__\\__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
          "url": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__"
        },
        "normalize": {
          "posix": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
          "win32": "\\_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__\\__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
          "url": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__"
        },
        "join": {
          "posix": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
          "win32": "\\_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__\\__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
          "url": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20"
        }
      }
    }
  };

  //global.TestPaths = {};
  global.TestPaths.objects = {
    "OmniPath.Posix": {
      "p": new OmniPath.Posix('dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true}),
      "isUrl": false,
      "parse": {
        "posix": {
          "isFS": true,
          "isPosix": true,
          "sep": "/",
          "delimiter": ":",
          "href": "dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
          "path": "dir/.subdir/file.min.js?foo=\\bar&biz=/baz",
          "pathname": "dir/.subdir/file.min.js",
          "dir": "dir/.subdir",
          "base": "file.min.js",
          "name": "file.min",
          "ext": ".js",
          "search": "?foo=\\bar&biz=/baz",
          "query": {
            "foo": "\\bar",
            "biz": "/baz"
          },
          "hash": "#page1\\?not=a/&query"
        },
        "win32": {
          "isFS": true,
          "isWindows": true,
          "sep": "\\",
          "delimiter": ";",
          "href": "dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
          "path": "dir/.subdir/file.min.js?foo=\\bar&biz=/baz",
          "pathname": "dir/.subdir/file.min.js",
          "dir": "dir/.subdir",
          "base": "file.min.js",
          "name": "file.min",
          "ext": ".js",
          "search": "?foo=\\bar&biz=/baz",
          "query": {
            "foo": "\\bar",
            "biz": "/baz"
          },
          "hash": "#page1\\?not=a/&query"
        },
        "url": {
          "isUrl": true,
          "sep": "/",
          "href": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
          "path": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz",
          "pathname": "dir/.subdir/file.min.js",
          "dir": "dir/.subdir",
          "base": "file.min.js",
          "name": "file.min",
          "ext": ".js",
          "search": "?foo=%5Cbar&biz=/baz",
          "query": {
            "foo": "\\bar",
            "biz": "/baz"
          },
          "hash": "#page1%5C?not=a/&query"
        }
      },
      "toUrlString": {
        "posix": "file:///dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "win32": "file:///dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "url": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      },
      "format": {
        "posix": "dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "win32": "dir/.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "url": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      },
      "normalize": {
        "posix": "dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "win32": "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "url": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      },
      "join": {
        "posix": "dir/.subdir/file.min.js",
        "win32": "dir\\.subdir\\file.min.js",
        "url": "dir/.subdir/file.min.js"
      }
    },
    "OmniPath.Windows": {
      "p": new OmniPath.Windows('dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true}),
      "isUrl": false,
      "parse": {
        "posix": {
          "isFS": true,
          "isPosix": true,
          "sep": "/",
          "delimiter": ":",
          "href": "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
          "path": "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz",
          "pathname": "dir\\.subdir\\file.min.js",
          "base": "dir\\.subdir\\file.min.js",
          "name": "dir\\.subdir\\file.min",
          "ext": ".js",
          "search": "?foo=\\bar&biz=/baz",
          "query": {
            "foo": "\\bar",
            "biz": "/baz"
          },
          "hash": "#page1\\?not=a/&query"
        },
        "win32": {
          "isFS": true,
          "isWindows": true,
          "sep": "\\",
          "delimiter": ";",
          "href": "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
          "path": "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz",
          "pathname": "dir\\.subdir\\file.min.js",
          "dir": "dir\\.subdir",
          "base": "file.min.js",
          "name": "file.min",
          "ext": ".js",
          "search": "?foo=\\bar&biz=/baz",
          "query": {
            "foo": "\\bar",
            "biz": "/baz"
          },
          "hash": "#page1\\?not=a/&query"
        },
        "url": {
          "isUrl": true,
          "sep": "/",
          "href": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
          "path": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz",
          "pathname": "dir/.subdir/file.min.js",
          "dir": "dir/.subdir",
          "base": "file.min.js",
          "name": "file.min",
          "ext": ".js",
          "search": "?foo=%5Cbar&biz=/baz",
          "query": {
            "foo": "\\bar",
            "biz": "/baz"
          },
          "hash": "#page1%5C?not=a/&query"
        }
      },
      "toUrlString": {
        "posix": "file:///dir%5C.subdir%5Cfile.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "win32": "file:///dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "url": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      },
      "format": {
        "posix": "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "win32": "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "url": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      },
      "normalize": {
        "posix": "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "win32": "dir\\.subdir\\file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "url": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      },
      "join": {
        "posix": "dir\\.subdir\\file.min.js",
        "win32": "dir\\.subdir\\file.min.js",
        "url": "dir/.subdir/file.min.js"
      }
    },
    "OmniPath.Url": {
      "p": new OmniPath.Url('dir/.subdir/file.min.js?foo=\\bar&biz=/baz#page1\\?not=a/&query', {allowFileQuery: true, allowFileHash: true}),
      "isUrl": true,
      "parse": {
        "posix": {
          "isFS": true,
          "isPosix": true,
          "sep": "/",
          "delimiter": ":",
          "href": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
          "path": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz",
          "pathname": "dir/.subdir/file.min.js",
          "dir": "dir/.subdir",
          "base": "file.min.js",
          "name": "file.min",
          "ext": ".js",
          "search": "?foo=%5Cbar&biz=/baz",
          "query": {
            "foo": "\\bar",
            "biz": "/baz"
          },
          "hash": "#page1%5C?not=a/&query"
        },
        "win32": {
          "isFS": true,
          "isWindows": true,
          "sep": "\\",
          "delimiter": ";",
          "href": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
          "path": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz",
          "pathname": "dir/.subdir/file.min.js",
          "dir": "dir/.subdir",
          "base": "file.min.js",
          "name": "file.min",
          "ext": ".js",
          "search": "?foo=%5Cbar&biz=/baz",
          "query": {
            "foo": "\\bar",
            "biz": "/baz"
          },
          "hash": "#page1%5C?not=a/&query"
        },
        "url": {
          "isUrl": true,
          "sep": "/",
          "href": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
          "path": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz",
          "pathname": "dir/.subdir/file.min.js",
          "dir": "dir/.subdir",
          "base": "file.min.js",
          "name": "file.min",
          "ext": ".js",
          "search": "?foo=%5Cbar&biz=/baz",
          "query": {
            "foo": "\\bar",
            "biz": "/baz"
          },
          "hash": "#page1%5C?not=a/&query"
        }
      },
      "toUrlString": {
        "posix": "file:///dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "win32": "file:///dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "url": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      },
      "format": {
        "posix": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "win32": "dir/.subdir\\file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "url": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      },
      "normalize": {
        "posix": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "win32": "dir\\.subdir\\file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query",
        "url": "dir/.subdir/file.min.js?foo=%5Cbar&biz=/baz#page1%5C?not=a/&query"
      },
      "join": {
        "posix": "dir/.subdir/file.min.js",
        "win32": "dir\\.subdir\\file.min.js",
        "url": "dir/.subdir/file.min.js"
      }
    },
    "URL object": {
      "p": (function() {
        var u = "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1";
        return userAgent.isNode ? url.parse(u, true) : u;
      })(),
      "options": {
        "allowFileQuery": true,
        "allowFileHash": true
      },
      "isUrl": true,
      "parse": {
        "posix": {
          "isFS": true,
          "isPosix": true,
          "sep": "/",
          "delimiter": ":",
          "href": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "path": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz",
          "pathname": "https://user:pass@www.server.com:80/p/a/t/h",
          "dir": "https://user:pass@www.server.com:80/p/a/t",
          "base": "h",
          "name": "h",
          "search": "?foo=bar&biz=baz",
          "query": {
            "foo": "bar",
            "biz": "baz"
          },
          "hash": "#page1"
        },
        "win32": {
          "isFS": true,
          "isWindows": true,
          "sep": "\\",
          "delimiter": ";",
          "href": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "path": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz",
          "pathname": "https://user:pass@www.server.com:80/p/a/t/h",
          "dir": "https://user:pass@www.server.com:80/p/a/t",
          "base": "h",
          "name": "h",
          "search": "?foo=bar&biz=baz",
          "query": {
            "foo": "bar",
            "biz": "baz"
          },
          "hash": "#page1"
        },
        "url": {
          "isUrl": true,
          "isAbsolute": true,
          "sep": "/",
          "href": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
          "protocol": "https:",
          "slashes": true,
          "auth": "user:pass",
          "host": "www.server.com:80",
          "hostname": "www.server.com",
          "port": "80",
          "path": "/p/a/t/h?foo=bar&biz=baz",
          "pathname": "/p/a/t/h",
          "root": "/",
          "dir": "/p/a/t",
          "base": "h",
          "name": "h",
          "search": "?foo=bar&biz=baz",
          "query": {
            "foo": "bar",
            "biz": "baz"
          },
          "hash": "#page1"
        }
      },
      "toUrlString": {
        "posix": "file:///https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
        "win32": "file:///https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
        "url": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
      },
      "format": {
        "posix": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
        "win32": "https://user:pass@www.server.com:80/p/a/t\\h?foo=bar&biz=baz#page1",
        "url": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
      },
      "normalize": {
        "posix": "https:/user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
        "win32": "https:\\user:pass@www.server.com:80\\p\\a\\t\\h?foo=bar&biz=baz#page1",
        "url": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1"
      },
      "join": {
        "posix": "https:/user:pass@www.server.com:80/p/a/t/h",
        "win32": "https:\\user:pass@www.server.com:80\\p\\a\\t\\h",
        "url": "https://user:pass@www.server.com:80/p/a/t/h"
      }
    }
  };

  var defaults = {
    isUrl: false,
    isFS: false,
    isPosix: false,
    isWindows: false,
    isUnc: false,
    isAbsolute: false,
    sep: '',
    delimiter: '',
    href: '',
    protocol: '',
    slashes: false,
    auth: '',
    host: '',
    hostname: '',
    port: '',
    path: '',
    pathname: '',
    root: '',
    dir: '',
    base: '',
    name: '',
    ext: '',
    search: '',
    query: {},
    hash: ''
  };

  // Populate any missing properties of parsed objects with their default values
  Object.keys(TestPaths).forEach(function(suite) {
    Object.keys(TestPaths[suite]).forEach(function(test) {
      var testObj = TestPaths[suite][test];
      Object.keys(testObj.parse).forEach(function(parsed) {
        var obj = testObj.parse[parsed];
        Object.keys(defaults).forEach(function(key) {
          if (obj[key] === undefined) {
            obj[key] = defaults[key];
          }
        })
      });
    });
  });

  //var x = JSON.stringify(TestPaths, null, 2);
  //console.log(x);
  //process.exit();

})();
