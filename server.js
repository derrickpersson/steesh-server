const express = require('express')
const bodyParser = require("body-parser");
const request = require('request');
const fs = require('fs');
const { spawn, execFile } = require('child_process');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', (req, res) => res.render('index'))

// Routes:

// /web/[URL]
//   -> MVP: Save website at the URL as PDF :D
//   -> PII: Save website at the URL as PDF & send via email to specified email
//   -> PIII: Build chrome extension; button to click to send to PDF

app.post('/getPDF', (req, res) => {
  execFile("phantomjs", ["rasterize.js", req.body.URL, "medium.pdf", "Letter"], (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
});

  res.send("Getting website as PDF now...");
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