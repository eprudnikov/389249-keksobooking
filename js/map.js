'use strict';

(function () {
  var URL_DATA = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
  var OFFERS_TO_SHOW = 3;

  function getRandomNumber(min, max) {
    return min + Math.round(Math.random() * (max - min));
  }

  window.card.closeCard(); // close a card which is open by default

  window.load(URL_DATA, function (data) {
    var limitOfRandomOffers = data.length < OFFERS_TO_SHOW ? data.length : data.length - 1 - OFFERS_TO_SHOW;
    var startOfRandomOrders = limitOfRandomOffers <= OFFERS_TO_SHOW ? 0 : getRandomNumber(0, limitOfRandomOffers);

    window.data.setAuthors(data);
    var randomOffers = data.slice(startOfRandomOrders, startOfRandomOrders + OFFERS_TO_SHOW);
    window.pin.placePinsOnMap(randomOffers);

    if (randomOffers.length > 0) {
      window.showCard(randomOffers[0]);
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
