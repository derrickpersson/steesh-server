require('dotenv').config();

let requestURL = `https://api:${process.env.MG_KEY}@api.mailgun.net/v3/samples.mailgun.org/log`

const path = require('path');
const DOMAIN = 'mail.steesh.ca';
const api_key = process.env.MG_KEY;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });

const filepath = path.join(__dirname, 'medium.pdf');

let data = {
  from: 'Derrick Persson <derrickpersson@gmail.com>',
  to: 'derrickpersson@kindle.com',
  cc: 'derrickpersson@gmail.com',
  subject: 'Convert',
  text: 'Sending article to Kindle',
  attachment: filepath
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});