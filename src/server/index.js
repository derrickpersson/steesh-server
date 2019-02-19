const {
  morgan,
  HTTPStatus
} = require("../../config/index.js");

const express = require('express')
const bodyParser = require("body-parser");
const pdfService = require("../pdf/index.js");
const emailService = require("../email/index.js");
const analytics = require("../analytics/index.js");
const { userService } = require("../users/index.js");
const { knexLogger } = require("../users/index.js");
const winston = require("../logging/winston");
const healthCheck = require('express-healthcheck');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(knexLogger);

app.use(bodyParser.json());

// app.use(morgan('combined', { stream: winston.stream }));

app.use('/health', healthCheck());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", `chrome-extension://${process.env.CHROME_EXTENSION_ID}`);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use( (error, req, res, next) => {
  res.sendStatus(HTTPStatus.serverError);
  winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  next();
});

app.get('/info', async function(req, res) {
  const packageJson = require("./package.json");
  res.send({
    name: packageJson.name,
    description: packageJson.description,
    version: packageJson.version
  });
})

app.post('/getPDF', async (req, res, next) => {
  const url = req.body.URL;
  const parsedTitle = pdfService.parseTitle(url);
  try {
    await pdfService.convertToPDF(url);
    const user = await userService.getUserByID(req.body.userID);
    const data = emailService.createKindleData(user, parsedTitle);
    await emailService.sendPDF(data);
    analytics.track('send PDF', {
      distinct_id: user.id,
      article_title: parsedTitle,
      article_url: url
    });
    res.sendStatus(HTTPStatus.OK);
  } catch (error) {
    next(error);
  }

});

app.post('/signup', async (req, res, next) => {
  let data = req.body;
  try {
    const userID = await userService.insertUser(data);
    analytics.track('user sign up', {
      distinct_id: userID
    });
    res.send(JSON.stringify({ userID }));
    console.log("SENT!");
  } catch (error) {
    next(error);
  }
});

module.exports = app;