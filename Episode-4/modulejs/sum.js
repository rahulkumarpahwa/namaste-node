// modules protect their variables and functions from leaking.

export const sum = (a, b) => {
  console.log(a + b);
  return a + b;
};