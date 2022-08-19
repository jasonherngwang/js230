// Problem 1
function makeLogger(val) {
  return () => console.log(val);
}

function delayLog() {
  const numbers = [...Array(10).keys()].map((i) => i + 1);
  numbers.forEach((num) => {
    setTimeout(makeLogger(num), num * 1000);
  });
}

// delayLog();

// Problem 2

// // 1
// setTimeout(() => {
//   console.log('Once'); // 5
// }, 1000);

// // 2
// setTimeout(() => {
//   console.log('upon'); // 7
// }, 3000);

// // 3
// setTimeout(() => {
//   console.log('a'); // 6
// }, 2000);

// // 4
// setTimeout(() => {
//   console.log('time'); // 8
// }, 4000);

// Problem 3

// setTimeout(() => {
//   setTimeout(() => {
//     q(); // 7
//   }, 15);

//   d(); // 3

//   setTimeout(() => {
//     n(); // 5
//   }, 5);

//   z(); // 4
// }, 10);

// setTimeout(() => {
//   s(); // 6
// }, 20);

// setTimeout(() => {
//   f(); // 1
// });

// g(); // 2

// Problem 4

function afterNSeconds(callback, seconds) {
  setTimeout(callback, seconds * 1000);
}

afterNSeconds(() => console.log('2 sec passed'), 2);
