var loginScreen;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('sign_in').addEventListener('click', function (event) {
    //event.preventDefault();
<<<<<<< HEAD
    loginScreen = window.open('https://safepay-b2c1f.firebaseapp.com/','popup','width=420,height=344');
=======
    loginScreen = window.open('https://safepay-b2c1f.firebaseapp.com/','popup','width=439px,height=380px');
>>>>>>> e28f445d2f2966e9e05542b86b188d8001addac4
  });
});

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
  loginScreen.close();
  localStorage.setItem('cards_str', event.data);
  window.open('/main.html', '_self')
}
