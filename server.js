const express = require('express')
const bodyParser = require("body-parser");
const request = require('request');
const fs = require('fs');
const { spawn, execFile } = require('child_process');
const { sendToKindle } = require('./mailgun.js');
const { parseTitle } = require('./scripts/parseTitle');
const ENV = process.env.ENV || "development";
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger = require('knex-logger');
const datahelpers = require('./datahelpers.js')(knex);

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(knexLogger(knex));

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "chrome-extension://ecajeoanappgfgmplaoidemaognieimh");
  res.header("Access-Control-Allow-Origin", "chrome-extension://ccodnhhlbdbnoekahoelgmgkdfgofnpp");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


let user = {
  firstName: "Derrick",
  lastName: "Persson",
  email: "derrickpersson@gmail.com",
  kindleEmail: "derrickpersson@kindle.com"
}

app.get('/', (req, res) => res.render('index'))

app.post('/getPDF', (req, res) => {
  console.log("Req: ", req.body);
  let parsedTitle = parseTitle(req.body.URL);
  execFile("phantomjs", ["rasterize.js", req.body.URL, `./results/${parsedTitle}.pdf`, "Letter"], (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    sendToKindle(user, req.body.title, function(body){
    })
  })

  res.send("Getting website as PDF now...");
})

app.post('/signup', (request, response) => {
  let data = request.body;
  datahelpers.insertUser(data).then((data) => {
    console.log('Submitted User: ', data);
    response.send("Everything is good!");
  })
})

app.get('/profile', (request, response) => {
  response.send("View your information here.");
})

app.get('/users', (request, response) => {
  let user = datahelpers.getUserByEmail("derrickpersson@gmail.com").then((data) => {
    console.log(data);
  });
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))