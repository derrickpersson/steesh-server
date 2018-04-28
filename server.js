const express = require('express')
const bodyParser = require("body-parser");
const request = require('request');
const fs = require('fs');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', (req, res) => res.render('index'))

// Routes:

// /web/[URL]
//   -> MVP: Save website at the URL as PDF
//   -> PII: Save website at the URL as PDF & send via email to specified email
//   -> PIII: Build chrome extension; button to click to send to PDF

app.post('/getPDF', (req, res) => {
  console.log(req.body.URL);
  const article = request(req.body.URL, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
  response.send("Getting website as PDF now...");
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