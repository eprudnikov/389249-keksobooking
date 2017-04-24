'use strict';

(function () {
  var URL_DATA = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  window.card.closeCard(); // close a card which is open by default

  window.load(URL_DATA, function (data) {
    window.data.setAuthors(data);

    var offersToShow = 3;
    var randomComparator = function () {
      return 0.5 - Math.random();
    };
    var firstOffers = data.sort(randomComparator).slice(0, offersToShow);
    window.pin.placePinsOnMap(firstOffers);

    if (firstOffers.length > 0) {
      window.showCard(firstOffers[0]);
    }
  });

  var mainPin = document.body.querySelector('.pin__main');
  var addressField = document.body.querySelector('#address');
  var mainPinCoordinates = window.pin.coordinates;

  mainPinCoordinates.onUpdate = function (x, y) {
    addressField.value = 'x: ' + x + ', y: ' + y;
  };
  mainPinCoordinates.update(mainPin.offsetLeft, mainPin.offsetTop, 0, 0);

  var dragDropHandler = window.pin.dragDropHandler;
  dragDropHandler.coordinates = mainPinCoordinates;
  mainPin.addEventListener('mousedown', dragDropHandler.onMousedownHandler);
}());
