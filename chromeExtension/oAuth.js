document.addEventListener('DOMContentLoaded', function() {
  console.log("Document Ready");
  let logInForm = document.getElementById('logInForm');
  console.log(logInForm);
  logInForm.addEventListener('submit', function(event){
    console.log(event);

    //   var xhr = new XMLHttpRequest();
    //   // xhr.withCredentials = true;
    //   xhr.open("POST", "http://127.0.0.1:8080/getPDF", true);
    //   xhr.onreadystatechange = function() {
    //     if (xhr.readyState == 4) {
    //       // JSON.parse does not evaluate the attacker's scripts.
    //       // var resp = JSON.parse(xhr.responseText);
    //     }
    //   }
    //   xhr.setRequestHeader("Content-Type", "application/json");
    //   xhr.send(JSON.stringify(data));
    // });
  }, false);

  function start() {
  chrome.storage.local.get(['apiKey', 'clientId'], function(data) {
    console.log("Data: ", data);
  });
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
      'apiKey': 'test',
      // clientId and scope are optional if auth is not required.
      'clientId': 'test2',
      'scope': 'profile email openid',
    }).then(function() {
      // 3. Initialize and make the API request.
      return gapi.client.request({
        'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
      })
    }).then(function(response) {
      console.log(response.result);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  };
  // 1. Load the JavaScript client library.
  gapi.load('client', start);


});