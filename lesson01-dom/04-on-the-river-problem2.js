// Problem 2
function walk(node, callback) {
  callback(node); // Perform some action with the node

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function addClass(node, className, elementType) {
  walk(node, (node) => {
    if (node instanceof elementType) {
      node.classList.add(className);
    }
  });
}

// addClass(document, 'article-text', HTMLParagraphElement);

// Problem 3
// function getElementsByTagName(tagName) {
//   let matches = [];

//   walk(document.body, (node) => {
//     if (tagName.toUpperCase() === node.nodeName) {
//       matches.push(node);
//     }
//   });

//   return matches;
// }

// let paragraphs = getElementsByTagName("p");
// paragraphs.forEach((node) => node.classList.add("article-text"));

// Problem Group 2

// Problem 1
// Update the answer to question 3 of problem group 1 to use the
// document.getElementsByTagName method:

// let paragraphs = [...document.getElementsByTagName("p")];
// paragraphs.forEach((node) => node.classList.add("article-text"));

// Problem 2
// Update the code from Problem 1 to add the article-text class to paragraphs
// inside <div class="intro">, and nowhere else.

// // All divs
// let divs = [...document.getElementsByTagName("div")];

// divs.forEach((div) => {
//   // Divs with class 'intro'
//   let intros = [...div.getElementsByClassName("intro")];
//   intros.forEach((intro) => {
//     // Paragraphs within divs with class 'intro'
//     let paragraphs = [...intro.getElementsByTagName("p")];
//     paragraphs.forEach((paragraph) => {
//       paragraph.classList.add("article-text");
//     });
//   });
// });

// Refactored using querySelector
let paragraphs = [...document.querySelectorAll('div.intro p')];
paragraphs.forEach((paragraph) => {
  paragraph.classList.add('article-text');
});
