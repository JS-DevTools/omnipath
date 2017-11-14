'use strict';

module.exports = require('./omni-path');
module.exports.Posix = module.exports.posix = require('./omni-posix');
module.exports.Windows = module.exports.windows = module.exports.win32 = require('./omni-windows');
module.exports.Url = module.exports.url = require('./omni-url');
