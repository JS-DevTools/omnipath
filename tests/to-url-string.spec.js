'use strict';

describe('OmniPath.toUrlString', function() {
  helper.forEachTest(function(test) {
    var urlString = helper.invoke('toUrlString', test);

    // Validate the return type
    expect(urlString.omni).to.be.a('string');
    expect(urlString.posix).to.be.a('string');
    expect(urlString.win32).to.be.a('string');
    expect(urlString.url).to.be.a('string');

    // Validate the return value
    expect(urlString.posix).to.equal(test.urlString.posix);
    expect(urlString.win32).to.equal(test.urlString.win32);
    expect(urlString.url).to.equal(test.urlString.url);
  });
});
