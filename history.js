const fs = require("fs");

if (!fs.existsSync(__dirname + "/history.json")) {
  fs.writeFileSync(__dirname + "/history.json", JSON.stringify([]));
}

let history = JSON.parse(fs.readFileSync(__dirname + "/history.json"));

function writeToFile() {
  fs.writeFileSync(__dirname + "/history.json", JSON.stringify(history));
}

module.exports = {
  getHistory() {
    return history;
  },

  save(dataset) {
    history.push({...dataset, timestamp: Date.now()});
    writeToFile();
  }
}

