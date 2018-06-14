document.addEventListener('DOMContentLoaded', function() {
  console.log("Document Ready");
  let logInForm = document.getElementById('logInForm');
  logInForm.addEventListener('submit', function(event){
    event.preventDefault();
    var formData = {};
    for(var property in logInForm.elements){
      if(logInForm.elements.hasOwnProperty(property)){
        formData[logInForm.elements[property].id] = logInForm.elements[property].value;
      }
    }
    sendForm(formData)
      .then(function(response){
        var userID = response.userID;
        chrome.storage.sync.set({"userID": userID, "signed_in": true});
      })
  });


});

function sendForm(data){
  return fetch("http://127.0.0.1:8080/signup", {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors'
  }).then(function(response){
    return response.json();
  })
}