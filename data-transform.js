const parse = require("csv-parse/lib/sync");
const fs = require("fs");
const crypto = require("crypto");

let records = parse(fs.readFileSync(__dirname + "/data/" + fs.readdirSync(__dirname + "/data")[0]));

let labels = {};

records[0].map((value, index) => {
  labels[value] = index;
});

/*
{
  CaseCode: 0,
  Age: 1,
  AgeGroup: 2,
  Sex: 3,
  DateRepConf: 4,
  DateDied: 5,
  DateRecover: 6,
  RemovalType: 7,
  DateRepRem: 8,
  Admitted: 9,
  RegionRes: 10,
  ProvRes: 11,
  CityMunRes: 12,
  HealthStatus: 13,
  Quarantined: 14
}
*/

records.shift(); // Remove the labels row

module.exports = {
  getDataSummary () {
    let summary = {
      totalCases: 0,
      quarantined: 0,
      notQuarantined: 0,
      noQuarantineData: 0,
      quarantinedTotalBasis: 0,
      noData: 0,
      mild: 0,
      asymptomatic: 0,
      recovered: 0,
      died: 0,
      regions: {},
      file: fs.readdirSync(__dirname + "/data")[0],
      filehash: crypto.createHash("md5").update(fs.readFileSync(__dirname + "/data/" + fs.readdirSync(__dirname + "/data")[0], {encoding: "utf-8"})).digest("hex")
    }
    
    records.map(entry => {
      summary.totalCases++; 

      switch (entry[labels.HealthStatus]) { // Check the patient's health status
        case "Asymptomatic": // If they're asymptomatic...
          summary.asymptomatic++;
          break;
        case "Mild": // If they have mild symptoms...
          summary.mild++;
          break;
        case "Recovered": // etc...
          summary.recovered++;
          break;
        case "Died":
          summary.died++;
          break;
        default:
          summary.noData++;
      }

      switch(entry[labels.Quarantined]) { // For quarantine numbers
        case "Yes":
          summary.quarantined++;
          summary.quarantinedTotalBasis++;
          break;
        case "No":
          summary.notQuarantined++;
          summary.quarantinedTotalBasis++;
          break;
        default:
          summary.noQuarantineData++;
          summary.quarantinedTotalBasis++;
          break;
      }
      if (entry[labels.RegionRes]) {
        if (summary.regions[entry[labels.RegionRes]]) {
          summary.regions[entry[labels.RegionRes]].number++;
        } else {
          summary.regions[entry[labels.RegionRes]] = {number: 1};
        }
      }
    })

    for (let region in summary.regions) {
      summary.regions[region].percentage = ((summary.regions[region].number / summary.totalCases) * 100).toFixed(2);
    }

    summary.quarantinedPercentage = ((summary.quarantined/summary.quarantinedTotalBasis) * 100).toFixed(0);

    return summary
  }
}