import {x, fxn} from "./xyz.js";
import {sum} from "./sum.js";
import {sub, div} from "./ops.js"; // make sure to put .js 


let a = 23;
let b = 89;

let sentence = "Rahul : A 100x Dev";
console.log(sentence);
console.log(a + b);
sum(a, b);
sub(a,b);
div(a, b);
console.log(x);
fxn(34, 67);


// Browser :
// window object : window, this, self, frames, globalThis.

// console.log(global); // works only in node.js
// console.log(this); // works only in browser console
// console.log(globalThis); // works both in browser console and node.js
// console.log(global === globalThis);


// strict mode :

z = "apple";
console.log(z); // will give error