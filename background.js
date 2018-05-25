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
  });

  chrome.storage.local.get('signed_in', function(data) {
    if (data.signed_in) {
      chrome.browserAction.setPopup({popup: 'popup.html'});
    } else {
      chrome.browserAction.setPopup({popup: 'popup_sign_in.html'});
    }
  });

  var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;
  xhr.open("GET", "http://127.0.0.1:8080/authenticate", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      var resp = JSON.parse(xhr.responseText);
      chrome.storage.local.set({
        'apiKey': resp.OAUTH_CLIENT_SECRET,
        'clientId': resp.OAUTH_CLIENTID,
        'scope': 'profile'
      })
    }
  };
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();


});




