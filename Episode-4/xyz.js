// modules protect their variables and functions from leaking.

console.log("Very Important js code");
const x = 78;
const fxn = (a, b) => {
  console.log("Showing the value of a and b", a, b);
};

module.exports = {x, fxn};