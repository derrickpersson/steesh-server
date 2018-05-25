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


});