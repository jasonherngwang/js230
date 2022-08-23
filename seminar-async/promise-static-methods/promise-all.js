/*
Creating our own version of Promise.all

Input: Array of promises
Output: 1 promise that:
- If no errors, resolves to an array of values from the successful fulfillments.
- If any error, resolves to the error object. This occurs immediately upon
  any error.

Guard clause
- If input is empty, return Promise with value of empty array

Steps
- Track fulfillment values. Initialize variable to empty array.
- Track number of promises fulfilled. Initialize variable to 0.
- Return a new promise. Inside:
  - Iterate over the individual promises:
    - If this individual promise rejects, REJECT the "main" promise immediately.
  - Else
    - Store fulfillment value in corresponding array position.
    - Increment number of promises fulfilled.
    - If all individual promises fulfilled, RESOLVE the "main" promise.

To change this to allSettled:
- allSettled doesn't reject.
- Update metadata to have `status`, and potentially `reason` for rejection cases.
*/

function all(promises) {
  if (promises.length === 0) return Promise.resolve([]);

  return new Promise((resolve, reject) => {
    const fulfillmentValues = [];
    let numFulfilled = 0;

    promises.forEach((promise, index) => {
      promise.then(
        (result) => {
          fulfillmentValues[index] = result;
          numFulfilled += 1;
          if (numFulfilled === promises.length) {
            resolve(fulfillmentValues);
          }
        },
        (error) => reject(error)
      );
    });
  });
}

// Test and Edge Cases
// Empty array as input => Return empty array
all([]).then((result) => console.log(result)); // []

// If all input promises fulfill, value of returned promise is an array of
// values.
all([Promise.resolve(2), Promise.resolve(3)]).then((results) =>
  console.log(results)
); // [2, 3]

all([
  Promise.resolve(2),
  new Promise((res, rej) => {
    setTimeout(() => res(3), 1000);
  }),
]).then((results) => console.log(results)); // [2, 3]

// Reject if one rejects
const a = new Promise((res, rej) => {
  setTimeout(() => res('a'), 2000);
});
const b = new Promise((res, rej) => {
  setTimeout(() => rej('rejected'), 1000);
});
const c = new Promise((res, rej) => {
  setTimeout(() => res('c'), 3000);
});

all([a, b, c]).then(
  (result) => console.log(result),
  (error) => console.log(error)
); // rejected
