'use strict';

window.card = (function () {
  var offerDialog = document.body.querySelector('#offer-dialog');

  function closeCard() {
    document.removeEventListener('keydown', keydownEscHandler);
    offerDialog.style.display = 'none';
    window.pin.deactivatePin();
  }

  var enterKeydownCloseButtonHandler = function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEY_CODE) {
      closeCard();
    }
  };

  var clickCloseButtonHandler = function () {
    closeCard();
  };

  var keydownEscHandler = function (evt) {
    if (evt.keyCode === window.constants.ESC_KEY_CODE) {
      closeCard();
    }
  };

  var closeButton = document.body.querySelector('.dialog__close');
// Following handlers added only once and are not removed dynamically because when dialog is closed, they are not reacts
  closeButton.addEventListener('click', clickCloseButtonHandler);
  closeButton.addEventListener('keydown', enterKeydownCloseButtonHandler);

  return {
    keydownEscHandler: keydownEscHandler
  };
}());
