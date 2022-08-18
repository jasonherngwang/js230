// 1. Write some JavaScript code to retrieve a word count for each h2 heading
// on the page.

// let subheadings = [...document.getElementsByTagName("h2")];
let subheadings = [...document.querySelectorAll('h2')];

let subheadingWordCounts = subheadings.map((h) => {
  let text = h.textContent.trim();
  return text.split(/\s+/).length;
});

console.log(subheadingWordCounts);

// 2. Use three different DOM methods to retrieve a reference to the div element
// that contains the table of contents.

// querySelector with tag name, id, and class
console.log(document.querySelectorAll('#toc')[0]);
console.log(document.querySelector('div#toc.toc'));
// getElementById
console.log(document.getElementById('toc'));
// getElementByClass
console.log(document.getElementsByClassName('toc')[0]);

// 3. Write some JavaScript code to change the color for every odd indexed link
// in the table of contents to green.
const tocLinks = [...document.querySelectorAll('#toc a')];
tocLinks.forEach((link, index) => {
  if (index % 2 === 1) link.style.color = 'green';
});

// 4. Write some JavaScript code to retrieve the text of every thumbnail caption
// on the page.
const thumbCaptions = [...document.querySelectorAll('.thumbcaption')];
const captionText = thumbCaptions.map((caption) => caption.textContent.trim());
console.log(captionText);

// 5
let keys = [
  'Kingdom',
  'Phylum',
  'Clade',
  'Class',
  'Order',
  'Suborder',
  'Family',
  'Genus',
  'Species',
];

let classification = {};
let tds = [...document.querySelectorAll('.infobox td')];

tds.forEach((td) => {
  let rank = td.textContent.trim();
  keys.forEach((key) => {
    if (rank.includes(key)) {
      let groupTd = td.nextElementSibling.firstElementChild;
      let group = groupTd.textContent;
      classification[rank] = group;
    }
  });
});

console.log(classification);
