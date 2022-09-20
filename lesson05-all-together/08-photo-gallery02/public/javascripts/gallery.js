class Slideshow {
  // Initial Setup
  constructor() {
    this.photos = null;
    this.templates = {};
    this.firstSlide = null;
    this.currentSlide = null;
    this.lastSlide = null;
    this.prevButton = null;
    this.nextButton = null;
    this.likeButton = null;
    this.favoriteButton = null;

    this.compileTemplates();
    this.initializeSlideshow();
  }

  compileTemplates() {
    document
      .querySelectorAll('script[type="text/x-handlebars"]')
      .forEach((template) => {
        this.templates[template.id] = Handlebars.compile(template.innerHTML);
      });

    document
      .querySelectorAll('script[data-type="partial"]')
      .forEach((template) => {
        Handlebars.registerPartial(template.id, template.innerHTML);
      });
  }

  renderPhotos() {
    document
      .querySelector('#slides')
      .insertAdjacentHTML(
        'beforeend',
        this.templates.photos({ photos: this.photos })
      );
  }

  renderAllPhotoInfo(id) {
    this.renderPhotoInfo(id);
    this.renderComments(id);
  }

  renderPhotoInfo(id) {
    const currentPhoto = this.photos.filter(
      (photo) => photo.id === Number(id)
    )[0];

    const header = document.querySelector('header');
    header.replaceChildren();
    header.insertAdjacentHTML(
      'beforeend',
      this.templates.photo_information(currentPhoto)
    );
  }

  renderComments(id) {
    fetch('/comments?photo_id=' + id)
      .then((response) => response.json())
      .then((json) => {
        const comments = document.querySelector('#comments ul');
        comments.replaceChildren();
        comments.insertAdjacentHTML(
          'beforeend',
          this.templates.photo_comments({ comments: json })
        );
      });
  }

  renderSingleComment(commentData) {
    const comments = document.querySelector('#comments ul');
    comments.insertAdjacentHTML(
      'beforeend',
      this.templates.photo_comment(commentData)
    );
  }

  initializeSlideshow() {
    fetch('/photos')
      .then((response) => response.json())
      .then((json) => {
        this.photos = json;

        let firstPhotoId = this.photos[0].id;
        let lastPhotoId = this.photos[this.photos.length - 1].id;

        this.renderPhotos();
        this.renderAllPhotoInfo(firstPhotoId);

        this.firstSlide = document.querySelector(
          `figure[data-id="${firstPhotoId}"]`
        );
        this.lastSlide = document.querySelector(
          `figure[data-id="${lastPhotoId}"]`
        );
        this.currentSlide = this.firstSlide;

        this.bindButtons();
        this.bindForm();
      });
  }

  // Slideshow functionality

  fadeIn(slideElem) {
    slideElem.classList.add('show');
    slideElem.classList.remove('hide');
  }

  fadeOut(slideElem) {
    slideElem.classList.add('hide');
    slideElem.classList.remove('show');
  }

  prevSlide() {
    this.fadeOut(this.currentSlide);
    this.currentSlide =
      this.currentSlide.previousElementSibling || this.lastSlide;
    this.fadeIn(this.currentSlide);
    this.renderAllPhotoInfo(this.currentSlide.getAttribute('data-id'));
  }

  nextSlide() {
    this.fadeOut(this.currentSlide);
    this.currentSlide = this.currentSlide.nextElementSibling || this.firstSlide;
    this.fadeIn(this.currentSlide);
    this.renderAllPhotoInfo(this.currentSlide.getAttribute('data-id'));
  }

  // Like and Favorite

  like(button, photoId) {
    const path = button.href;

    fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
      body: `photo_id=${photoId}`,
    })
      .then((response) => response.json())
      .then((json) => {
        button.textContent = button.textContent.replace(/\b\d+\b/, json.total);
      });
  }

  // Bind events

  bindButtons() {
    this.prevButton = document.querySelector('.prev');
    this.nextButton = document.querySelector('.next');
    this.actions = document.querySelector('.actions');

    this.prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.prevSlide();
    });

    this.nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.nextSlide();
    });

    this.actions.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.tagName === 'A') {
        const button = e.target;
        this.like(button, this.currentSlide.getAttribute('data-id'));
      }
    });
  }

  bindForm() {
    this.form = document.querySelector('form');

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      let data = new FormData(this.form);
      data = new URLSearchParams(data);

      fetch(this.form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        body: data,
      })
        .then((response) => response.json())
        .then((json) => {
          this.renderSingleComment(json);
        });
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const slideshow = new Slideshow();
});
