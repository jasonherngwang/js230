/*
Array to Nodes

Convert a nested array of nodeNames to nodes.

Examples

Nested array of nodes
const nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];

OR
["BODY", [
  ["HEADER", []],
  ["MAIN", []],
  ["FOOTER", []]]]

arrayToNodes(nodes);

<body>
  <header></header>
  <main></main>
  <footer></footer>
</body>

Algorithm
Each node has two parts: tagName and empty array

If array has 2 elems, and 2nd is [], we can stop and create an element.
document.createElement(tagName)

We append the elements contained in the second array to the parent.
parent.appendChild(node)

Steps
- Check if 2nd elem is [].
  - If so, create an element using the tagName (1st elem), and return it.
  - If not
    - Create an element using the tagName (1st elem).
    - Iterate over each node in the 2nd elem (an array), perform a recursive
      call. Append this as a child to the newly-created node.
    - Return the newly-created node.
*/

function arrayToNodes(nodes) {
  let parent = document.createElement(nodes[0]);
  let child = nodes[1];

  if (child.length === 0) return parent;

  child.forEach((node) => parent.appendChild(arrayToNodes(node)));

  return parent;
}

const nodes1 = [
  'BODY',
  [
    ['HEADER', []],
    ['MAIN', []],
    ['FOOTER', []],
  ],
];
console.log(arrayToNodes(nodes1));

const nodes2 = [
  'BODY',
  [
    [
      'DIV',
      [
        ['DIV', []],
        ['DIV', [['DIV', []]]],
      ],
    ],
    ['DIV', []],
    [
      'DIV',
      [
        ['DIV', []],
        ['DIV', []],
        ['DIV', []],
      ],
    ],
  ],
];
console.log(arrayToNodes(nodes2));

// Add text to page (from Vahid)
function arrToNodes([tag, children], layer = 0) {
  let element = document.createElement(tag);
  element.innerHTML = '&nbsp;&nbsp;'.repeat(layer) + tag;
  children.forEach((child) =>
    element.appendChild(arrToNodes(child, layer + 1))
  );

  return element;
}
document.body = arrToNodes(nodes2);
