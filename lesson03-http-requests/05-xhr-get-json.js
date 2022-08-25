const ENDPOINT = 'https://api.github.com/repos/rails/rails';

let request = new XMLHttpRequest();
request.responseType = 'json';

request.addEventListener('load', (event) => {
  let data = request.response;
  console.log(request.status);
  console.log(data.open_issues);
});

request.addEventListener('error', (event) => {
  console.log('The request could not be completed!');
});

request.open('GET', ENDPOINT);
request.send();
