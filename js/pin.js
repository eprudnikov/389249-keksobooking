'use strict';

window.pin = (function () {
  var PIN_CLASS = 'pin';
  var ACTIVE_PIN_CLASS = 'pin--active';
  var PIN_WIDTH = 56; // px
  var PIN_HEIGHT = 75; // px
  var MAIN_PIN_WIDTH = 75;
  var MAIN_PIN_HEIGHT = 94;
  var AVATAR_WIDTH = 40; // px
  var AVATAR_HEIGHT = 40; // px
  var MAP_MIN_X_POSITION = 0;
  var MAP_MAX_X_POSITION = 1200;
  var MAP_MIN_Y_POSITION = 100;
  var MAP_MAX_Y_POSITION = 480;

  var activePin;

  var clickPinHandler = function (evt) {
    activatePin(evt.currentTarget);

    var avatar = activePin.childNodes[0].src;
    var author = window.data.findAuthor(avatar);
    window.showCard(author);
  };

  var enterKeydownPinHandler = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEY_CODE) {
      activatePin(evt.currentTarget);

      var avatar = activePin.childNodes[0].src;
      var author = window.data.findAuthor(avatar);
      window.showCard(author);
    }
  };

  function renderPin(author) {
    var div = document.createElement('div');
    div.classList.add(PIN_CLASS);
    div.style.left = (author.location.x - Math.round(PIN_WIDTH / 2)) + 'px';
    div.style.top = (author.location.y - PIN_HEIGHT) + 'px';
    div.tabIndex = 0;
    var img = document.createElement('img');
    img.src = author.author.avatar;
    img.classList.add('rounded');
    img.width = AVATAR_WIDTH;
    img.height = AVATAR_HEIGHT;
    div.appendChild(img);
    return div;
  }

  function removePinsFromMapExceptMain(map) {
    var mainPinClass = 'pin__main';
    map.querySelectorAll('.pin').forEach(function (element) {
      if (!element.classList.contains(mainPinClass)) {
        map.removeChild(element);
      }
    });
  }

  var redrawPins = function (authors) {
    var fragment = document.createDocumentFragment();
    authors.forEach(function (author) {
      var pin = renderPin(author);
      pin.addEventListener('click', clickPinHandler);
      pin.addEventListener('keydown', enterKeydownPinHandler);

      fragment.appendChild(pin);
    });
    var map = document.querySelector('.tokyo__pin-map');
    removePinsFromMapExceptMain(map);
    map.appendChild(fragment);
  };

  function activatePin(pin) {
    pin.classList.add(ACTIVE_PIN_CLASS);
    if (activePin) {
      activePin.classList.remove(ACTIVE_PIN_CLASS);
    }
    activePin = pin;
  }

  var deactivatePin = function () {
    if (activePin) {
      activePin.classList.remove(ACTIVE_PIN_CLASS);
      activePin = null;
    }
  };

  var coordinates = {
    offsetLeft: 0,
    offsetTop: 0,
    clientX: 0,
    clientY: 0,

    getXPositionOnMap: function () {
      return coordinates.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
    },

    getYPositionOnMap: function () {
      return coordinates.offsetTop + MAIN_PIN_HEIGHT;
    },

    onUpdate: function () {},

    update: function (offsetLeft, offsetTop, clientX, clientY) {
      coordinates.offsetLeft = offsetLeft;
      coordinates.offsetTop = offsetTop;
      coordinates.clientX = clientX;
      coordinates.clientY = clientY;
      if (coordinates.onUpdate) {
        coordinates.onUpdate(coordinates.getXPositionOnMap(), coordinates.getYPositionOnMap());
      }
    }
  };

  var dragDropHandler = {
    coordinates: null,

    onMousedownHandler: function (evt) {
      evt.preventDefault();
      var pin = this;
      dragDropHandler.coordinates.update(pin.offsetLeft, pin.offsetTop, evt.clientX, evt.clientY);

      var isInMap = function (x, y) {
        var leftMapBorder = MAP_MIN_X_POSITION - Math.round(MAIN_PIN_WIDTH / 2);
        var rightMapBorder = MAP_MAX_X_POSITION - Math.round(MAIN_PIN_WIDTH / 2);
        var topMapBorder = MAP_MIN_Y_POSITION;
        var bottomMapBorder = MAP_MAX_Y_POSITION + MAIN_PIN_HEIGHT;

        return leftMapBorder < x && x < rightMapBorder && topMapBorder < y && y < bottomMapBorder;
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shiftX = dragDropHandler.coordinates.clientX - moveEvt.clientX;
        var shiftY = dragDropHandler.coordinates.clientY - moveEvt.clientY;

        var newOffsetTop = (pin.offsetTop - shiftY);
        var newOffsetLeft = (pin.offsetLeft - shiftX);
        if (isInMap(newOffsetLeft, newOffsetTop)) {
          pin.style.top = newOffsetTop + 'px';
          pin.style.left = newOffsetLeft + 'px';

          dragDropHandler.coordinates.update(pin.offsetLeft, pin.offsetTop, moveEvt.clientX, moveEvt.clientY);
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  return {
    redrawPins: redrawPins,
    deactivatePin: deactivatePin,
    coordinates: coordinates,
    dragDropHandler: dragDropHandler
  };
}());
