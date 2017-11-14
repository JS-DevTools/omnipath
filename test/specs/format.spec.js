describe('OmniPath.format', function () {
  'use strict';

  helper.forEachTest(TestData, function (test) {
    var formatted = helper.invoke('format', test);

    // Validate the return type
    expect(formatted.omni).to.be.a('string');
    expect(formatted.posix).to.be.a('string');
    expect(formatted.win32).to.be.a('string');
    expect(formatted.url).to.be.a('string');

    // Validate the return value
    expect(formatted.posix).to.equal(test.format.posix, 'posix');
    expect(formatted.win32).to.equal(test.format.win32, 'win32');
    expect(formatted.url).to.equal(test.format.url, 'url');

    // Compare to Node's native behavior
    if (host.node) {
      if (test.isUrl) {
        var nodeFormat = url.format(test.parse.url);
        expect(formatted.omni).to.equal(nodeFormat, 'native omni');
        expect(formatted.url).to.equal(nodeFormat, 'native url');
      }
      else if (!test.parse.url.hash && Object.keys(test.parse.url.query).length === 0) {
        expect(formatted.posix).to.equal(path.posix.format(test.parse.posix), 'native posix');
        expect(formatted.win32).to.equal(path.win32.format(test.parse.win32), 'native win32');
      }
    }
  });
});
