// From Bob Rodes solution
const todo_items = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John ' },
];

document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.querySelector('#todo_list');
  const modal = document.querySelector('#modal');

  // Add todos
  todo_items.forEach((todo) => {
    const li = document.createElement('li');
    li.setAttribute('data-id', todo.id);
    li.textContent = todo.title;

    const deleteLink = document.createElement('a');
    deleteLink.setAttribute('href', '#');
    deleteLink.textContent = 'Delete';
    li.appendChild(deleteLink);

    deleteLink.addEventListener('click', (e) => {
      e.preventDefault();
      showModal(todo.id);
    });

    todoList.appendChild(li);
  });

  // Click to close modal
  modal.addEventListener('click', (e) => {
    e.preventDefault();

    const modalYes = document.querySelector('a.yes');
    const modalNo = document.querySelector('a.no');
    const modalBg = document.querySelector('#modal-bg');

    if (e.target === modalBg || e.target === modalNo) {
      hideModal();
    } else if (e.target === modalYes) {
      const id = modal.getAttribute('data-id');
      const todo = document.querySelector(`li[data-id="${id}"]`);
      todo.remove();
      hideModal();
    }
  });

  function showModal(id) {
    modal.style.display = 'block';
    modal.setAttribute('data-id', id);
  }

  function hideModal(id) {
    modal.style.display = 'none';
  }
});
