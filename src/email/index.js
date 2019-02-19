require('dotenv').config();
const path = require('path');
const DOMAIN = process.env.DOMAIN;
const API_KEY = process.env.MG_KEY;
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });


// TODO: Write adapter to make emailService more generic / I.e. specify the API I want to work with.
const mailgunAdapter = function(mailgun) {
  return {
    send: mailgun.messages().send(data, cb),
  }
}

function makeEmailService(sendAPI){
  return {
    sendPDF: function sendPDF(data) {
      return new Promise((resolve, reject) => {
        sendAPI.messages().send(data, function(error, body){
          if(error){
            reject(error);
          }
          
          resolve(body);
        });
      });
    },

    createKindleData(user, title){
      let { firstName, lastName, email, kindleEmail } = user;
      let filepath = path.join(__dirname, `../../results/${title}.pdf`);
      let fromLine = `${firstName} ${lastName} <${email}>`;
    
      return {
        from: fromLine,
        to: kindleEmail,
        subject: "Convert",
        text: "Sending article to Kindle",
        attachment: filepath
      };
    }
  };
};

const emailService = makeEmailService(mailgun);

module.exports = emailService;
