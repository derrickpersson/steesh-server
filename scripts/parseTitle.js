'use strict';

const URL = require('url-parse');
// const Regex = require("regex");

const articleURL = new URL("https://betterhumans.coach.me/get-happy-like-the-danes-a-practical-guide-to-more-hygge-in-your-life-10e1f0b5363d");

// const findHTMLClause = new Regex(/\./)

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