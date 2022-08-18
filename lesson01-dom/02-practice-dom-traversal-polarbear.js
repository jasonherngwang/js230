function walk(node, callback) {
  callback(node); // Perform some action with the node

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

// 5. Count the images on the page, then count the PNG images. Log both results.
let numImage = 0;
let numPNG = 0;
walk(document, (node) => {
  if (node.nodeName === 'IMG') {
    numImage += 1;
    if (node.getAttribute('src').match(/.png$/)) numPNG += 1;
  }
});

console.log(`${numImage} images, ${numPNG} PNGs`);

// 6. Change the link color to red for every link on the page.
walk(document, (node) => {
  if (node.nodeName === 'A') node.style.color = 'red';
});
