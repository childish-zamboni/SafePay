'use strict';

var addScreen, deleteScreen;

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {});

    document.getElementById('add-card').addEventListener('click', function (event) {
        addScreen = window.open('https://safepay-b2c1f.firebaseapp.com/add.html','popup','width=450,height=600');
    })

    document.getElementById('logout').addEventListener('click', function(event) {
      window.open('https://safepay-b2c1f.firebaseapp.com/logout.html','popup','width=450,height=600');
      window.open('popup.html', '_self')
    })
    displayCards();
    //document.body.innerHTML = localStorage.getItem('cards_str');
  });


  window.addEventListener("message", receiveMessage, false);

  function receiveMessage(event) {
    try{
      addScreen.close();
    } catch(e) {}

    try {
      deleteScreen.close()
    } catch(e) {}
    localStorage.setItem('cards_str', event.data);
    displayCards();
  }

  function deleteCard(cardNumber) {
    deleteScreen = window.open('https://safepay-b2c1f.firebaseapp.com/delete.html',cardNumber,'width=1,height=1');
  }

function displayCards() {
  var myCards = localStorage.getItem('cards_str')
  myCards = JSON.parse(myCards);
  var list = document.getElementById('cards')
  list.innerHTML = ''
  for (var i=0; i<myCards.length; i++) {
    var el = document.createElement('li')
    el.innerHTML = '<div class="collapsible-body"><span class="white-text">Number : ' + myCards[i].number + '</span><div><span class="white-text">Cardholder : ' + myCards[i].name + '</span></div><div><span class="white-text">Expiry Date : ' + myCards[i].date + '</span></div></div>'

    var temp = document.createElement('div')
    temp.classList.add('collapsible-header')
    temp.innerHTML = '<i class="material-icons">payment</i>' + myCards[i].label


    var del = document.createElement('i')
    del.innerHTML = 'delete'
    del.classList.add('material-icons')
    del.style = "right:30px; position: absolute"

    del.addEventListener('click', function(e) {
      var no = this.parentNode.parentNode.lastChild.firstChild.innerHTML
      deleteCard(no.substring(9))
    })

    temp.appendChild(del)
    el.insertBefore(temp, el.firstChild)
    list.appendChild(el)
  }
}
