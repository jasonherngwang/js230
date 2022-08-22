/*
When we click something:
Is it on an anchor tag?
- Move highlight to article
- Default action is to navigate to the article (do not preventDefault)
Is it on an article?
- Move highlight to article
Else
- Move highlight to main

Setup
Event handlers on:
- Anchor tags
- Articles
- body

Highlight function
- 1 parameter: The new element to be highlighted
- Keep track of last highlighted element.
- Remove class from last highlighted element. Add to new one.
*/

const highlight = (() => {
  let lastHighlightedElem = null;

  return (elem) => {
    if (lastHighlightedElem) {
      lastHighlightedElem.classList.remove('highlight');
    }
    elem.classList.add('highlight');
    lastHighlightedElem = elem;
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const anchors = [...document.querySelectorAll('header a')];
  const articles = [...document.querySelectorAll('article')];
  const main = document.querySelector('main');

  anchors.forEach((a) => {
    a.addEventListener('click', (event) => {
      let article = document.querySelector(a.hash);
      highlight(article);
    });
  });

  articles.forEach((article) => {
    article.addEventListener('click', (event) => highlight(article));
  });

  document.addEventListener('click', (event) => {
    if (
      ![...anchors, ...articles].some((elem) => elem.contains(event.target))
    ) {
      highlight(main);
    }
  });
});
