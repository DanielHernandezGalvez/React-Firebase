// http es una librería que viene integrada con node
const http = require("http");

http.createServer((req, res) => {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Holanga happy happy happy")

}).listen(3001, "localhost")