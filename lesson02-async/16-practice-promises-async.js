// // 1
// // Create a Promise that resolves with a value of "Launch School" after a delay
// // of 2000ms, using setTimeout. Print the Promise's resolved value by using the
// // then method.

// const lsPromise = new Promise((resolve, reject) => {
//   setTimeout(() => resolve('Launch School'), 2000);
// });
// lsPromise.then((response) => console.log(response));

// // 2
// // Create a Promise that rejects with a value of "Error: Not Launch School"
// // after a delay of 2000ms, using setTimeout. Print the Promise's rejected value
// // by using the .catch method.

// const lsPromiseBroken = new Promise((resolve, reject) => {
//   setTimeout(() => reject('Error: Not Launch School'), 2000);
// });
// lsPromiseBroken.catch((response) => console.log(response));

// // 3
// // Promise is resolved.
// // Promise handler (`then`) places console.log in the microtask queue.
// // Logs "I am NOT a Promise" first, since it is a synchronous operation.
// // Logs "I am a Promise" second, pulling the task from the the microtask queue.
// const promise = new Promise(function (resolve, reject) {
//   resolve('I am a Promise');
// });

// promise.then((value) => console.log(value));
// console.log('I am NOT a Promise');

// // 4
// // The act of creating a promise is not an async operation.
// // A promise usually has some async operation inside it; this one does not.
// const promise4 = new Promise((resolve, reject) => {
//   // This code executes immediately when the promise is being created.
//   console.log('foo'); // Logs 1st
//   resolve(); // Marks promise as resolved. Doesn't "return from function".
//   console.log('bar'); // Logs 2nd
// });

// // Callbacks are asynchronous. This operation is put in the microtask queue.
// promise4.then(() => {
//   console.log('baz'); // Logs last
// });

// console.log('qux'); // Logs 1st; synchronous

// // 5
// const promise5 = new Promise((resolve, reject) => {
//   // Executes first
//   console.log('foo'); // Logs 1st
//   reject(); // Marks promise as rejected
//   console.log('bar'); // Logs 2nd
// });

// promise5
//   .then(() => {
//     console.log('baz'); // Never executed; promise was rejected.
//   })
//   .catch(() => {
//     console.log('qux'); // Placed in microtask queue. Logs last
//   });

// console.log('abc'); // Logs 3rd

// // 6
// const promise6 = new Promise((res) => res(1));
// promise6
//   .then((num) => {
//     console.log(num); // Logs 1
//     return num + 2;
//   })
//   .then((num) => {
//     console.log(num); // Logs 3
//     return num + 3;
//   })
//   .then((num) => {
//     console.log(num); // Logs 6
//     return num + 4;
//   })
//   // finally doesn't take arguments
//   .finally((num) => {
//     console.log(num); // Logs undefined
//     return num + 5;
//   });

// // 7
// const promise7 = new Promise((resolve, reject) => {
//   resolve('Got it!'); // This is the final state. Can only resolve/reject once.
//   reject('Oops.');
//   resolve('Again!');
// });

// promise7
//   .then((res) => {
//     console.log(res); // 'Got it!'
//   })
//   .catch((err) => {
//     console.log(err); // Doesn't run
//   });

// // 8
// // test(3) returns a pending promise.
// // `then` waits for the promise to settle.
// // Within test, we wait for the promise returned by after1s to resolve, and then
// // assign `a` to the return value.
// // after1s returns a pending promise that takes 1 sec to resolve.
// // Repeat for `b`.
// // test returns 18, resolving the promise.
// // The promise handler logs 18.

// function after1s(x) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(x);
//     }, 1000);
//   });
// }

// async function test(input) {
//   const a = await after1s(2); // Pause function execution for 1s
//   const b = await after1s(3); // Pause function execution for 1s
//   return input * a * b; // return promise with value 18
// }

// test(3).then((value) => console.log(value)); // After 2+ sec, logs 18

// // 9
// function after1s(x) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(x);
//     }, 1000);
//   });
// }

// async function test9(input) {
//   const a = await after1s(2);
//   const b = await after1s(3);
//   // `a` and `b` references values 2 and 3, not promises. await won't do anything.
//   return input * (await a) * (await b);
// }

// test9(3).then((value) => console.log(value));

// // 10
// /*
// test1 returns a pending promise that takes 2+2=4 sec to settle. It resolves to
// the value 12.

// Within test1, await pauses function execution, during this time, JS executes the
// next line of code, test2(3).

// test2 returns a pending promise that takes 1+1=2 sec to settle. It resolves to
// the value 18.

// Upon resolution of the promise returned by test2, the promise handler adds a
// logging task to the microtask queue, eventually logging 18 after 2 sec.

// Upon resolution of the promise returned by test1, the promise handler adds a
// logging task to the microtask queue, eventually logging 12 (2 sec after 18 is
// logged).

// */
// function after1sNew(x, ms) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(x);
//     }, ms);
//   });
// }

// async function test1(input) {
//   const a = await after1sNew(2, 2000);
//   const b = await after1sNew(3, 2000);
//   return input * a * b;
// }

// async function test2(input) {
//   const a = await after1sNew(2, 1000);
//   const b = await after1sNew(3, 1000);
//   return input * a * b;
// }

// test1(2).then((value) => console.log(value));
// test2(3).then((value) => console.log(value));

// // 11
// /*
// testPromise is assigned to a function that returns a settled (resolved) promise
// object with value of '1'.

// test1New executes. `then` is async and places its logging task in the microtask
// queue. console.log('2') is synchronous, so it executes first, logging '2'.

// test2New executes. `await testPromise()` pauses function execution until the
// promise returned by testPromise is resolved.

// There is no more synchronous code after the invocation of test2New, so so we
// pull the queued task from the microtask queue, logging '1'.

// In test2New, the promise returned by testPromise resolves, and '1' is logged.
// Synchronous function call `console.log('2')` logs '2'.
// */
// const testPromise = () => Promise.resolve('1');

// function test1New() {
//   testPromise().then((result) => console.log(result));
//   console.log('2');
// }

// async function test2New() {
//   console.log(await testPromise());
//   console.log('2');
// }

// test1New();
// test2New();

// // 12
// /*
// test12 is assigned to a resolved promise.

// The synchronous IIFE code executes, returning a promise.
// `await test12` Waits for the promise to resolve and logs 'A'.
// The finally block logs 'B'.

// */
// const test12 = Promise.resolve('A');

// (async () => {
//   try {
//     console.log(await test12);
//   } catch {
//     console.log('E');
//   } finally {
//     console.log('B');
//   }
// })();

// 13
/* 
`await test13` throws an error with message 'A'.
catch block logs 'E'
finally block logs 'B'
*/
const test13 = Promise.reject('A');

(async () => {
  try {
    console.log(await test13);
  } catch {
    console.log('E');
  } finally {
    console.log('B');
  }
})();
