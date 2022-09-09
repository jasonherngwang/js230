export default (func, delay) => {
  // Initialized when imported. In closure of returned function.
  let timeout;

  // Every time this function is invoked, it cancels the previous timeout
  // and assigns a new timeout operation.
  // If we call it multiple times in succession, only the last call over the
  // last `delay` ms will remain.
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
      console.log('Debounce filter: Cleared previous timeout operation');
    }
    timeout = setTimeout(() => func(...args), delay);
  };
};
