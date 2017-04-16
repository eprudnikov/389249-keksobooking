'use strict';

(function () {
  var PIN_CLASS = 'pin';
  var ACTIVE_PIN_CLASS = 'pin--active';

  var activePin;

  var clickPinHandler = function (evt) {
    activatePin(evt.currentTarget);

    var avatar = activePin.childNodes[0].src;
    var author = window.findAuthor(avatar);
    window.openOfferDialog(author);
  };

  var enterKeydownPinHandler = function (evt) {
    if (evt.keyCode === window.ENTER_KEY_CODE) {
      activatePin(evt.currentTarget);

      var avatar = activePin.childNodes[0].src;
      var author = window.findAuthor(avatar);
      window.openOfferDialog(author);
    }
  };

  function renderPin(author) {
    var pinWidth = 56; // px
    var pinHeight = 75; // px

    var div = document.createElement('div');
    div.classList.add(PIN_CLASS);
    div.style.left = (author.location.x + Math.round(pinWidth / 2)) + 'px';
    div.style.top = (author.location.y + pinHeight) + 'px';
    div.tabIndex = 0;
    var img = document.createElement('img');
    img.src = author.author.avatar;
    img.classList.add('rounded');
    img.width = 40;
    img.height = 40;
    div.appendChild(img);
    return div;
  }

  window.placePinsOnMap = function (authors) {
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

  window.deactivePin = function () {
    if (activePin) {
      activePin.classList.remove(ACTIVE_PIN_CLASS);
      activePin = null;
    }
  };
}());
