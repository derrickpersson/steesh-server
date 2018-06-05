'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    { user: user }, function() {
  });

  chrome.storage.local.get('signed_in', function(data) {
    if (data.signed_in) {
      chrome.browserAction.setPopup({popup: 'popup.html'});
    } else {
      chrome.tabs.create({url: 'oAuth.html'});
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
        'clientId': resp.OAUTH_CLIENTID
      })
    }
  };
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();


});




