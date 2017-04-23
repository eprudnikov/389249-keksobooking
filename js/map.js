'use strict';

(function () {
  var URL_DATA = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  window.load(URL_DATA, function (data) {
    window.data.authors = data;
    window.pin.placePinsOnMap(data);
    window.showCard(data[0]);
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
