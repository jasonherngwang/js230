/*
Nodes to Array

Convert the DOM to nested Arrays, in the form
["PARENT_TAG_NAME", [children]]

There is an empty Array if no children.

Performs a depth-first traversal of the DOM tree.
Base case: No children elements
- Return empty Array: []
Else:
- Return Array of two elements:
  - tagName
  - Recursive call, passing in all child elements.
*/

function nodesToArr(node = document.body) {
  let children = [...node.children];
  if (children.length === 0) return [node.nodeName, []];
  return [node.nodeName, children.map((child) => nodesToArr(child))];
}

console.log(JSON.stringify(nodesToArr()));

// Robert solution
function nodesToArr2(node = document.body) {
  const childElements = [...node.children].map(nodesToArr);
  return [node.tagName, childElements];
}
