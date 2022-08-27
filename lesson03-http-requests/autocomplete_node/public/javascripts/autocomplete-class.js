import debounce from './debounce.js';

class Autocomplete {
  constructor(input, url) {
    this.input = input;
    this.url = url;

    this.listUI = null;
    this.overlay = null;

    this.visible = false;
    this.matches = [];
    this.selectedIndex = null;
    this.bestMatchIndex = null;

    this.wrapInput();
    this.createUI();

    this.valueChanged = debounce(this.valueChanged.bind(this), 300);

    this.bindEvents();
    this.reset();
  }

  wrapInput() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('autocomplete-wrapper');
    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input);
  }

  createUI() {
    // Unordered list of country names, in drop-down menu
    let listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    // Add ul to wrapper (now a sibling of input)
    this.input.parentNode.appendChild(listUI);
    // Create new property listUI
    this.listUI = listUI;

    // Add div to wrapper (now a sibling of input)
    // Grey text inside input, indicating first choice.
    let overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = `${this.input.clientWidth}px`;

    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  }

  // Perform async XHR request every time we type something.
  fetchMatches(query, callback) {
    let request = new XMLHttpRequest();

    request.addEventListener('load', () => {
      callback(request.response);
    });

    request.open('GET', `${this.url}${encodeURIComponent(query)}`);
    request.responseType = 'json';
    request.send();
  }

  bindEvents() {
    // `bind` returns new function that calls the method with explicit
    // function execution context of the input element.
    this.input.addEventListener('input', this.valueChanged);
    // this.input.addEventListener('keydown', this.handleKeydown.bind(this));
    this.input.addEventListener('keydown', this.handleKeydown);
    this.listUI.addEventListener('click', this.handleMousedown.bind(this));
  }

  handleKeydown(event) {
    console.log(event.key);
    console.log(event.currentTarget);
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        // Select 1st item, or wrap around from bottom to top.
        if (
          this.selectedIndex === null ||
          this.selectedIndex === this.matches.length - 1
        ) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex += 1;
        }
        // If selecting from the list, clear overlay.
        this.bestMatchIndex = null;
        this.draw();
        break;
      case 'ArrowUp':
        event.preventDefault();
        // Select last item, or wrap around from top to bottom.
        if (this.selectedIndex === null || this.selectedIndex === 0) {
          this.selectedIndex = this.matches.length - 1;
        } else {
          this.selectedIndex -= 1;
        }
        // If selecting from the list, clear overlay.
        this.bestMatchIndex = null;
        this.draw();
        break;
      // Tab only works when we are focused on the input, not when selecting a
      // match. If no match, or we are in the list, Tab jumps to address bar.
      case 'Tab':
        if (this.bestMatchIndex !== null && this.matches.length !== 0) {
          // Autocompletes input with best match.
          this.input.value = this.matches[this.bestMatchIndex].name;
          event.preventDefault();
        }
        // Best match autofilled; clear drop-down list.
        this.reset();
        break;
      // If we are in the list and don't want the options, Esc restores what we
      // originally typed. Enter accepts the value.
      case 'Enter':
        this.reset();
        break;
      case 'Escape':
        this.input.value = this.previousValue;
        this.reset();
        break;
    }
  }

  handleMousedown(event) {
    let element = event.target;
    if (element.tagName === 'LI') {
      this.input.value = element.textContent;
      this.reset();
    }
  }

  valueChanged() {
    let value = this.input.value;
    this.previousValue = value;

    if (value.length > 0) {
      this.fetchMatches(value, (matches) => {
        // `visible` here is not an HTML attribute.
        // It's only used to show/hide the overlay.
        this.visible = true;
        this.matches = matches;
        this.bestMatchIndex = 0;
        this.selectedIndex = null;
        this.draw();
      });
    } else {
      this.reset();
    }
  }

  // Renders new state of UI, after every action.
  draw() {
    // Remove all drop-down items until empty.
    while (this.listUI.lastChild) {
      this.listUI.removeChild(this.listUI.lastChild);
    }

    // Show blank overlay (essentially invisible)
    if (!this.visible) {
      this.overlay.textContent = '';
      return;
    }

    // Display first result as overlay text
    if (this.bestMatchIndex !== null && this.matches.length !== 0) {
      let selected = this.matches[this.bestMatchIndex];
      this.overlay.textContent = this.generateOverlayContent(
        this.input.value,
        selected
      );
    } else {
      this.overlay.textContent = '';
    }

    // Populate list
    this.matches.forEach((match, index) => {
      let li = document.createElement('li');
      li.classList.add('autocomplete-ui-choice');

      if (index === this.selectedIndex) {
        // Style currently-selected item.
        li.classList.add('selected');
        // Autocomplete input text, using selected item.
        this.input.value = match.name;
      }

      li.textContent = match.name;
      this.listUI.appendChild(li);
    });
  }

  generateOverlayContent(value, match) {
    // Splice user input and remainder of first match.
    let end = match.name.substr(value.length);
    return value + end;
  }

  reset() {
    // Hide overlay
    this.visible = false;
    this.matches = [];
    this.bestMatchIndex = null;
    this.selectedIndex = null;
    this.previousValue = null;

    // Clean up. Otherwise results from the first letter will persist.
    this.draw();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('input');
  const url = '/countries?matching=';
  const autocomplete = new Autocomplete(input, url);
});
