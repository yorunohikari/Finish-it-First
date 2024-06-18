// content.js

// List of Chrome settings URLs to exclude from blocking
const chromeSettingsUrls = [
  "chrome://settings/",
  "chrome://extensions/",
  "chrome://flags/",
  "chrome://about/",
  "chrome://system/"
];

// Check if the current tab is a Chrome settings page
function isChromeSettingsPage(url) {
  return chromeSettingsUrls.some(settingsUrl => url.startsWith(settingsUrl));
}

// content.js
chrome.runtime.sendMessage({ action: 'isQuizCompletedToday' }, (response) => {
  const currentUrl = window.location.href;

  if (!response.completed && !isChromeSettingsPage(currentUrl)) {
    // Store the current URL in sessionStorage
    sessionStorage.setItem('originalUrl', currentUrl);
    window.location.href = chrome.runtime.getURL('quiz.html');
  }
});


