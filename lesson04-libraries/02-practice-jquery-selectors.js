// Run in browser
function flash(jqObj) {
  jqObj.addClass('highlight');
  setTimeout(() => jqObj.removeClass('highlight'), 1000);
}

// All h1
let $h1 = $('h1');
// flash($h1);

// First h1
let $titleH1 = $('#site_title');
// flash($titleH1);

// All li in article
let $articleLi = $('article li');
// flash($articleLi);

// 3rd li in article
let $thirdArticleLi = $('article li').eq(2);
// flash($thirdArticleLi);

// Odd-num rows in table
let $oddRows = $('table').find('tr:odd');
// let $oddRows = $('table').find('tr').filter(':odd');
// flash($oddRows);

// List item containing 'ac ante'. Find its parent.
let acAnteLi = $("li li:contains('ac ante')").parents('li');
// flash(acAnteLi);

// List item containing 'ac ante'. Find next elem.
let acAnteLiNext = $("li li:contains('ac ante')").next();
// flash(acAnteLiNext);

// All table cells. Find last cell.
let lastCell = $('td').last();
// flash (lastCell);

// Table cells w/o 'protected' class
let nonProtectedCells = $('td').not('.protected');
// flash(nonProtectedCells);

// Anchor tags with href beginning with #
// let $a = $('a').filter((_, elem) => $(elem).attr('href')[0] === '#')
let $a = $('a[href^=#]');
// flash($a)

// Class name containing 'block'
let $classContainsBlock = $("[class*='block']");
flash($classContainsBlock);
