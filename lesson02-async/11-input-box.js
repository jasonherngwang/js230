let blinkingCursor;
let focusedTextField;

document.addEventListener('DOMContentLoaded', () => {
  const textField = document.querySelector('.text-field');

  textField.addEventListener('click', (event) => {
    // Prevent document's click event which unfocuses the input field.
    event.stopPropagation();

    textField.classList.add('focused');
    focusedTextField = textField;

    if (!blinkingCursor) {
      blinkingCursor = setInterval(() => {
        textField.classList.toggle('cursor');
      }, 500);
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (focusedTextField) {
    let keyPressed = event.key;
    let contentDiv = document.querySelector('.content');

    if (keyPressed === 'Backspace') {
      contentDiv.textContent = contentDiv.textContent.slice(
        0,
        Math.max(0, contentDiv.textContent.length - 1)
      );
    } else if (keyPressed.length === 1) {
      // Length 1 filters out modifier keys, e.g. Shift, Ctrl.
      contentDiv.textContent += keyPressed;
    }
  }
});

document.addEventListener('click', (event) => {
  clearInterval(blinkingCursor);
  blinkingCursor = null;

  if (focusedTextField) {
    focusedTextField.classList.remove('cursor');
    focusedTextField.classList.remove('focused');
    focusedTextField = null;
  }
});
