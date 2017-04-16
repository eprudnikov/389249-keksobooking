'use strict';

(function () {
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

  window.generateAuthors = function () {
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
  };

  window.findAuthor = function (avatar) {
    for (var i = 0; i < window.authors.length; i++) {
      if (avatar.endsWith(window.authors[i].author.avatar)) {
        return window.authors[i];
      }
    }
    return null;
  };
}());
