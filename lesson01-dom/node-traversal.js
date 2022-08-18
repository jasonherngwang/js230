// Depth-first traversal, pre-order
function walk(node, callback) {
  callback(node); // Perform some action with the node

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

// Logs all nodes, distinguishing among Text, Empty, Comment, and Element nodes.
function walkLog(node) {
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

  for (let index = 0; index < node.childNodes.length; index += 1) {
    walk(node.childNodes[index]);
  }
}

// walkLog(document.body);

// Breadth-first traversal
function breadthFirstWalk(node, callback) {
  const nodesToVisit = [node];

  while (nodesToVisit.length > 0) {
    let currentNode = nodesToVisit.shift();
    callback(currentNode);
    nodesToVisit.push(...currentNode.childNodes);
  }
}
breadthFirstWalk(document.body, (node) => console.log(node));
