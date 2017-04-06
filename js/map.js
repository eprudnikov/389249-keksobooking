'use strict';

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

function generateRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomElement(array, shiftElement) {
  do {
    var randomIndex = generateRandomNumber(0, array.length - 1);
    var randomElement = array[randomIndex];

    if (shiftElement) {
      array[randomIndex] = null;
    }
  } while (!randomElement);

  return randomElement;
}

function generateRandomArray(baseArray) {
  var elementsNumber = generateRandomNumber(0, baseArray.length - 1);
  var randomArray = [];

  for (var i = 0; i < elementsNumber; i++) {
    for (;;) {
      var randomElement = getRandomElement(baseArray, false);
      if (randomArray.indexOf(randomElement) === -1) {
        randomArray.push(randomElement);
        break;
      }
    }
  }

  return randomArray;
}

function generateAuthors() {
  var numberOfAuthors = 8;
  var result = [];
  for (var i = 0; i < numberOfAuthors; i++) {
    var x = generateRandomNumber(300, 900);
    var y = generateRandomNumber(100, 500);
    var rooms = generateRandomNumber(1, 5);

    result.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomElement(Array.from(TITLES), true),
        address: x + ', ' + y,
        price: generateRandomNumber(1000, 1000000),
        type: getRandomElement(TYPES, false),
        rooms: rooms,
        guests: generateRandomNumber(rooms, rooms * 2),
        checkin: getRandomElement(CHECKIN_OUT_TIMES, false),
        checkout: getRandomElement(CHECKIN_OUT_TIMES, false),
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

function renderAuthor(author) {
  var pinWidth = 56; // px
  var pinHeight = 75; // px

  var div = document.createElement('div');
  div.classList.add('pin');
  div.style.left = (author.location.x + Math.round(pinWidth / 2)) + 'px';
  div.style.top = (author.location.y + pinHeight) + 'px';
  var img = document.createElement('img');
  img.src = author.author.avatar;
  img.classList.add('rounded');
  img.width = 40;
  img.height = 40;
  div.appendChild(img);
  return div;
}

function renderAuthors(authors) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < authors.length; i++) {
    fragment.appendChild(renderAuthor(authors[i]));
  }
  document.querySelector('.tokyo__pin-map').appendChild(fragment);
}

function renderAuthorInDialogPanel(author) {
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

  var dialog = document.body.querySelector('#offer-dialog');
  dialog.querySelector('.dialog__title > img').src = author.author.avatar;

  var panelToReplace = dialog.querySelector('.dialog__panel');
  dialog.replaceChild(newPanel, panelToReplace);
}

var authors = generateAuthors();
renderAuthors(authors);
renderAuthorInDialogPanel(authors[0]);

