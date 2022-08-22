// Promise
function fetchExample() {
  const promise = fetch('https://jsonplaceholder.typicode.com/todos/1');

  return promise
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((error) => console.log(error.mesage));
}

fetchExample();
// { userId: 1, id: 1, title: 'delectus aut autem', completed: false }

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
        // Instead of returning an object, return a promise.
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

iteratorAsync.next(4).then((result) => console.log(result)); // logs last
iteratorAsync.next(2).then((result) => console.log(result));
iteratorAsync.next(3).then((result) => console.log(result));
iteratorAsync.next(1).then((result) => console.log(result)); // logs first

// Each promise handler takes a different amount of time to resolve, but since
// next() always returns the next element in the collection, the logged output
// consists of the elements in their original order.

// { value: 10, done: false }
// { value: 20, done: false }
// { value: 30, done: false }
// { value: undefined, done: true }

// -----------------------------------------------------------------------------
// With async, we use for..await..of syntax
// Retrieving URLs
const srcArr = [
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/1',
];

srcArr[Symbol.asyncIterator] = function () {
  let i = 0;

  return {
    async next() {
      if (i === srcArr.length) return { done: true };

      const url = srcArr[i++];
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Invalid URL: ' + url);
      }

      return {
        value: await response.json(),
        done: false,
      };
    },
  };
};

// Must use await inside async func
// Note try/catch instead of .then/.catch
(async function () {
  try {
    for await (const item of srcArr) {
      console.log(item);
    }
  } catch (error) {
    console.log('Caught: ' + error.message);
  }
})();
// Logs all 3 todos in the original order.

// Same thing
async function logAsync() {
  try {
    for await (const item of srcArr) {
      console.log(item);
    }
  } catch (error) {
    console.log('Caught: ' + error.message);
  }
}
logAsync();
