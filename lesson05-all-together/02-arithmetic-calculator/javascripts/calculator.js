/*
- Add event listener to form 'submit' action.
  - Prevent default.
  - Gather values from both inputs fields.
  - Convert both to number values.
- Use a switch statement to determine the math calculation.
- Convert the numerical result to a string (explicity or implicitly).
- Replace the text content or innerHTML of the h1 tag with the string.
- No need to clear or reset the form.

Edge cases
- Float input? Use Number() instead of parseInt()
- Divide by 0? Display NaN.
- Decimal output: Round?
*/
document.addEventListener('DOMContentLoaded', () => {
  const firstInput = document.querySelector('#first-number');
  const secondInput = document.querySelector('#second-number');
  const operator = document.querySelector('#operator');
  const result = document.querySelector('#result');
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstNum = Number(firstInput.value);
    const secondNum = Number(secondInput.value);
    let resultValue;

    switch (operator.value) {
      case '+':
        resultValue = firstNum + secondNum;
        break;
      case '-':
        resultValue = firstNum - secondNum;
        break;
      case '*':
        resultValue = firstNum * secondNum;
        break;
      case '/':
        resultValue = firstNum / secondNum;
        break;
    }

    result.textContent = String(resultValue);
  });
});
