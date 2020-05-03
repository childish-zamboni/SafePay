'use strict';

var cards;

document.addEventListener('DOMContentLoaded', function() {
  cards = JSON.parse(localStorage.getItem('cards_str'));
});
