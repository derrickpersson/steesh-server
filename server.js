const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(8080, () => console.log('Example app listening on port 8080!'))

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