const toImage = require("node-html-to-image");
const dataTransform = require("./data-transform");
const history = require("./history");
const utility = require("./utility");
const fs = require("fs");
const axios = require("axios").default;
const schedule = require("node-schedule");

/*
let job = schedule.scheduleJob({hour: 20, minute: 30}, function() {

})
*/

let content = dataTransform.getDataSummary();

content.generatedOn = new Date();

let last = history.getHistory()[history.getHistory().length-2] || history.getLatest();
let deltas = utility.getDeltas(content, last);

content.deltas = deltas;

content.percentages = [
  {
    name: "Recovered",
    number: content.recovered,
    bgcolor: "#E0DFD5",
    fgcolor: "#313638",
    percentage:  ((content.recovered/content.totalCases) * 100).toFixed(0),
    delta: deltas.recovered,
  },
  {
    name: "Asymptomatic",
    number: content.asymptomatic,
    bgcolor: "#4A6D7C",
    fgcolor: "#E0DFD5",
    percentage:  ((content.asymptomatic/content.totalCases) * 100).toFixed(0),
    delta: deltas.asymptomatic,
  },
  {
    name: "Mild symptoms",
    number: content.mild,
    bgcolor: "#F09D51",
    fgcolor: "#313638",
    percentage: ((content.mild/content.totalCases) * 100).toFixed(0),
    delta: deltas.mild,
  },
  {
    name: "Dead",
    number: content.died,
    bgcolor: "#171738",
    fgcolor: "#E0DFD5",
    percentage:  ((content.died/content.totalCases) * 100).toFixed(0),
    delta: deltas.died,
  }
]

content.quarantineStatus = [
  {
    name: "Quarantined",
    number: content.quarantined,
    bgcolor: "#E0DFD5",
    fgcolor: "#313638",
    percentage: ((content.quarantined/content.quarantinedTotalBasis) * 100).toFixed(0),
    delta: deltas.quarantined,
  },
  {
    name: "Not quarantined",
    number: content.notQuarantined,
    bgcolor: "#F09D51",
    fgcolor: "#313638",
    percentage: ((content.notQuarantined/content.quarantinedTotalBasis) * 100).toFixed(0),
    delta: deltas.notQuarantined,
  },
  {
    name: "No data",
    number: content.noQuarantineData,
    bgcolor: "#171738",
    fgcolor: "#E0DFD5",
    percentage: ((content.noQuarantineData/content.quarantinedTotalBasis) * 100).toFixed(0),
    delta: deltas.noData,
  },
]

// Inject delta into regions
for (let r in content.regions) {
  if (deltas.regions[r] !== 0) {
    content.regions[r].delta = deltas.regions[r].number;
  }
}

// Sorted regions for display
let sortedRegions = [];

for (let r in content.regions) {
  sortedRegions.push({
    name: r,
    ...content.regions[r]
  })
}

sortedRegions.sort((a, b) => {
  let A = a.number;
  let B = b.number;

  if (A < B) return 1;
  if (A > B) return -1;
  return 0;
});

toImage({
  output: "./image.png",
  html: fs.readFileSync("./source/index.hbs", {encoding: "utf-8"}),
  waitUntil: "networkidle2",
  content: {...content, sortedRegions}
})

history.save(content);

console.log("Operation complete! ✔")