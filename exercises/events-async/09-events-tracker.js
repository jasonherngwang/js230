/*
track(callback)
- Returns function that
  - Adds event to tracker object
  - Executes callback


*/

'use strict';

class Tracker {
  #events;

  constructor() {
    this.#events = new Set();
  }

  add(event) {
    if (!this.#events.has(event)) this.#events.add(event);
  }

  list() {
    return [...this.#events];
  }

  elements() {
    return this.list().map(({ target }) => target);
  }

  clear() {
    this.#events.clear();
    return this.#events.size;
  }
}

const tracker = new Tracker();

function track(callback) {
  return (event) => {
    event.stopPropagation();
    tracker.add(event);
    callback(event);
  };
}

const divRed = document.querySelector('div#red');
const divBlue = document.querySelector('div#blue');
const divOrange = document.querySelector('div#orange');
const divGreen = document.querySelector('div#green');

divRed.addEventListener(
  'click',
  track((event) => (document.body.style.background = 'red'))
);

divBlue.addEventListener(
  'click',
  track((event) => (document.body.style.background = 'blue'))
);

divOrange.addEventListener(
  'click',
  track((event) => (document.body.style.background = 'orange'))
);

divGreen.addEventListener(
  'click',
  track((event) => (document.body.style.background = 'green'))
);

// console.log(tracker.list().length);
// console.log(tracker.elements());
// console.log(tracker.elements()[0] === document.querySelector('#blue'));
// console.log(tracker.elements()[3] === document.querySelector('#green'));
// console.log(tracker.list()[0]);
// console.log(tracker.clear());
// console.log(tracker.list());
// console.log((tracker.list()[0] = 'abc'));
// console.log(tracker.list().length);
