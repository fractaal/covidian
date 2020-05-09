const fs = require("fs");
const utility = require("./utility");

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

  getLatest() {
    return history[history.length-1];
  },

  save(dataset) {
    if (this.getLatest().file === dataset.file) { console.warn("Abort; already exists"); return;}
    dataset = utility.stripDeltas(dataset);
    history.push({...dataset, timestamp: Date.now()});
    writeToFile();
  }
}

