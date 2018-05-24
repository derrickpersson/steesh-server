const URL = require('url-parse');

function parseTitle(url){
  let articleURL = new URL(url);
  let pathname = articleURL.pathname;
  if(pathname === "/" || pathname === ""){
    return articleURL.hostname;
  }
  let pathnameArray = pathname.split("/");
  let titleElement = getLastFullElement(pathnameArray);
  titleElement = titleElement.replace(/\..*/, "");
  titleElement = titleElement.split("-").join(" ");
  return titleElement;
}

function getLastFullElement(array){
  let lastIndex = array.length - 1;
  let lastElement = array[lastIndex];
  let secondLastElement = array[lastIndex - 1];
  let lastFullIndex = (lastElement.length > 0) ? lastElement : secondLastElement;
  return lastFullIndex;
}

module.exports = {
  parseTitle: parseTitle
};