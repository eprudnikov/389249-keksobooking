'use strict';

window.load = (function () {
  var onErrorDefault = function (xhr) {
    var defaultErrorMessage = 'Произошла ошибка при попытке получить данные';
    var message = xhr.statusText || defaultErrorMessage;
    window.showError(message);
  };

  return function (url, onSuccess, onError) {
    onError = typeof onError === 'function' ? onError : onErrorDefault;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr);
      }
    });

    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', function () {
      var timeoutXhr = {
        statusText: 'Время ожидания ответа от сервера истекло'
      };
      onError(timeoutXhr);
    });

    xhr.open('GET', url);
    xhr.send();
  };
}());
