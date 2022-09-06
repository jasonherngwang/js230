/*
Breadth-first traversal up the tree, until id = 1

Algorithm
Bottom-up approach: Traverse from the starting node upward.
- Stop when the current level contains an Element with id of 1.
Top-down approach: Start from id 1 and traverse level-by-level downward
  - Stop when the current level contains an Element with id of the argument.
  - DOESN'T WORK because we don't know which of the child elements contains our
    target. We would have to search the entire tree and discard branches without
    the target.

- To retrieve a list of a node and its siblings, access its parent, then access
  all the children.
*/

// Bottom-up, recursive
function domTreeTracerBottomUp(id) {
  let node = document.getElementById(id);
  let allNodes = gatherNodesByLevelBottomUp(node);
  return allNodes.map((nodeList) => nodeList.map((node) => node.nodeName));
}

function gatherNodesByLevelBottomUp(node, allNodes = []) {
  let currentLevelNodes = [...node.parentElement.children];
  let currentLevelIds = currentLevelNodes.map((node) => node.id);
  let reachedTopLevel = currentLevelIds.includes('1');

  allNodes.push(currentLevelNodes);

  return reachedTopLevel
    ? allNodes
    : gatherNodesByLevelBottomUp(node.parentElement, allNodes);
}

// Test cases
console.log(domTreeTracerBottomUp('1'));
// [['ARTICLE']]
console.log(domTreeTracerBottomUp('5'));
// [['HEADER', 'MAIN', 'FOOTER'], ['ARTICLE']]
console.log(domTreeTracerBottomUp('22'));
// [['A'], ['STRONG'], ['SPAN', 'SPAN'], ['P', 'P'], ['SECTION', 'SECTION'], ['HEADER', 'MAIN', 'FOOTER'], ['ARTICLE']]

// Alternative solution
function domTreeTracer(nodeId) {
  let node = document.querySelector('#' + CSS.escape(nodeId));

  if (nodeId === 1) return [[node.tagName]];

  let parentNode = node.parentElement;
  let nodesAtCurrentLevel = [...parentNode.children].map((n) => n.tagName);

  return [nodesAtCurrentLevel].concat(domTreeTracer(Number(parentNode.id)));
}
console.log(JSON.stringify(domTreeTracer(22)));

// Iterative solution
function domTreeTracerIterative(id) {
  let elem = document.getElementById(id);
  let parent;
  const domTree = [];

  do {
    parent = elem.parentElement;
    domTree.push([...parent.children].map((n) => n.tagName));
    elem = parent;
  } while (parent.tagName !== 'BODY');

  return domTree;
}

console.log(JSON.stringify(domTreeTracerIterative(22)));
