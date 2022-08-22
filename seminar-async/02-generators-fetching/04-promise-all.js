/*
Creating our own version of Promise.all

Input: Array of promises
Output: 1 promise that:
- If no errors, resolves to an array of values from the successful fulfillments.
- If any error, resolves to the error object. This occurs immediately upon
  any error.

Guard clause
- If input is empty, return empty array

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


*/


// Test and Edge Cases
// Empty array as input => Return empty array
all([]).then(result => console.log(result)); // []

// If all input promises fulfill, value of returned promise is an array of 
// values.
all([Promise.resolve(2), Promise.resolve(3)])
  .then(results => console.log(results)); // [2, 3]

all([Promise.resolve(2), new Promise((res, rej) => {
  setTimeout(res(3), 1000);
}))
  .then(results => console.log(results)); // [2, 3]

// 