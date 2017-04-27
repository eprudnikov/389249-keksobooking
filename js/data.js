'use strict';

window.data = (function () {
  var findAuthor = function (avatar) {
    return window.data.authors && window.data.authors.find(function (author) {
      return avatar.indexOf(author.author.avatar) > 0;
    });
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
