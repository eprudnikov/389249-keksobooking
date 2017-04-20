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

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    mainPinCoords.update(mainPin.offsetLeft, mainPin.offsetTop, evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = mainPinCoords.clientX - moveEvt.clientX;
      var shiftY = mainPinCoords.clientY - moveEvt.clientY;

      mainPin.style.top = (mainPin.offsetTop - shiftY) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shiftX) + 'px';

      mainPinCoords.update(mainPin.offsetLeft, mainPin.offsetTop, moveEvt.clientX, moveEvt.clientY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}());
