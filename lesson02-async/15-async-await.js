function buyHamburger(restaurant) {
  return new Promise((resolve, reject) => {
    console.log(`Ordering burger from ${restaurant}`);
    if (restaurant === 'McDonalds') {
      resolve('Big Mac served');
    } else {
      reject('Go to McDonalds');
    }
  });
}

function processOrder(response) {
  return new Promise((resolve, reject) => {
    console.log('Processing order');
    resolve('Response: ' + response);
  });
}

buyHamburger('McDonalds')
  .then((response) => {
    console.log('Order placed');
    return processOrder(response);
  })
  .then((processedResponse) => {
    console.log(processedResponse);
  })
  .catch((err) => {
    console.log(err);
  });

/*
Sequence of events

Promise is a constructor function.

buyHamburger('McDonalds')
- We pass a callback as an argument to the Promise constructor.
- JS creates a new object inheriting from Promise.prototype.
- JS executes all code inside the constructor function. We don't know what this
  looks like.
- JS executes the code within the passed callback, though it doesn't yet know
  what resolve and reject are.
- JS returns the new Promise object.
- buyHamburger returns the Promise object.

.then
- We pass 1 argument to the Promise object, a callback for the resolve param.
- The Promise executes the resolve callback, logging 'Order placed'.
- The `response` is the string 'Big Mac served'.
- Invokes processOrder, passing this string.

processOrder
- Create new Promise
- Execute code in the callback, logging 'Order placed'
- Return the Promise.

.then
- Pass a resolve callback.
- Log 'Response: Big Mac served'

*/
