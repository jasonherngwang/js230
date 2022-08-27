// function availableSchedules() {
//   let request = new XMLHttpRequest();

//   request.open('GET', 'http://localhost:3000/api/schedules');
//   request.responseType = 'json';
//   request.timeout = 5000;

//   request.addEventListener('load', () => {
//     const schedules = request.response;
//     const scheduleCounts = new Map();

//     if (schedules.length > 0) {
//       let filteredSchedules = schedules.filter(
//         (schedule) => schedule.student_email === null
//       );

//       filteredSchedules.forEach((schedule) => {
//         const staffKey = `staff ${schedule.staff_id}`;
//         scheduleCounts.set(staffKey, (scheduleCounts.get(staffKey) || 0) + 1);
//       });

//       scheduleCounts.forEach((count, id) => {
//         console.log(`${id}: ${count}`);
//       });
//     } else {
//       console.log('No schedules available.');
//     }
//   });

//   request.addEventListener('timeout', (event) => {
//     console.error('Request timed out. Please try again.');
//   });

//   request.addEventListener('loadend', () => {
//     console.log('Request is complete.');
//   });

//   request.send();
// }

// availableSchedules();

// -----------------------------------------------------------------------------
// Further Exploration

// Wayne's solution
async function availableSchedules() {
  // Used to abort a web request
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const staff = await fetch('http://localhost:3000/api/staff_members', {
      signal: controller.signal,
    }).then((response) => response.json());

    // Create array of promises.
    let availableSchedules = staff.map(async (staff) => {
      const schedules = await fetch(
        'http://localhost:3000/api/schedules/' + staff.id,
        { signal: controller.signal }
      ).then((response) => response.json());
      return schedules.filter((schedule) => !schedule.student_email);
    });

    // Resolve all promises
    availableSchedules = await Promise.all(availableSchedules).then(
      (schedules) => schedules
    );

    // Tally up counts of availble schedules.
    const countsMap = new Map();

    availableSchedules = availableSchedules.reduce((map, schedules) => {
      if (schedules.length > 0) {
        const staffKey = `staff ${schedules[0].staff_id}`;
        map.set(staffKey, schedules.length);
      }
      return map;
    }, countsMap);

    // Log all counts
    if (countsMap.size === 0) {
      console.log('No available schedules');
    } else {
      availableSchedules.forEach((count, id) => console.log(`${id}: ${count}`));
    }
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  } finally {
    clearTimeout(timeout);
    console.log('Request complete');
  }
}

availableSchedules();
