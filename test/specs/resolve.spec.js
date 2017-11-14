describe('OmniPath.resolve', function () {
  'use strict';

  helper.forEachTest(TestData2, function (test) {
    var resolved = helper.invoke('resolve', test);

    // Validate the return type
    expect(resolved.omni).to.be.a('string');
    expect(resolved.posix).to.be.a('string');
    expect(resolved.win32).to.be.a('string');
    expect(resolved.url).to.be.a('string');

    if (test.resolve.posix.substr(0, 2) !== '..') {
      // Validate the return value
      expect(resolved.posix).to.equal(test.resolve.posix, 'posix');
      expect(resolved.win32).to.equal(test.resolve.win32, 'win32');
      expect(resolved.url).to.equal(test.resolve.url, 'url');
    }

    // Compare to Node's native behavior
    if (host.node && test.matchesNative !== false) {
      if (!test.isUrl) {
        var args = test.p.map(function (p) {
          return p instanceof OmniPath ? p.format() : p;
        });
        expect(resolved.posix).to.equal(path.posix.resolve.apply(null, args), 'native posix');
        expect(resolved.win32).to.equal(path.win32.resolve.apply(null, args), 'native win32');
      }
    }
  });

  helper.forEachTest(TestData, function (test) {
    // Test a single-parameter resolve
    var singleResolve = helper.invoke('resolve', test);

    // Test a multi-parameter resolve that resolves to the original path
    var multiResolveArgs = [test.p, '', '/', './', '.', '///', '/./'];
    var multiResolve = helper.invoke('resolve', test, multiResolveArgs.concat(test.options));

    // Validate the return type
    expect(singleResolve.omni).to.be.a('string');
    expect(singleResolve.posix).to.be.a('string');
    expect(singleResolve.win32).to.be.a('string');
    expect(singleResolve.url).to.be.a('string');
    expect(multiResolve.omni).to.be.a('string');
    expect(multiResolve.posix).to.be.a('string');
    expect(multiResolve.win32).to.be.a('string');
    expect(multiResolve.url).to.be.a('string');

    // Compare to Node's native behavior
    if (host.node) {
      if (test.isUrl) {
        var u = test.p instanceof OmniPath ? test.p.format() : test.p;
        var nodeUrlResolve = url.resolve(OmniPath.cwd(), u);
        expect(singleResolve.url).to.equal(nodeUrlResolve, 'native url');
        expect(multiResolve.url).to.equal(url.resolve(nodeUrlResolve, '///'), 'native url');
      }
      else if (!test.parse.url.hash && Object.keys(test.parse.url.query).length === 0) {
        expect(singleResolve.posix).to.equal(path.posix.resolve(test.p), 'native posix');
        expect(singleResolve.win32).to.equal(path.win32.resolve(test.p), 'native win32');
        expect(multiResolve.win32).to.equal(path.win32.resolve.apply(null, multiResolveArgs), 'native win32');
        expect(multiResolve.posix).to.equal(path.posix.resolve.apply(null, multiResolveArgs), 'native posix');
      }
    }
  });
});
