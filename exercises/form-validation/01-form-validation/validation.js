document.addEventListener('DOMContentLoaded', () => {
  const MESSAGES = {
    formHasError: 'Form cannot be submitted until errors are corrected.',
    invalidEmail: 'Please Enter a valid Email.',
    passwordTooShort: 'Password must be at least 10 characters long.',
    invalidPhone: 'Please Enter a valid Phone Number.',
  };

  const form = document.querySelector('form');
  const firstName = document.querySelector('#first_name');
  const lastName = document.querySelector('#last_name');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const phone = document.querySelector('#phone');

  function addErrorMessage(element, message) {
    const span = document.createElement('span');
    span.textContent = message;
    span.classList.add('error');
    element.after(span);
  }

  function removeErrorMessage(element) {
    while (element.nextElementSibling.tagName === 'SPAN') {
      element.nextElementSibling.remove();
    }
  }

  // Clear error messages on focus
  [firstName, lastName, email, password, phone].forEach((field) => {
    field.addEventListener('focus', (e) => {
      field.classList.remove('error');
      removeErrorMessage(field);
    });
  });

  // Add error message and field highlight
  [firstName, lastName, email, password].forEach((field) => {
    field.addEventListener('blur', (e) => {
      const fieldName = field.labels[0].textContent;
      if (field.validity.valueMissing) {
        field.classList.add('error');
        addErrorMessage(field, `${fieldName} is a required field.`);
      }
    });
  });

  // Format validations
  email.addEventListener('blur', (e) => {
    if (email.validity.patternMismatch) {
      email.classList.add('error');
      addErrorMessage(email, MESSAGES.invalidEmail);
    }
  });

  password.addEventListener('blur', (e) => {
    if (password.validity.tooShort) {
      password.classList.add('error');
      addErrorMessage(password, MESSAGES.passwordTooShort);
    }
  });

  phone.addEventListener('blur', (e) => {
    if (phone.validity.patternMismatch) {
      phone.classList.add('error');
      addErrorMessage(phone, MESSAGES.invalidPhone);
    }
  });

  // Form submit validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formError = form.querySelector('.form-error');
    if (!form.checkValidity()) {
      formError.textContent = MESSAGES.formHasError;
    } else {
      formError.textContent = '';
    }
  });
});
