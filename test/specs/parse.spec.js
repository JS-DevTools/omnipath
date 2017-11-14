describe('OmniPath.parse', function () {
  'use strict';

  helper.forEachTest(TestData, function (test) {
    var parsed = helper.invoke('parse', test);
    helper.deepEqual(parsed.posix, test.parse.posix);
    helper.deepEqual(parsed.win32, test.parse.win32);
    helper.deepEqual(parsed.url, test.parse.url);

    // Compare to Node's native behavior
    if (userAgent.isNode) {
      if (test.isUrl) {
        var u = typeof (test.p) === 'string' ? test.p : test.p.format();
        var nodeUrl = url.parse(u, true);
        helper.equalsNative(parsed.omni, nodeUrl);
        helper.equalsNative(parsed.url, nodeUrl);
      }
      else if (parsed.omni.search || parsed.omni.hash) {
        if (typeof (test.p) === 'string') {
          helper.equalsNative(parsed.omni, path.parse(parsed.omni.pathname));
        }
        helper.equalsNative(parsed.posix, path.posix.parse(parsed.omni.pathname));
        helper.equalsNative(parsed.win32, path.win32.parse(parsed.omni.pathname));
      }
      else {
        helper.equalsNative(parsed.omni, path.parse(test.p));
        helper.equalsNative(parsed.posix, path.posix.parse(test.p));
        helper.equalsNative(parsed.win32, path.win32.parse(test.p));
      }
    }
  });

  describe('invalid arguments', function () {
    it('no arguments', function () {
      function notGonnaWork (obj) {
        expect(function () {
          obj.parse();
        })
          .to.throw(Error, 'Expected a file path or URL, but got undefined undefined');
      }

      notGonnaWork(OmniPath);
      notGonnaWork(OmniPath.Posix);
      notGonnaWork(OmniPath.Windows);
      notGonnaWork(OmniPath.Url);
    });

    it('null', function () {
      function notGonnaWork (obj) {
        expect(function () {
          obj.parse(null);
        })
          .to.throw(Error, 'Expected a file path or URL, but got object null');
      }

      notGonnaWork(OmniPath);
      notGonnaWork(OmniPath.Posix);
      notGonnaWork(OmniPath.Windows);
      notGonnaWork(OmniPath.Url);
    });

    it('object', function () {
      function notGonnaWork (obj) {
        expect(function () {
          obj.parse({ foo: 'bar' });
        })
          .to.throw(Error, 'Expected a file path or URL, but got object [object Object]');
      }

      notGonnaWork(OmniPath);
      notGonnaWork(OmniPath.Posix);
      notGonnaWork(OmniPath.Windows);
      notGonnaWork(OmniPath.Url);
    });
  });
});
