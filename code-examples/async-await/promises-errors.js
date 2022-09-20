Promise.resolve()
  .then(function a() {
    Promise.resolve().then(console.log('d'));
    Promise.resolve().then(console.log('e'));
    throw new Error('Error!');
    Promise.resolve().then(console.log('f'));
  })
  .catch(console.log('b'))
  .then(console.log('c'));
