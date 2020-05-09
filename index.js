const toImage = require("node-html-to-image");
const dataTransform = require("./data-transform");
const history = require("./history");
const fs = require("fs");
const axios = require("axios").default;

import "constants";

let content = dataTransform.getDataSummary();

content.generatedOn = new Date();

content.percentages = [
  {
    name: "Recovered",
    number: content.recovered,
    bgcolor: "#E0DFD5",
    fgcolor: "#313638",
    percentage:  ((content.recovered/content.totalCases) * 100).toFixed(0),
  },
  {
    name: "Asymptomatic",
    number: content.asymptomatic,
    bgcolor: "#4A6D7C",
    fgcolor: "#E0DFD5",
    percentage:  ((content.asymptomatic/content.totalCases) * 100).toFixed(0),
  },
  {
    name: "Mild symptoms",
    number: content.mild,
    bgcolor: "#F09D51",
    fgcolor: "#313638",
    percentage: ((content.mild/content.totalCases) * 100).toFixed(0),
  },
  {
    name: "Dead",
    number: content.died,
    bgcolor: "#171738",
    fgcolor: "#E0DFD5",
    percentage:  ((content.died/content.totalCases) * 100).toFixed(0),
  }
]

content.quarantineStatus = [
  {
    name: "Quarantined",
    number: content.quarantined,
    bgcolor: "#E0DFD5",
    fgcolor: "#313638",
    percentage: ((content.quarantined/content.quarantinedTotalBasis) * 100).toFixed(0),
  },
  {
    name: "Not quarantined",
    number: content.notQuarantined,
    bgcolor: "#F09D51",
    fgcolor: "#313638",
    percentage: ((content.notQuarantined/content.quarantinedTotalBasis) * 100).toFixed(0),
  },
  {
    name: "No data",
    number: content.noQuarantineData,
    bgcolor: "#171738",
    fgcolor: "#E0DFD5",
    percentage: ((content.noQuarantineData/content.quarantinedTotalBasis) * 100).toFixed(0),
  },
]


toImage({
  output: "./image.png",
  html: fs.readFileSync("./source/index.hbs", {encoding: "utf-8"}),
  waitUntil: "networkidle2",
  content
})

console.log(content);

console.log("Operation complete! ✔")