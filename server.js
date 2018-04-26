const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

// Routes:

/* 

/web/[URL]
  -> MVP: Save website at the URL as PDF
  -> PII: Save website at the URL as PDF & send via email to specified email
  -> PIII: Build chrome extension; button to click to send to PDF

/signup
  -> Sign up a new account

/profile
  -> Set:
    - Kindle Email
    - My email?
    - Reset my password?

*/

app.get('/web/:url', (request, response) => {
  response.send("Getting website as PDF now...");
})

app.get('/signup', (request, response) => {
  response.send("Sign up here!");
})

app.get('/profile', (request, response) => {
  response.send("View your information here.");
})

app.listen(8080, () => console.log('Example app listening on port 8080!'))