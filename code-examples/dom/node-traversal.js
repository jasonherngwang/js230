// -----------------------------------------------------------------------------
// Callbacks

// Print various node properties.
function printNodeInfo(node) {
  console.log(
    `${node.nodeName} (${node.nodeType}): ${(
      node.nodeValue || node.textContent
    ).slice(0, 100)}`
  );
}

// Distinguish among Text, Empty, Comment, and Element nodes.
function printNodeType(node) {
  if (node.nodeName === '#text') {
    if (/^\s+$/.test(node.data)) {
      console.log('#empty');
    } else {
      console.log(`#text ${node.data}`);
    }
  } else if (node.nodeName === '#comment') {
    console.log(`#comment ${node.data}`);
  } else {
    console.log(node);
  }
}

// -----------------------------------------------------------------------------
// Traversal Methods

// Depth-first traversal, pre-order
function walk(node, callback) {
  callback(node); // Perform some action with the node

  // Nodes
  // for (let i = 0; i < node.childNodes.length; i += 1) {
  //   walk(node.childNodes[i], callback);
  // }

  // Elements only
  for (let i = 0; i < node.children.length; i += 1) {
    walk(node.children[i], callback);
  }
}

// Breadth-first traversal
function breadthFirstWalk(node, callback) {
  const nodesToVisit = [node];

  // Nodes
  // while (nodesToVisit.length > 0) {
  //   let currentNode = nodesToVisit.shift();
  //   callback(currentNode);
  //   nodesToVisit.push(...currentNode.childNodes);
  // }

  // Elements only
  while (nodesToVisit.length > 0) {
    let currentNode = nodesToVisit.shift();
    callback(currentNode);
    nodesToVisit.push(...currentNode.children);
  }
}

// Gather nodes, level-by-level (Array of Arrays)
function nodesUpToLevel(level) {
  let nodes = [[document.body]];
  let nodesAtCurrentLevel = [document.body];
  let currentGen = 0;

  while (currentGen < level) {
    nodesAtCurrentLevel = [
      ...nodesAtCurrentLevel.flatMap((node) => [...node.children]),
    ];
    nodes.push(nodesAtCurrentLevel);
    currentGen += 1;
  }
  return nodes;
}

// Traverse ancestors, up to <html>
function ascend(node, callback) {
  callback(node);

  // Base case: parentElement of <html> is null
  if (!node.parentElement) return;

  ascend(node.parentElement, callback);
}

// -----------------------------------------------------------------------------
// Callbacks

// walk(document.body, printNodeInfo);
walk(document.body, printNodeType);

// breadthFirstWalk(document.body, printNodeInfo);
// breadthFirstWalk(document.body, printNodeType);

// ascend(document.querySelector('p'), printNodeInfo);
// ascend(document.querySelector('p'), printNodeType);
