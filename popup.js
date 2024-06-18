// popup.js

document.addEventListener("DOMContentLoaded", function () {
  const messageElement = document.getElementById("message");
  const countdownElement = document.getElementById("countdown");

  // Ask background script if quiz is completed today
  chrome.runtime.sendMessage({ action: "isQuizCompletedToday" }, function (response) {
    if (response.completed) {
      messageElement.textContent = "You're good to go!";
      displayCountdown(response.nextQuizDate);
    } else {
      messageElement.textContent = "Please complete the quiz to continue surfing web.";
    }
  });

  function displayCountdown(nextQuizDate) {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextQuizDate - now;
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      countdownElement.textContent = `Next quiz in ${hours}h ${minutes}m ${seconds}s`;

      if (distance < 0) {
        clearInterval(countdown);
        countdownElement.textContent = "Time for the next quiz!";
      }
    }, 1000);
  }
});

document.addEventListener("mousemove", function (event) {
  const logo = document.getElementById("logo");

  // Calculate the position of the logo relative to the mouse cursor
  const xPos = event.clientX / window.innerWidth * 40 - 20;
  const yPos = event.clientY / window.innerHeight * 40 - 20;

  // Apply the calculated position as a CSS transform
  logo.style.transform = `translate(${xPos}px, ${yPos}px) rotateY(${xPos}deg) rotateX(${-yPos}deg)`;
});
