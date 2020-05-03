var loginScreen;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('sign_in').addEventListener('click', function (event) {
    //event.preventDefault();
    loginScreen = window.open('https://safepay-b2c1f.firebaseapp.com/','popup','width=600,height=600');
  });
});

var cards;

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  loginScreen.close();
  cards = JSON.parse(event.data);
  var newWin = window.open("/main.html?cards=" + event.data, "_self");
}
