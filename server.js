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

// parse application/json
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

// Routes:

// /web/[URL]
//   -> MVP: Save website at the URL as PDF :D
//   -> PII: Save website at the URL as PDF & send via email to specified email
//   -> PIII: Build chrome extension; button to click to send to PDF

app.post('/getPDF', (req, res) => {
  console.log("Req: ", req.body);
  let parsedTitle = parseTitle(req.body.URL);
  execFile("phantomjs", ["rasterize.js", req.body.URL, `./results/${parsedTitle}.pdf`, "Letter"], (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(parsedTitle);

    // sendToKindle(user, req.body.title, function(body){
    //   console.log("Success!");
    //   console.log("body: ", body);
    // })
  })

  res.send("Getting website as PDF now...");
})


app.get('/hello', (req, res) => {
  console.log("It was here!");
  res.send("Hello!");
})

// /signup
//   -> Sign up a new account

app.get('/signup', (request, response) => {
  response.send("Sign up here!");
})

// /profile
//   -> Set:
//     - Kindle Email
//     - My email?
//     - Reset my password?

app.get('/profile', (request, response) => {
  response.send("View your information here.");
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))