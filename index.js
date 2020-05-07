const toImage = require("node-html-to-image");
const fs = require("fs");
const axios = require("axios").default;

const dotw = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]


console.log("Fetching data from API... ⌛")
axios.get("https://api.apify.com/v2/datasets/sFSef5gfYg3soj8mb/items?format=json").then(async (response) => {
  let data = await response.data

  console.log("Awesome! Got it! ✔")
  console.log("Transforming data [1/2]... ⏳")

  let latest = data[data.length-1];
  let secondLatest = data[data.length-2];
  let latestDate = new Date(latest.lastUpdatedAtApify)
  let dateNow = new Date();

  let content = {};

  content.topLabel = "Philippines"
  content.dataUpdate = `Data update on ${dotw[latestDate.getDay()]}, ${months[latestDate.getMonth()]} ${latestDate.getDate()}, ${latestDate.getFullYear()}, ${latestDate.getHours()}:${latestDate.getMinutes()}`
  content.generatedOn = `Generated on ${dotw[dateNow.getDay()]}, ${months[dateNow.getMonth()]} ${dateNow.getDate()}, ${dateNow.getFullYear()}, ${dateNow.getHours()}:${dateNow.getMinutes()}`

  console.log("Transforming data [2/2]... ⏳")

  for (let entry in latest) {
    try {
      content[entry] =`${latest[entry]}`
      let delta = latest[entry] - secondLatest[entry]
      if (delta > 0) content[entry + "Delta"] = `+${delta}`
    } catch(error) {
      console.warn(error);
    }
  }

  console.log("Done! ✔ Generating image... ⏳")

  toImage({
    output: "./image.png",
    html: fs.readFileSync("./source/index.html", {encoding: "utf-8"}),
    waitUntil: "networkidle2",
    content
  })

  console.log("Operation complete! ✔")

}).catch(reason => {
  console.warn("API request failed! ❌", reason)
})