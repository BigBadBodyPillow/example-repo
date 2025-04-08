const font = sessionStorage.getItem('font');
const cartItems = localStorage.getItem('cartItems');
const cookieConsent = localStorage.getItem('cookieConsent');
const usernameCookie = document.cookie;

// console.log(font);
// console.log(cartItems);
// console.log(cookieConsent);
// console.log(usernameCookie);

const resetButton = document.querySelector('#reset-preferences');

//delete all the stuff
resetButton.onclick = () => {
  sessionStorage.removeItem('font');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('cookieConsent');
  // change to a past date to delete
  document.cookie = `username="";expires=Thu, 01 Jan 1756 00:00:00 UTC;`;

  window.location.reload();
};
