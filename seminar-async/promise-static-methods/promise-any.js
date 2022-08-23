/* 
Promise.any
Wait for the first promise to resolve, or all are rejected.
*/

const pErr = new Promise((resolve, reject) =>  {
  reject("Always fails");
});
const pSlow = new Promise((resolve, reject) =>  {
  setTimeout(() => resolve('slow'), 1000);
});
const pFast = new Promise((resolve, reject) =>  {
  setTimeout(() => resolve('fast'), 100);
});

// At least one resolves
// Promise.any([pErr, pSlow, pFast])
//   .then((result) => console.log(result)) // fast

// Empty input
// Promise.any([]).then((result) => console.log(result))
// [AggregateError: All promises were rejected]

// All reject
// Promise.any([pErr]).then((result) => console.log(result))
// [AggregateError: All promises were rejected]

// Error handling
Promise.any([pErr])
  .then((result) => console.log(result))
  .catch((error) => {
    console.log(error); // [AggregateError: All promises were rejected]
    console.log(error.errors); // [ 'Always fails' ]
  });

// throw new Error
Promise.any([pErr])
  .catch((error) => {
    throw new Error('you failed')
  })
  .then((result) => console.log(result))
  .catch((error) => {
    console.log(error);
    console.log(error.errors);
  })