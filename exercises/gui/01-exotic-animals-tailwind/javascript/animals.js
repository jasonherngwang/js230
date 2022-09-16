const photoFiles = [
  {
    animal: 'blackbuck',
    fileName: 'blackbuck.jpg',
    description: 'animal',
  },
  {
    animal: 'genet',
    fileName: 'genet.jpg',
    description: 'creature with horns',
  },
  {
    animal: 'golden_pheasant',
    fileName: 'golden_pheasant.jpg',
    description: 'bird',
  },
  {
    animal: 'greater_bird_of_paradise',
    fileName: 'greater_bird_of_paradise.jpg',
    description: 'yet another bird',
  },
  {
    animal: 'lined_butterflyfish',
    fileName: 'lined_butterflyfish.jpg',
    description: "doesn't look like a butterfly at all",
  },
  {
    animal: 'quetzal',
    fileName: 'quetzal.jpg',
    description: 'from guatemala',
  },
  {
    animal: 'rainbow_lorikeet',
    fileName: 'rainbow_lorikeet.jpg',
    description: 'what a showoff',
  },
  {
    animal: 'vampire_squid',
    fileName: 'vampire_squid.jpg',
    description: 'goldman',
  },
];

// document.addEventListener('DOMContentLoaded', () => {
//   const photoTemplate = Handlebars.templates.photo;
//   const photos = document.querySelector('#photos');

//   photoFiles.forEach((file) => {
//     photos.insertAdjacentHTML(
//       'beforeend',
//       photoTemplate({
//         name: file.animal,
//         src: 'images/' + file.fileName,
//         description: file.description,
//       })
//     );
//   });
// });

// Using jQuery
$(() => {
  const photoTemplate = Handlebars.templates.photo;
  const $photos = $('#photos');

  photoFiles.forEach((file) => {
    $photos.append(
      photoTemplate({
        name: file.animal,
        src: 'images/' + file.fileName,
        description: file.description,
      })
    );
  });
});
