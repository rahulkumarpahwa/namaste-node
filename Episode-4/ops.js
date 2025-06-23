// modules protect their variables and functions from leaking.

function sub(a, b) {
  console.log(a - b);
}

const div = (a, b) => {
  console.log(a / b);
};

// module.exports = { sub, div }; // multiple exports
// module.exports = {
//   sub: sub,
//   div: div,
// };

// other way of exports
module.exports.sub = sub;
module.exports.div = div;
