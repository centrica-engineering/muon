'use strict';

// Story files import modules that reference window at module scope.
if (typeof global.window === 'undefined') {
  global.window = global;
}
