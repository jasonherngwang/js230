setTimeout(() => {
  // 1 (invoke setTimeout)
  console.log('!'); // 5 (logs third)
}, 3000);

setTimeout(() => {
  // 2 (invoke setTimeout)
  console.log('World'); // 4 (logs second)
}, 1000);

console.log('Hello'); // 3 (logs first)

// Hello
// World
// !
