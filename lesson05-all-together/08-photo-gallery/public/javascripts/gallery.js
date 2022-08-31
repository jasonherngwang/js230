document.addEventListener('DOMContentLoaded', () => {
  const ENDPOINT = 'http://localhost:3000/';
  let photos;

  // Elements
  const slides = document.querySelector('#slides');
  const header = document.querySelector('section > header');
  const comments = document.querySelector('#comments > ul');
  // const likeButton = document.querySelector('a.like');
  // const favoriteButton = document.querySelector('a.button.favorite');

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
    'photo_comment',
    document.querySelector('#photo_comment').innerHTML
  );

  // Functions
  const addHttpsSrc = (json) => {
    for (obj of json) obj.src = obj.src.replace('http://', 'https://');
    return json;
  };

  const displayPhotos = () => {
    const photoHtml = photoTemplate({ photos });
    slides.insertAdjacentHTML('beforeend', photoHtml);
  };

  const displayPhotoInfo = (id) => {
    const photo = photos.filter((p) => p.id === id)[0];
    const photoInfoHtml = photoInfoTemplate(photo);
    header.replaceChildren();
    header.insertAdjacentHTML('beforeend', photoInfoHtml);
  };

  const displayComments = (id) => {
    fetch(ENDPOINT + 'comments?photo_id=' + id)
      .then((response) => response.json())
      .then((json) => {
        const commentsHtml = photoCommentsTemplate({ comments: json });
        comments.replaceChildren();
        comments.insertAdjacentHTML('beforeend', commentsHtml);
      });
  };

  // Slideshow Functionality
  const slideshow = {
    prevSlide(e) {
      e.preventDefault();

      let followingSlide =
        this.currentSlide.previousElementSibling || this.lastSlide;
      this.fadeOut(this.currentSlide);
      this.fadeIn(followingSlide);
      this.displayPhotoContent(followingSlide.getAttribute('data-id'));
      this.currentSlide = followingSlide;
    },

    nextSlide(e) {
      e.preventDefault();

      let followingSlide =
        this.currentSlide.nextElementSibling || this.firstSlide;
      this.fadeOut(this.currentSlide);
      this.fadeIn(followingSlide);
      this.displayPhotoContent(followingSlide.getAttribute('data-id'));
      this.currentSlide = followingSlide;
    },

    fadeOut(slide) {
      slide.classList.remove('show');
      slide.classList.add('hide');
    },

    fadeIn(slide) {
      slide.classList.remove('hide');
      slide.classList.add('show');
    },

    displayPhotoContent(id) {
      displayPhotoInfo(Number(id));
      displayComments(id);
    },

    bind() {
      this.prev = this.slideshow.querySelector('.prev');
      this.next = this.slideshow.querySelector('.next');
      this.prev.addEventListener('click', (e) => this.prevSlide(e));
      this.next.addEventListener('click', (e) => this.nextSlide(e));
    },

    init() {
      this.slideshow = document.querySelector('#slideshow');
      this.slides = document.querySelectorAll('figure');
      this.firstSlide = this.slides[0];
      this.lastSlide = this.slides[this.slides.length - 1];
      this.currentSlide = this.firstSlide;
      this.bind();
    },
  };

  const bindButtons = () => {
    const likeButton = document.querySelector('a.like');

    likeButton.addEventListener('click', async (e) => {
      e.preventDefault();

      const response = await fetch(ENDPOINT + `photos/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photo_id: Number(e.currentTarget.getAttribute('data-id')),
        }),
      }).then((response) => response.json());

      likeButton.textContent = `♡ ${response.total} Likes`;
    });
  };

  // Execution
  fetch(ENDPOINT + 'photos')
    .then((response) => response.json())
    .then((json) => addHttpsSrc(json))
    .then((json) => {
      photos = json;
      displayPhotos();
      displayPhotoInfo(photos[0].id);
      displayComments(photos[0].id);
      slideshow.init();
      bindButtons();
    });
});
