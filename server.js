const express = require('express')
const bodyParser = require("body-parser");
const request = require('request');
const fs = require('fs');
const { spawn, execFile } = require('child_process');
const { sendToKindle } = require('./mailgun.js');
const { parseTitle } = require('./scripts/parseTitle');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "chrome-extension://ecajeoanappgfgmplaoidemaognieimh");
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

app.get('/authenticate', (req, res) => {
  let authData = JSON.stringify({
    OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
    OAUTH_CLIENTID: process.env.OAUTH_CLIENTID
  })
  res.status(200);
  res.send(authData);
})

app.get('/signup', (request, response) => {
  response.send("Sign up here!");
})

app.get('/profile', (request, response) => {
  response.send("View your information here.");
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))