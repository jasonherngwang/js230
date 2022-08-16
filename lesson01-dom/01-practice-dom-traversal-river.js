function walk(node, callback) {
  callback(node) // Perform some action with the node
  
  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

// walk(document.body, node => {
//   console.log(`${node.nodeName} (${node.nodeType}): ${node.nodeValue || node.textContent}`)
// });

// 1. Change text to red and font size to 48px for heading
let html = document.childNodes[1]; // Skip DOCTYPE
let body = html.lastChild; // Select body
let heading = body.childNodes[1]; // Skip empty text node
heading.style.color = '#ff0000';
heading.style.fontSize = '48px';

// 2. Retrieve the first word from each paragraph, and log them
let firstWords = [];

// Starting from body
// body.childNodes.forEach(node => {
//   if (node.nodeName === 'P') {
//     firstWords.push(node.firstChild.data.trim().split(' ')[0]);
//   }
// })

// Using walk
walk(document, node => {
  if (node.nodeName === 'P') {
    firstWords.push(node.firstChild.data.trim().split(' ')[0]);
  }
})

console.log(firstWords);

// 3. Add class `stanza` to each paragraph except the first.
let paragraphCount = 0;
walk(document, node => {
  if (node.nodeName === 'P') {
    paragraphCount += 1;
    if (paragraphCount > 1) {
      node.classList.add('stanza');
    }
  }
})