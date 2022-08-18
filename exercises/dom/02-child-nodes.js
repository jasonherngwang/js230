/*
<div id="1">
  <h1 id="2">Hello, <em id="3">World</em></h1>
  <p id="4">
    Welcome to wonderland. This is an
    <span id="5">awesome</span> place.
  </p>
  <a href="#" id="6"><strong id="7">Enter</strong></a>
  <div id="8"><p id="9"><a href="#" id="10">Go back</a></p></div>
</div>

Direct (children), Indirect (grandchildren or deeper levels)
div (1): 9, 12
h1 (2): 2, 1
em (3): 1, 0
p (4): 3, 1
span (5): 1, 0
a (6): 1, 1
strong (7): 1, 0
div (8): 1, 2
p (9): 1, 1
a (10): 1, 0
*/

function walk(node, callback) {
  callback(node); // Perform some action with the node

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function getDirectChildNodes(node) {
  return [...node.childNodes];
}

function childNodes(nodeId) {
  let node = document.getElementById(nodeId);
  let directChildNodes = getDirectChildNodes(node);
  let indirectChildNodes = [];

  directChildNodes.forEach((childNode) => {
    let descendantNodes = getDirectChildNodes(childNode);

    descendantNodes.forEach((descendantNode) => {
      walk(descendantNode, (node) => indirectChildNodes.push(node));
    });
  });

  return [directChildNodes.length, indirectChildNodes.length];
}

[...Array(10).keys()]
  .map((n) => n + 1)
  .forEach((n) => console.log(childNodes(String(n))));
