const appConfig = new blockstack.AppConfig();
const userSession = new blockstack.UserSession({ appConfig: appConfig });
var cards = [];

function uploadCard(newCard) {
  const options = { decrypt: true };
  userSession.getFile("cards", options).then(function(content) {
    if (content) {
      cards = JSON.parse(content);
    }

    for (let card of cards) {
      if (card.number == newCard.number) {
        window.close()
      }
    }

    cards.push(newCard);
    const options2 = { encrypt: true };
    userSession.putFile("cards", JSON.stringify(cards), options2).then(function(e) {
      sendToParent(JSON.stringify(cards));
    });
  })
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('add-button').addEventListener('click', function (event) {
    var label = document.getElementById('Label').value;
    var name = document.getElementById('Cardholder-Name').value;
    var number = document.getElementById('Card-Number').value;
    var date = document.getElementById('Card-Expiry-Date').value;
    var newCard = {
      label:label,
      name:name,
      number:number,
      date:date
    };
    uploadCard(newCard);
  });
});


function sendToParent(info) {
  window.opener.postMessage(info, "*");
}
