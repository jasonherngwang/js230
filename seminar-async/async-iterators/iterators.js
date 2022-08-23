// Custom iterator
// Iterable object
const collection = {
  a: 10,
  b: 20,
  c: 30,
  // Custom method
  [Symbol.iterator]() {
    let i = 0;
    const values = Object.keys(this);
    // Iterator object
    return {
      next: () => {
        return {
          value: this[values[i++]],
          done: i > values.length,
        };
      },
    };
  },
};

// Extract the iterator out
const iterator = collection[Symbol.iterator]();
// Execute it manually
console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// -----------------------------------------------------------------------------
// for..of
for (const value of collection) console.log(value);
// 10
// 20
// 30

// Custom implementation of for..of
function myForOfFunc(collection, func) {
  let iterator = collection[Symbol.iterator]();
  let current = iterator.next();

  while (!current.done) {
    func(current.value);
    current = iterator.next();
  }
}

function displayItem(item) {
  console.log(item);
}

myForOfFunc(collection, displayItem);
// 10
// 20
// 30

// -----------------------------------------------------------------------------
// Iterables are customizable
// We can iterate backwards
const array = [1, 2, 3];

array[Symbol.iterator] = function () {
  let i = this.length;

  return {
    next: () => {
      return {
        value: this[--i],
        done: i < 0,
      };
    },
  };
};

for (const value of array) console.log(value);
// 3
// 2
// 1

console.log(array);
// [ 1, 2, 3, [Symbol(Symbol.iterator)]: [Function (anonymous)] ]
console.log([...array]);
// [ 3, 2, 1 ]

// -----------------------------------------------------------------------------
// Check iterability
function isIterable(obj) {
  return typeof obj[Symbol.iterator] === 'function';
}
console.log(isIterable('strings')); // true
console.log(isIterable([1, 2, 3])); // true
console.log(isIterable({ a: 1, b: 2 })); // false
