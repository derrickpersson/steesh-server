const express = require('express')
const bodyParser = require("body-parser");
const { parseTitle } = require('./scripts/parseTitle');
const ENV = process.env.ENV || "development";
const knexConfig = require("./db/knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger = require('knex-logger');
const datahelpers = require('./scripts/datahelpers.js')(knex);
const puppeteer = require('puppeteer');
const convertToPDF = require("./scripts/convertToPDF.js")(puppeteer);
const DOMAIN = process.env.DOMAIN;
const api_key = process.env.MG_KEY;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });
const emailService = require('./scripts/sendPDF.js')(mailgun);

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(knexLogger(knex));

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", `chrome-extension://${process.env.CHROME_EXTENSION_ID}`);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/getPDF', (req, res) => {
  let parsedTitle = parseTitle(req.body.URL);
  convertToPDF(req.body.URL, parsedTitle)
    .then((result) => {
      datahelpers.getUserByID(req.body.userID)
        .then(function(users){
          let user = users[0];
          const data = emailService.createKindleData(user, parsedTitle)
          emailService.sendPDF(data, function(body, error){
            // TODO: Record user interaction to analytics tool

            if(error){
              // TODO: Log errors to server
              console.error("error: ", error);
            }
        });
      })
    }).catch((error) => {
      // TODO: Log errors to server
      console.error("error: ", error);
    })
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
  // TODO: Implement profile view feature
  response.send("View your information here.");
})

app.listen(PORT, () => console.log(`Steesh server listening on port ${PORT}!`));