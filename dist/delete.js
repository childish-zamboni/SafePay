const appConfig = new blockstack.AppConfig();
const userSession = new blockstack.UserSession({ appConfig: appConfig });
var cards = [];

document.addEventListener('DOMContentLoaded', function() {
  const options = { decrypt: true };
  userSession.getFile("cards", options).then(function(content) {
    cards = JSON.parse(content)
    for (let i=0; i<cards.length; i++) {
      if (cards[i].number == window.name) {
        cards.splice(i, 1)
        break
      }
    }

    const options2 = { encrypt: true };
    userSession.putFile("cards", JSON.stringify(cards), options2).then(function(e) {
      sendToParent(JSON.stringify(cards));
    });
  })
});


function sendToParent(info) {
  window.opener.postMessage(info, "*");
}
