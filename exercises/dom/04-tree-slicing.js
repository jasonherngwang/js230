/*
Tree Slicing

Inputs:
- Start index: Parent node's `id` (a number)
- End index: Innermost child's `id` (a number)

Output: Array of tagNames

Requirements
- Left and right-inclusive.
- Elements only, not all nodes.
- Elements within `body` only.
- If either input `id` doesn't exist, return undefined.
- If no path from start to end, return undefined.

Algorithm
- Select the node at the end index. If it doesn't exist return undefined.
- Traverse upward by parent element until body.
  - Keep track of the tagName of all elements encountered (unshift).
  - If id of current element is start index, return the Array of tagnames.
- Return undefined
*/

function sliceTree(startIndex, endIndex) {
  const startNode = document.querySelector('#' + CSS.escape(startIndex));
  let endNode = document.querySelector('#' + CSS.escape(endIndex));

  if (!startNode || !endNode || !startNode.contains(endNode)) return undefined;

  let sliceNames = [];

  while (endNode.nodeName !== 'BODY') {
    sliceNames.unshift(endNode.nodeName);
    if (endNode === startNode) return sliceNames;
    endNode = endNode.parentElement;
  }

  return undefined;
}

console.log(sliceTree(1, 4));
console.log(sliceTree(1, 76));
console.log(sliceTree(2, 5));
console.log(sliceTree(5, 4));
console.log(sliceTree(1, 23));
console.log(sliceTree(1, 22));
console.log(sliceTree(11, 19));
