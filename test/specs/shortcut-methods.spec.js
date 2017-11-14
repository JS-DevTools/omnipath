(function () {
  'use strict';

  var methods = [
    { name: 'isUrl', returns: 'boolean' },
    { name: 'isFS', returns: 'boolean' },
    { name: 'isPosix', returns: 'boolean' },
    { name: 'isWindows', returns: 'boolean' },
    { name: 'isUnc', returns: 'boolean' },
    { name: 'isAbsolute', returns: 'boolean' },
    { name: 'sep', returns: 'string' },
    { name: 'href', returns: 'string' },
    { name: 'protocol', returns: 'string' },
    { name: 'slashes', returns: 'boolean' },
    { name: 'auth', returns: 'string' },
    { name: 'host', returns: 'string' },
    { name: 'hostname', returns: 'string' },
    { name: 'port', returns: 'string' },
    { name: 'path', returns: 'string' },
    { name: 'pathname', returns: 'string' },
    { name: 'root', returns: 'string' },
    { name: 'dir', returns: 'string' },
    { name: 'base', returns: 'string' },
    { name: 'ext', returns: 'string' },
    { name: 'search', returns: 'string' },
    { name: 'query', returns: 'object' },
    { name: 'hash', returns: 'string' }
  ];

  methods.forEach(function (method) {
    describe('OmniPath.' + method.name, function () {
      helper.forEachTest(TestData, function (test) {
        var results = helper.invoke(method.name, test);

        // Validate the return type
        expect(results.omni).to.be.a(method.returns, 'omni');
        expect(results.posix).to.be.a(method.returns, 'posix');
        expect(results.win32).to.be.a(method.returns, 'win32');
        expect(results.url).to.be.a(method.returns, 'url');

        // Validate the return value
        expect(results.posix).to.deep.equal(test.parse.posix[method.name], 'posix');
        expect(results.win32).to.deep.equal(test.parse.win32[method.name], 'win32');
        expect(results.url).to.deep.equal(test.parse.url[method.name], 'url');
      });

      if (method.name === 'isPosix' || method.name === 'isWindows' || method.name === 'isUrl') {
        describe('fast parse', function () {
          beforeEach(function () {
            sinon.spy(OmniPath, 'parse');
            sinon.spy(OmniPath.Posix, 'parse');
            sinon.spy(OmniPath.Windows, 'parse');
            sinon.spy(OmniPath.Url, 'parse');
            sinon.spy(OmniPath.prototype, 'parse');
            sinon.spy(OmniPath.Posix.prototype, 'parse');
            sinon.spy(OmniPath.Windows.prototype, 'parse');
            sinon.spy(OmniPath.Url.prototype, 'parse');
          });

          afterEach(function () {
            OmniPath.parse.restore();
            OmniPath.Posix.parse.restore();
            OmniPath.Windows.parse.restore();
            OmniPath.Url.parse.restore();
            OmniPath.prototype.parse.restore();
            OmniPath.Posix.prototype.parse.restore();
            OmniPath.Windows.prototype.parse.restore();
            OmniPath.Url.prototype.parse.restore();
          });

          it('should not do a full parse', function () {
            OmniPath[method.name]('xyz');
            OmniPath.Posix[method.name]('xyz');
            OmniPath.Windows[method.name]('xyz');
            OmniPath.Url[method.name]('xyz');

            sinon.assert.notCalled(OmniPath.parse);
            sinon.assert.notCalled(OmniPath.Posix.parse);
            sinon.assert.notCalled(OmniPath.Windows.parse);
            sinon.assert.notCalled(OmniPath.Url.parse);
            sinon.assert.notCalled(OmniPath.prototype.parse);
            sinon.assert.notCalled(OmniPath.Posix.prototype.parse);
            sinon.assert.notCalled(OmniPath.Windows.prototype.parse);
            sinon.assert.notCalled(OmniPath.Url.prototype.parse);
          });
        });
      }
    });
  });
}());
