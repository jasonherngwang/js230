// Problem 1
function walk(node, callback) {
  callback(node); // Perform some action with the node

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function findAllElements(node, elementType) {
  let elements = [];

  walk(node, (node) => {
    if (node instanceof elementType) {
      elements.push(node);
    }
  });

  return elements;
}

let paragraphs = findAllElements(document, HTMLParagraphElement);
console.log(paragraphs);

let headings = findAllElements(document, HTMLHeadingElement);
console.log(headings);
