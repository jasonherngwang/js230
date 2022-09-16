document.addEventListener('DOMContentLoaded', () => {
  const MESSAGES = {
    invalidFirstName: 'Please enter a valid First Name.',
    invalidLastName: 'Please enter a valid Last Name.',
    formHasError: 'Form cannot be submitted until errors are corrected.',
    invalidEmail: 'Please enter a valid Email.',
    passwordTooShort: 'Password must be at least 10 characters long.',
    invalidPhone: 'Please enter a valid Phone Number.',
    invalidCreditCardNumber: 'Please enter a valid credit card number.',
  };

  const form = document.querySelector('form');

  const inputs = [...document.querySelectorAll('input')];
  const firstName = document.querySelector('#first_name');
  const lastName = document.querySelector('#last_name');
  const phone = document.querySelector('#phone');
  const creditCard = document.querySelector('#credit_card');
  const creditCardInputs = [
    ...creditCard.querySelectorAll('input[name="credit_card"]'),
  ];

  function addErrorMessage(element, message) {
    element.parentElement.querySelector('span.error').textContent = message;
  }

  function removeErrorMessage(element) {
    element.parentElement.querySelector('span.error').textContent = '';
  }

  inputs.forEach((input) => {
    // Clear errors on focus
    input.addEventListener('focus', (e) => {
      input.classList.remove('error');
      removeErrorMessage(input);
    });

    // Check for errors on blur
    input.addEventListener('blur', (e) => {
      input.checkValidity(); // Fires invalid event on element
    });

    // Handle invalid input
    input.addEventListener('invalid', (e) => {
      // Access `name` attribute of associated label
      const fieldName = input.labels[0].textContent.trim();
      const validity = input.validity;

      // Error styling for input
      input.classList.add('error');

      if (validity.valueMissing) {
        addErrorMessage(input, `${fieldName} is a required field.`);
      } else if (validity.patternMismatch) {
        switch (fieldName) {
          case 'First Name':
            addErrorMessage(input, MESSAGES.invalidFirstName);
            break;
          case 'Last Name':
            addErrorMessage(input, MESSAGES.invalidLastName);
            break;
          case 'Email':
            addErrorMessage(input, MESSAGES.invalidEmail);
            break;
          case 'Phone Number':
            addErrorMessage(input, MESSAGES.invalidPhone);
            break;
        }
      } else if (validity.tooShort) {
        // password field
        addErrorMessage(input, MESSAGES.passwordTooShort);
      }
    });
  });

  // Character blocking input
  function charblockingHandler(elem, pattern) {
    const ALLOWED_KEYS = ['Tab', 'Backspace', 'Shift', 'Meta', 'Alt'];
    const regex = new RegExp(pattern, 'i');

    return function (e) {
      const key = e.key;
      if (!(ALLOWED_KEYS.includes(key) || regex.test(key))) {
        e.preventDefault();
      }
    };
  }

  [firstName, lastName].forEach((input) =>
    input.addEventListener('keydown', charblockingHandler(input, "[a-z'\\s]"))
  );

  phone.addEventListener('keydown', charblockingHandler(phone, '[-\\d]'));

  creditCardInputs.forEach((input) => {
    input.addEventListener('keydown', charblockingHandler(input, '[\\d]'));

    input.addEventListener('keyup', (e) => {
      const parent = input.parentElement;
      let index = [...parent.children].indexOf(input);
      if (e.key === 'Tab' || e.key === 'Shift') {
      } else if (input.value.length === 4 && index < 3) {
        input.nextElementSibling.focus();
      }
    });

    input.addEventListener('blur', (e) => {
      if (creditCardInputs.some((input) => input.validity.patternMismatch)) {
        addErrorMessage(
          creditCard.lastElementChild,
          MESSAGES.invalidCreditCardNumber
        );
      }
    });
  });

  function gatherFormData() {
    const data = {};
    const formDataString = [];

    inputs.forEach((input) => {
      data[input.name] = data[input.name] || [];
      data[input.name].push(input.value);
    });

    for (let name of Object.keys(data)) {
      data[name] = data[name].join('-');
      formDataString.push(`${name}=${data[name]}`);
    }

    return encodeURIComponent(formDataString.join(''));
  }

  // Form submit validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formError = form.querySelector('.form-error');
    if (!form.checkValidity()) {
      formError.textContent = MESSAGES.formHasError;
    } else {
      formError.textContent = '';
      console.log(gatherFormData());
    }
  });
});
