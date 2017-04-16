'use strict';

(function () {
  window.ENTER_KEY_CODE = 13;
  window.ESC_KEY_CODE = 27;

  window.authors = window.generateAuthors();
  window.placePinsOnMap(window.authors);
  window.openCard(window.authors[0]);
}());
