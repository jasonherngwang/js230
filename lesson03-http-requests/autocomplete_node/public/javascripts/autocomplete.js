import debounce from './debounce.js';

// State is stored in the Autocomplete object, referenced using `this`.
const Autocomplete = {
  // Create UI

  // Make wrapper a sibling of input, then move input inside wrapper.
  wrapInput() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('autocomplete-wrapper');
    this.input.parentElement.append(wrapper);
    wrapper.append(this.input);
  },

  createUI() {
    // Unordered list of country names, in drop-down menu
    let listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    // Add ul to wrapper (now a sibling of input)
    this.input.parentElement.append(listUI);
    // Create new property listUI
    this.listUI = listUI;

    // Add div to wrapper (now a sibling of input)
    // Grey text inside input, indicating first choice.
    let overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = `${this.input.clientWidth}px`;

    this.input.parentElement.append(overlay);
    this.overlay = overlay;
  },

  // Communicating with Server

  // Perform async XHR request every time we type something.
  fetchMatches(query, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', `${this.url}${encodeURIComponent(query)}`);
    request.responseType = 'json';

    request.addEventListener('load', () => {
      callback(request.response);
    });

    request.send();
  },

  // Bind Event Listeners to UI

  // `bind` returns new function that calls the method with explicit
  // function execution context of the input element.
  bindEvents() {
    // 'input' fires when value changes.
    // We perform this.valueChange.bind(this) when implementing debounce, so we
    // don't need to do it again here.
    this.input.addEventListener('input', this.valueChanged);
    this.input.addEventListener('keydown', this.handleKeydown.bind(this));
    this.listUI.addEventListener('click', this.handleMousedown.bind(this));
  },

  // Handles user typing in input box
  valueChanged() {
    let value = this.input.value;
    // Save last value if we end up pressing Esc
    this.previousValue = value;

    if (value.length > 0) {
      // Pass callback to async function
      this.fetchMatches(value, (matches) => {
        // `visible` here is not an HTML attribute.
        // It's only used to show/hide the overlay.
        this.visible = true;

        // matches is an Array of Objects (name, id)
        this.matches = matches;
        this.bestMatchIndex = 0;
        // If something is currently selected, and we make a change, executing
        // draw() will persist the item in the input box, as well as the
        // styling of the item in the list.
        this.selectedIndex = null;
        this.draw();
      });
    } else {
      this.reset();
    }
  },

  // Event Listeners

  handleKeydown(event) {
    console.log(event.key);
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
        if (this.bestMatchAvailable()) {
          event.preventDefault();
          // Autocompletes input with best match.
          this.input.value = this.matches[this.bestMatchIndex].name;
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
  },

  handleMousedown(event) {
    let element = event.target;
    if (element.tagName === 'LI') {
      this.input.value = element.textContent;
      this.reset();
    }
  },

  bestMatchAvailable() {
    return this.bestMatchIndex !== null && this.matches.length !== 0;
  },

  // Renders new state of UI (selection list and overlay), after every action.
  // Actions: reset, value change, keydown
  draw() {
    // List
    // Clears and re-draws entire list, every time.

    // Remove all items
    while (this.listUI.lastChild) {
      this.listUI.removeChild(this.listUI.lastChild);
    }

    // Populate list
    this.matches.forEach((match, index) => {
      let li = document.createElement('li');
      li.classList.add('autocomplete-ui-choice');

      if (index === this.selectedIndex) {
        // Style currently-selected item with color background.
        li.classList.add('selected');
        // Autocomplete input text, using selected item.
        this.input.value = match.name;
      }

      li.textContent = match.name;
      this.listUI.appendChild(li);
    });

    // Overlay

    // Show empty string if invisible
    if (!this.visible) {
      this.overlay.textContent = '';
      return;
    }

    // Display first result as overlay text
    if (this.bestMatchAvailable()) {
      let selected = this.matches[this.bestMatchIndex];
      this.overlay.textContent = this.generateOverlayContent(
        this.input.value,
        selected
      );
    } else {
      this.overlay.textContent = '';
    }
  },

  // Avoids visual text misalignment when input is all lowercase, but matching
  // string is not
  generateOverlayContent(value, match) {
    // Splice user input and remainder of first match.
    let end = match.name.substr(value.length);
    return value + end;
  },

  // Clears: overlay, `matches` Array, and selection indicators
  // Triggers upon:
  // - Initial setup
  // - User clears input
  // - User makes selection with keypress or click
  reset() {
    this.visible = false; // Hide overlay
    this.matches = [];
    this.bestMatchIndex = null;
    this.selectedIndex = null;
    this.previousValue = null;

    // Clean up. Otherwise results from the first letter will persist.
    this.draw();
  },

  // Initialize state
  init() {
    this.input = document.querySelector('input');
    this.url = '/countries?matching=';

    // Set initial states to null
    this.listUI = null;

    // Overlay
    this.overlay = null;
    this.visible = false; // Show/hide overlay
    this.bestMatchIndex = null; // Item suggested by overlay

    this.matches = []; // Array returned from API
    this.selectedIndex = null; // Item currently selected by user

    // Create UI
    this.wrapInput(); // Wrap input inside div
    this.createUI(); // Make list and overlay siblings of input

    // Wrap method inside a debounce filter
    this.valueChanged = debounce(this.valueChanged.bind(this), 300);

    // Listeners for input and list
    this.bindEvents();

    // Clear overlay, matches, selected item
    this.reset();
  },
};

document.addEventListener('DOMContentLoaded', () => {
  Autocomplete.init();
});
