// modules protect their variables and functions from leaking.

console.log("Very Important js code");
export const x = 78;
export const fxn = (a, b) => {
  console.log("Showing the value of a and b", a, b);
};
