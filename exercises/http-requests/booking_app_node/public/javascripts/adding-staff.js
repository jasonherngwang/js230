function formDataToJson(formData) {
  const json = {};

  for (const [key, val] of formData.entries()) {
    json[key] = val;
  }

  return JSON.stringify(json);
}

// Using XHR
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.querySelector('form');

//   form.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);
//     // const json = formDataToJson(formData);

//     const request = new XMLHttpRequest();
//     request.open('POST', form.action);
//     // request.setRequestHeader('Content-Type', 'application/json');
//     // request.send(json);
//     request.send(formData);

//     request.addEventListener('load', () => {
//       switch (request.status) {
//         case 201:
//           const responseData = JSON.parse(request.response);
//           alert(`Successfully created staff with id: ${responseData.id}`);
//           form.reset();
//           break;
//         case 400:
//           alert(request.responseText);
//       }
//     });
//   });
// });

// // Using fetch
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.querySelector('form');

//   form.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const formData = new FormData(form);

//     fetch(form.action, {
//       method: 'post',
//       body: formData,
//     }).then((response) => {
//       switch (response.status) {
//         case 201:
//           response.json().then((json) => {
//             alert(`Successfully created staff with id: ${json.id}`);
//             form.reset();
//           });
//           break;
//         case 400:
//           response.text().then((text) => alert(text));
//       }
//     });
//   });
// });

// Using fetch with async/await
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = formDataToJson(new FormData(form));

    (async () => {
      const response = await fetch(form.action, {
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=utf-8',
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Successfully created staff with id: ${result.id}`);
      } else {
        const text = await response.text();
        alert(text);
      }
    })();
  });
});
