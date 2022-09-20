// Adapted from Juan's MVC solution
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindEnterNum(this.handleEnterNum.bind(this));
    this.view.bindToggleNeg(this.handleToggleNeg.bind(this));
    this.view.bindPerformOp(this.handlePerformOp.bind(this));
    this.view.bindPerformEqual(this.handlePerformEqual.bind(this));
    this.view.bindClear(this.handleClear.bind(this));
    this.view.bindClearEntry(this.handleClearEntry.bind(this));

    this.model.bindUpdateDisplay(this.handleUpdateDisplay.bind(this));
  }

  handleEnterNum(num) {
    this.model.enterNum(num);
  }

  handleToggleNeg() {
    this.model.toggleNeg();
  }

  handlePerformOp(op) {
    this.model.performOp(op);
  }

  handlePerformEqual() {
    this.model.performEqual();
  }

  handleClear() {
    this.model.clear();
  }

  handleClearEntry() {
    this.model.clearEntry();
  }

  handleUpdateDisplay(entry, operation) {
    this.view.updateDisplay(entry, operation);
  }
}

class Model {
  constructor() {
    this.entry = '0';
    this.operationResult = '0'; // Cache result of current operation.
    this.operation = [];
    this.afterOp = true;
  }

  bindUpdateDisplay(handler) {
    this.updateDisplay = handler;
  }

  // num is a string
  enterNum(num) {
    if (this.afterOp || this.entry === '0') {
      this.entry = num === '.' ? '0.' : num;
    } else {
      if (num === '.' && this.entry.includes('.')) return;
      this.entry += num;
    }

    this.afterOp = false;

    this.updateDisplay(this.entry, this.operation);
  }

  toggleNeg() {
    if (this.entry[0] === '-') {
      this.entry = this.entry.slice(1);
    } else {
      this.entry = '-' + this.entry;
    }

    this.updateDisplay(this.entry, this.operation);
  }

  updateOperationResult() {
    // Convert to numbers
    const operationResult = Number(this.operationResult);
    const entry = Number(this.entry);

    if (this.operation.length === 0) {
      this.operationResult = this.entry;
      return;
    }

    const lastOperation = this.operation[this.operation.length - 1];

    this.operationResult = String(
      (() => {
        switch (lastOperation) {
          case '+':
            return operationResult + entry;
          case '-':
            return operationResult - entry;
          case '*':
            return operationResult * entry;
          case '/':
            return operationResult / entry;
          case '%':
            return operationResult % entry;
        }
      })()
    );
  }

  performOp(op) {
    // Can't perform successive operations without a new entry inbetween.
    if (!this.afterOp) {
      this.updateOperationResult();
      this.operation.push(this.entry, op);
      this.entry = this.operationResult;
      this.afterOp = true;

      this.updateDisplay(this.entry, this.operation);
    }
  }

  performEqual() {
    if (!this.afterOp) this.updateOperationResult();
    this.entry = this.operationResult;
    this.operation = [];
    this.afterOp = false;

    this.updateDisplay(this.entry, this.operation);
  }

  clear() {
    this.entry = '0';
    this.operationResult = '0';
    this.operation = [];
    this.afterOp = true;

    this.updateDisplay(this.entry, this.operation);
  }

  clearEntry() {
    this.entry = '0';
    this.afterOp = true;

    this.updateDisplay(this.entry, this.operation);
  }
}

class View {
  constructor() {
    this.$operation = $('#operation');
    this.$entry = $('#entry');
    this.$ce = $('#ce');
    this.$c = $('#c');
    this.$neg = $('#neg');
    this.$nums = $('.num');
    this.$dec = $('#dec');
    this.$ops = $('.op');
    this.$eq = $('#eq');
  }

  bindEnterNum(handler) {
    this.$nums.on('click', (e) => {
      const num = $(e.target).text();
      handler(num);
    });
  }

  bindPerformOp(handler) {
    this.$ops.on('click', (e) => {
      const op = $(e.target).text();
      handler(op);
    });
  }

  bindToggleNeg(handler) {
    this.$neg.on('click', (e) => handler());
  }

  bindPerformEqual(handler) {
    this.$eq.on('click', (e) => handler());
  }

  bindClear(handler) {
    this.$c.on('click', (e) => handler());
  }

  bindClearEntry(handler) {
    this.$ce.on('click', (e) => handler());
  }

  updateDisplay(entry, operation) {
    this.$entry.text(entry);
    this.$operation.text(operation.join(' '));
  }
}

$(() => {
  const app = new Controller(new Model(), new View());
});
