function parseTitle(title){
  let titleArray = title.split("/");
  let lastElement = titleArray[(titleArray.length - 1)];
  let parsedTitle = lastElement.split("-").join(" ");
  return parsedTitle;
}

function parseURL(url){
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
            seg = a.search.replace(/^\?/,'').split('&'),
            len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}

console.log(parseTitle("https://betterhumans.coach.me/get-happy-like-the-danes-a-practical-guide-to-more-hygge-in-your-life-10e1f0b5363d"));
console.log(parseTitle("https://www.nytimes.com/interactive/2018/05/23/us/politics/trump-mueller-russia.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=photo-spot-region&region=top-news&WT.nav=top-news"));
console.log(parseTitle("https://www.theglobeandmail.com/world/article-canadian-cannabis-industry-gives-boost-to-southern-african-countries/"));
console.log(parseURL("https://www.theglobeandmail.com/world/article-canadian-cannabis-industry-gives-boost-to-southern-african-countries/"));






module.exports = {
  parseTitle: parseTitle
}