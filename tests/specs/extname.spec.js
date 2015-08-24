'use strict';

describe('OmniPath.extname', function() {
  helper.forEachTest(function(test) {
    var extname = helper.invoke('extname', test);

    // Validate the return type
    expect(extname.omni).to.be.a('string');
    expect(extname.posix).to.be.a('string');
    expect(extname.win32).to.be.a('string');
    expect(extname.url).to.be.a('string');

    // Validate the return value
    expect(extname.posix).to.equal(test.parse.posix.ext);
    expect(extname.win32).to.equal(test.parse.win32.ext);
    expect(extname.url).to.equal(test.parse.url.ext);

    // Compare to Node's native behavior
    if (userAgent.isNode) {
      if (test.isUrl) {
        var nodeExt = path.extname(test.parse.url.pathname);
        expect(extname.omni).to.equal(nodeExt);
        expect(extname.url).to.equal(nodeExt);
      }
      else if (!test.parse.posix.search && !test.parse.posix.hash) {
        expect(extname.omni).to.equal(path.extname(test.p));
        expect(extname.posix).to.equal(path.posix.extname(test.p));
        expect(extname.win32).to.equal(path.win32.extname(test.p));
      }
    }
  });
});
