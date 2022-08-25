const ENDPOINT = 'https://ls-230-book-catalog.herokuapp.com/books';

let request = new XMLHttpRequest();

request.addEventListener('load', event => {
    if (request.status === 201) {
        console.log('Added ' + request.responseText);
    }
})

request.open('POST', ENDPOINT);
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

let data = 'title=Effective%20JavaScript&author=David%20Herman';

request.send(data);