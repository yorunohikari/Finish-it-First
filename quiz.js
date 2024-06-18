// quiz.js

let originalUrl = null; // Variable to store the original URL

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the original URL from sessionStorage
    originalUrl = sessionStorage.getItem('originalUrl');

    const quizContainer = document.getElementById("quiz-container");
    const submitButton = document.getElementById("submit-quiz");
    const resultsElement = document.getElementById("results");
    let questions = [];
    let userAnswers = {};

    // Fetch quiz questions
    fetch(chrome.runtime.getURL('quiz-data.json'))
        .then(response => response.json())
        .then(data => {
            questions = getRandomQuestions(data.questions, 10);
            displayQuestions(questions);
        });

    function getRandomQuestions(questions, number) {
        const shuffled = questions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, number);
    }

    function displayQuestions(questions) {
        questions.forEach((question, index) => {
            const questionElement = document.createElement("div");
            questionElement.className = "question";
            questionElement.innerHTML = `
          <p>${index + 1}. ${question.question.replace(/<em>(.*?)<\/em>/g, '<span class="underscore">$1</span>')}</p>
          <ul class="options">
            ${question.options.map(option => `
              <li>
                <label>
                  <input type="radio" name="answer-${index}" value="${Object.keys(option)[0]}">
                  ${Object.values(option)[0]}
                </label>
              </li>`).join("")}
          </ul>
        `;
            quizContainer.appendChild(questionElement);
        });
        submitButton.disabled = false;
    }

    submitButton.addEventListener("click", function () {
        questions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="answer-${index}"]:checked`);
            if (selectedOption) {
                userAnswers[index] = parseInt(selectedOption.value, 10);
            }
        });
        const score = calculateScore(questions, userAnswers);
        displayResults(score);
        if (score >= 5) {
            displayPassedMessage(score);
            closeQuizTab();
        } else {
            setTimeout(() => {
                alert('You need a score of at least 5 to continue.');
                location.reload();
            }, 1000);
        }
    });

    function calculateScore(questions, answers) {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (question.answer === answers[index]) {
                correctAnswers++;
            }
        });
        return correctAnswers;
    }

    function displayResults(score) {
        resultsElement.innerHTML = `<p>Your Score: ${score}/10</p>`;
    }

    function displayPassedMessage(score) {
        resultsElement.innerHTML = `<p>Your Score: ${score}/10</p><br><p>You Passed!</p>`;
        saveQuizResult(10);
    }

    function saveQuizResult(score) {
        const today = new Date().toDateString();
        const nextQuizDate = getNextQuizDate();
        chrome.storage.local.set({ lastQuizDate: today, quizScore: score, nextQuizDate }, () => {
            console.log(`Quiz result saved: Score ${score}`);
        });
    }

    function getNextQuizDate() {
        const now = new Date();
        const tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000));
        tomorrow.setHours(9, 0, 0, 0); // Set the time for the next quiz (e.g., 9:00 AM)
        return tomorrow.getTime();
    }

    function closeQuizTab() {
        setTimeout(() => {
            if (originalUrl) {
                // Redirect back to the original URL
                window.location.href = originalUrl;
            } else {
                // Close the tab if no original URL is found
                window.location.href = "https://duckduckgo.com/";
            }
        }, 2000); // Close the tab after 2 seconds
    }
});
