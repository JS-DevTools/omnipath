'use strict';

describe('OmniPath.join', function() {
  helper.forEachTest(TestData2, function(test) {
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
    if (userAgent.isNode && test.matchesNative !== false) {
      expect(joined.posix).to.equal(path.posix.join.apply(null, test.p), 'native posix');
      expect(joined.win32).to.equal(path.win32.join.apply(null, test.p), 'native win32');
    }
  });

  helper.forEachTest(TestData, function(test) {
    // Test a single-parameter join, which is basically the same as normalize
    var singleJoin = helper.invoke('join', test);

    // Validate the return type
    expect(singleJoin.omni).to.be.a('string');
    expect(singleJoin.posix).to.be.a('string');
    expect(singleJoin.win32).to.be.a('string');
    expect(singleJoin.url).to.be.a('string');

    // Validate the return value
    expect(singleJoin.posix).to.equal(test.normalize.posix, 'posix');
    expect(singleJoin.win32).to.equal(test.normalize.win32, 'win32');
    expect(singleJoin.url).to.equal(test.normalize.url, 'url');

    // Test a multi-parameter join that resolves to the original path
    var multiJoinArgs = [test.p, '', '/', './', '.', '///', '/./'];
    var multiJoin = helper.invoke('join', test, multiJoinArgs.concat(test.options));

    // Validate the return type
    expect(multiJoin.omni).to.be.a('string');
    expect(multiJoin.posix).to.be.a('string');
    expect(multiJoin.win32).to.be.a('string');
    expect(multiJoin.url).to.be.a('string');

    // Compare to Node's native behavior
    if (userAgent.isNode) {
      if (test.isUrl) {
        expect(singleJoin.url).to.contain(path.posix.join(test.parse.url.pathname), 'native url');
        var nodeMultiJoin = path.posix.join.apply([test.parse.url.pathname].concat(multiJoinArgs.slice(1)));
        if (nodeMultiJoin !== '.') {
          expect(multiJoin.url).to.contain(nodeMultiJoin, 'native url');
        }
      }
      else if (!test.parse.url.hash && Object.keys(test.parse.url.query).length === 0) {
        expect(singleJoin.posix).to.equal(path.posix.join(test.p), 'native posix');
        expect(singleJoin.win32).to.equal(path.win32.join(test.p), 'native win32');
        expect(multiJoin.posix).to.equal(path.posix.join.apply(null, multiJoinArgs), 'native posix');
        expect(multiJoin.win32).to.equal(path.win32.join.apply(null, multiJoinArgs), 'native win32');
      }
    }
  });
});

