'use strict';

chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.get(['signed_in'], function(data) {
    console.log("Signed In? ", data.signed_in);
    if (data.signed_in) {
      chrome.browserAction.onClicked.addListener(function(tab) { 
        createDataPackageToSend(tab.url).then(function(data){
          sendData(data);
          alert('Data Sent:' + " " + data.userID + ", " + data.URL);
        })
      });
    } else {
      chrome.tabs.create({url: 'sign_up.html'});
    }
  });

  chrome.storage.onChanged.addListener(function(changes, areaName) {
  console.log("Changes: ", changes);
  console.log("areaName: ", areaName);
  chrome.storage.sync.get(['signed_in'], function(data) {
      if (data.signed_in) {
        chrome.browserAction.onClicked.addListener(function(tab) { 
          createDataPackageToSend(tab.url).then(function(data){
            sendData(data);
            alert('Data Sent:' + " " + data.userID + ", " + data.URL);
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
  var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;
  xhr.open("POST", "http://127.0.0.1:8080/getPDF", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      // var resp = JSON.parse(xhr.responseText);
    }
  }
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
}



