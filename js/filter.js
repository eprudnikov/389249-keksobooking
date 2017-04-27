'use strict';

(function () {
  var ANY = 'any';
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var VALUE_LOW = 'low';
  var VALUE_MIDDLE = 'middle';
  var VALUE_HIGH = 'high';

  var filterPanel = document.body.querySelector('.tokyo__filters');

  function createCommonFilter(filterSelector, authorChecker) {
    var selectElement = filterPanel.querySelector(filterSelector);
    return function (author) {
      var selectedValue = selectElement.options[selectElement.selectedIndex].value;
      return !selectedValue || selectedValue === ANY || authorChecker(author, selectedValue);
    };
  }

  var typeFilter = createCommonFilter('#housing_type', function (author, selectedValue) {
    return author.offer.type === selectedValue;
  });
  var roomNumberFilter = createCommonFilter('#housing_room-number', function (author, selectedValue) {
    return author.offer.rooms === +selectedValue;
  });
  var guestsNumberFilter = createCommonFilter('#housing_guests-number', function (author, selectedValue) {
    return author.offer.guests === +selectedValue;
  });

  var priceSelect = filterPanel.querySelector('#housing_price');
  var priceFilter = function (author) {
    var selectedPrice = priceSelect.options[priceSelect.selectedIndex].value;
    switch (selectedPrice.toLowerCase()) {
      case VALUE_LOW:
        return author.offer.price < PRICE_LOW;
      case VALUE_MIDDLE:
        return PRICE_LOW <= author.offer.price && author.offer.price <= PRICE_HIGH;
      case VALUE_HIGH:
        return author.offer.price > PRICE_HIGH;
    }
    return true;
  };

  function createFeatureFilter() {
    var featureCheckboxes = filterPanel.querySelectorAll('input[name="feature"]');
    featureCheckboxes.forEach(function (checkbox) {
      filters.push(function (author) {
        var feature = checkbox.value;
        return !checkbox.checked || author.offer.features.includes(feature);
      });
    });
  }

  var filters = [typeFilter, priceFilter, roomNumberFilter, guestsNumberFilter];
  filters.concat(createFeatureFilter());

  function filterAuthors() {
    var result = window.data.authors.slice(0);
    filters.forEach(function (filter) {
      result = result.filter(filter);
    });
    return result;
  }

  function updatePins() {
    var filteredAuthors = filterAuthors();
    window.pin.redrawPins(filteredAuthors);

    window.card.closeCard();
    if (filteredAuthors.length > 0) {
      window.showCard(filteredAuthors[0]);
    }
  }

  filterPanel.addEventListener('change', function () {
    window.debounce(updatePins);
  });
}());
