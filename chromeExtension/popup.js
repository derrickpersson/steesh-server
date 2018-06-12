document.addEventListener('DOMContentLoaded', function() {
  let articleSubmit = document.getElementById('submitArticleBtn');
  articleSubmit.addEventListener('click', function(){
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs){
      chrome.storage.sync.get(null, function(storage){
        let data = {
          URL: tabs[0].url,
          userID: storage.userID
        }
        var allkeys = Object.keys(storage);
        console.log("Storage: ", allkeys);
        console.log("User: ", storage.userID);
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
        })
    });
  });


});