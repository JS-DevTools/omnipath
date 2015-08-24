'use strict';

describe('OmniPath.dirname', function() {
  helper.forEachTest(function(test) {
    var dirname = helper.invoke('dirname', test);

    // Validate the return type
    expect(dirname.omni).to.be.a('string').and.not.empty;
    expect(dirname.posix).to.be.a('string').and.not.empty;
    expect(dirname.win32).to.be.a('string').and.not.empty;
    expect(dirname.url).to.be.a('string').and.not.empty;

    // Validate the return value
    expect(dirname.posix).to.equal(test.parse.posix.dir || '.');
    expect(dirname.win32).to.equal(test.parse.win32.dir || '.');
    expect(dirname.url).to.equal(test.parse.url.dir || '.');

    // Compare to Node's native behavior
    if (userAgent.isNode) {
      if (test.isUrl) {
        var nodeDirname = path.dirname(test.parse.url.pathname);
        expect(dirname.omni).to.equal(nodeDirname);
        expect(dirname.url).to.equal(nodeDirname);
      }
      else if (!test.parse.posix.search && !test.parse.posix.hash) {
        expect(dirname.omni).to.equal(path.dirname(test.p));
        expect(dirname.posix).to.equal(path.posix.dirname(test.p));
        expect(dirname.win32).to.equal(path.win32.dirname(test.p));
      }
    }
  });
});
