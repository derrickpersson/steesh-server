const express = require('express')
const bodyParser = require("body-parser");
const { parseTitle } = require('./scripts/parseTitle');
const ENV = process.env.ENV || "development";
const knexConfig = require("./db/knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger = require('knex-logger');
const datahelpers = require('./scripts/datahelpers.js')(knex);
const puppeteer = require('puppeteer');
const convertToPDF = require("./scripts/convertToPDF.js")(puppeteer).convertToPDF;
const DOMAIN = process.env.DOMAIN;
const API_KEY = process.env.MG_KEY;
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });
const emailService = require('./scripts/emailService.js')(mailgun);
const Mixpanel = require('mixpanel');
const analytics = Mixpanel.init(process.env.ANALYTICS_TOKEN);

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(knexLogger(knex));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", `chrome-extension://${process.env.CHROME_EXTENSION_ID}`);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/getPDF', async (req, res) => {
  const url = req.body.URL;
  let parsedTitle = parseTitle(url);
  try {
    await convertToPDF(url, parsedTitle);
    const user = await datahelpers.getUserByID(req.body.userID);
    const data = emailService.createKindleData(user, parsedTitle);
    await emailService.sendPDF(data);
    analytics.track('send PDF', {
      distinct_id: user.id,
      article_title: parsedTitle,
      article_url: url
    });
  } catch (error) {
    // TODO: Log errors to server
    console.error("error: ", error);
  }

});

app.post('/signup', async (req, res) => {
  let data = req.body;
  const userID = await datahelpers.insertUser(data);
  res.send(JSON.stringify({ userID }));
  analytics.track('user sign up', {
    distinct_id: userID
  });
});

app.listen(PORT, () => console.log(`Steesh server listening on port ${PORT}!`));