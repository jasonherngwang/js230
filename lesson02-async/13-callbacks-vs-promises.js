// const failedAssessment = true;
const failedAssessment = false;

// When calling this function, we pass callbacks to specify actions performed
// upon success or failure.
// The function determines the data to pass to the callbacks.
function takeAssessment(callback, errorCallback) {
  console.log('Taking assessment');

  if (failedAssessment) {
    errorCallback({
      message: 'Failed Assessment',
      grade: 80,
    });
  } else {
    callback({
      message: 'Passed Assessment',
      grade: 100,
    });
  }
}

takeAssessment(
  (result) => {
    console.log(`${result.message}: ${result.grade}`);
  },
  (error) => {
    console.log(`${error.message}: ${error.grade}`);
  }
);

// With a Promise, the format is different:
// callback => resolve
// errorCallback => reject
function takeAssessmentPromise() {
  console.log('Taking assessment');

  // The Promise determines the data to pass to the callbacks.
  return new Promise((resolve, reject) => {
    if (failedAssessment) {
      reject({
        message: 'Failed Assessment',
        grade: 80,
      });
    } else {
      resolve({
        message: 'Passed Assessment',
        grade: 100,
      });
    }
  });
}

// We work with the Promise object returned by the function.
// We still pass two callbacks, but with the `then` and `catch` syntax.
takeAssessmentPromise()
  .then((result) => {
    console.log(`${result.message}: ${result.grade}`);
  })
  .catch((error) => {
    console.log(`${error.message}: ${error.grade}`);
  });
