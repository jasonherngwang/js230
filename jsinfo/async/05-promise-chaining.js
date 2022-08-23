// Promises and `then`
let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

// 1. Using `return value` to return an immediately resolved (settled) promise
promise.then((result) => {
  console.log(result);
  return result * 2;
});

// Equivalent to:
promise.then((result) => {
  console.log(result);
  return Promise.resolve(result * 2);
});

// 2. Return a pending promise
promise.then((result) => {
  console.log(result);
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });
});

// Chaining immediately resolved promises
promise
  .then((result) => {
    console.log(result);
    return result * 2;
  })
  .then((result) => {
    console.log(result);
    return result * 2;
  })
  .then((result) => {
    console.log(result);
    return result * 2;
  });

promise
  .then((result) => {
    console.log(result);
    return Promise.resolve(result * 2);
  })
  .then((result) => {
    console.log(result);
    return Promise.resolve(result * 2);
  })
  .then((result) => {
    console.log(result);
    return Promise.resolve(result * 2);
  });

// Chaining pending promises; Chains of async operations
promise
  .then((result) => {
    console.log(result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then((result) => {
    console.log(result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then((result) => {
    console.log(result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  });

// Mixing
promise
  .then((result) => {
    console.log(result);
    return result * 2;
  })
  .then((result) => {
    console.log(result);
    return Promise.resolve(result * 2);
  })
  .then((result) => {
    console.log(result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  });
