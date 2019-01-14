const express = require('express')
const bodyParser = require("body-parser");
const { parseTitle } = require('../scripts/parseTitle');
const ENV = process.env.ENV || "development";
const knexConfig = require("../db/knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger = require('knex-logger');
const dataHelpers = require('../scripts/dataHelpers.js')(knex);
const puppeteer = require('puppeteer');
const convertToPDF = require("../scripts/convertToPDF.js")(puppeteer).convertToPDF;
const DOMAIN = process.env.DOMAIN;
const API_KEY = process.env.MG_KEY;
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });
const emailService = require('../scripts/emailService.js')(mailgun);
const Mixpanel = require('mixpanel');
const analytics = Mixpanel.init(process.env.ANALYTICS_TOKEN);
const morgan = require('morgan');
const winston = require("./winston.js");

module.exports = {
    express,
    bodyParser,
    parseTitle,
    knexLogger,
    knex,
    dataHelpers,
    convertToPDF,
    emailService,
    analytics,
    morgan,
    winston
};
