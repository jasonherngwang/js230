// Adapted from Wayne's solution
class Game {
  static MAX_GUESSES = 6;

  static messages = {
    won: 'You won!',
    lost: 'You lost...',
    outOfWords: "Sorry, I've run out of words.",
  };

  static wordsRemaining = true;

  static randomWord = (() => {
    const words = ['apple', 'banana', 'orange', 'pear'];

    return () => {
      const randomIndex = Math.floor(Math.random() * words.length);
      const word = words.splice(randomIndex, 1)[0];
      this.wordsRemaining = words.length > 0;
      console.log(words);
      return word;
    };
  })();

  constructor() {
    // Element references
    this.body = document.querySelector('body');
    this.apples = document.querySelector('#apples');
    this.spacesContainer = document.querySelector('#spaces');
    this.guessesContainer = document.querySelector('#guesses');
    this.messageContainer = document.querySelector('#message');
    this.replayLink = document.querySelector('#replay');

    this.word = Game.randomWord();
    this.incorrectGuesses = 0;
    this.guesses = new Set();

    this.createSpaces();
  }

  createSpaces() {
    for (let i = 0; i < this.word.length; i += 1) {
      const space = document.createElement('span');
      space.setAttribute('id', String(i));
      this.spacesContainer.appendChild(space);
    }
  }

  removeSpans() {
    document.querySelectorAll('span').forEach((span) => span.remove());
  }

  showGuess(letter) {
    const guess = document.createElement('span');
    guess.textContent = letter;
    this.guessesContainer.appendChild(guess);
  }

  findIndicesOfChar(letter, word) {
    const indices = [];

    for (let i = 0; i < word.length; i += 1) {
      if (letter === word[i]) indices.push(i);
    }

    return indices;
  }

  showMatch(letter) {
    const indices = this.findIndicesOfChar(letter, this.word);
    indices.forEach((index) => {
      document.querySelector('span#' + CSS.escape(index)).textContent = letter;
    });
  }

  removeApple() {
    this.apples.className = `guess_${this.incorrectGuesses}`;
  }

  gameLost() {
    return this.incorrectGuesses === Game.MAX_GUESSES;
  }

  gameWon() {
    return [...this.word].every((letter) => this.guesses.has(letter));
  }

  checkStatus() {
    if (this.gameWon()) {
      this.displayMessage(Game.messages.won);
      this.body.className = 'win';
    } else if (this.gameLost()) {
      this.displayMessage(Game.messages.lost);
      this.body.className = 'lose';
    } else {
      return;
    }
    this.replayLink.textContent = 'Play another';
  }

  displayMessage(message) {
    this.messageContainer.textContent = message;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let game;

  const newGame = function () {
    game = new Game();
    addListeners();
  };

  const makeGuess = function (e) {
    const letter = e.key.toLowerCase();

    // If guess is a-z and hasn't been guessed before
    if (/^[a-z]$/i.test(letter) && !game.guesses.has(letter)) {
      game.guesses.add(letter);
      game.showGuess(letter);

      if (game.word.includes(letter)) {
        game.showMatch(letter);
      } else {
        game.incorrectGuesses += 1;
        game.removeApple();
      }

      game.checkStatus();

      // Don't allow the player to keep guessing.
      if (game.body.className === 'win' || game.body.className === 'lose') {
        document.removeEventListener('keyup', makeGuess);
      }
    }
  };

  const reset = function () {
    game.replayLink.replaceChildren();

    if (!Game.wordsRemaining) {
      game.displayMessage(Game.messages.outOfWords);
      removeListeners();
      return;
    }

    game.apples.className = '';
    game.body.className = '';

    game.removeSpans();
    game.displayMessage('');
    game.guesses.clear();

    game.incorrectGuesses = 0;

    removeListeners();
    newGame();
  };

  const replayGame = function (e) {
    e.preventDefault();
    reset();
  };

  const removeListeners = function () {
    document.removeEventListener('keyup', makeGuess);
    game.replayLink.removeEventListener('click', replayGame);
  };

  const addListeners = function () {
    document.addEventListener('keyup', makeGuess);
    game.replayLink.addEventListener('click', replayGame);
  };

  newGame();
});
