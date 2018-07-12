const { spawn, execFile } = require('child_process');

function convertToPDF(URL, parsedTitle){
  return new Promise((resolve, reject) => {
    execFile("phantomjs", ["./scripts/rasterize.js", URL, `./results/${parsedTitle}.pdf`, "Letter"], function(err, stdout, stderr){
      if(err) {
        reject(err);
      }
      resolve(stdout);
    })
  });
};



module.exports = {
  convertToPDF: convertToPDF
}