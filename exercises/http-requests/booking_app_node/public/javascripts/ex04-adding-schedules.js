/*
Setup
- Query /api/staff_members for a list of staff.
- Use this list to populate the drop-down menus.
- Create a function that builds a fieldset

Submitting the form
- For each fieldset, serialize the data into JSON. Aggregate data from
  fieldsets into the format required by the API.
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
async function createFieldset(id) {
  const staffOptions = await fetch('api/staff_members').then((response) =>
    response.json()
  );

  const fieldset = document.createElement('fieldset');
  fieldset.id = id;

  const legend = document.createElement('legend');
  legend.textContent = `Schedule ${id}`;

  const dl = document.createElement('dl');

  const labelName = document.createElement('label');
  labelName.textContent = 'Staff Name: ';

  const selectStaff = document.createElement('select');
  selectStaff.name = 'staff_id';

  staffOptions.forEach((staff) => {
    const option = document.createElement('option');
    option.value = staff.id;
    option.textContent = staff.name;
    selectStaff.append(option);
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

  dl.appendChild(document.createElement('dt')).append(labelName);
  dl.appendChild(document.createElement('dd')).append(selectStaff);
  dl.appendChild(document.createElement('dt')).append(labelDate);
  dl.appendChild(document.createElement('dd')).append(inputDate);
  dl.appendChild(document.createElement('dt')).append(labelTime);
  dl.appendChild(document.createElement('dd')).append(inputTime);

  fieldset.append(legend);
  fieldset.append(dl);

  return fieldset;
}

function validDate(dateStr) {
  return /^\d{2}-\d{2}-\d{2}$/.test(dateStr);
}

function validTime(timeStr) {
  return /^\d{2}:\d{2}$/.test(timeStr);
}

function validFieldsetData(fieldset) {
  const date = fieldset.querySelector('input[name="date"]').value;
  const time = fieldset.querySelector('input[name="time"]').value;
  return validDate(date) && validTime(time);
}

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.querySelector('form');
  const scheduleDiv = document.querySelector('#schedules');
  const addButton = document.querySelector('#add_button');

  scheduleDiv.append(await createFieldset(1));

  addButton.addEventListener('click', async (event) => {
    event.preventDefault();

    let id = scheduleDiv.querySelectorAll('fieldset').length + 1;
    const newFieldset = await createFieldset(id);
    scheduleDiv.append(newFieldset);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let payload;

    const fieldsets = [...scheduleDiv.querySelectorAll('fieldset')];

    if (!fieldsets.every((fieldset) => validFieldsetData(fieldset))) {
      alert('Invalid form data!');
    } else {
      payload = fieldsets.map((fieldset) => {
        const staff_id = fieldset.id;
        const date = fieldset.querySelector('input[name="date"]').value;
        const time = fieldset.querySelector('input[name="time"]').value;
        return { staff_id, date, time };
      });

      payload = JSON.stringify({ schedules: payload });

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
          form.reset();
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
