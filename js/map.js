'use strict';

(function () {
  var MAIN_PIN_WIDTH = 75;
  var MAIN_PIN_HEIGHT = 94;

  window.pin.placePinsOnMap(window.data.authors);
  window.card.openCard(window.data.authors[0]);

  var mainPin = document.body.querySelector('.pin__main');
  var addressField = document.body.querySelector('#address');

  var pinCoords = {
    offsetLeft: 0,
    offsetTop: 0,
    clientX: 0,
    clientY: 0,

    getXPositionOnMap: function () {
      return pinCoords.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
    },

    getYPositionOnMap: function () {
      return pinCoords.offsetTop + MAIN_PIN_HEIGHT;
    },

    onPositionUpdate: function (x, y) {
      addressField.value = 'x: ' + x + ', y: ' + y;
    },

    updatePosition: function (offsetLeft, offsetTop, clientX, clientY) {
      pinCoords.offsetLeft = offsetLeft;
      pinCoords.offsetTop = offsetTop;
      pinCoords.clientX = clientX;
      pinCoords.clientY = clientY;
      if (pinCoords.onPositionUpdate) {
        pinCoords.onPositionUpdate(pinCoords.getXPositionOnMap(), pinCoords.getYPositionOnMap());
      }
    }
  };
  pinCoords.updatePosition(mainPin.offsetLeft, mainPin.offsetTop, 0, 0);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    pinCoords.updatePosition(mainPin.offsetLeft, mainPin.offsetTop, evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = pinCoords.clientX - moveEvt.clientX;
      var shiftY = pinCoords.clientY - moveEvt.clientY;

      mainPin.style.top = (mainPin.offsetTop - shiftX) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shiftY) + 'px';

      pinCoords.updatePosition(mainPin.offsetLeft, mainPin.offsetTop, moveEvt.clientX, moveEvt.clientY);
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
