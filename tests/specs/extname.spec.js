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
    expect(extname.posix).to.equal(test.parsed.posix.ext);
    expect(extname.win32).to.equal(test.parsed.win32.ext);
    expect(extname.url).to.equal(test.parsed.url.ext);

    // Compare to Node's native behavior
    if (userAgent.isNode) {
      if (test.isUrl) {
        var nodeExt = path.extname(test.parsed.url.pathname);
        expect(extname.omni).to.equal(nodeExt);
        expect(extname.url).to.equal(nodeExt);
      }
      else if (!test.parsed.posix.search && !test.parsed.posix.hash) {
        expect(extname.omni).to.equal(path.extname(test.p));
      }
    }
  });
});
