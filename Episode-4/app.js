const { x, fxn } = require("./xyz.js");
const sum = require("./sum.js"); // single import
const { sub, div } = require("./ops.js"); // multiple import //not need to write .js

// --------------------------------------------------------------------
// const { multiply } = require("./calculation/multiply.js");
// const { modulas } = require("./calculation/modulas.js");
// above can be combined in index.js as:
const { multiply, modulas } = require("./calculation");

// --------------------------------------------------------------------

const data = require("./data.json");
console.log(data);
console.log(JSON.stringify(data));

// --------------------------------------------------------------------

const util = require("node:util");
// util is module, which has many methods and parameters.

// --------------------------------------------------------------------

let a = 23;
let b = 89;

let sentence = "Rahul : A 100x Dev";
console.log(sentence);
console.log(a + b);
sum(a, b);
sub(a, b);
div(a, b);
console.log(x);
fxn(34, 67);
multiply(2, 3);
modulas(7, 4);
// --------------------------------------------------------------------


// Browser :
// window object : window, this, self, frames, globalThis.

// console.log(global); // works only in node.js
// console.log(this); // works only in browser console
// console.log(globalThis); // works both in browser console and node.js
// console.log(global === globalThis);

// --------------------------------------------------------------------

z = "apple";
console.log(z); // will give error

// --------------------------------------------------------------------
