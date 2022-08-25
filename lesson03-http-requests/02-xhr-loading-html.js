document.addEventListener('DOMContentLoaded', () => {
  const ENDPOINT = 'https://ls-230-web-store-demo.herokuapp.com';

  const store = document.getElementById('store');

  // Initial page load (one-time event)
  let request = new XMLHttpRequest();
  request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com/products');

  request.addEventListener('load', (event) => {
    store.innerHTML = request.response;
  });

  request.send();

  // If we click any anchor tag, the contents of the `store` div with the
  // returned response body (HTML in this case).
  store.addEventListener('click', (event) => {
    let target = event.target;
    if (target.tagName !== 'A') return;

    event.preventDefault();

    let request = new XMLHttpRequest();
    request.open(
      'GET',
      'https://ls-230-web-store-demo.herokuapp.com' +
        target.getAttribute('href')
    );

    request.addEventListener(
      'load',
      (event) => (store.innerHTML = request.response)
    );
    request.send();
  });

  store.addEventListener('submit', (event) => {
    event.preventDefault();

    let form = event.target;
    let data = new FormData(form);

    let request = new XMLHttpRequest();

    request.open('POST', ENDPOINT + form.getAttribute('action'));
    // Don't do this! Simple strings are insecure.
    request.setRequestHeader('Authorization', 'token AUTH_TOKEN');

    request.addEventListener(
      'load',
      (event) => (store.innerHTML = request.response)
    );

    request.send(data);
  });
});

/*
When we submit the form, we make a POST request to:
https://ls-230-web-store-demo.herokuapp.com/products/2
Form data: name=Blue+Pen&sku=blup100&price=100
Content-type: application/x-www-form-urlencoded

We receive a 503 Service Unavailable status code (Cloud 9)
Should be a 404 response
*/
