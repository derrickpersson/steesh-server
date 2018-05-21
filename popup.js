document.addEventListener('DOMContentLoaded', function() {
  let articleSubmit = document.getElementById('submitArticleBtn');
  articleSubmit.addEventListener('click', function(){
    chrome.tabs.create({url: 'google.com'}, function(tab){
      // console.log(tab);
    })
    // chome.tabs.getselected(null, function(tab){
    //   let form = document.createElement('form');
    //   form.action = "localhost:8080/getPDF";
    //   form.method = "post";
    //   let inputURL = document.createElement('input');
    //   inputURL.type = "hidden";
    //   inputURL.name = "url";
    //   inputURL.value = tab.url;
    //   form.appendChild(input);
    //   let inputTitle = document.createElement('input');
    //   inputTitle.type = "hidden";
    //   inputTitle.name = "title";
    //   inputTitle.value = "Testing";
    //   document.body.appendChild(form);
    //   form.submit();
    // })
  });
}



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