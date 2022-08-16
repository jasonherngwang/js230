// Problem 2
function walk(node, callback) {
  callback(node); // Perform some action with the node
  
  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function addClass(node, className, elementType) {
  walk(node, node => {
    if (node instanceof elementType) {
      node.classList.add(className);
    }
  });
}

// addClass(document, 'article-text', HTMLParagraphElement);

// Problem 3
function getElementsByTagName(tagName) {
  let matches = [];
  
  walk(document.body, node => {
    if (tagName.toUpperCase() === node.nodeName) {
      matches.push(node);
    }
  });
  
  return matches;
}

let paragraphs = getElementsByTagName('p');
paragraphs.forEach(node => node.classList.add('article-text'));