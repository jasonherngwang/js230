/*
DOM Shuffling
- Move h1 just inside the beginning of the header, just before nav.
- Move header above body.
- Swap imgs
- Move figure just inside the end of article.
*/

// Move h1 just inside the beginning of the header, just before nav.
let header = document.querySelector("body > header");
let h1 = document.querySelector("main > h1");

// These two do the same thing:
// header.insertAdjacentElement("afterbegin", h1);
// header.insertBefore(h1, header.firstChild);
header.prepend(h1);

// Move header above body.
// document.querySelector("body").insertAdjacentElement("afterbegin", header);
document.body.prepend(header);

// Swap imgs
let [fig1, fig2] = document.querySelectorAll("#content figure");
let [img1, img2] = [fig1.firstElementChild, fig2.firstElementChild];

// fig1.replaceChild(img2, img1);
img1.replaceWith(img2);

// fig2.insertAdjacentElement("afterbegin", img1);
fig2.prepend(img1);

// Move figure just inside the end of article.
let article = document.querySelector("article");
// These two do the same thing:
// article.insertAdjacentElement("beforeend", fig1);
// article.insertBefore(fig2, null);
article.append(fig1, fig2);
