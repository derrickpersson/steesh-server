'use strict';

const URL = require('url-parse');
// const Regex = require("regex");

const articleURL = new URL("https://betterhumans.coach.me/get-happy-like-the-danes-a-practical-guide-to-more-hygge-in-your-life-10e1f0b5363d");

// const findHTMLClause = new Regex(/\./)

function parseTitle(url){
  let articleURL = new URL(url);
  let pathname = articleURL.pathname;
  let pathnameArray = pathname.split("/");
  let titleElement = (pathnameArray[(pathnameArray.length - 1)].length === 0) ? pathnameArray[(pathnameArray.length - 2)] : pathnameArray[(pathnameArray.length - 1)];
  titleElement = titleElement.replace(/\..*/, "");
  titleElement = titleElement.split("-").join(" ");
  return titleElement;
}

console.log(parseTitle("https://betterhumans.coach.me/get-happy-like-the-danes-a-practical-guide-to-more-hygge-in-your-life-10e1f0b5363d"));
console.log(parseTitle("https://www.nytimes.com/interactive/2018/05/23/us/politics/trump-mueller-russia.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=photo-spot-region&region=top-news&WT.nav=top-news"));
console.log(parseTitle("https://www.theglobeandmail.com/world/article-canadian-cannabis-industry-gives-boost-to-southern-african-countries/"));






module.exports = {
  parseTitle: parseTitle
}