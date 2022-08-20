let p = new Promise((resolve, reject) => {
  // let a = 1 + 1; // resolve
  let a = 1 + 2; // reject
  if (a === 2) {
    resolve('Success');
  } else {
    reject('Failed');
  }
});

// Code in `then` runs if `resolve`, i.e. promise has been fulfilled.
// Code in `catch` runs if `reject`, i.e. promise is not fulfilled.
p.then((message) => {
  console.log('then: ' + message);
}).catch((message) => {
  console.log('catch: ' + message);
});
