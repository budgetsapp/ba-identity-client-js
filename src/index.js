import { AuthApiClient } from './auth-api-client';

// (function(window) {
//   window.BaAuthApiClient = AuthApiClient;
// })(window);

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
})(this, function() {
  //    exposed public method
  return AuthApiClient;
});
