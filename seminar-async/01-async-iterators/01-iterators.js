// Custom iterator
const collection = {
  a: 10,
  b: 20,
  c: 30,
  [Symbol.iterator]() {
    let i = 0;
    const values = Object.keys(this);
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

const iterator = collection[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// for..of automatically calls [Symbol.iterator]()
for (const value of collection) console.log(value);

// Custom async iterator
const collectionAsync = {
  a: 10,
  b: 20,
  c: 30,
  [Symbol.asyncIterator]() {
    let i = 0;
    const values = Object.keys(this);
    return {
      next: (sec) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              value: this[values[i++]],
              done: i > values.length,
            });
          }, sec * 1000);
        });
      },
    };
  },
};

const iteratorAsync = collectionAsync[Symbol.asyncIterator]();

iteratorAsync.next(10).then((result) => console.log(result)); // logs last
iteratorAsync.next(3).then((result) => console.log(result));
iteratorAsync.next(5).then((result) => console.log(result));
iteratorAsync.next(1).then((result) => console.log(result)); // logs first
