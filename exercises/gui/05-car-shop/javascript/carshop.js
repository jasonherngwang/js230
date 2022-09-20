const cars = [
  {
    make: 'Honda',
    image: 'images/honda-accord-2005.jpg',
    model: 'Accord',
    year: 2005,
    price: 7000,
  },
  {
    make: 'Honda',
    image: 'images/honda-accord-2008.jpg',
    model: 'Accord',
    year: 2008,
    price: 11000,
  },
  {
    make: 'Toyota',
    image: 'images/toyota-camry-2009.jpg',
    model: 'Camry',
    year: 2009,
    price: 12500,
  },
  {
    make: 'Toyota',
    image: 'images/toyota-corrolla-2016.jpg',
    model: 'Corolla',
    year: 2016,
    price: 15000,
  },
  {
    make: 'Suzuki',
    image: 'images/suzuki-swift-2014.jpg',
    model: 'Swift',
    year: 2014,
    price: 9000,
  },
  {
    make: 'Audi',
    image: 'images/audi-a4-2013.jpg',
    model: 'A4',
    year: 2013,
    price: 25000,
  },
  {
    make: 'Audi',
    image: 'images/audi-a4-2013.jpg',
    model: 'A4',
    year: 2013,
    price: 26000,
  },
];

$(() => {
  const $main = $('main');
  const carsTemplate = Handlebars.compile($('#cars_template').html());
  const options = {};
  const makesModels = {};

  $main.append(carsTemplate({ cars }));
  populateOptions();
  findMakesModels();
  bindListeners();

  function uniqueValues(key, array) {
    return [...new Set(array.map((elem) => elem[key]))];
  }

  function findUniqueOptions() {
    ['make', 'model', 'price', 'year'].forEach((key) => {
      let values = uniqueValues(key, cars);
      if (!Number(values[0])) {
        values.sort();
      } else {
        values.sort((a, b) => a - b);
      }
      options[key] = values;
    });
  }

  function findMakesModels() {
    const makes = uniqueValues('make', cars);
    makes.forEach((make) => {
      const models = [
        ...new Set(
          cars.filter((car) => car.make === make).map((car) => car.model)
        ),
      ];
      makesModels[make] = models;
    });
  }

  function populateOptions() {
    findUniqueOptions();
    for (let [key, values] of Object.entries(options)) {
      const select = $(`#${key}`);
      values.forEach((value) => {
        const option = $(`<option value=${value}>${value}</option>`);
        select.append(option);
      });
    }
  }

  function bindListeners() {
    const $submitButton = $('#filterButton');
    $submitButton.click((e) => {
      e.preventDefault();

      const selectedValues = {};
      ['make', 'model', 'price', 'year'].forEach((key) => {
        const value = $(`#${key}`).val();
        if (!(value === 'Any' || value === 'All')) {
          selectedValues[key] = value;
        }
      });

      filter(selectedValues);
    });

    const $makes = $('#make');
    const $models = $('#model');
    $makes.change((e) => {
      const make = $makes.val();
      $models.find('option:not(:first)').remove();

      let models;
      if (!['Any', 'All'].includes(make)) {
        models = makesModels[make];
      } else {
        models = uniqueValues('model', cars);
      }
      models.forEach((model) => {
        const option = $(`<option value=${model}>${model}</option>`);
        $models.append(option);
      });
    });
  }

  function filter(selectedValues) {
    let filteredCars = cars;

    console.log(selectedValues);
    for (let [key, value] of Object.entries(selectedValues)) {
      filteredCars = filteredCars.filter((car) => String(car[key]) === value);
      console.log(filteredCars);
    }

    $main.empty();
    $main.append(carsTemplate({ cars: filteredCars }));
  }
});
