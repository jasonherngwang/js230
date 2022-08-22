// Special syntax
function* generateSequence() {
  yield 1;
  yield 2;
  // `return` sets `done` to false, ending iteration.
  return 3;
}

// Invoking a generator function returns a generator object.
let sequenceGenerator = generateSequence();

// yield returns { value: 1, done: false }
console.log(sequenceGenerator.next());
console.log(sequenceGenerator.next());
console.log(sequenceGenerator.next());

console.log(sequenceGenerator.next());
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: true }
// { value: undefined, done: true }

for (const item of generateSequence()) {
  console.log(item);
}
// 1
// 2
// Skips the last value 3 because it sees `done` as false (return does this).
// Use `yield 3` instead, where `done` is still true.