const fs = require("fs");

fs.readFileSync("./file.txt", "utf8");
  // this is blocked I/O function. It is resolved by the V8 Engine and not offloaded to libuv. It will block the main thread.
console.log(
  "this will execute only after the file read as V8 engine is blocked by the Synchronous file read function."
);
