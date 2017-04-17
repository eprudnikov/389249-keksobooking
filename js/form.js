'use strict';

(function () {
  var INVALID_ELEMENT_STYLE = 'border: 1px solid red';
  var MIN_PRICES = {
    'apartment': 1000,
    'hut': 0,
    'palace': 10000
  };

  var form = document.body.querySelector('.notice__form');
  var timeSelect = form.querySelector('#time');
  var timeoutSelect = form.querySelector('#timeout');
  timeSelect.addEventListener('change', function () {
    timeoutSelect.selectedIndex = timeSelect.selectedIndex;
  });

  var typeSelect = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var setMinPrice = function () {
    var minPrice = MIN_PRICES[typeSelect.options[typeSelect.selectedIndex].value];
    if (typeof minPrice === 'number') { // to make sure that 0 will be true
      priceInput.placeholder = minPrice;
      priceInput.min = minPrice;
    }
  };
  typeSelect.addEventListener('change', setMinPrice);

  var roomNumberSelect = form.querySelector('#room_number');
  var capacitySelect = form.querySelector('#capacity');
  var noGuestsOption = capacitySelect.querySelector('option[value="0"]');
  var threeGuestsOption = capacitySelect.querySelector('option[value="3"]');
  var limitGuests = function () {
    if (roomNumberSelect.options[roomNumberSelect.selectedIndex].value > 1) {
      capacitySelect.selectedIndex = threeGuestsOption.index;
      return;
    }
    capacitySelect.selectedIndex = noGuestsOption.index;
  };
  limitGuests();
  roomNumberSelect.addEventListener('change', limitGuests);

  var resetBorder = function (evt) {
    evt.target.style = 'border-width: 0px';
    evt.target.removeEventListener('change', resetBorder);
  };
  form.addEventListener('invalid', function (evt) {
    evt.target.style = INVALID_ELEMENT_STYLE;
    evt.target.addEventListener('change', resetBorder);
  }, true);
}());
