'use strict';

window.data = (function () {
  var findAuthor = function (avatar) {
    if (!window.data.authors) {
      throw new Error('Объявления недоступны');
    }
    for (var i = 0; i < window.data.authors.length; i++) {
      if (avatar.endsWith(window.data.authors[i].author.avatar)) {
        return window.data.authors[i];
      }
    }
    return null;
  };

  return {
    authors: null,
    findAuthor: findAuthor
  };
}());
