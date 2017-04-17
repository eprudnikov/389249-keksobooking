'use strict';

window.contants = {
  ENTER_KEY_CODE: 13,
  ESC_KEY_CODE: 27
};

window.pin = (function () {
  var PIN_CLASS = 'pin';
  var ACTIVE_PIN_CLASS = 'pin--active';
  var PIN_WIDTH = 56; // px
  var PIN_HEIGHT = 75; // px
  var AVATAR_WIDTH = 40; // px
  var AVATAR_HEIGHT = 40; // px

  var activePin;

  var clickPinHandler = function (evt) {
    activatePin(evt.currentTarget);

    var avatar = activePin.childNodes[0].src;
    var author = window.data.findAuthor(avatar);
    window.card.openCard(author);
  };

  var enterKeydownPinHandler = function (evt) {
    if (evt.keyCode === window.contants.ENTER_KEY_CODE) {
      activatePin(evt.currentTarget);

      var avatar = activePin.childNodes[0].src;
      var author = window.data.findAuthor(avatar);
      window.card.openCard(author);
    }
  };

  function renderPin(author) {
    var div = document.createElement('div');
    div.classList.add(PIN_CLASS);
    div.style.left = (author.location.x + Math.round(PIN_WIDTH / 2)) + 'px';
    div.style.top = (author.location.y + PIN_HEIGHT) + 'px';
    div.tabIndex = 0;
    var img = document.createElement('img');
    img.src = author.author.avatar;
    img.classList.add('rounded');
    img.width = AVATAR_WIDTH;
    img.height = AVATAR_HEIGHT;
    div.appendChild(img);
    return div;
  }

  var placePinsOnMap = function (authors) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < authors.length; i++) {
      var pin = renderPin(authors[i]);
      pin.addEventListener('click', clickPinHandler);
      pin.addEventListener('keydown', enterKeydownPinHandler);

      fragment.appendChild(pin);
    }
    document.querySelector('.tokyo__pin-map').appendChild(fragment);
  };

  function activatePin(pin) {
    pin.classList.add(ACTIVE_PIN_CLASS);
    if (activePin) {
      activePin.classList.remove(ACTIVE_PIN_CLASS);
    }
    activePin = pin;
  }

  var deactivePin = function () {
    if (activePin) {
      activePin.classList.remove(ACTIVE_PIN_CLASS);
      activePin = null;
    }
  };

  return {
    placePinsOnMap: placePinsOnMap,
    deactivePin: deactivePin
  };
}());
