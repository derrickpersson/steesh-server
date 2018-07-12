document.addEventListener('DOMContentLoaded', function() {
  let logInForm = document.getElementById('logInForm');
  let formSection = document.getElementById('formSection');
  logInForm.addEventListener('submit', function(event){
    event.preventDefault();
    var formData = {};
    for(var property in logInForm.elements){
      if(logInForm.elements.hasOwnProperty(property)){
        formData[logInForm.elements[property].id] = sanitize(logInForm.elements[property].value);
      }
    }
    sendForm(formData)
      .then(function(response){
        var userID = response.userID;
        chrome.storage.sync.set({"userID": userID, "signed_in": true});
      })
      .then(function(){
        while(formSection.firstChild){
          formSection.removeChild(formSection.firstChild);
        }
        formSection.innerHTML = generateSubmissionHTML();
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

function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match) => ( map[match]) );
}


function generateSubmissionHTML(){
  return `<section class="section">
      <div class="container">
        <h1 class="title">
          Thank you for signing up!
        </h1>
        <p>
          To get started, browse to an article you'd like to read then click the Steesh icon <img src="images/SteeshlogoLarge.png" style="height: 1.25em"> in the top right bar. The article will be sent to your Kindle; please allow a few moments for it to come through.
        </p>
      </div>
    </section>`;
}