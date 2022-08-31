document.addEventListener('DOMContentLoaded', () => {
  const ENDPOINT = 'http://localhost:3000/';
  let photos;

  // Elements
  const slides = document.querySelector('#slides');
  const header = document.querySelector('section > header');
  const comments = document.querySelector('#comments');

  // Handlebars templates
  const photoTemplate = Handlebars.compile(
    document.querySelector('#photos').innerHTML
  );
  const photoInfoTemplate = Handlebars.compile(
    document.querySelector('#photo_information').innerHTML
  );
  const photoCommentsTemplate = Handlebars.compile(
    document.querySelector('#photo_comments').innerHTML
  );
  Handlebars.registerPartial(
    'photoCommentTemplate',
    document.querySelector('#photo_comment').innerHTML
  );

  const displayPhotos = () => {
    const photoElem = photoTemplate({ photos });
    slides.insertAdjacentHTML('afterbegin', photoElem);
  };

  const displayPhotoInfo = () => {
    const photoInfo = photoInfoTemplate(photos[0]);
    header.insertAdjacentHTML('afterbegin', photoInfo);
  };

  fetch(ENDPOINT + 'photos')
    .then((response) => response.json())
    .then((json) => {
      photos = json;
      displayPhotos();
      displayPhotoInfo();
    });
});
