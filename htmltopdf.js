var page = require('webpage').create();
page.viewportSize = { width: 1024, height: 768 };
page.open('https://medium.com/s/story/who-do-we-want-to-trust-writer-eliot-peper-on-his-new-novel-and-the-future-of-tech-6ce14c84e21b', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('medium.pdf');
  }
  phantom.exit();
});


//https://medium.com/s/story/who-do-we-want-to-trust-writer-eliot-peper-on-his-new-novel-and-the-future-of-tech-6ce14c84e21b