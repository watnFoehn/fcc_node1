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

// your first API endpoint...
app.get("/api/timestamp/:date?", function (req, res) {
  if (!isNaN(req.params.date)) {
    const date = new Date(req.params.date * 1000),

    res.json({
      unix: parseInt(req.params.date),
      utc: date.toUTCString()
    });
  }

  const timeStampUnix = req.params.date
    ? new Date(req.params.date).getTime()
    : new Date().getTime();
  const timeStampUTC = req.params.date
    ? new Date(req.params.date).toUTCString()
    : new Date().toUTCString();
  if (timeStampUnix && timeStampUTC) {
    res.json({ unix: timeStampUnix, utc: timeStampUTC });
  }
  res.json({ error: "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
