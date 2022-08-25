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

    // Add div to wrapper (now a sibling of input)
    // Grey text inside input, indicating first choice.
    let overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = `${this.input.clientWidth}px`;

    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  },
  
  // Perform async XHR request every time we type something.
  fetchMatches(query, callback) {
    let request = new XMLHttpRequest();
    
    request.addEventListener('load', () => {
      callback(request.response);
    })
    
    request.open('GET', `${this.url}${encodeURIComponent(query)}`);
    request.responseType = 'json';
    request.send();
  },
  
  bindEvents() {
    // Fires when we type in the box.
    // `bind` returns new function that calls valueChanged with explicit
    // function execution context of the input element.
    this.input.addEventListener('input', this.valueChanged.bind(this));
  },
  
  
  valueChanged() {
    let value = this.input.value;
    
    if (value.length > 0) {
      this.fetchMatches(value, matches => {
        // `visible` here is not an HTML attribute.
        // It's only used to show/hide the overlay.
        this.visible = true;
        this.matches = matches;
        console.log(matches);
        this.draw();
      });
    } else {
      this.reset();
    }
  },
  
  draw() {
    
    while (this.listUI.lastChild) {
      this.listUI.removeChild(this.listUI.lastChild);
    }
    
    if (!this.visible) {
      this.overlay.textContent = '';
      return;
    }
    
    
  },

  init() {
    this.input = document.querySelector('input');
    this.url = '/countries?matching=';
    
    // Set initial state
    this.listUI = null;
    this.overlay = null;
    
    this.visible = false;
    this.matches = [];
    
    this.wrapInput();
    this.createUI();
    this.bindEvents();
  },
};

document.addEventListener('DOMContentLoaded', () => {
  // `this` references the element to listener is attached to: `document`
  Autocomplete.init();
});
