// http es una librería que viene integrada con node
const http = require("http");
const fs = require("fs");

const {
  sendCharacters,
  sendLocations,
  sendNotFound,
} = require("./controllers");

http
  .createServer((req, res) => {
    const { url } = req;

    // if (url === "/characters") {
    //     res.writeHead(200, {"Content-type": "text/plain"})
    //     res.end("Estoy en /characters")
    // } else if (url  === "/location") {
    //     res.writeHead(200, {"Content-type": "text/plain"})
    //     res.end("Estoy en /location")
    // } else {
    //     res.writeHead(404)
    //     res.end()
    // }

    switch (url) {
      case "/characters":
        sendCharacters(res); // se tiene que mandar con res
        break;

      case "/location":
        sendLocations(res);
        break;

      case "/html":
        res.writeHead(200, { "Content-type": "text/html" });
        const html = fs.readFileSync(__dirname + "/html/index.html");
        res.end(html);
        break;

      case "/template":
        res.writeHead(200, { "Content-type": "text/html" });
        let template = fs.readFileSync(
          __dirname + "/html/template.html",
          "utf-8"
        );
        const nombre = "Agustín";
        template = template.replace("{nombre}", nombre);
        res.end(template);
        break;

      default:
        sendNotFound(res);
        break;
    }
  })
  .listen(3001, "localhost");
