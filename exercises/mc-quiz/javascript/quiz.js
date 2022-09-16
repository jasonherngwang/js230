/*
Adapted from Cody's solution

Create a Quiz class.
- Instantiate a Quiz object upon DOM ready.
- Properties
  - quiz questions Array
  - answer key Object
  - Handlebars templates object
- Methods
  - Compile Handlebars templates
  - Register Handlebars partials
  - VIEW: Render the quiz
    - Create references to DOM elements.
  - CONTROLLER: Bind event handlers to DOM elements
  - MODEL: Data manipulation is performed by the event handlers. Data are stored as properties of the Quiz instance.
    - No async operations or interaction with external servers.

Events
- Initially Submit is enable, Reset Disabled
- Upon clicking the Submit button:
  - Gather the values of all questions (can be null)
  - Compare with the answer key
  - If correct, call a helper function to render a "Correct" message
  - If incorrect, call a helper function to render an "Incorrect" message
  - If unanswered, call a helper function to render an "Unanswered" message
  - Disable Submit button
  - Enable Reset button
- Upon clicking Reset:
  - Clear all selections
  - Clear all messages
  - Enable Submit
  - Disable Reset

*/
const quizQuestions = [
  {
    id: 1,
    description:
      "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: [
      'Dan Simmons',
      'Douglas Adams',
      'Stephen Fry',
      'Robert A. Heinlein',
    ],
  },
  {
    id: 2,
    description:
      'Which of the following numbers is the answer to Life, the Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
];

const answerKey = {
  1: 'Douglas Adams',
  2: '42',
  3: 'A drink',
  4: 'Betelgeuse',
};

class Quiz {
  constructor(quizQuestions, answerKey) {
    this.quizQuestions = quizQuestions;
    this.answerKey = answerKey;
    this.templates = {};

    this.compileTemplates();
    this.registerPartials();
    this.renderQuiz();
    this.attachEventHandlers();
  }

  compileTemplates() {
    document
      .querySelectorAll('script[data-template-type="template"]')
      .forEach((template) => {
        this.templates[template['id']] = Handlebars.compile(
          template['innerHTML']
        );
      });
  }

  registerPartials() {
    document
      .querySelectorAll('[data-template-type=partial]')
      .forEach((partial) => {
        Handlebars.registerPartial(partial['id'], partial['innerHTML']);
      });
  }

  renderQuiz() {
    const questionForm = document.querySelector('.questions');
    questionForm.insertAdjacentHTML(
      'afterbegin',
      this.templates.questions({ questions: this.quizQuestions })
    );
  }

  // result: correct, incorrect, unanswered
  renderQuestionResult(elem, answer, correctAnswer) {
    if (answer === undefined) {
      elem.textContent = `Wrong answer. Correct answer: "${correctAnswer}"`;
      elem.classList.add('incorrect');
    } else if (answer === correctAnswer) {
      elem.textContent = 'Correct answer!';
      elem.classList.add('correct');
    } else {
      elem.textContent = `You didn't answer this question. Correct answer: "${correctAnswer}"`;
      elem.classList.add('incorrect');
    }
  }

  removeQuestionResults() {
    [...document.querySelectorAll('.result')].forEach((result) => {
      result.textContent = '';
      result.classList.remove('correct', 'incorrect');
    });
  }

  checkAnswers() {
    const answers = Object.fromEntries(
      [...document.querySelectorAll('input[type=radio]:checked')].map(
        (input) => [input.name, input.value]
      )
    );
    Object.keys(answerKey).forEach((key) => {
      const resultElem = document.querySelector(
        `article[data-question-num="${key}"] .result`
      );
      this.renderQuestionResult(resultElem, answers[key], answerKey[key]);
    });
  }

  attachEventHandlers() {
    const form = document.querySelector('form');
    const submitButton = document.querySelector('[type="submit"]');
    const resetButton = document.querySelector('[type="reset"]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.checkAnswers();
      submitButton.toggleAttribute('disabled');
      resetButton.toggleAttribute('disabled');
    });

    resetButton.addEventListener('click', (e) => {
      e.preventDefault();
      form.reset();
      this.removeQuestionResults();
      resetButton.toggleAttribute('disabled');
      submitButton.toggleAttribute('disabled');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const quiz = new Quiz(quizQuestions, answerKey);
});
