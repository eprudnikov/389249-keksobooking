'use strict';

window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;
  return function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
})();
