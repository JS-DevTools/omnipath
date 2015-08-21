(function() {
  // jscs:disable
  'use strict';

  global.TestData = {
    "root paths": {
      "root (forward slash)": {
        "p": "/",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
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
        }
      },
      "root (backslash)": {
        "p": "\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "root (Windows)": {
        "p": "C:\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "root (Windows) (without a slash)": {
        "p": "C:",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "root (UNC)": {
        "p": "\\\\server",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
            "href": "\\\\server",
            "path": "\\\\server",
            "pathname": "\\\\server",
            "base": "\\\\server",
            "name": "\\\\server"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isUnc": true,
            "isAbsolute": true,
            "sep": "\\",
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
        }
      },
      "root (URL)": {
        "p": "http://host.name",
        "isUrl": true,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "root directory (forward slash)": {
        "p": "/somedir/",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
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
        }
      },
      "root directory (backslash)": {
        "p": "\\somedir\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "root directory (Windows)": {
        "p": "C:\\somedir\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "root directory (UNC)": {
        "p": "\\\\server\\dir\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "root directory (URL)": {
        "p": "http://host.name/somedir/",
        "isUrl": true,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "root file (forward slash)": {
        "p": "/somefile.txt",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
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
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
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
        }
      },
      "root file (backslash)": {
        "p": "\\somefile.html",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "root file (Windows)": {
        "p": "C:\\somefile.md",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "root file (UNC)": {
        "p": "\\\\server\\somefile.doc",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "root file (URL)": {
        "p": "http://host.name/somefile.html",
        "isUrl": true,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      }
    },
    "absolute paths": {
      "absolute directory (forward slashes)": {
        "p": "/dir/subdir/somedir/",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
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
        }
      },
      "absolute directory (backslashes)": {
        "p": "\\dir\\subdir\\somedir\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "absolute directory (Windows)": {
        "p": "C:\\dir\\subdir\\somedir\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "absolute directory (UNC)": {
        "p": "\\\\server\\dir\\subdir\\somedir\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "absolute directory (URL)": {
        "p": "http://host.name/dir/subdir/somedir/",
        "isUrl": true,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "absolute directory (forward slashes + backslashes)": {
        "p": "/dir\\subdir/somedir\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
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
        }
      },
      "absolute directory (backslashes + forward slashes)": {
        "p": "\\dir/subdir\\somedir/",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "absolute directory (Windows + forward slashes)": {
        "p": "C:/dir/subdir\\somedir/",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "absolute file (forward slashes)": {
        "p": "/dir/subdir/somefile.txt",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
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
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "isAbsolute": true,
            "sep": "\\",
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
        }
      },
      "absolute file (backslashes)": {
        "p": "\\dir\\subdir\\somefile.html",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "absolute file (Windows)": {
        "p": "C:\\dir\\subdir\\somefile.md",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "absolute file (UNC)": {
        "p": "\\\\server\\dir\\subdir\\somefile.doc",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "absolute file (URL)": {
        "p": "http://host.name/dir/subdir/somefile.html",
        "isUrl": true,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "absolute file (forward slashes + backslashes)": {
        "p": "/dir\\subdir/somedir\\somefile.txt",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
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
        }
      },
      "absolute file (backslashes + forward slashes)": {
        "p": "\\dir/subdir\\somedir/somefile.html",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "absolute file (Windows + forward slashes)": {
        "p": "C:\\dir/subdir\\somedir/somefile.md",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      }
    },
    "relative paths": {
      "relative directory (forward slashes)": {
        "p": "dir/subdir/somedir/",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
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
        }
      },
      "relative directory (backslashes)": {
        "p": "dir\\subdir\\somedir\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "relative directory (forward slashes + backslashes)": {
        "p": "dir\\subdir/somedir\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
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
        }
      },
      "relative directory (backslashes + forward slashes)": {
        "p": "dir/subdir\\somedir/",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "relative file (forward slashes)": {
        "p": "dir/subdir/somefile.txt",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
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
        }
      },
      "relative file (backslashes)": {
        "p": "dir\\subdir\\somefile.html",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "relative file (forward slashes + backslashes)": {
        "p": "dir\\subdir/somedir\\somefile.txt",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
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
        }
      },
      "relative file (backslashes + forward slashes)": {
        "p": "dir/subdir\\somedir/somefile.html",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      }
    },
    "URLs": {
      "URL with only a hostname": {
        "p": "ftp://localhost",
        "isUrl": true,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "URL with only a host IP": {
        "p": "smb://192.168.1.256",
        "isUrl": true,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "URL with only a host and query": {
        "p": "gopher://localhost?foo=bar&biz=baz",
        "options": {
          "allowFileQuery": true
        },
        "isUrl": true,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "URL with only a host and hash": {
        "p": "apple-maps://host.name#not?a=query",
        "options": {
          "allowFileHash": true
        },
        "isUrl": true,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "URL with all parts": {
        "p": "https://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
        "options": {
          "allowFileQuery": true,
          "allowFileHash": true
        },
        "isUrl": true,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "URL with unknown protocol": {
        "p": "foobar://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
        "options": {
          "allowFileQuery": true,
          "allowFileHash": true
        },
        "isUrl": true,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "URL with single-letter protocol": {
        "p": "c://user:pass@www.server.com:80/p/a/t/h?foo=bar&biz=baz#page1",
        "options": {
          "allowFileQuery": true,
          "allowFileHash": true
        },
        "isUrl": true,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      }
    },
    "extensions": {
      "directory with an extension": {
        "p": ".dir/sub.dir/some.dir/",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
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
        }
      },
      "directory with multiple extensions": {
        "p": "d:\\.dir\\sub.dir\\di.rec.tory\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "hidden directory": {
        "p": ".dir\\sub.dir\\.hidden\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "hidden directory with an extension": {
        "p": ".dir\\sub.dir/.hid.den\\",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
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
        }
      },
      "file with an extension": {
        "p": ".dir/sub.dir/somefile.txt",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
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
        }
      },
      "file with multiple extensions": {
        "p": "d:\\.dir\\sub.dir\\somefile.min.js",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "hidden file": {
        "p": ".dir\\sub.dir\\.hidden",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "hidden file with an extension": {
        "p": ".dir\\sub.dir/.hidden.md",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": false,
            "sep": "/",
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
        }
      }
    },
    "queries and hashes": {
      "path containing # and ? characters": {
        "p": "/path/?to=a/#file\\with#/slashes",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
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
        }
      },
      "path with a query": {
        "p": "path/to/a/file.html?foo=\\bar&biz=/baz",
        "options": {
          "allowFileQuery": true
        },
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "path with a hash": {
        "p": "D:\\path\\to/a\\direc.tory/#page1\\?not=a/&query",
        "options": {
          "allowFileHash": true
        },
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      },
      "path with a query and a hash": {
        "p": "\\\\server/path\\to/a\\direc.tory/?foo=\\bar&biz=/baz#page1\\?not=a/&query",
        "options": {
          "allowFileQuery": true,
          "allowFileHash": true
        },
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/",
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
        }
      }
    },
    "special cases": {
      "empty string": {
        "p": "",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "sep": "/"
          },
          "win32": {
            "isFS": true,
            "isWindows": true,
            "sep": "\\"
          },
          "url": {
            "isUrl": true,
            "sep": "/"
          }
        }
      },
      "path with non-encoded special characters": {
        "p": "/_-9a.t+8r_({[ ! % , . > < ? & $ # @ ` ~ ,)}]__/__({[ ! % , . > < ? & $ # @ ` ~ ,)}]__",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
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
        }
      },
      "path with encoded special characters": {
        "p": "/_-9a.t+8r_(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__/__(%7B[%20!%20%%20,%20.%20%3E%20%3C%20?%20&%20$%20#%20@%20%60%20~%20,)%7D]__",
        "isUrl": false,
        "parsed": {
          "posix": {
            "isFS": true,
            "isPosix": true,
            "isAbsolute": true,
            "sep": "/",
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
        }
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
  Object.keys(TestData).forEach(function(suite) {
    Object.keys(TestData[suite]).forEach(function(test) {
      var testObj = TestData[suite][test];
      Object.keys(testObj.parsed).forEach(function(parsed) {
        var obj = testObj.parsed[parsed];
        Object.keys(defaults).forEach(function(key) {
          if (obj[key] === undefined) {
            obj[key] = defaults[key];
          }
        })
      });
    });
  });

})();
