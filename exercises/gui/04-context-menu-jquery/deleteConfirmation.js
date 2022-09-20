// From Bob Rodes solution
const todoItems = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John ' },
];

$(() => {
  const $todoList = $('#todo_list');
  const $modal = $('#modal');
  const $contextMenu = $('.context-menu');

  todoItems.forEach((todo) => {
    const $li = $($.parseHTML(`<li data-id="${todo.id}">${todo.title}</li>`));

    const $delete = $('#delete');

    $delete.click(function (e) {
      e.preventDefault();
      showModal(todo.id);
      $contextMenu.fadeOut();
    });

    $li.contextmenu((e) => {
      e.preventDefault();
      const mouseX = e.pageX;
      const mouseY = e.pageY;

      // Position and show context menu
      $contextMenu.css({ top: mouseY, left: mouseX, zIndex: 1 }).fadeIn();
    });

    $todoList.append($li);
  });

  // Clicking anything hides the context menu.
  $(document).click((e) => {
    $contextMenu.fadeOut();
  });

  $modal.click((e) => {
    e.preventDefault();

    const $modalYes = $('a.yes');
    const $modalNo = $('a.no');
    const $modalBg = $('#modal_bg');

    if (e.target === $modalBg.get(0) || e.target === $modalNo.get(0)) {
      hideModal();
    } else if (e.target === $modalYes.get(0)) {
      const id = $modal.attr('data-id');
      const $todo = $(`li[data-id="${id}"]`);
      $todo.remove();
      hideModal();
    }
  });

  function showModal(id) {
    $modal.fadeIn(200);
    $modal.attr('data-id', id);
  }

  function hideModal(id) {
    $modal.fadeOut(200);
  }
});
