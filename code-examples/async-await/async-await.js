// function syncFunc() {
//   return 'sync';
// }

// async function asyncFunc() {
//   return 'async';
// }

// console.log(asyncFunc()); // Logs 1st
// asyncFunc().then(console.log); // Logs 3rd
// console.log(syncFunc()); // Logs 2nd

// Promise { 'async' }
// sync
// async

(async () => {
  Promise.resolve(1).then(console.log); // Promise #1

  console.log(2); // Synchronous code executes before Promise #1 is logged.

  // `await` blocks execution. Promise #1 is logged, then Promise #2.
  console.log(await Promise.resolve(3)); // Promise #2

  console.log(4);
})();

// 2
// 1
// 3
// 4
