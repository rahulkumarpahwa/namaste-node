// modules protect their variables and functions from leaking.

const sum = (a, b) => {
  console.log(a + b);
  return a + b;
};

module.exports = sum; // one way 
console.log(module.exports);
// module.exports.sum = sum; // second way