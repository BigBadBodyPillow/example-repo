const select = document.querySelector('#fonts-select');
const storedFont = sessionStorage.getItem('font');

// change font when dom is loaded
document.addEventListener('DOMContentLoaded', () => {
  checkStorage();
  // change font when a new font is selected
  select.addEventListener('change', () => {
    selectedFont = select.value;
    setFont(selectedFont);
  });
});

// check if there is a font is sessionStorage
function checkStorage() {
  // if there is, change the documents file to that font
  if (storedFont) {
    setFont(storedFont);
  }
  // if not set to default
  else {
    setFont('Space Grotesk');
  }
}

// update the fonts
function setFont(font) {
  const body = document.querySelector('body');
  const buttons = document.querySelectorAll('button');
  const input = document.querySelector('#username-input');

  // change the body, button and the select fonts and add to storage
  select.style.fontFamily = font;
  body.style.fontFamily = font;
  buttons.forEach((button) => (button.style.fontFamily = font));
  input.style.fontFamily = font;
  sessionStorage.setItem('font', font);
  // now that i think about it, it might have been better to just have
  // different css classes and the class changes the font
}
