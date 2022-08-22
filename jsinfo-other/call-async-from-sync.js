async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // Logs pending promise; never logs 10. (incorrect)
  // console.log(wait());

  // Shows 10 after 1 second (correct)
  // Promise returned by wait() is resolved after 1 sec.
  wait().then((result) => console.log(result));
}

f();
