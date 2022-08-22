/*
delegateEvent(parentElement, selector, eventType, callback)

parentElement could be null.

Algorithm
- If parentElement null, return undefined.
- No need to check if selector will match anything right now. We still add a
  listener in case a matching element is added later.
- Add event listener to parentElement.
- If the selector returns multiple elements, and those elements have other
  elements nested within, we need to make sure that the entire nested structure
  responds to the click even.
  - Use Array.prototype.some to check if we clicked on the selector-matched
    elements OR any of their descendants.
*/

function delegateEvent(parentElement, selector, eventType, callback) {
  if (!parentElement) return undefined;

  parentElement.addEventListener(eventType, (event) => {
    let childElements = [...parentElement.querySelectorAll(selector)];
    if (childElements.some((elem) => elem.contains(event.target))) {
      callback(event);
    }
  });

  return true;
}

const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

const callback = ({ target, currentTarget }) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

// console.log(delegateEvent(element1, 'p', 'click', callback));

// console.log(delegateEvent(element2, 'p', 'click', callback));

// console.log(delegateEvent(element2, 'h1', 'click', callback));

// console.log(delegateEvent(element3, 'h1', 'click', callback));

// console.log(delegateEvent(element3, 'aside p', 'click', callback));

// console.log(delegateEvent(element2, 'p', 'click', callback));

// const newP = document.createElement('P');
// const newContent = document.createTextNode('New Paragraph');
// newP.appendChild(newContent);

// element2.appendChild(newP);

console.log(delegateEvent(element3, 'aside', 'click', callback));
