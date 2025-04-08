// text of button
let settingsButton = document.getElementById('settings');
const input = document.querySelector('#username-input');
const cookie = document.cookie;
let username;

// check if there is a cookie
if (cookie === '') {
} else {
  handleUsername(cookie);
}
// when input text is changed
input.onchange = (event) => {
  // event.preventDefault();
  username = input.value;
  handleUsername(username);
};

function handleUsername(name) {
  name = name.split('username=').pop();
  // do nothing if its an empty string
  if (name === '') return;
  settingsButton.textContent = `Welcome ${name}`;
  settingsButton.style.animation = 'none';

  // check if user has given consent to store cookies
  // im pretty sure this is only necessary if you send data to a sever
  // but i just kept this here anyways
  const consent = localStorage.getItem('cookieConsent');
  if (consent == 'true') {
    document.cookie = `username=${name}`;
  }
}
