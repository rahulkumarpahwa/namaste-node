// Interview Question

console.log("Namaste World!");

var a = 1078839;
var b = 20929;

setTimeout(() => {
  console.log("Call me right now ASAP!");
}, 0);

function multiply(a, b) {
  const result = a * b;
  return result;
}

var c = multiply(a, b);
console.log("Multiplication of a and b is " + c);

// question : whom will be called first the settimeout (even when settimeout is zero ) or the multiplication?
// the multiplication will be output first always as the settimeout is asynchronous in nature and this will be passed to LIBUV and LIBUV can only send back the callback when the whole call stack is empty ie. callstack has finished executing the whole code. Even the Global Execution Context is also deleted from the call stack. So even the settimeout has 0 ms, it will be called when the whole code is executed once.

// Settimeout zero seconds means zero seconds after the callstack of main thread is empty. not the immediately zero seconds.
