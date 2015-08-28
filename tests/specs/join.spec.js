'use strict';

describe('OmniPath.join', function() {
  //helper.forEachTest(TestPairs, function(test) {
  //  var joined = helper.invoke('join', test);
  //
  //  // Validate the return type
  //  expect(joined.omni).to.be.a('string');
  //  expect(joined.posix).to.be.a('string');
  //  expect(joined.win32).to.be.a('string');
  //  expect(joined.url).to.be.a('string');
  //
  //  // Validate the return value
  //  expect(joined.posix).to.equal(test.join.posix, 'posix');
  //  expect(joined.win32).to.equal(test.join.win32, 'win32');
  //  expect(joined.url).to.equal(test.join.url, 'url');
  //
  //  // Compare to Node's native behavior
  //  if (userAgent.isNode) {
  //    if (test.isUrl) {
  //      expect(joined.url).to.contain(path.posix.join(test.parse.url.pathname), 'native url');
  //    }
  //    else {
  //      expect(joined.posix).to.equal(path.posix.join.apply(null, test.p), 'native posix');
  //      expect(joined.win32).to.equal(path.win32.join.apply(null, test.p), 'native win32');
  //    }
  //  }
  //});

  // Test a single-parameter join, which is basically the same as normalize
  helper.forEachTest(TestPaths, function(test) {
    var joined = helper.invoke('join', test);

    // Validate the return type
    expect(joined.omni).to.be.a('string');
    expect(joined.posix).to.be.a('string');
    expect(joined.win32).to.be.a('string');
    expect(joined.url).to.be.a('string');

    // Validate the return value
    expect(joined.posix).to.equal(test.join.posix, 'posix');
    expect(joined.win32).to.equal(test.join.win32, 'win32');
    expect(joined.url).to.equal(test.join.url, 'url');

    // Compare to Node's native behavior
    if (userAgent.isNode) {
      if (test.isUrl) {
        expect(joined.url).to.contain(path.posix.join(test.parse.url.pathname), 'native url');
      }
      else if (!test.parse.url.hash && Object.keys(test.parse.url.query).length === 0) {
        expect(joined.posix).to.equal(path.posix.join(test.p), 'native posix');
        expect(joined.win32).to.equal(path.win32.join(test.p), 'native win32');
      }
    }
  });
});
