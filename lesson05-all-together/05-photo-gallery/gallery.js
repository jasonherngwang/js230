/*
Attach an event listener to the thumbnail ul.
- Retrieve the clicked item's src and title.
- Change the src and title of the main image.
*/

$(() => {
  const $mainImg = $('figure img');
  const $mainCaption = $('figcaption');
  const $thumbs = $('ul');

  $thumbs.on('click', 'img', function (e) {
    e.preventDefault();

    const $img = $(e.target).closest('img');
    const [src, title] = [$img.attr('src'), $img.attr('title')];

    $mainImg
      .stop()
      .fadeOut(200, () => $mainImg.attr('src', src))
      .fadeIn(200, () => {
        $mainImg.attr('title', title);
        $mainCaption.text(title);
      });
  });
});
