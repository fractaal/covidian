require("dotenv").config({path: __dirname + "/.env"});

const Twit = require("twit");

const app = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

app.post("statuses/update", { status: "I'm alive!", function(err, data, response) {
  if (err) {
    console.log(err);
  }
}})