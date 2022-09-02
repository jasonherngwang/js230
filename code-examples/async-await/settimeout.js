function printHello() {
  console.log('Hello');
}

setTimeout(printHello, 500);

console.log('Me first');

// Me first
// Hello

/*
- Add global execution context to call stack.
- Declare function printHello.
- Add setTimeout to call stack.
  - Invoke setTimeout
  - Create new execution context for setTimeout. Implicitly set to window.
  - Pair parameters with passed arguments.
  - Push function printHello and value 500 to Browser API.
  - Browser API starts a timer.
- Pop setTimeout off call stack.
- GC execution context of setTimeout.
- Log "Me first".
- Event loop checks callback queue CONTINUALLY to see if there are any events.
- Browser API pushes printHello onto the callback queue.
- Event loop transfers printHello to call stack.
- Invoke printHello.
  - Create new execution context for printHello.
  - Log "Hello".
- Pop printHello off call stack.
- GC execution context of printHello.
- Event loop continues checking callback queue, unless program is complete.
*/
