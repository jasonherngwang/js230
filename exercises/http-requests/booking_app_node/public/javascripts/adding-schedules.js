/*
Setup
- Query /api/staff_members for a list of staff.
- Use this list to populate the drop-down menus.

Creating a form
- Create a function that creates a form

Submitting all forms
- For each form, serialize the FormData into JSON. Aggregate data from all forms
  into the format required by the API.
- Validation checks
  - Use regex to check format of Date and Time fields.
  - If any checks fail, alert.
- Associate each drop-down item with the id of the staff. Could use the staff
  name as the display value, and the id as the underlying value.

Data format
{
    "schedules": [
        {
            "staff_id": 1,
            "date": "10-10-10",
            "time": "12:12"
        }
    ]
}
*/

// Create form elements
async function createForm() {
  const staffOptions = await fetch('api/staff_members').then((response) =>
    response.json()
  );

  const form = document.createElement('form');
  form.action = 'api/schedules';
  form.method = 'post';

  const h1 = document.createElement('h1');
  h1.textContent = 'Schedule ';

  const dl = document.createElement('dl');

  const labelName = document.createElement('label');
  labelName.textContent = 'Staff Name: ';

  const selectStaff = document.createElement('select');
  selectStaff.name = 'staff_id';

  staffOptions.forEach((staff) => {
    const option = document.createElement('option');
    option.value = staff.id;
    option.textContent = staff.name;
    selectStaff.appendChild(option);
  });

  const labelDate = document.createElement('label');
  labelDate.textContent = 'Date: ';
  const inputDate = document.createElement('input');
  inputDate.name = 'date';
  inputDate.type = 'text';

  const labelTime = document.createElement('label');
  labelTime.textContent = 'Time: ';
  const inputTime = document.createElement('input');
  inputTime.name = 'time';
  inputTime.type = 'text';

  // form.appendChild(h1);
  form.appendChild(dl);
  dl.appendChild(document.createElement('dt')).appendChild(labelName);
  dl.appendChild(document.createElement('dd')).appendChild(selectStaff);
  dl.appendChild(document.createElement('dt')).appendChild(labelDate);
  dl.appendChild(document.createElement('dd')).appendChild(inputDate);
  dl.appendChild(document.createElement('dt')).appendChild(labelTime);
  dl.appendChild(document.createElement('dd')).appendChild(inputTime);

  return form;
}

function formDataToJson(formData) {
  const json = {};

  for (const [key, val] of formData.entries()) {
    json[key] = val;
  }

  return json;
}

function validDate(dateStr) {
  return /^\d{2}-\d{2}-\d{2}$/.test(dateStr);
}

function validTime(timeStr) {
  return /^\d{2}:\d{2}$/.test(timeStr);
}

function validFormData(formData) {
  return validDate(formData.get('date')) && validTime(formData.get('time'));
}

document.addEventListener('DOMContentLoaded', async () => {
  const scheduleDiv = document.querySelector('#schedules');
  const addButton = document.querySelector('#add_button');
  const submitButton = document.querySelector('#submit_button');

  scheduleDiv.appendChild(await createForm());

  addButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const newForm = await createForm();
    scheduleDiv.appendChild(newForm);
  });

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    const forms = [...scheduleDiv.querySelectorAll('form')];

    if (forms.some((form) => !validFormData(new FormData(form)))) {
      alert('Invalid form data!');
    } else {
      const formData = forms.map((form) => {
        return formDataToJson(new FormData(form));
      });

      const payload = JSON.stringify({ schedules: formData });

      (async () => {
        const response = await fetch('api/schedules', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: payload,
        });

        if (response.ok) {
          const result = await response.text();
          alert(result);
          forms.forEach((form) => form.reset());
          while (scheduleDiv.children.length > 1) {
            scheduleDiv.lastElementChild.remove();
          }
        } else {
          const text = await response.text();
          alert(text);
        }
      })();
    }
  });
});
