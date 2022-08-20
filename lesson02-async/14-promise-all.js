const chopVeggies = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Veggies chopped'), 2000);
});

const sliceMeat = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Meat sliced'), 1000);
});

const grindSpices = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Spices ground.'), 3000);
});

// All 3 Promises are executed at the same time.
// Returns only when all 3 complete.
Promise.all([chopVeggies, sliceMeat, grindSpices]).then((messages) => {
  console.log(messages);
});

// sliceMeat finishes fastest
Promise.race([chopVeggies, sliceMeat, grindSpices]).then((message) => {
  console.log(message);
});
