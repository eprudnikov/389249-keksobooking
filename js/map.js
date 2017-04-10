'use strict';

var PIN_CLASS = 'pin';
var ACTIVE_PIN_CLASS = 'pin--active';

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];
var CHECKIN_OUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TYPES = ['flat', 'house', 'bungalo'];
var TYPES_TO_ACCOMODATION_NAME = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var offerDialog = document.body.querySelector('#offer-dialog');

function generateRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomElement(array) {
  var randomIndex = generateRandomNumber(0, array.length - 1);
  return array[randomIndex];
}

function popRandomElement(array) {
  do {
    var randomIndex = generateRandomNumber(0, array.length - 1);
    var randomElement = array[randomIndex];
    array[randomIndex] = null;
  } while (!randomElement);

  return randomElement;
}

function generateRandomArray(baseArray) {
  var elementsCount = generateRandomNumber(0, baseArray.length - 1);
  var randomArray = [];

  for (var i = 0; i < elementsCount; i++) {
    for (;;) {
      var randomElement = getRandomElement(baseArray);
      if (randomArray.indexOf(randomElement) === -1) {
        randomArray.push(randomElement);
        break;
      }
    }
  }

  return randomArray;
}

function generateAuthors() {
  var authorsCount = 8;
  var uniqueTitles = TITLES.slice(0); // uniqueTitles array going to be modified
  var result = [];
  for (var i = 0; i < authorsCount; i++) {
    var x = generateRandomNumber(300, 900);
    var y = generateRandomNumber(100, 500);
    var rooms = generateRandomNumber(1, 5);

    result.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: popRandomElement(uniqueTitles),
        address: x + ', ' + y,
        price: generateRandomNumber(1000, 1000000),
        type: getRandomElement(TYPES, false),
        rooms: rooms,
        guests: generateRandomNumber(rooms, rooms * 2),
        checkin: getRandomElement(CHECKIN_OUT_TIMES),
        checkout: getRandomElement(CHECKIN_OUT_TIMES),
        features: generateRandomArray(FEATURES),
        description: '',
        photos: []
      },
      location: {
        x: x,
        y: y
      }
    });
  }

  return result;
}

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

function placePinsOnMap(authors) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < authors.length; i++) {
    fragment.appendChild(renderPin(authors[i]));
  }
  document.querySelector('.tokyo__pin-map').appendChild(fragment);
}

var keydownEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closeOfferDialog();
  }
};

function openOfferDialog(author) {
  if (!author) {
    return;
  }

  var newPanel = document.body.querySelector('#lodge-template').content.cloneNode(true);
  newPanel.querySelector('.lodge__title').textContent = author.offer.title;
  newPanel.querySelector('.lodge__address').textContent = author.offer.address;
  newPanel.querySelector('.lodge__price').innerHTML = author.offer.price + '&#x20bd;/ночь';
  newPanel.querySelector('.lodge__type').textContent = TYPES_TO_ACCOMODATION_NAME[author.offer.type];
  newPanel.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + author.offer.guests + ' гостей в ' + author.offer.rooms + ' комнатах';
  newPanel.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + author.offer.checkin + ', выезд до ' + author.offer.checkout;
  newPanel.querySelector('.lodge__description').textContent = author.offer.description;

  var featuresBlock = newPanel.querySelector('.lodge__features');
  for (var i = 0; i < author.offer.features.length; i++) {
    var span = document.createElement('span');
    span.classList.add('feature__image');
    span.classList.add('feature__image--' + author.offer.features[i]);
    featuresBlock.appendChild(span);
  }

  offerDialog.querySelector('.dialog__title > img').src = author.author.avatar;

  var panelToReplace = offerDialog.querySelector('.dialog__panel');
  offerDialog.replaceChild(newPanel, panelToReplace);

  offerDialog.style.display = 'block';
  document.addEventListener('keydown', keydownEscHandler);
}

var authors = generateAuthors();
placePinsOnMap(authors);
openOfferDialog(authors[0]);

// Map navigation
var activePin;

function findAuthor(avatar) {
  for (var i = 0; i < authors.length; i++) {
    if (avatar.endsWith(authors[i].author.avatar)) {
      return authors[i];
    }
  }
  return null;
}

function closeOfferDialog() {
  document.removeEventListener('keydown', keydownEscHandler);

  offerDialog.style.display = 'none';
  if (activePin) {
    activePin.classList.remove(ACTIVE_PIN_CLASS);
    activePin = null;
  }
}

function activatePin(pin) {
  pin.classList.add(ACTIVE_PIN_CLASS);
  if (activePin) {
    activePin.classList.remove(ACTIVE_PIN_CLASS);
  }
  activePin = pin;
}

var clickPinHandler = function (evt) {
  activatePin(evt.currentTarget);

  var avatar = activePin.childNodes[0].src;
  var author = findAuthor(avatar);
  openOfferDialog(author);
};

var enterKeydownCloseButtonHandler = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closeOfferDialog();
  }
};

var enterKeydownPinHandler = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    activatePin(evt.currentTarget);

    var avatar = activePin.childNodes[0].src;
    var author = findAuthor(avatar);
    openOfferDialog(author);
  }
};

var clickCloseButtonHandler = function () {
  closeOfferDialog();
};

var pins = document.body.querySelectorAll('.pin');
for (var i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', clickPinHandler);
  pins[i].addEventListener('keydown', enterKeydownPinHandler);
}

var closeButton = document.body.querySelector('.dialog__close');
// Following handlers added only once and are not removed dynamically because when dialog is closed, they are not reacts
closeButton.addEventListener('click', clickCloseButtonHandler);
closeButton.addEventListener('keydown', enterKeydownCloseButtonHandler);
