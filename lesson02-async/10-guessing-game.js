document.addEventListener('DOMContentLoaded', () => {
  const inputGuess = document.querySelector('#guess');
  const form = document.querySelector('form');
  const gameMessage = document.querySelector('p');
  const newGameLink = document.querySelector('a');
  const button = document.querySelector('input[type="submit"]');
  let answer;
  let guesses;

  function generateRandomNum(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  function newGame() {
    form.reset();
    answer = generateRandomNum(1, 2);
    guesses = 0;
    button.disabled = false;
    gameMessage.textContent = 'Guess a number from 1 to 100.';
  }

  function isValidInput(str) {
    if (/^\d{1,3}$/.test(str)) {
      let guess = parseInt(inputGuess.value, 10);
      return guess >= 1 && guess <= 100;
    }
    return false;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault;

    let guess = inputGuess.value;
    let message;

    if (isValidInput(guess)) {
      guess = parseInt(inputGuess.value, 10);

      guesses += 1;

      if (guess > answer) {
        message = `My number is lower than ${String(guess)}.`;
      } else if (guess < answer) {
        message = `My number is higher than ${String(guess)}.`;
      } else {
        message = `You guessed right! It took ${guesses} guesses.`;
        button.disabled = true;
      }
    } else {
      message = `Invalid guess. Guess a number from 1 to 100.`;
    }

    gameMessage.textContent = message;
  });

  newGameLink.addEventListener('click', (event) => {
    event.preventDefault();
    newGame();
  });

  newGame();
});
