//'use strict';
//
//describe.only('OmniPath.join', function() {
//  helper.forEachTest(function(test) {
//    var joined = helper.invoke('join', test);
//
//    // Validate the return type
//    expect(joined.omni).to.be.a('string');
//    expect(joined.posix).to.be.a('string');
//    expect(joined.win32).to.be.a('string');
//    expect(joined.url).to.be.a('string');
//
//    // Validate the return value
//    expect(joined.posix).to.equal(test.normalize.posix, 'posix');
//    expect(joined.win32).to.equal(test.normalize.win32, 'win32');
//    expect(joined.url).to.equal(test.normalize.url, 'url');
//
//    // Compare to Node's native behavior
//    if (userAgent.isNode) {
//      if (!test.isUrl && !test.parse.url.query && !test.parse.url.hash) {
//        expect(joined.posix).to.equal(path.posix.join(test.p), 'native posix');
//        expect(joined.win32).to.equal(path.win32.join(test.p), 'native win32');
//      }
//    }
//  });
//});
