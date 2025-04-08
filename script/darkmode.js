let theme = localStorage.getItem('theme');
// change to cookies later
document.addEventListener('DOMContentLoaded', () => {
  // similar to the click event listener but a bit different as it doesnt
  // switch to the oposite theme.
  // this makes default dark mode
  if (theme === 'light-mode') {
    // change to light
    switchToLightMode();
  } else {
    // change to dark
    switchToDarkMode();
  }
});

const toggleButton = document.getElementById('toggle-theme');
const body = document.getElementsByTagName('BODY').item(0);
toggleButton.addEventListener('click', () => {
  // update theme
  theme = localStorage.getItem('theme');

  if (theme === 'light-mode') {
    // swap to dark
    switchToDarkMode();
  } else {
    // swap to light
    switchToLightMode();
  }
});

function switchToLightMode() {
  body.classList.remove('dark-mode');

  // moon icon
  // toggleButton.innerHTML = '⏾';
  // since the moon icon doesnt work on chrome ive changed it to a cloud
  // emoji but the line height needs to be changed
  toggleButton.innerHTML = '☁︎';
  // toggleButton.style.filter = 'invert(1)';
  toggleButton.style.lineHeight = 'normal';
  toggleButton.style.backgroundColor = '#709df8';
  toggleButton.style.color = 'white';
  // save to local storage
  localStorage.setItem('theme', 'light-mode');
}
function switchToDarkMode() {
  body.classList.add('dark-mode');

  // sun icon
  // toggleButton.innerHTML = '☀︎';
  toggleButton.innerHTML = '☀';
  // toggleButton.style.filter = 'invert(0)';
  toggleButton.style.lineHeight = '0px';
  toggleButton.style.backgroundColor = '#fef26a';
  toggleButton.style.color = 'black';
  // save to local storage
  localStorage.setItem('theme', 'dark-mode');
}
