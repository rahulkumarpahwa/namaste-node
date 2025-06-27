const http = require("node:http"); // or simply write require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/secret") {
    res.end("Secret Message!");
  }
  res.end("Hello World!");
});

const port = 80;
server.listen(port, () => {
  console.log(`Server is listening at port ${port} `);
});
