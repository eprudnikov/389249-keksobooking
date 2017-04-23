'use strict';

window.data = (function () {
  var findAuthor = function (avatar) {
    for (var i = 0; window.data.authors && i < window.data.authors.length; i++) {
      if (avatar.indexOf(window.data.authors[i].author.avatar) > 0) {
        return window.data.authors[i];
      }
    }
    return null;
  };

  var setAuthors = function (authors) {
    window.data.authors = authors;
  };

  return {
    authors: null,
    setAuthors: setAuthors,
    findAuthor: findAuthor
  };
}());
