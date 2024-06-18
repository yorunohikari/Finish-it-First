// background.js

let quizData = [];
let today = new Date().toDateString();
let nextQuizDate = getNextQuizDate(); // Add this line

function getNextQuizDate() {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000));
  tomorrow.setHours(9, 0, 0, 0); // Set the time for the next quiz (e.g., 9:00 AM)
  return tomorrow.getTime();
}

// Check if the user has completed the quiz today
function isQuizCompletedToday(callback) {
  chrome.storage.local.get(['lastQuizDate', 'quizScore', 'nextQuizDate'], (result) => {
    const completed = result.lastQuizDate === today && result.quizScore >= 5;
    callback({ completed, nextQuizDate: result.nextQuizDate || nextQuizDate });
  });
}

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'isQuizCompletedToday') {
    isQuizCompletedToday((response) => {
      sendResponse(response);
    });
    return true; // Indicate async response
  }
});