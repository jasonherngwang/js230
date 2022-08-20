// Executor function
let executor = (resolve, reject) => {
  // Pick only one: resolve or reject
  setTimeout(() => resolve('done'), 1000); // Passes String value of 'done'
  // setTimeout(() => reject(new Error('Whoops!')), 1000); // Passes Error object
};

// Creating a promise
let promise = new Promise(executor);

// Consuming the promise, with `then`
// The promise object could be:
// 1. fulfilled with a value, or
// 2. rejected with an error
promise.then(
  // Handle fulfilled. Receives String 'done'.
  (result) => console.log('We are ' + result), // We are done
  // Handle rejected. Receives Error object.
  (error) => console.log(error.message) // Whoops!
);

// Only interested in resolve
// promise.then(
//   (result) => console.log('We are ' + result) // We are done
// );

// Only interested in error (these are equivalent)
promise.then(
  null,
  (error) => console.log(error.message) // Whoops!
);

promise.catch(
  (error) => console.log(error.message) // Whoops!
);

// Combining then and catch
promise
  .then(
    (result) => console.log('We are ' + result) // We are done
  )
  .catch(
    (error) => console.log(error.message) // Whoops!
  );

// Cleaning up with `finally`
promise
  .then(
    (result) => console.log('We are ' + result) // We are done
  )
  .finally(
    // Has no parameters
    () => console.log('Finally') // Finally
  )
  // finally passes-through the Error object.
  .catch(
    (error) => console.log(error.message) // Whoops!
  );
