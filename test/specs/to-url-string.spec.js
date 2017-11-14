describe('OmniPath.toUrlString', function () {
  'use strict';

  helper.forEachTest(TestData, function (test) {
    var urlString = helper.invoke('toUrlString', test);

    // Validate the return type
    expect(urlString.omni).to.be.a('string', 'omni');
    expect(urlString.posix).to.be.a('string', 'posix');
    expect(urlString.win32).to.be.a('string', 'win32');
    expect(urlString.url).to.be.a('string', 'url');

    // Validate the return value
    expect(urlString.posix).to.equal(test.toUrlString.posix, 'posix');
    expect(urlString.win32).to.equal(test.toUrlString.win32, 'win32');
    expect(urlString.url).to.equal(test.toUrlString.url, 'url');
  });
});
