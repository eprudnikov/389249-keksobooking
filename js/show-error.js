'use strict';

window.showError = (function () {
  return function (text) {
    var errorElement = document.body.querySelector('.error');
    var messageElement = errorElement.querySelector('.error__message');
    messageElement.innerText = text;
    errorElement.style.display = 'block';
  };
}());
