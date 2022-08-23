// async
async function getUser() {
  return {};
}

console.log(getUser());
// Promise {<fulfilled>: {…}}
// [[Prototype]]: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: Object

getUser().then((response) => console.log(response)); // {}

// async/await
async function getUserFetch() {
  try {
    // const response = await fetch('https://api.github.com/users/jasonherngwang');
    const response = await fetch('dafsdfdafsdfasdfsdafsd');
    // Wait for data to be completely processed before logging it
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log('Uh oh');
    console.log(error);
  }
}

getUserFetch();
