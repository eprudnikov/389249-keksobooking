'use strict';

(function () {
  var ANY = 'any';
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;

  var filterPanel = document.body.querySelector('.tokyo__filters');
  var typeSelect = filterPanel.querySelector('#housing_type');
  var priceSelect = filterPanel.querySelector('#housing_price');
  var roomNumberSelect = filterPanel.querySelector('#housing_room-number');
  var guestsNumberSelect = filterPanel.querySelector('#housing_guests-number');

  function typeFilter(author) {
    var selectedType = typeSelect.options[typeSelect.selectedIndex].value;
    return !selectedType || selectedType === ANY || author.offer.type === selectedType;
  }

  function priceFilter(author) {
    var selectedPrice = priceSelect.options[priceSelect.selectedIndex].value;
    switch (selectedPrice.toLowerCase()) {
      case 'low':
        return author.offer.price < PRICE_LOW;
      case 'middle':
        return PRICE_LOW <= author.offer.price && author.offer.price <= PRICE_HIGH;
      case 'high':
        return author.offer.price > PRICE_HIGH;
    }
    return true;
  }

  function roomNumberFilter(author) {
    var selectedRoomNumber = roomNumberSelect.options[roomNumberSelect.selectedIndex].value;
    return !selectedRoomNumber || selectedRoomNumber === ANY || author.offer.rooms === +selectedRoomNumber;
  }

  function guestsNumberFilter(author) {
    var selectedGuestsNumber = guestsNumberSelect.options[guestsNumberSelect.selectedIndex].value;
    return !selectedGuestsNumber || selectedGuestsNumber === ANY || author.offer.guests === +selectedGuestsNumber;
  }

  var filters = [typeFilter, priceFilter, roomNumberFilter, guestsNumberFilter];
  var featureCheckboxes = filterPanel.querySelectorAll('input[name="feature"]');
  for (var i = 0; i < featureCheckboxes.length; i++) {
    filters.push(function (author) {
      var feature = this.value;
      return !this.checked || author.offer.features.includes(feature);
    }.bind(featureCheckboxes[i]));
  }

  function filterAuthors() {
    var result = window.data.authors.slice(0);
    for (var j = 0; j < filters.length; j++) {
      result = result.filter(filters[j]);
    }
    return result;
  }

  filterPanel.addEventListener('change', function () {
    var filterdAuthors = filterAuthors();
    window.pin.redrawPins(filterdAuthors);

    window.card.closeCard();
    if (filterdAuthors.length > 0) {
      window.showCard(filterdAuthors[0]);
    }
  });
}());
