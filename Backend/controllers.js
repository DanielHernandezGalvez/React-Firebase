const sendCharacters = (res) => {
  res.writeHead(200, { "Content-type": "text/plain" });
  const characters = [
    { id: 1, name: "Dani" },
    { id: 2, name: "Soni" },
    { id: 3, name: "Ale" },
  ];
  res.end(JSON.stringify(characters));
};
const sendLocations = (res) => {
  res.writeHead(200, { "Content-type": "text/plain" });
  const characters = [
    { id: 1, name: "Suiza" },
    { id: 2, name: "Tijuana" },
    { id: 3, name: "Buenos aires" },
  ];
  res.end(JSON.stringify(characters));
};

const sendNotFound = (res) => {
    res.writeHead(404)
    res.end();
}

// en Backend se usa module exports y require
module.exports = { sendCharacters, sendLocations, sendNotFound };
