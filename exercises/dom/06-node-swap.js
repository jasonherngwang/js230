function nodeSwap(id1, id2) {
  const node1 = document.querySelector('#' + CSS.escape(id1));
  const node2 = document.querySelector('#' + CSS.escape(id2));

  if (isInvalidSwap(node1, node2)) return undefined;

  let node1Clone = node2.cloneNode(true);

  node1.insertAdjacentElement('afterend', node1Clone);
  node2.insertAdjacentElement('afterend', node1);
  node1Clone.insertAdjacentElement('afterend', node2);
  node1Clone.remove();

  return true;
}

// Invalid swap if nonexistent or one inside the other.
function isInvalidSwap(node1, node2) {
  return !node1 || !node2 || node1.contains(node2) || node2.contains(node1);
}

// Add event listeners
const node1 = document.querySelector('#' + CSS.escape(1));
const node2 = document.querySelector('#' + CSS.escape(2));

node1.addEventListener('click', () => {
  console.log(node1);
});
node2.addEventListener('click', () => {
  console.log(node2);
});

// one swap
// nodeSwap(1, 2);

// multiple swaps
console.log(nodeSwap(3, 1));
console.log(nodeSwap(7, 9));
