class GroceryList {
  constructor(listContainerElement) {
    this.list = document.querySelector(listContainerElement);
  }

  addItem(name, quantity) {
    const item = document.createElement('li');
    item.textContent = `${quantity} ${name}`;
    this.list.appendChild(item);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  // const groceryList = document.querySelector('#grocery-list');
  const groceryList = new GroceryList('#grocery-list');
  const getValueOf = (selector) => document.querySelector(selector).value;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = getValueOf('#name');
    const quantity = getValueOf('#quantity') || '1';
    // const itemLi = document.createElement('li');
    // itemLi.textContent = `${quantity} ${name}`;
    // groceryList.appendChild(itemLi);
    groceryList.addItem(name, quantity);
    form.reset();
  });
});
