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

  todoItems.forEach((todo) => {
    const $li = $($.parseHTML(`<li data-id="${todo.id}">${todo.title}</li>`));
    const $deleteLink = $($.parseHTML('<a href="#">Delete</a>'));

    $deleteLink.click((e) => {
      e.preventDefault();
      showModal(todo.id);
    });

    $li.append($deleteLink);
    $todoList.append($li);
  });

  $modal.click((e) => {
    e.preventDefault();

    const $modalYes = $('a.yes');
    const $modalNo = $('a.no');
    const $modalBg = $('#modal-bg');

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
