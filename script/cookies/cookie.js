document.addEventListener('DOMContentLoaded', function () {
  // Check if the user has already given consent (stored in localStorage)

  const consentGiven = localStorage.getItem('cookieConsent');
  const banner = document.getElementById('cookie-consent-banner');

  // If no consent is found, display the banner
  if (!consentGiven) {
    banner.style.display = 'block'; // Show the banner
  }

  // When "Accept Cookies" is clicked, save consent and hide the banner
  document.getElementById('accept-cookies').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'true');
    banner.style.display = 'none'; // Hide the banner
  });

  // When "Decline" is clicked, save no consent and hide the banner
  document.getElementById('decline-cookies').addEventListener('click', () => {
    // localStorage.setItem('cookieConsent', 'false');
    banner.style.display = 'none'; // Hide the banner
  });
});

// just for testing
// localStorage.removeItem('cookieConsent');
