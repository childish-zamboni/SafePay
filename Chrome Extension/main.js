'use strict';

var addScreen;

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});

    document.getElementById('add-card').addEventListener('click', function (event) {
        addScreen = window.open('https://safepay-b2c1f.firebaseapp.com/add.html','popup','width=450,height=600');
    })
    displayCards();
    //document.body.innerHTML = localStorage.getItem('cards_str');
  });


  window.addEventListener("message", receiveMessage, false);

  function receiveMessage(event) {
    addScreen.close();
    var current = JSON.parse(localStorage.getItem('cards_str'))
    current.push(JSON.parse(event.data));
    localStorage.setItem('cards_str', JSON.stringify(current));
    displayCards();
  }

function displayCards(myCards) {
  var myCards = localStorage.getItem('cards_str');
  var list = document.getElementById('cards')
  for (var i=0; i<myCards.length; i++) {
    list.innerHTML += '<li><div class="collapsible-header"><i class="material-icons">payment</i>' + myCards[0].label + '</div><div class="collapsible-body"><span class="white-text">'+ myCards[0].number +'</span><div class = "row"><span class="white-text">'+ myCards[0].date +'</span></div></div></li>'
  }
}
