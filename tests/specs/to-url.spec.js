'use strict';

describe('OmniPath.toUrl', function() {
  helper.forEachTest(function(test) {
    var urlString = helper.invoke('toUrl', test);

    // Validate the return type
    expect(urlString.omni).to.be.an('object').and.not.empty;
    expect(urlString.posix).to.be.an('object').and.not.empty;
    expect(urlString.win32).to.be.an('object').and.not.empty;
    expect(urlString.url).to.be.an('object').and.not.empty;

    // Validate the return value
    expect(urlString.posix.href).to.equal(test.toUrlString.posix);
    expect(urlString.posix.format()).to.equal(test.toUrlString.posix);
    expect(urlString.win32.href).to.equal(test.toUrlString.win32);
    expect(urlString.win32.format()).to.equal(test.toUrlString.win32);
    expect(urlString.url.href).to.equal(test.toUrlString.url);
    expect(urlString.url.format()).to.equal(test.toUrlString.url);

    if (userAgent.isNode) {
      // Validate the object type
      expect(urlString.omni).to.be.an.instanceOf(url.Url);
      expect(urlString.posix).to.be.an.instanceOf(url.Url);
      expect(urlString.win32).to.be.an.instanceOf(url.Url);
      expect(urlString.url).to.be.an.instanceOf(url.Url);
    }
  });
});
