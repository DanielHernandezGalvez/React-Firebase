// http es una librería que viene integrada con node
const http = require("http");

http.createServer((req, res) => {

    const {url} = req

    if (url === "/characters") {
        res.writeHead(200, {"Content-type": "text/plain"})
        res.end("Estoy en /characters")
    } else if (url  === "/location") {
        res.writeHead(200, {"Content-type": "text/plain"})
        res.end("Estoy en /location")
    } else {
        res.writeHead(404)
        res.end()
    }

}).listen(3001, "localhost")