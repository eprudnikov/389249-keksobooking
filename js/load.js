'use strict';

window.load = (function () {
  var DEFAULT_ERROR_MESSAGE = 'Произошла ошибка при попытке получить данные';

  var onErrorDefault = function (message, code) {
    message = message ? message : DEFAULT_ERROR_MESSAGE;
    window.showError(message);
  };

  return function (url, onSuccess, onError) {
    onError = onError ? onError : onErrorDefault;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.statusText, xhr.status);
      }
    });

    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', function () {
      onError('Время ожидания ответа от сервера истекло');
    });

    xhr.open('GET', url);
    xhr.send();
  };
}());
