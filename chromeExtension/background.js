'use strict';

chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.local.get('signed_in', function(data) {
    if (data.signed_in) {
      chrome.browserAction.setPopup({popup: 'popup.html'});
    } else {
      chrome.tabs.create({url: 'sign_up.html'});
    }
  });

});




