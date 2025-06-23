// modules protect their variables and functions from leaking.

export function sub(a, b) {
  console.log(a - b);
}

export const div = (a, b) => {
  console.log(a / b);
};


