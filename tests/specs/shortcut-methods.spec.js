'use strict';

var methods = [
  {name: 'isUrl', returns: 'boolean'},
  {name: 'isFS', returns: 'boolean'},
  {name: 'isPosix', returns: 'boolean'},
  {name: 'isWindows', returns: 'boolean'},
  {name: 'isUnc', returns: 'boolean'},
  {name: 'isAbsolute', returns: 'boolean'},
  {name: 'sep', returns: 'string'},
  {name: 'href', returns: 'string'},
  {name: 'protocol', returns: 'string'},
  {name: 'slashes', returns: 'boolean'},
  {name: 'auth', returns: 'string'},
  {name: 'host', returns: 'string'},
  {name: 'hostname', returns: 'string'},
  {name: 'port', returns: 'string'},
  {name: 'path', returns: 'string'},
  {name: 'pathname', returns: 'string'},
  {name: 'root', returns: 'string'},
  {name: 'dir', returns: 'string'},
  {name: 'base', returns: 'string'},
  {name: 'ext', returns: 'string'},
  {name: 'search', returns: 'string'},
  {name: 'query', returns: 'object'},
  {name: 'hash', returns: 'string'}
];

methods.forEach(function(method) {
  describe('OmniPath.' + method.name, function() {
    helper.forEachTest(function(test) {
      var results = helper.invoke(method.name, test);

      // Validate the return type
      expect(results.omni).to.be.a(method.returns);
      expect(results.posix).to.be.a(method.returns);
      expect(results.win32).to.be.a(method.returns);
      expect(results.url).to.be.a(method.returns);

      // Validate the return value
      expect(results.posix).to.deep.equal(test.parsed.posix[method.name]);
      expect(results.win32).to.deep.equal(test.parsed.win32[method.name]);
      expect(results.url).to.deep.equal(test.parsed.url[method.name]);
    });
  });
});
