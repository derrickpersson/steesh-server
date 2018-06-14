'use strict';

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
          createDataPackageToSend(tab.url).then(function(data){
            sendData(data);
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
  }).then(function(response){
      response.json();
    })
}



