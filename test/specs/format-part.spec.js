'use strict';

describe('OmniPath.formatPart', function() {
  helper.forEachTest(TestData, function(test) {
    var results = [
      {part: 'protocol', formatPart: helper.invoke('formatPart', test, [test.p, 'protocol', test.options])},
      {part: 'slashes', formatPart: helper.invoke('formatPart', test, [test.p, 'slashes', test.options])},
      {part: 'hostname', formatPart: helper.invoke('formatPart', test, [test.p, 'hostname', test.options])},
      {part: 'port', formatPart: helper.invoke('formatPart', test, [test.p, 'port', test.options])},
      {part: 'host', formatPart: helper.invoke('formatPart', test, [test.p, 'host', test.options])},
      {part: 'dir', formatPart: helper.invoke('formatPart', test, [test.p, 'dir', test.options])},
      {part: 'base', formatPart: helper.invoke('formatPart', test, [test.p, 'base', test.options])},
      {part: 'pathname', formatPart: helper.invoke('formatPart', test, [test.p, 'pathname', test.options])},
      {part: 'query', formatPart: helper.invoke('formatPart', test, [test.p, 'query', test.options])},
      {part: 'search', formatPart: helper.invoke('formatPart', test, [test.p, 'search', test.options])},
      {part: 'path', formatPart: helper.invoke('formatPart', test, [test.p, 'path', test.options])},
      {part: 'hash', formatPart: helper.invoke('formatPart', test, [test.p, 'hash', test.options])}
    ];

    ['posix', 'win32', 'url'].forEach(function(platform) {
      var expected = '';
      results.forEach(function(result) {
        // Validate the return type
        expect(result.formatPart.omni).to.be.a('string');
        expect(result.formatPart.posix).to.be.a('string');
        expect(result.formatPart.win32).to.be.a('string');
        expect(result.formatPart.url).to.be.a('string');

        // Validate the return value
        var actual = result.formatPart[platform];
        expected = test.formatPart[platform][result.part] || expected;
        expect(actual).to.equal(expected, platform + '.' + result.part);
      });
    });
  });
});
