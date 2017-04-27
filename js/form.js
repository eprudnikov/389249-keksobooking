'use strict';

(function () {
  var INVALID_ELEMENT_STYLE = 'border: 1px solid red';

  var setSelectedIndex = function (element, value) {
    var option = element.querySelector('option[value="' + value + '"]');
    if (option) {
      element.selectedIndex = option.index;
    }
  };

  var form = document.body.querySelector('.notice__form');
  var timeSelect = form.querySelector('#time');
  var timeoutSelect = form.querySelector('#timeout');
  window.synchronizeFields(timeSelect, timeoutSelect, [12, 13, 14], setSelectedIndex);
  window.synchronizeFields(timeoutSelect, timeSelect, [12, 13, 14], setSelectedIndex);

  var roomNumberSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');
  window.synchronizeFields(roomNumberSelect, capacitySelect, [0, 3, 3], setSelectedIndex);

  var typeSelect = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var setMinValueAndPlaceholder = function (element, value) {
    if (typeof value === 'number') { // to make sure that 0 will be true
      element.placeholder = value;
      element.min = value;
    }
  };
  window.synchronizeFields(typeSelect, priceInput, [1000, 0, 10000], setMinValueAndPlaceholder);

  var resetBorder = function (evt) {
    evt.target.style = 'border-width: 0px';
    evt.target.removeEventListener('change', resetBorder);
  };
  form.addEventListener('invalid', function (evt) {
    evt.target.style = INVALID_ELEMENT_STYLE;
    evt.target.addEventListener('change', resetBorder);
  }, true);
}());
