// `async` function without asynchronous code inside.
// Returns value 1 wrapped in a resolved promise.
async function f() {
  return 1;
}

f().then(console.log); // 1

// Same
async function g() {
  return Promise.resolve(1);
}

g().then(console.log); // 1

// await
async function h() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done!'), 1000);
  });

  // await makes JS pause execution of the function until promise is resolved
  // Doesn't pause the rest of the program
  let result = await promise;

  console.log(result);
}

h();

// This can run while setTimeout completes.
// It will execute before any of the microtask queue events.
console.log('i can still run');
