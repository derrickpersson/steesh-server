'use strict';

var user = {
  firstName: "Derrick",
  lastName: "Persson",
  email: "derrickpersson@gmail.com",
  kindleEmail: "derrickpersson@kindle.com"
}



chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    { user: user }, function() {
    console.log("User: ", user);
  });

  chrome.runtime.onMessage.addListener(
    function(message, callback) {
      if (message == "runContentScript"){
        chrome.tabs.executeScript({
          code: 'console.log("Hello this works!");'
        });
      }
   });
});