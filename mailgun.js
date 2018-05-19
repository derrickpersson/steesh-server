require('dotenv').config();

let requestURL = `https://api:${process.env.MG_KEY}@api.mailgun.net/v3/samples.mailgun.org/log`

const path = require('path');
const DOMAIN = 'mail.steesh.ca';
const api_key = process.env.MG_KEY;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });

// const filepath = path.join(__dirname, 'medium.pdf');

// let data = {
//   from: 'Derrick Persson <derrickpersson@gmail.com>',
//   to: 'derrickpersson@kindle.com',
//   cc: 'derrickpersson@gmail.com',
//   subject: 'Convert',
//   text: 'Sending article to Kindle',
//   attachment: filepath
// };

// mailgun.messages().send(data, function (error, body) {
//   console.log(body);
// });


let user = {
  firstName: "Derrick",
  lastName: "Persson",
  email: "derrickpersson@gmail.com",
  kindleEmail: "derrickpersson@gmail.com"
}


// sendToKindle(user, "Testing.pdf", function(body){
//   console.log("Body: ", body);
// });



function sendToKindle(user, title, cb){

let {firstName, lastName, email, kindleEmail } = user;
let filepath = path.join(__dirname, `./results/${title}.pdf`);

let data = {
  from: `${firstName} ${lastName} <${email}>`,
  to: kindleEmail,
  cc: email,
  subject: "Convert",
  text: "Sending article to Kindle",
  attachment: filepath
}

mailgun.messages().send(data, function(error, body){
  cb(body);
})

}

module.exports = {
  sendToKindle: sendToKindle
};