const sendCharacters = (res) => {
  res.writeHead(200, { "Content-type": "text/plain" });
  const characters = [
    { id: 1, name: "Dani" },
    { id: 2, name: "Soni" },
    { id: 3, name: "Ale" },
  ];
  res.end(JSON.stringify(characters));
};

module.exports = { sendCharacters };
