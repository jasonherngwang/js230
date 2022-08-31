/*
High-level description
- 1 giant form

jQuery notes
- .proxy() has been replaced by bind()
- inventory is an object with state and behavior. One instance of inventory is
  used for this page.

Conversion process
- Setting the date is self-contained. Replace its textContent.
- cacheTemplate uses HTML written in a script tag. Replace this with a Handlebars template.

Move jQuery event delegation logic in bindEvents to individual methods.

Events
- focusout supports focus loss on an element at its children.
- blur supports focus loss on the specified element only.
*/

let inventory;

(function () {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function () {
      const date = new Date();
      document.querySelector('#order_date').textContent = date.toUTCString();
    },
    cacheTemplate: function () {
      const iTmpl = document.querySelector('#inventory_item');
      this.template = Handlebars.compile(iTmpl.innerHTML);
      iTmpl.remove();
    },
    add: function () {
      this.lastId++;
      const item = {
        id: this.lastId,
        name: '',
        stock_number: '',
        quantity: 1,
      };
      this.collection.push(item);

      return item;
    },
    remove: function (idx) {
      this.collection = this.collection.filter(function (item) {
        return item.id !== idx;
      });
    },
    get: function (id) {
      let found_item;

      this.collection.forEach(function (item) {
        if (item.id === id) {
          found_item = item;
        }
      });

      return found_item;
    },
    update: function (itemRow) {
      const id = this.findID(itemRow);
      const item = this.get(id);

      item.name = itemRow.querySelector('[name^=item_name]').value;
      item.stock_number = itemRow.querySelector(
        '[name^=item_stock_number]'
      ).value;
      item.quantity = itemRow.querySelector('[name^=item_quantity]').value;
    },
    newItem: function (e) {
      e.preventDefault();

      let item = this.add();
      document
        .querySelector('#inventory')
        .insertAdjacentHTML('beforeend', this.template({ id: item.id }));
    },
    findParent: function (e) {
      return e.target.closest('tr');
    },
    findID: function (item) {
      return +item.querySelector('input[type=hidden]').value;
    },
    deleteItem: function (e) {
      e.preventDefault();

      if (e.target.classList.contains('delete')) {
        const item = this.findParent(e);
        // Remove item from collection
        this.remove(this.findID(item));
        // Remove row from table
        item.remove();
      }
    },
    updateItem: function (e) {
      if (e.target.tagName === 'INPUT') {
        const item = this.findParent(e);
        this.update(item);
      }
    },
    bindEvents: function () {
      document
        .querySelector('#add_item')
        .addEventListener('click', this.newItem.bind(this));
      document
        .querySelector('#inventory')
        .addEventListener('click', this.deleteItem.bind(this));
      document
        .querySelector('#inventory')
        .addEventListener('focusout', this.updateItem.bind(this));
    },
    init: function () {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    },
  };
})();

document.addEventListener('DOMContentLoaded', () =>
  inventory.init.bind(inventory)()
);
