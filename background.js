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
});