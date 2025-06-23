// V8 + LibUV
const https = require("https"); // synchronous fashion
const fs = require("fs"); // synchronous fashion 

console.log("Namaste World!");

var a = 1078839;
var b = 20929;

https.get("https://dummyjson.com/products/1", (res) => {
  console.log("Fetched data Successfully!");
  //   console.log(res);
}); // 100-200ms //2nd 

setTimeout(() => {
  console.log("set timeout called after 5 seconds!");
}, 5000); // 5000ms //3rd 

fs.readFile("./file.txt", "utf8", (err, data) => {
  console.log("File Data : " + data);
}); // fastest 10-20ms // 1st

function multiply(a, b) {
  const result = a * b;
  return result;
}

var c = multiply(a, b);
console.log("Multiplication of a and b is " + c);
