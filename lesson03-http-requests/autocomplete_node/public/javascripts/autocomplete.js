const Autocomplete = {
  // Make wrapper a sibling of input, then move input inside wrapper.
  wrapInput() {
    let wrapper = document.createElement('div');
    wrapper.classList.add('autocomplete-wrapper');
    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input);
  },

  createUI() {
    // Unordered list of country names, in drop-down menu
    let listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    // Add ul to wrapper (now a sibling of input)
    this.input.parentNode.appendChild(listUI);
    // Create new property listUI
    this.listUI = listUI;

    // Grey text inside input, indicating first choice.
    let overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = `${this.input.clientWidth}px`;

    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  },

  init() {
    this.input = document.querySelector('input');
    this.url = '/countries?matching=';

    this.wrapInput();
    this.createUI();
  },
};

document.addEventListener('DOMContentLoaded', () => {
  // `this` references the element to listener is attached to: `document`
  Autocomplete.init();
});
