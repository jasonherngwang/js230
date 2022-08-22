/*
Write a randomizer function that accepts n callbacks and calls each callback at
some random point in time between now and 2 * n seconds from now. For instance,
if the caller provides 5 callbacks, the function should run them all sometime
within 10 seconds.

While running, randomizer should log the elapsed time every second:
1, 2, 3, ..., 2 * n.

Use setInterval to log each second.
Math.random() to generate the number secs to wait.
*/
function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function generateWaitTime(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomizer(...callbacks) {
  if (callbacks.length < 1) return;

  const maxWaitTime = callbacks.length * 2;
  let currentTime = 0;

  const counter = setInterval(() => {
    currentTime += 1;
    console.log(currentTime);

    if (currentTime > maxWaitTime) clearInterval(counter);
  }, 1000);

  callbacks.forEach((callback) => {
    let waitTime = generateWaitTime(0, maxWaitTime * 1000);
    setTimeout(() => callback(), waitTime);
  });
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6
