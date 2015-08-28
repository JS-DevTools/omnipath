'use strict';

describe('OmniPath.normalize', function() {
  helper.forEachTest(TestPaths, function(test) {
    var normalized = helper.invoke('normalize', test);

    // Validate the return type
    expect(normalized.omni).to.be.a('string');
    expect(normalized.posix).to.be.a('string');
    expect(normalized.win32).to.be.a('string');
    expect(normalized.url).to.be.a('string');

    // Validate the return value
    expect(normalized.posix).to.equal(test.normalize.posix, 'posix');
    expect(normalized.win32).to.equal(test.normalize.win32, 'win32');
    expect(normalized.url).to.equal(test.normalize.url, 'url');

    // Compare to Node's native behavior
    if (userAgent.isNode) {
      if (test.isUrl) {
        expect(normalized.url).to.contain(path.posix.normalize(test.parse.url.pathname), 'native url');
      }
      else if (!test.parse.url.hash && Object.keys(test.parse.url.query).length === 0) {
        expect(normalized.posix).to.equal(path.posix.normalize(test.p), 'native posix');
        expect(normalized.win32).to.equal(path.win32.normalize(test.p), 'native win32');
      }
    }
  });
});
