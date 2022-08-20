let blinkingCursor;
let focusedTextField;

document.addEventListener('DOMContentLoaded', () => {
  const textField = document.querySelector('.text-field');

  textField.addEventListener('click', (event) => {
    event.stopPropagation();

    textField.classList.add('focused');
    focusedTextField = textField;

    console.log(blinkingCursor);

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
    } else {
      contentDiv.textContent += keyPressed;
    }
  }
});

document.addEventListener('click', (event) => {
  clearInterval(blinkingCursor);
  if (focusedTextField) {
    focusedTextField.classList.remove('cursor');
    focusedTextField.classList.remove('focused');
    focusedTextField = null;
  }
});
