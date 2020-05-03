cards = JSON.parse(localStorage.getItem('cards_str'));

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('add-button').addEventListener('click', function (event) {
    cards.push(1);
    localStorage.setItem('cards_str', JSON.stringify(cards));
    window.open('/main.html', '_self');
  });
});
