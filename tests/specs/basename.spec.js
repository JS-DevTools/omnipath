'use strict';

describe('OmniPath.basename', function() {
  helper.forEachTest(function(test) {
    var results = [
      {basename: helper.invoke('basename', test, test.p, test.options)},
      {ext: '.html', basename: helper.invoke('basename', test, test.p, '.html', test.options)},
      {ext: '.txt', basename: helper.invoke('basename', test, test.p, '.txt', test.options)},
      {ext: 'txt', basename: helper.invoke('basename', test, test.p, 'txt', test.options)},
      {ext: '.hidden', basename: helper.invoke('basename', test, test.p, '.hidden', test.options)},
      {ext: '.tory', basename: helper.invoke('basename', test, test.p, '.tory', test.options)},
      {ext: '.min.js', basename: helper.invoke('basename', test, test.p, '.min.js', test.options)},
      {ext: '', basename: helper.invoke('basename', test, test.p, '', test.options)},
      {ext: undefined, basename: helper.invoke('basename', test, test.p, undefined, test.options)}
    ];

    results.forEach(function(result) {
      // Validate the return type
      expect(result.basename.omni).to.be.a('string');
      expect(result.basename.posix).to.be.a('string');
      expect(result.basename.win32).to.be.a('string');
      expect(result.basename.url).to.be.a('string');

      ['posix', 'win32', 'url'].forEach(function(platform) {
        // Validate the return value
        var base = test.parse[platform].base;
        if (result.ext) {
          if (base.substr(-result.ext.length) === result.ext) {
            base = base.substr(0, base.length - result.ext.length);
          }
        }
        expect(result.basename[platform]).to.equal(base);
      });

      // Compare to Node's native behavior
      if (userAgent.isNode) {
        if (test.isUrl) {
          var nodeBase = path.basename(test.parse.url.pathname, result.ext);
          expect(result.basename.omni).to.equal(nodeBase);
          expect(result.basename.url).to.equal(nodeBase);
        }
        else if (!test.parse.posix.search && !test.parse.posix.hash) {
          expect(result.basename.omni).to.equal(path.basename(test.p, result.ext));
          expect(result.basename.posix).to.equal(path.posix.basename(test.p, result.ext));
          expect(result.basename.win32).to.equal(path.win32.basename(test.p, result.ext));
        }
      }
    });
  });
});
