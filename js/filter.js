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

  function filterAuthors() {
    var authors = window.data.authors.slice(0);
    var result = authors.filter(typeFilter);
    result = result.filter(priceFilter);
    result = result.filter(roomNumberFilter);
    result = result.filter(guestsNumberFilter);
    return result;
  }
  filterPanel.addEventListener('change', function () {
    var filterdAuthors = filterAuthors();
    window.pin.placePinsOnMap(filterdAuthors);

    window.card.closeCard();
    if (filterdAuthors.length > 0) {
      window.showCard(filterdAuthors[0]);
    }
  });
  // TODO implement filtering by features
}());
