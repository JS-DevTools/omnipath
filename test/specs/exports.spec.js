describe('OmniPath', function () {
  'use strict';

  it('can be called as a constructor', function () {
    var instance = new OmniPath('');
    expect(instance).to.be.an.instanceOf(OmniPath);

    // The OmniPath constructor always returns a subclass instance, NOT a base class instance
    expect(instance.constructor).not.to.equal(OmniPath);
  });

  it('can be called as a factory', function () {
    var instance = OmniPath('');    // eslint-disable-line new-cap
    expect(instance).to.be.an.instanceOf(OmniPath);

    // The OmniPath factory always returns a subclass instance, NOT a base class instance
    expect(instance.constructor).not.to.equal(OmniPath);
  });
});

describe('OmniPath.Windows', function () {
  'use strict';

  it('should be aliased as OmniPath.win32', function () {
    expect(OmniPath.win32).to.equal(OmniPath.Windows);
  });

  it('should be aliased as OmniPath.windows', function () {
    expect(OmniPath.windows).to.equal(OmniPath.Windows);
  });

  it('should inherit from OmniPath', function () {
    var instance = new OmniPath.Windows('');
    expect(instance).to.be.an.instanceOf(OmniPath);
    expect(instance.constructor).not.to.equal(OmniPath);
  });

  it('can be called as a constructor', function () {
    var instance = new OmniPath.Windows('');
    expect(instance).to.be.an.instanceOf(OmniPath.Windows);
    expect(instance.constructor).to.equal(OmniPath.Windows);
  });

  it('cannot be called as a factory', function () {
    function notGonnaWork () {
      OmniPath.Windows('');   // eslint-disable-line new-cap
    }
    expect(notGonnaWork).to.throw(TypeError, 'Use the "new" keyword when creating an instance of OmniPath.Windows');
  });
});

describe('OmniPath.Posix', function () {
  'use strict';

  it('should be aliased as OmniPath.posix', function () {
    expect(OmniPath.posix).to.equal(OmniPath.Posix);
  });

  it('should inherit from OmniPath', function () {
    var instance = new OmniPath.Posix('');
    expect(instance).to.be.an.instanceOf(OmniPath);
    expect(instance.constructor).not.to.equal(OmniPath);
  });

  it('can be called as a constructor', function () {
    var instance = new OmniPath.Posix('');
    expect(instance).to.be.an.instanceOf(OmniPath.Posix);
    expect(instance.constructor).to.equal(OmniPath.Posix);
  });

  it('cannot be called as a factory', function () {
    function notGonnaWork () {
      OmniPath.Posix('');   // eslint-disable-line new-cap
    }
    expect(notGonnaWork).to.throw(TypeError, 'Use the "new" keyword when creating an instance of OmniPath.Posix');
  });
});

describe('OmniPath.Url', function () {
  'use strict';

  it('should be aliased as OmniPath.url', function () {
    expect(OmniPath.url).to.equal(OmniPath.Url);
  });

  it('should inherit from OmniPath', function () {
    var instance = new OmniPath.Url('');
    expect(instance).to.be.an.instanceOf(OmniPath);
    expect(instance.constructor).not.to.equal(OmniPath);
  });

  it('can be called as a constructor', function () {
    var instance = new OmniPath.Url('');
    expect(instance).to.be.an.instanceOf(OmniPath.Url);
    expect(instance.constructor).to.equal(OmniPath.Url);
  });

  it('cannot be called as a factory', function () {
    function notGonnaWork () {
      OmniPath.Url('');   // eslint-disable-line new-cap
    }
    expect(notGonnaWork).to.throw(TypeError, 'Use the "new" keyword when creating an instance of OmniPath.Url');
  });
});
