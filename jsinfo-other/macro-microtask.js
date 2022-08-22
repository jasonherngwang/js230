/*
Order of execution
1. Synchronous code
2. Microtask queue: Async tasks from promise handlers then/catch/finally
3. Macrotask queue
*/

console.log(1);
// Regular synchronous call; executes immediately. Outputs `1`.
// Microtask queue: Empty
// Macrotask queue: Empty

setTimeout(() => console.log(2));
// Callback: `() => console.log(2)`
// `setTimeout` appends the callback to the macrotask queue.
// Microtask queue: Empty
// Macrotask queue: `console.log(2)`

Promise.resolve().then(() => console.log(3));
// Callback: `() => console.log(3)`
// `then` appends the callback to the microtask queue.
// Microtask queue: `console.log(3)`
// Macrotask queue: `console.log(2)`

Promise.resolve().then(() => setTimeout(() => console.log(4)));
// Callback: `() => setTimeout(() => console.log(4))`
// When this runs, it will add `() => console.log(4)` to the macrotask queue.

// `then` appends the callback to the microtask queue.
// Microtask queue: `console.log(3)`, `setTimeout(...4)`
// Macrotask queue: `console.log(2)`

Promise.resolve().then(() => console.log(5));
// Callback: `() => console.log(5)`
// `then` appends the callback to the microtask queue.
// Microtask queue: `console.log(3)`, `setTimeout(...4)`, `console.log(5)`
// Macrotask queue: `console.log(2)`

setTimeout(() => console.log(6));
// Callback: `() => console.log(6)`
// `setTimeout` appends the callback to the macrotask queue.
// Microtask queue: `console.log(3)`, `setTimeout(...4)`, `console.log(5)`
// Macrotask queue: `console.log(2)`, `console.log(6)`

console.log(7);
// Regular synchronous call; executes immediately. Outputs `7`.

/*
Exection
Output: 1
Output: 7

Microtasks run
Output: 3

`setTimeout(() => console.log(4))` adds `() => console.log(4)` to macrotasks
- No output

Output: 5

Macrotasks run
Output: 2
Output: 6
Output: 4 (from `setTimeout(...4)`)

*/
