'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var CHECKIN_OUT_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function getRandomElement(array, shiftElement) {
  do {
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];

    if (shiftElement) {
      array[randomIndex] = null;
    }
  } while (!randomElement);

  return randomElement;
}

function generateRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function generateRandomArray(baseArray) {
  var elementsNumber = Math.floor(Math.random() * baseArray.length);
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
    result.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomElement(Array.from(TITLES), true),
        address: '{{location.x}}, {{location.y}}',
        price: generateRandomNumber(1000, 1000000),
        type: getRandomElement(TYPES, false),
        rooms: generateRandomNumber(1, 5),
        guests: generateRandomNumber(2, 8),
        checkin: getRandomElement(CHECKIN_OUT_TIMES, false),
        checkout: getRandomElement(CHECKIN_OUT_TIMES, false),
        features: generateRandomArray(FEATURES),
        description: '',
        photos: []
      },
      location: {
        x: generateRandomNumber(300, 900),
        y: generateRandomNumber(100, 500)
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

var authors = generateAuthors();
renderAuthors(authors);

// 3. Put those blocks into block .tokyo__pin-map using DocumentFragment.

// 4. Put 1st element of the array into a block .dialog__panel using template #lodge-template.
