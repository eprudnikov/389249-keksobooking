'use strict';

(function () {

  window.pin.placePinsOnMap(window.data.authors);
  window.card.openCard(window.data.authors[0]);

  var mainPin = document.body.querySelector('.pin__main');
  var addressField = document.body.querySelector('#address');
  var mainPinCoords = window.pin.coordinations;

  mainPinCoords.onUpdate = function (x, y) {
    addressField.value = 'x: ' + x + ', y: ' + y;
  };
  mainPinCoords.update(mainPin.offsetLeft, mainPin.offsetTop, 0, 0);

  var dragDropHandler = window.pin.dragDropHandler;
  dragDropHandler.coordinations = mainPinCoords;
  mainPin.addEventListener('mousedown', dragDropHandler.onMousedownHandler);
}());
