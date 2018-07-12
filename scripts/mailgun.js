require('dotenv').config();

let requestURL = `https://api:${process.env.MG_KEY}@api.mailgun.net/v3/samples.mailgun.org/log`

const path = require('path');
const DOMAIN = process.env.DOMAIN;
const api_key = process.env.MG_KEY;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });

function sendToKindle(user, title, cb){

  let { firstName, lastName, email, kindleEmail } = user;
  let filepath = path.join(__dirname, `../results/${title}.pdf`);
  let fromLine = `${firstName} ${lastName} <${email}>`;

  let data = {
    from: fromLine,
    to: kindleEmail,
    subject: "Convert",
    text: "Sending article to Kindle",
    attachment: filepath
  }

  mailgun.messages().send(data, function(error, body){
    if(error){
      throw error;
    }
    
    cb(body);
  })

}

module.exports = {
  sendToKindle: sendToKindle
};