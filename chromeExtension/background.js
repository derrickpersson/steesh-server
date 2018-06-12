'use strict';

chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.get(['signed_in'], function(data) {
    if (data.signed_in) {
      chrome.browserAction.setPopup({popup: 'popup.html'});
    } else {
      chrome.tabs.create({url: 'sign_up.html'});
    }
  });

  chrome.storage.onChanged.addListener(function(changes, areaName) {
  console.log("Changes: ", changes);
  console.log("areaName: ", areaName);
  chrome.storage.sync.get(['signed_in'], function(data) {
      if (data.signed_in) {
        chrome.browserAction.setPopup({popup: 'popup.html'});
      } else {
        chrome.browserAction.setPopup({popup: 'sign_up.html'});
      }
    });

  });


});




