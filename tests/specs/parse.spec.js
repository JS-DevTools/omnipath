'use strict';

describe('OmniPath.parse', function() {
  helper.forEachTest(function(test) {
    var parsed = helper.invoke('parse', test);
    helper.deepEqual(parsed.posix, test.parsed.posix);
    helper.deepEqual(parsed.win32, test.parsed.win32);
    helper.deepEqual(parsed.url, test.parsed.url);

    // Compare to Node's native behavior
    if (userAgent.isNode) {
      if (test.isUrl) {
        var nodeUrl = url.parse(test.p, true);
        helper.equalsNative(parsed.omni, nodeUrl);
        helper.equalsNative(parsed.url, nodeUrl);
      }
      else if (parsed.omni.search || parsed.omni.hash) {
        helper.equalsNative(parsed.omni, path.parse(parsed.omni.pathname));
      }
      else {
        helper.equalsNative(parsed.omni, path.parse(test.p));
      }
    }
  });

  describe('invalid arguments', function() {
    it('no arguments', function() {
      function notGonnaWork(obj) {
        expect(function() {
          obj.parse();
        })
          .to.throw(Error, 'Expected a file path or URL, but got undefined undefined');
      }

      notGonnaWork(OmniPath);
      notGonnaWork(OmniPath.Posix);
      notGonnaWork(OmniPath.Windows);
      notGonnaWork(OmniPath.Url);
    });

    it('null', function() {
      function notGonnaWork(obj) {
        expect(function() {
          obj.parse(null);
        })
          .to.throw(Error, 'Expected a file path or URL, but got object null');
      }

      notGonnaWork(OmniPath);
      notGonnaWork(OmniPath.Posix);
      notGonnaWork(OmniPath.Windows);
      notGonnaWork(OmniPath.Url);
    });

    it('object', function() {
      function notGonnaWork(obj) {
        expect(function() {
          obj.parse({href: 'foobar'});
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
