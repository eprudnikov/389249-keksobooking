'use strict';

window.synchronizeFields = (function () {
  return function (source, target, targetValues, updater) {
    if (!source || !target || !targetValues || !updater) {
      throw new Error('Все параметры функции synchronizeFields обязательны.');
    }

    source.addEventListener('change', function () {
      var targetValue = targetValues[source.selectedIndex];
      updater(target, targetValue);
    });
  };
}());
