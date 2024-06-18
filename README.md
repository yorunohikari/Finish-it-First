# Finish it First

Finish it First is a Chrome extension that helps users stay focused and productive by restricting web browsing until they complete a daily quiz. The extension blocks access to websites until the user successfully answers a set of randomly selected questions. Once the quiz is passed, the user can freely browse the web until the next day's quiz.

## Features

- Daily quiz with randomly selected questions
- Blocks access to websites until the quiz is completed
- Countdown timer for the next quiz
- Stores quiz scores and completion dates

## Installation

1. Clone or download the repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" by toggling the switch in the top-right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. After installation, the extension will automatically run in the background.
2. When attempting to access a website (except for Chrome settings pages), the extension will redirect you to the quiz page if the daily quiz has not been completed.
3. Answer the questions and submit the quiz. You need a score of at least 5 to pass.
4. Once the quiz is passed, you can freely browse the web until the next day's quiz.
5. The popup shows the current status and a countdown timer for the next quiz.

## Files

- `manifest.json`: The extension manifest file.
- `background.js`: The background script that manages quiz data and completion status.
- `content.js`: The content script that checks for quiz completion and redirects if necessary.
- `quiz.js`: The script that handles the quiz page functionality.
- `quiz.html`: The HTML file for the quiz page.
- `quiz-data.json`: A JSON file containing the quiz questions and answers.
- `popup.js`: The script that handles the extension popup functionality.
- `popup.html`: The HTML file for the extension popup.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
