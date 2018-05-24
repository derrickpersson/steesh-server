document.addEventListener('DOMContentLoaded', function() {
  let articleSubmit = document.getElementById('submitArticleBtn');
  articleSubmit.addEventListener('click', function(){
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs){
      let data = {
        URL: tabs[0].url,
        title: "Testing"
      }
      console.log("Data: ", data);
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
    });
  });


});



// chrome.storage.sync.get('user', function(data){

// })

// let button = document.getElementById('submit');
//   chrome.tabs.query({
//     active: true,
//     currentWindow: true
//   }, function(tabs){
//     chrome.tabs.executeScript(tabs[0].id, {
//       code: 'function(){console.log("Hello World!");}()'
//     });
//   });
// }

// articleForm.onSubmit = function(element){
//   let form = element.target.value;
//   chrome.tabs.query({
//     active: true,
//     currentWindow: true
//   }, function(tabs){
//     chrome.tabs.executeScript(tabs[0].id, {
//       code: 'console.log("Hello World!");'
//     });
//   }
//   )
// }