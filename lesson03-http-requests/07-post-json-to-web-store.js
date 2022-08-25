const ENDPOINT = 'https://ls-230-web-store-demo.herokuapp.com/v1/products';

let request = new XMLHttpRequest();
request.open('POST', ENDPOINT);

request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
request.setRequestHeader('Authorization', 'token AUTH_TOKEN');

let data = { name: 'Cheese', sku: 'MAUS', price: 888 };
let json = JSON.stringify(data);

request.addEventListener('load', () => {
  if (request.status === 201) {
    console.log('Added: ' + request.responseText);
  }
});

request.send(json);
