var loginScreen;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('sign_in').addEventListener('click', function (event) {
    //event.preventDefault();
    loginScreen = window.open('https://safepay-b2c1f.firebaseapp.com/','popup','width=439px,height=380px');
  });
});

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  loginScreen.close();
  localStorage.setItem('cards_str', event.data);
  window.open('/main.html', '_self')
}
