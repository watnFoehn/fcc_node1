// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// your first API endpoint...
app.get("/api/timestamp/:date?", function (req, res) {
  //if (!isValidDate(req.params.date)) return res.json({ error: "Invalid Date" });

  const timeStampUnix = req.params.date
    ? new Date(req.params.date).getTime()
    : new Date().getTime();
  const timeStampUTC = req.params.date
    ? new Date(req.params.date).toString()
    : new Date().toString();
  res.json({ unix: timeStampUnix, utc: timeStampUTC });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
