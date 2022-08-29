/*
- Click event listener to anchor tags
  - Prevent default.
  - Retrieve img src and alt so we can reference it in the modal.
- Modal JS
  - Add grey background
  - Add a white rectangle div.
  - Write CSS for the model contents
  - Display the icon_close image on top-right.
    - CSS: Cursor is pointer.
- Event listener on document.
  - If target is close icon, remove the modal.
  - If target is modal, do nothing.
  - Else, remove the modal.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
*/

$(() => {
  function createModel(name, imageUrl) {}

  $('#team li').click(function (e) {
    e.preventDefault();

    const $member =
      e.target.tagName !== 'IMG' ? $(e.target).find('img') : $(e.target);

    const name = $member.attr('alt');
    const imageUrl = $member.attr('src');

    const modal = createModal(name, imageUrl);
  });
});
