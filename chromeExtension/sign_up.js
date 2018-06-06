document.addEventListener('DOMContentLoaded', function() {
  console.log("Document Ready");
  let logInForm = document.getElementById('logInForm');
  console.log(logInForm);
  logInForm.addEventListener('submit', function(event){
    event.preventDefault();
    var formData = {};
    for(var property in logInForm.elements){
      if(logInForm.elements.hasOwnProperty(property)){
        formData[logInForm.elements[property].id] = logInForm.elements[property].value;
      }
    }
    console.log(formData);
    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    xhr.open("POST", "http://127.0.0.1:8080/signup", true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        resp.signed_in = true;
        chrome.storage.sync.set(resp, function(){
          console.log("Response: ", resp);
        })
      }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(formData));
  });


});