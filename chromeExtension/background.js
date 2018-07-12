'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(['signed_in'], function(data) {
    if (!data.signed_in) {
      chrome.tabs.create({url: 'sign_up.html'});
    }
  });
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
  chrome.storage.sync.get(['signed_in'], function(data) {
      if (!data.signed_in) {
        chrome.tabs.create({url: 'sign_up.html'});
      }
    });

});

chrome.browserAction.onClicked.addListener(function(tab) { 
  chrome.storage.sync.get(['signed_in'], function(data) {
    if (!data.signed_in) {
      chrome.tabs.create({url: 'sign_up.html'});
    }else{
      handleSubmission(tab);
    }
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


const min = 1;
const max = 12;
let current = min;

function rotateIcon() {
  chrome.browserAction.setIcon({path:"images/loading" + current + ".png"});
  if (current++ === max) {
    current = min;
  };
}

function handleSubmission(tab){
  const intId = setInterval(rotateIcon, 75);
  chrome.browserAction.disable(tab.id);
  createDataPackageToSend(tab.url).then(function(data){
    sendData(data);
    setTimeout(() => {
      clearInterval(intId);
      chrome.browserAction.setIcon({ path: "images/SteeshLogo16.png" });
      chrome.browserAction.enable(tab.id);
    }, 1000);
  });
}


