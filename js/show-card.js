'use strict';

window.showCard = (function () {
  var TYPES_TO_ACCOMODATION_NAME = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var offerDialog = document.body.querySelector('#offer-dialog');

  return function (author) {
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
    author.offer.features.forEach(function (feature) {
      var span = document.createElement('span');
      span.classList.add('feature__image');
      span.classList.add('feature__image--' + feature);
      featuresBlock.appendChild(span);
    });

    offerDialog.querySelector('.dialog__title > img').src = author.author.avatar;

    var panelToReplace = offerDialog.querySelector('.dialog__panel');
    offerDialog.replaceChild(newPanel, panelToReplace);

    offerDialog.style.display = 'block';
    document.addEventListener('keydown', window.card.keydownEscHandler);
  };
}());
