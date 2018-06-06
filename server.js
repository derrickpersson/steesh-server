const express = require('express')
const bodyParser = require("body-parser");
const request = require('request');
const fs = require('fs');
const { spawn, execFile } = require('child_process');
const { sendToKindle } = require('./scripts/mailgun.js');
const { parseTitle } = require('./scripts/parseTitle');
const ENV = process.env.ENV || "development";
const knexConfig = require("./db/knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger = require('knex-logger');
const datahelpers = require('./scripts/datahelpers.js')(knex);

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(knexLogger(knex));

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "chrome-extension://loffpcbdmcgipklnlkoddaeomfhhmfod");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => res.render('index'))

app.post('/getPDF', (req, res) => {
  console.log("Req: ", req.body);
  let parsedTitle = parseTitle(req.body.URL);
  execFile("phantomjs", ["./scripts/rasterize.js", req.body.URL, `./results/${parsedTitle}.pdf`, "Letter"], (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    datahelpers.getUserByID(req.body.userID)
      .then(function(user){
        sendToKindle(user, parsedTitle, function(body){
      })
    })
  })

  res.send("Getting website as PDF now...");
})

app.post('/signup', (request, response) => {
  let data = request.body;
  datahelpers.insertUser(data).then((data) => {

    let userData = {
      userID: data[0]
    }

    response.send(JSON.stringify(userData));
  })
})

app.get('/profile', (request, response) => {
  response.send("View your information here.");
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))