let a = 23;
let b = 89;

let sentence = "Rahul : A 100x Dev";
console.log(sentence);
console.log(a + b);

// Browser : 
// window object : window, this, self, frames, globalThis.

console.log(global); // works only in node.js
console.log(this); // works only in browser console
console.log(globalThis); // works both in browser console and node.js
console.log(global === globalThis);