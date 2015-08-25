'use strict';

describe('OmniPath.normalize', function() {
  helper.forEachTest(function(test) {
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
      if (!test.isUrl && !test.parse.url.query && !test.parse.url.hash) {
        expect(normalized.posix).to.equal(path.posix.normalize(test.parse.posix), 'native posix');
        expect(normalized.win32).to.equal(path.win32.normalize(test.parse.win32), 'native win32');
      }
    }
  });
});
