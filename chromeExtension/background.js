'use strict';

// Global scope variables... because everyone makes bad coding decisions at midnight
let keep_switching_icon = true; 

chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.get(['signed_in'], function(data) {
    if (data.signed_in) {
      chrome.browserAction.onClicked.addListener(function(tab) { 
        createDataPackageToSend(tab.url).then(function(data){
          sendData(data);
        })
      });
    } else {
      chrome.tabs.create({url: 'sign_up.html'});
    }
  });

  chrome.storage.onChanged.addListener(function(changes, areaName) {
  chrome.storage.sync.get(['signed_in'], function(data) {
      if (data.signed_in) {
        chrome.browserAction.onClicked.addListener(function(tab) {
          rotateIcon()
          console.log("Calling RotateIcon: ", rotateIcon);
          createDataPackageToSend(tab.url).then(function(data){
            sendData(data)
            keep_switching_icon = false;
            chrome.browserAction.setIcon({path:"images/SteeshLogoMedium.png"});
          })
        });
      } else {
        chrome.browserAction.setPopup({popup: 'sign_up.html'});
      }
    });

  });


});

function createDataPackageToSend(URL){
  return new Promise(function(resolve, reject){
    chrome.storage.sync.get(null, function(storage){
      let data = {
        URL: URL,
        userID: storage.userID
      };
      resolve(data);
    })
  })
}

function sendData(data){
  return fetch('http://127.0.0.1:8080/getPDF', {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  })
}

var min = 1;
var max = 12;
var current = min;

function rotateIcon() {
  if (keep_switching_icon) {
    chrome.browserAction.setIcon({path:"images/loading" + current + ".png"});
    if (current++ === max) {
      current = min;
    };

    window.setTimeout(rotateIcon, 75);
  }
}


