const appConfig = new blockstack.AppConfig();
const userSession = new blockstack.UserSession({ appConfig: appConfig });
var cards = [];

function getCards() {
  const options = { decrypt: true };
  userSession.getFile("cards", options).then(function(content) {
    if (content) {
      cards = JSON.parse(content);
    }
    sendToParent(cards);
  })
}

function saveCard() {
  const options = { encrypt: true };
  userSession.putFile("cards", JSON.stringify(cards), options);
}

function newCard(label, name, number, date) {
  cards.push({
    label: label,
    name: name,
    number: number,
    date: date
  });
  saveCard()
}

function deleteCard(card) {
  for (i=0; i<cards.length; i++) {
    if (cards[i].name === card.name && cards[i].number === card.number) {
      cards.splice(i, 1);
      return;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('signin-button').addEventListener('click', function (event) {
      event.preventDefault();
      userSession.redirectToSignIn();
    })
    /*document.getElementById('signout-button').addEventListener('click', function (event) {
      event.preventDefault();
      userSession.signUserOut(window.location.href);
    })*/

    if (userSession.isUserSignedIn()) {
      var profile = userSession.loadUserData().profile
      document.getElementById('section-1').style.display = "none";
      document.getElementById('section-2').style.display = "block";
      document.getElementById('username').innerHTML = userSession.loadUserData().profile.name;
      getCards();
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(function (userData) {
        window.location = window.location.origin;
      })
    }
  })

function sendToParent() {
  window.opener.postMessage(JSON.stringify(cards), "*");
}
